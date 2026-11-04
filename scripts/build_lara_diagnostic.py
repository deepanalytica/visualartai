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
pdfmetrics.registerFont(TTFont('ReportSans', str(FONT / 'arial.ttf')))
pdfmetrics.registerFont(TTFont('ReportBold', str(FONT / 'arialbd.ttf')))
pdfmetrics.registerFont(TTFont('ReportSerif', str(FONT / 'georgia.ttf')))
pdfmetrics.registerFontFamily('ReportSans', normal='ReportSans', bold='ReportBold', italic='ReportSans', boldItalic='ReportBold')
NAVY=colors.HexColor('#0b1931'); BLUE=colors.HexColor('#245cff')
INK=colors.HexColor('#14243a'); MUTED=colors.HexColor('#52647a'); CORAL=colors.HexColor('#f57870')
PALE=colors.HexColor('#eef4ff'); LINE=colors.HexColor('#dce5f1')
W,H=A4
styles={
 'label':ParagraphStyle('label',fontName='ReportBold',fontSize=8,leading=11,textColor=BLUE,spaceBefore=13,spaceAfter=7,keepWithNext=True),
 'h2':ParagraphStyle('heading',fontName='ReportSans',fontSize=21,leading=25,textColor=NAVY,spaceAfter=12,keepWithNext=True),
 'h3':ParagraphStyle('subheading',fontName='ReportBold',fontSize=11,leading=15,textColor=INK,spaceBefore=9,spaceAfter=5,keepWithNext=True),
 'body':ParagraphStyle('body',fontName='ReportSans',fontSize=9.4,leading=14.2,textColor=INK,spaceAfter=8,allowWidows=0,allowOrphans=0),
 'small':ParagraphStyle('small',fontName='ReportSans',fontSize=8,leading=12,textColor=MUTED,spaceAfter=8),
 'bullet':ParagraphStyle('bullet',fontName='ReportSans',fontSize=9.2,leading=14,textColor=INK,leftIndent=13,firstLineIndent=-9,spaceAfter=5),
 'cell':ParagraphStyle('cell',fontName='ReportSans',fontSize=8.2,leading=11.8,textColor=INK),
 'cellhead':ParagraphStyle('cellhead',fontName='ReportBold',fontSize=8,leading=11,textColor=colors.white),
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
    ratios={2:[.3,.7],3:[.23,.22,.55],4:[.4,.2,.2,.2]}.get(count,[1/count]*count)
    t=Table(data,colWidths=[(W-94)*v for v in ratios],repeatRows=1,hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),NAVY),('BACKGROUND',(0,1),(-1,-1),colors.HexColor('#f5f8fc')),('VALIGN',(0,0),(-1,-1),'TOP'),('LINEBELOW',(0,0),(-1,-1),.4,LINE),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
    return [t,Spacer(1,11)]

def cover(c, doc):
    c.setFillColor(NAVY); c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(CORAL); c.roundRect(48,H-84,6,6,3,fill=1,stroke=0)
    c.setFont('ReportBold',10); c.setFillColor(colors.white); c.drawString(63,H-82,'VISUAL ART AI  /  INFORME PRELIMINAR')
    c.setFont('ReportSans',9); c.setFillColor(colors.HexColor('#aebfd8')); c.drawString(48,H-137,'DIAGNÓSTICO DE PRESENCIA DIGITAL  ·  TALCA')
    c.setFillColor(colors.white); c.setFont('ReportSerif',34)
    c.drawString(48,H-196,'Una presencia que')
    c.drawString(48,H-239,'puedan encontrar,')
    c.setFillColor(colors.HexColor('#a8beff')); c.drawString(48,H-282,'reconocer y contactar.')
    c.setFillColor(colors.HexColor('#d0dced')); c.setFont('ReportSans',11)
    c.drawString(48,H-323,'Diagnóstico exploratorio y recomendaciones para')
    c.setFont('ReportBold',11); c.drawString(48,H-342,'Lara & Valdivia Abogados')
    c.setFillColor(colors.HexColor('#172c4c')); c.roundRect(48,100,W-96,300,12,fill=1,stroke=0)
    c.drawImage(str(SITE/'web-desktop.png'),67,132,width=W-134,height=239,mask='auto',preserveAspectRatio=True,anchor='c')
    c.setFillColor(colors.HexColor('#b6c7dc')); c.setFont('ReportSans',8)
    c.drawString(67,112,'VISTA CONCEPTUAL  /  DISEÑO PREPARADO PARA EL ESTUDIO')
    c.setFillColor(colors.HexColor('#9cb0c9')); c.setFont('ReportSans',8)
    c.drawString(48,55,'Fuentes consultadas: 3 de noviembre de 2026')
    c.drawRightString(W-48,55,'DOCUMENTO DE CORTESÍA  /  VERSIÓN PRELIMINAR')

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
        if child.name=='p': story.append(text(child,'label' if 'section-label' in child.get('class',[]) else 'small' if set(child.get('class',[])) & {'small','citations'} else 'body'))
        elif child.name in ('h2','h3'): story.append(text(child,child.name))
        elif child.name in ('ul','ol'):
            story.extend(Paragraph('•  '+rich(li),styles['bullet']) for li in child.find_all('li',recursive=False)); story.append(Spacer(1,5))
        elif child.name=='div' and 'table-wrap' in child.get('class',[]): story.extend(table_from(child))
        elif child.name=='div' and 'insight-band' in child.get('class',[]):
            box=Table([[Paragraph(rich(child).replace('</b>','</b>  '),styles['cell'])]],colWidths=[W-94]);box.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PALE),('LINEBEFORE',(0,0),(0,0),3,BLUE),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10)]));story += [box,Spacer(1,10)]
    if section.get('id')=='marca':
        img=Image(str(SITE/'imagenes/documentos.webp'),width=300,height=200,kind='proportional');img.hAlign='LEFT'
        story += [KeepTogether([Paragraph('APLICACIÓN VISUAL / MUESTRA CONCEPTUAL',styles['label']),img,Spacer(1,5),Paragraph('Diseños digitales propuestos; impresión y fabricación no incluidas.',styles['small'])])]
    story.append(Spacer(1,6))
doc=SimpleDocTemplate(str(OUTPUT),pagesize=A4,leftMargin=47,rightMargin=47,topMargin=57,bottomMargin=52,title='Diagnóstico exploratorio | Lara & Valdivia',author='Visual Art AI',pageCompression=1)
doc.build(story,onFirstPage=cover,onLaterPages=running)
print('Creado:',OUTPUT)
