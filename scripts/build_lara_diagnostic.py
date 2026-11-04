"""Build the downloadable diagnostic from the reviewed HTML report.

Requires beautifulsoup4 and reportlab. Run from the repository root.
"""
from pathlib import Path
from html import escape
from bs4 import BeautifulSoup, NavigableString
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, PageBreak,
                                Table, TableStyle, KeepTogether, Image)

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site/propuestas/lara-valdivia'
OUTPUT = SITE / 'informe-visual-art-ai.pdf'
FONT = Path('C:/Windows/Fonts')
pdfmetrics.registerFont(TTFont('ReportSans', str(FONT / 'segoeui.ttf')))
pdfmetrics.registerFont(TTFont('ReportBold', str(FONT / 'segoeuib.ttf')))
pdfmetrics.registerFont(TTFont('ReportSerif', str(FONT / 'georgia.ttf')))
pdfmetrics.registerFontFamily('ReportSans', normal='ReportSans', bold='ReportBold', italic='ReportSans', boldItalic='ReportBold')
NAVY=colors.HexColor('#0b1931'); BLUE=colors.HexColor('#245cff')
INK=colors.HexColor('#14243a'); MUTED=colors.HexColor('#52647a'); CORAL=colors.HexColor('#f57870')
PALE=colors.HexColor('#eef4ff'); LINE=colors.HexColor('#dce5f1')
W,H=A4
styles={
 'label':ParagraphStyle('label',fontName='ReportBold',fontSize=8.5,leading=12,textColor=BLUE,spaceBefore=20,spaceAfter=8,keepWithNext=True),
 'h2':ParagraphStyle('heading',fontName='ReportBold',fontSize=22,leading=27,textColor=NAVY,spaceAfter=16,keepWithNext=True),
 'h3':ParagraphStyle('subheading',fontName='ReportBold',fontSize=13,leading=17,textColor=INK,spaceBefore=14,spaceAfter=8,keepWithNext=True),
 'body':ParagraphStyle('body',fontName='ReportSans',fontSize=10.5,leading=16,textColor=INK,spaceAfter=10,allowWidows=0,allowOrphans=0),
 'lead':ParagraphStyle('lead',fontName='ReportSans',fontSize=10.5,leading=16,textColor=INK,spaceAfter=10,keepWithNext=True),
 'small':ParagraphStyle('small',fontName='ReportSans',fontSize=9,leading=13,textColor=MUTED,spaceAfter=10),
 'bullet':ParagraphStyle('bullet',fontName='ReportSans',fontSize=10.3,leading=15.5,textColor=INK,leftIndent=15,firstLineIndent=-10,spaceAfter=7),
 'cell':ParagraphStyle('cell',fontName='ReportSans',fontSize=9.4,leading=13.5,textColor=INK),
 'cellhead':ParagraphStyle('cellhead',fontName='ReportBold',fontSize=9,leading=13,textColor=INK),
}

def rich(node):
    if isinstance(node, NavigableString): return escape(str(node))
    text=''.join(rich(c) for c in node.children)
    if node.name in ('b','strong'): return '<b>'+text+'</b>'
    if node.name == 'a' and node.get('href','').startswith('http'):
        return '<link href="'+escape(node['href'],quote=True)+'" color="#245cff">'+text+'</link>'
    if node.name == 'br': return '<br/>'
    return text

def text(node, style='body'):
    return Paragraph(rich(node).strip(), styles[style])

def table_from(node):
    table=node if node.name=='table' else node.find('table')
    rows=table.find_all('tr') if table else []
    if not rows: return []
    count=max(len(row.find_all(['th','td'],recursive=False)) for row in rows)
    data=[]
    for index,row in enumerate(rows):
        cells=row.find_all(['th','td'],recursive=False)
        data.append([Paragraph(rich(c),styles['cellhead' if index==0 else 'cell']) for c in cells]+['']*(count-len(cells)))
    headings=' '.join(c.get_text(' ',strip=True) for c in rows[0].find_all(['th','td']))
    ratios=([.24,.19,.57] if 'Pago único' in headings else [.25,.46,.29]) if count==3 else {2:[.32,.68],4:[.4,.2,.2,.2]}.get(count,[1/count]*count)
    t=Table(data,colWidths=[(W-94)*v for v in ratios],repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#edf3fb')),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.5,LINE),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10)]))
    return [KeepTogether([t,Spacer(1,16)])] if len(rows) <= 5 else [t,Spacer(1,16)]

def cover(c, doc):
    c.setFillColor(colors.white); c.rect(0,0,W,H,fill=1,stroke=0)
    # Crop the supplied official logo with a clipping path; the source image is unchanged.
    scale=118/1150; x=48; y=H-98
    c.saveState(); clip=c.beginPath();clip.rect(x,y,118,65);c.clipPath(clip,stroke=0,fill=0)
    c.drawImage(str(SITE/'visual-logo-claro.png'),x-190*scale,y-174*scale,width=1536*scale,height=1024*scale,mask='auto');c.restoreState()
    c.setFont('ReportBold',9); c.setFillColor(BLUE); c.drawString(48,H-143,'INFORME DE DIAGNÓSTICO  /  NOVIEMBRE 2026')
    c.setFillColor(NAVY); c.setFont('ReportBold',32)
    c.drawString(48,H-198,'Cómo encuentran')
    c.drawString(48,H-239,'hoy a su estudio.')
    c.setFillColor(MUTED); c.setFont('ReportSans',12)
    c.drawString(48,H-275,'Una revisión de presencia digital y una ruta de mejora')
    c.setFont('ReportBold',12); c.setFillColor(INK); c.drawString(48,H-296,'para Lara & Valdivia Abogados.')
    c.setStrokeColor(LINE); c.line(48,H-320,W-48,H-320)
    c.setFont('ReportSans',9); c.setFillColor(MUTED)
    c.drawString(48,H-343,'Talca, Chile  ·  Versión preliminar')
    c.drawRightString(W-48,H-343,'Documento de cortesía')
    c.setFillColor(colors.HexColor('#eaf0f8')); c.roundRect(48,113,W-96,254,12,fill=1,stroke=0)
    c.drawImage(str(SITE/'web-desktop.png'),64,138,width=W-128,height=215,mask='auto',preserveAspectRatio=True,anchor='c')
    c.setFillColor(MUTED); c.setFont('ReportSans',8.5)
    c.drawString(64,122,'Vista conceptual de la web preparada para el estudio')
    c.setFillColor(MUTED); c.setFont('ReportSans',8.5)
    c.drawString(48,62,'Fuentes consultadas el 3 de noviembre de 2026')
    c.drawRightString(W-48,62,'VISUAL ART AI  /  DIAGNÓSTICO')

def running(c,doc):
    c.setStrokeColor(LINE); c.line(47,H-43,W-47,H-43)
    c.setFont('ReportBold',8); c.setFillColor(BLUE); c.drawString(47,H-32,'VISUAL ART AI')
    c.setFont('ReportSans',8); c.setFillColor(MUTED); c.drawRightString(W-47,H-32,'LARA & VALDIVIA  /  DIAGNÓSTICO EXPLORATORIO')
    c.line(47,39,W-47,39); c.setFont('ReportSans',8); c.drawString(47,26,'3 de noviembre de 2026  ·  Información sujeta a validación')
    c.drawRightString(W-47,26,str(doc.page))

def flow_band():
    items=[('01','ENCONTRAR'),('02','COMPRENDER'),('03','CONTACTAR'),('04','MEDIR')]
    row=[Paragraph('<font color="#245cff">'+n+'</font><br/><b>'+label+'</b>', styles['cell']) for n,label in items]
    t=Table([row],colWidths=[(W-94)/4]*4)
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('BOX',(0,0),(-1,-1),.5,LINE),('INNERGRID',(0,0),(-1,-1),.5,LINE),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),12),('LEFTPADDING',(0,0),(-1,-1),10)]))
    return t

soup=BeautifulSoup((SITE/'informe.html').read_text(encoding='utf-8'),'html.parser')
story=[Spacer(1,1),PageBreak(),Paragraph('EL RECORRIDO PROPUESTO',styles['label']),Paragraph('De una búsqueda a una conversación',styles['h2']),Paragraph('Una presencia coherente puede ayudar a una persona a identificar al estudio, entender sus servicios y encontrar un canal para consultar. El recorrido es una propuesta, no una medición de resultados.',styles['body']),flow_band(),Spacer(1,14)]
for section in soup.select('.report-content > section[id]'):
    for child in section.children:
        if not getattr(child,'name',None): continue
        if child.name=='p':
            following=child.find_next_sibling()
            is_table_lead=following and following.name=='div' and 'table-wrap' in following.get('class',[])
            story.append(text(child,'label' if 'section-label' in child.get('class',[]) else 'small' if set(child.get('class',[])) & {'small','citations'} else 'lead' if is_table_lead else 'body'))
        elif child.name in ('h2','h3'): story.append(text(child,child.name))
        elif child.name in ('ul','ol'):
            story.extend(Paragraph((f'{i}.  ' if child.name=='ol' else '•  ')+rich(li),styles['bullet']) for i,li in enumerate(child.find_all('li',recursive=False),1)); story.append(Spacer(1,5))
        elif child.name=='div' and 'table-wrap' in child.get('class',[]): story.extend(table_from(child))
        elif child.name=='div' and 'insight-band' in child.get('class',[]):
            box=Table([[Paragraph(rich(child).replace('</b>','</b><br/>'),styles['cell'])]],colWidths=[W-94]);box.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('LEFTPADDING',(0,0),(-1,-1),16),('RIGHTPADDING',(0,0),(-1,-1),16),('TOPPADDING',(0,0),(-1,-1),12),('BOTTOMPADDING',(0,0),(-1,-1),12)]));story += [box,Spacer(1,12)]
    if section.get('id')=='marca':
        img=Image(str(SITE/'imagenes/documentos.webp'),width=390,height=260,kind='proportional');img.hAlign='LEFT'
        story += [KeepTogether([Paragraph('APLICACIÓN VISUAL / MUESTRA CONCEPTUAL',styles['label']),img,Spacer(1,5),Paragraph('Diseños digitales propuestos; impresión y fabricación no incluidas.',styles['small'])])]
    story.append(Spacer(1,6))
doc=SimpleDocTemplate(str(OUTPUT),pagesize=A4,leftMargin=47,rightMargin=47,topMargin=57,bottomMargin=52,title='Diagnóstico exploratorio | Lara & Valdivia',author='Visual Art AI',pageCompression=1)
doc.build(story,onFirstPage=cover,onLaterPages=running)
print('Creado:',OUTPUT)
