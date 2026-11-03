from pathlib import Path
import wave
import numpy as np
from PIL import Image
from fontTools import subset
assets = Path(__file__).parent / 'studio/public/assets'
assets.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(827)
y, x = np.mgrid[:1080, :1920]
fold = 2.8*np.sin(x/180 + np.sin(y/260)) + 1.6*np.sin((x+y)/65)
weave = 1.5*np.sin((x+np.abs(y % 380-190)*0.75)*0.72)
paper = 21 + fold + weave + rng.normal(0, 2.3, x.shape)
rgb = np.stack([paper*0.97, paper, paper*1.025], axis=2)
Image.fromarray(np.clip(rgb, 0, 255).astype('uint8')).save(assets/'charcoal-texture.jpg', quality=94)
characters = (Path(__file__).parent/'studio/src/TimelineFilm.tsx').read_text()
for name,path,number in [
    ('TimelineBold','/System/Library/Fonts/Supplemental/Arial Black.ttf',None),
    ('TimelineCN','/System/Library/Fonts/STHeiti Medium.ttc',0),
    ('TimelineMono','/System/Library/Fonts/SFNSMono.ttf',None)]:
    options = subset.Options()
    options.flavor = 'woff2'
    options.font_number = number if number is not None else -1
    font = subset.load_font(path,options)
    s = subset.Subsetter(options=options)
    s.populate(text=characters+''.join(chr(i) for i in range(32,127)))
    s.subset(font)
    font.flavor = 'woff2'
    font.save(assets/f'{name}.woff2')
sr=48000
duration=16
audio=np.zeros((sr*duration,2),dtype=np.float64)
def mix(start,signal,pan=0):
    offset=round(start*sr)
    count=min(len(signal),len(audio)-offset)
    if count<=0:return
    audio[offset:offset+count,0]+=signal[:count]*np.sqrt((1-pan)/2)
    audio[offset:offset+count,1]+=signal[:count]*np.sqrt((1+pan)/2)
for i,start in enumerate([.55,4.1,6.7,9.7,15.2]):
    t=np.arange(round(sr*.25))/sr
    click=.12*np.sin(2*np.pi*(1400*t-850*t*t))*np.exp(-t*56)
    body=.11*np.sin(2*np.pi*90*t)*np.exp(-t*26)
    mix(start,click+body,(-1)**i*.12)
for start,length in [(.45,11.7),(12.1,3.1)]:
    t=np.arange(round(sr*length))/sr
    noise=np.convolve(rng.normal(0,1,len(t)),np.ones(16)/16,mode='same')
    env=np.sin(np.pi*t/length)**2
    strength=.035 if start<1 else .11
    mix(start,strength*noise*env,-.25)
    mix(start+.025,strength*.8*noise*env,.25)
for start in np.arange(.6,12.2,.45):
    t=np.arange(round(sr*.035))/sr
    mix(start,.014*np.sin(2*np.pi*2200*t)*np.exp(-t*175))
audio*=np.minimum(1,np.arange(len(audio))/sr/.2)[:,None]
audio*=np.minimum(1,(duration-np.arange(len(audio))/sr)/.5)[:,None]
with wave.open(str(assets/'timeline-sound.wav'),'wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr)
    f.writeframes((np.clip(audio,-1,1)*32767).astype('<i2').tobytes())
print('Texture, font subsets and original stereo sound design generated.')

