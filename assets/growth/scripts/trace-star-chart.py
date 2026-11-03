from pathlib import Path
import hashlib
import json
import shutil
import numpy as np
from PIL import Image

root=Path(__file__).resolve().parent.parent
source=root/'public/stargrowth/original-chart.png'
dest=root/'public/stargrowth'
dest.mkdir(parents=True,exist_ok=True)
if source.resolve() != (dest/'original-chart.png').resolve():
    shutil.copy2(source,dest/'original-chart.png')
rgb=np.asarray(Image.open(source).convert('RGB')).astype(float)
h,w=rgb.shape[:2]
r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
red=(r>175)&(g<145)&(b<125)&((r-g)>80)&((r-b)>80)
black=(r<110)&(g<110)&(b<110)

points=[]
for x in range(330,2460):
    ys=np.flatnonzero(red[410:1710,x])+410
    if not len(ys):continue
    # The legend is above the plotted trace. Keep the lowest connected run.
    runs=np.split(ys,np.flatnonzero(np.diff(ys)>3)+1)
    chosen=runs[-1]
    points.append([float(x),float(np.median(chosen))])

def simplify(p,epsilon):
    a=np.asarray(p[0]);z=np.asarray(p[-1]);q=np.asarray(p)
    d=z-a
    distances=np.abs(d[0]*(a[1]-q[:,1])-(a[0]-q[:,0])*d[1])/(np.linalg.norm(d)+1e-12)
    i=int(distances.argmax())
    if distances[i]>epsilon:
        return simplify(p[:i+1],epsilon)[:-1]+simplify(p[i:],epsilon)
    return [p[0],p[-1]]

# Remove rasterization backtracks on the steep rise before the close camera
# makes them visible. Corner cutting preserves the photographed curve shape.
raw=np.asarray(points)
filtered=np.array([np.median(raw[max(0,i-5):i+6,1]) for i in range(len(raw))])
filtered=np.minimum.accumulate(filtered)
points=simplify(np.column_stack((raw[:,0],filtered)).tolist(),1.3)
for _ in range(3):
    rounded=[points[0]]
    for pa,pb in zip(points,points[1:]):
        pa=np.asarray(pa);pb=np.asarray(pb)
        rounded.extend([(pa*.75+pb*.25).tolist(),(pa*.25+pb*.75).tolist()])
    points=rounded+[points[-1]]
lengths=[0.0]
for a,z in zip(points,points[1:]):lengths.append(lengths[-1]+float(np.linalg.norm(np.array(z)-a)))

def bounds(mask):
    yy,xx=np.where(mask)
    return [int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1)]

header=red.copy();header[:200]=False;header[370:]=False;header[:,:850]=False;header[:,1120:]=False
logo=bounds(header)
legend=red.copy();legend[:450]=False;legend[620:]=False;legend[:,:360]=False;legend[:,720:]=False
legend_box=bounds(legend)
green=(g>115)&(r<125)&(b<135)&((g-r)>55)&((g-b)>45)
green[:1700]=False
green_box=bounds(green)
row_counts=black[1550:1740,350:2430].sum(axis=1)
baseline=int(1550+np.argmax(row_counts))
ticks=[]
for k,y1,y2 in [(100,1280,1415),(200,970,1110),(300,665,800)]:
    yy,xx=np.where(black[y1:y2,80:312])
    ticks.append({'stars':k*1000,'y':float((yy.min()+yy.max())/2+y1)})
pixels_per_star=float(np.polyfit([t['stars'] for t in ticks],[t['y'] for t in ticks],1)[0])
colors=rgb[red & (np.indices(red.shape)[0]>620)]
median=np.median(colors,axis=0).astype(int)
data={'source':str(source),'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'width':w,'height':h,
      'viewBox':[45,205,2480,1710],'points':points,'lengths':lengths,'pathLength':lengths[-1],
      'logoBox':logo,'legendBox':legend_box,'greenBox':green_box,'baselineY':baseline,'axisTicks':ticks,
      'pixelsPerStar':pixels_per_star,'lineColor':'#'+''.join(f'{n:02x}' for n in median),
      'count_note':'Counter is an approximate reading of the supplied image, rounded to 10K. It is not live GitHub data.'}
(dest/'geometry.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
(root/'src/starGeometry.ts').write_text('export const starGeometry = '+json.dumps(data,ensure_ascii=False)+' as const;\n')

import wave
sr=48000
duration=15
audio=np.zeros((sr*duration,2))
rng=np.random.default_rng(281025)
def mix(start,signal,pan=0):
    offset=round(start*sr);n=min(len(signal),len(audio)-offset)
    if n<=0:return
    audio[offset:offset+n,0]+=signal[:n]*np.sqrt((1-pan)/2)
    audio[offset:offset+n,1]+=signal[:n]*np.sqrt((1+pan)/2)
def inverse_smooth(v):
    lo,hi=0.,1.
    for _ in range(40):
        mid=(lo+hi)/2
        if mid*mid*(3-2*mid)<v:lo=mid
        else:hi=mid
    return (lo+hi)/2
for target in [100000,200000,300000]:
    target_y=baseline+pixels_per_star*target
    idx=min(range(len(points)),key=lambda i:abs(points[i][1]-target_y))
    when=.45+6.85*inverse_smooth(lengths[idx]/lengths[-1])
    t=np.arange(int(sr*.2))/sr
    tone=.085*(np.sin(2*np.pi*880*t)+.4*np.sin(2*np.pi*1320*t))*np.exp(-t*27)
    mix(when,tone,.12)
for start,seconds,strength in [(0,.7,.05),(.45,6.85,.023),(7.05,3.2,.035),(9.35,4,.03),(10.95,.9,.025),(11.75,.9,.025),(13.05,.8,.035)]:
    t=np.arange(round(sr*seconds))/sr
    noise=np.convolve(rng.normal(0,1,len(t)),np.ones(22)/22,mode='same')
    envelope=np.sin(np.pi*t/seconds)**2
    mix(start,strength*noise*envelope,-.15)
    mix(start+.015,strength*.8*noise*envelope,.15)
audio*=np.minimum(1,np.arange(len(audio))/sr/.1)[:,None]
audio*=np.minimum(1,(duration-np.arange(len(audio))/sr)/.4)[:,None]
with wave.open(str(dest/'growth-sound.wav'),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr)
    f.writeframes((np.clip(audio,-1,1)*32767).astype('<i2').tobytes())
from fontTools import subset
options=subset.Options()
options.font_number=2
font=subset.load_font('/System/Library/Fonts/Hiragino Sans GB.ttc',options)
subsetter=subset.Subsetter(options=options)
subsetter.populate(text='动手能力记忆情绪价值HANDS-ON ABILITY MEMORY EMOTIONAL VALUE')
subsetter.subset(font)
font.flavor='woff2'
font.save(dest/'StarGrowthCN.woff2')
print(json.dumps({k:data[k] for k in ['width','height','logoBox','legendBox','greenBox','baselineY','axisTicks','pixelsPerStar','lineColor']},ensure_ascii=False,indent=2))
print('Trace points:',len(points),'path length:',round(lengths[-1],2),'endpoint approximate stars:',round((baseline-points[-1][1])/-pixels_per_star))
