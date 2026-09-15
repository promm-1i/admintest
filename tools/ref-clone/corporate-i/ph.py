import sys
from PIL import Image, ImageDraw
def ph(name,w,h,dark=True):
    bg=(58,60,70) if dark else (205,208,214)
    im=Image.new('RGB',(w,h),bg); d=ImageDraw.Draw(im)
    for x in range(-h,w,40): d.line([(x,0),(x+h,h)],fill=tuple(c+8 for c in bg),width=10)
    d.text((16,16),f'{name.split("/")[-1]} {w}x{h}',fill=(255,255,255) if dark else (60,60,60))
    im.save(name,quality=80)
for a in sys.argv[1:]:
    n,wh=a.split('=')[0],a.split('=')[1]; w,h=wh.split('x'); ph(n,int(w),int(h), not n.endswith('-l.jpg'))
