import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Search, MapPin, MessageCircle, ShieldCheck, Globe2, Sparkles } from "lucide-react"
import { DiagnosticoForm } from "./DiagnosticoForm"

export const metadata: Metadata = {
  title: "Diagnóstico digital gratuito | Visual Art AI",
  description: "Hay personas buscando lo que vendes en Google y ChatGPT. Descubre qué puedes mejorar para que encuentren tu negocio. Diagnóstico inicial gratis.",
  alternates: { canonical: "/diagnostico" },
  openGraph: { title: "Hay personas buscando lo que vendes | Visual Art AI", description: "Revisamos si pueden encontrarte y qué mejorar primero, gratis.", url: "/diagnostico" },
}

const services = [
  { icon: Search, title: "Google y ChatGPT", text: "Revisamos cómo se presenta tu negocio cuando alguien busca lo que ofreces." },
  { icon: MapPin, title: "Google Maps", text: "Comprobamos la información pública que ayuda a encontrarte en tu zona." },
  { icon: MessageCircle, title: "De búsqueda a consulta", text: "Evaluamos si tu propuesta es clara y qué tan fácil es contactarte." },
]

export default function DiagnosticoPage() {
  return <div className="min-h-screen bg-white text-[#0b162b]">
    <header className="relative z-20 border-b border-[#e7edf6] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Visual Art AI — Inicio" className="block">
          <img src="/brand/visual-art-ai-logo.svg" alt="Visual Art AI" className="h-[67px] w-auto sm:h-[76px]" />
        </Link>
        <a href="#solicitar" className="hidden rounded-full border border-[#d7e4fa] px-5 py-3 text-sm font-semibold text-[#2255c9] transition hover:bg-[#eff5ff] sm:inline-flex">Diagnóstico gratis <ArrowRight className="ml-2 h-4 w-4"/></a>
        <a href="#solicitar" className="inline-flex rounded-full bg-[#245bf1] px-4 py-3 text-xs font-semibold text-white sm:hidden">Solicitar diagnóstico</a>
      </div>
    </header>

    <main>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(125deg,#fff_10%,#f5f8ff_47%,#dce9ff_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-10 h-[580px] w-[580px] rounded-full bg-[#b9d5ff]/50 blur-[90px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-[450px] w-[450px] rounded-full bg-[#ffe5e2]/60 blur-[90px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-12 md:pb-24 md:pt-20">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#355e9f] sm:text-sm">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#fa617d] shadow-[0_0_0_6px_rgba(250,97,125,.09)]"/> Google, Maps, ChatGPT y clientes reales
            </div>
            <h1 className="max-w-[860px] text-[clamp(2.7rem,6.4vw,5.7rem)] font-extrabold leading-[1.035] tracking-[-.058em]">
              Hay personas<br className="hidden sm:block"/> buscando lo que vendes <span className="block font-serif font-normal italic tracking-[-.045em] text-[#2867e9]">en Google y ChatGPT.</span>
            </h1>
            <p className="mt-7 text-xl leading-snug text-[#5e6c80] sm:text-2xl">Y mientras tú no apareces,<br/><strong className="font-bold text-[#101c32]">están llamando a tu competencia.</strong></p>
            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-[#53637a] sm:text-xl">Tu próximo cliente busca, compara y escribe a quien encuentra. <strong className="text-[#101c32]">Revisamos si puede encontrarte y qué mejorar primero, gratis.</strong></p>
            <div className="mt-10 flex flex-col items-start gap-5">
              <a href="#solicitar" className="flex w-full max-w-[610px] items-center justify-center gap-3 rounded-full bg-[#245bf1] px-7 py-6 text-center text-lg font-bold text-white shadow-[0_20px_48px_rgba(36,91,241,.22)] transition hover:bg-[#1748cf] sm:text-xl">Pedir diagnóstico gratis <ArrowRight className="h-5 w-5"/></a>
              <p className="w-full max-w-[610px] text-center text-sm text-[#73819a]">Sin costo · Sin compromiso · Revisión personalizada</p>
            </div>
          </div>

          <div className="mt-16 max-w-[900px] rounded-[30px] border border-white/80 bg-white/65 p-5 shadow-[0_22px_80px_rgba(54,100,178,.12)] backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[.15em] text-[#6d7d96]"><span>La nueva búsqueda</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#2867e9]"/> Ejemplo ilustrativo</span></div>
            <div className="flex items-center gap-3 rounded-full border border-[#dbe5f6] bg-white px-5 py-4 shadow-sm">
              <span className="text-2xl font-extrabold text-[#4285f4]">G</span>
              <span className="min-w-0 flex-1 truncate text-sm text-[#56647c] sm:text-lg">psicóloga trauma online en Maule</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2867f5] text-white"><ArrowRight className="h-5 w-5"/></span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/85 p-4 text-center"><Search className="mx-auto h-6 w-6 text-[#2867e9]"/><span className="mt-2 block text-xs font-semibold">Google</span></div>
              <div className="rounded-2xl bg-white/85 p-4 text-center"><MapPin className="mx-auto h-6 w-6 text-[#f56f66]"/><span className="mt-2 block text-xs font-semibold">Maps</span></div>
              <div className="rounded-2xl bg-white/85 p-4 text-center"><Sparkles className="mx-auto h-6 w-6 text-[#2867e9]"/><span className="mt-2 block text-xs font-semibold">Asistentes IA</span></div>
            </div>
            <p className="mt-5 text-xs text-[#73819a]">Las personas buscan de distintas formas. Tu negocio necesita ofrecer señales claras y confiables en cada canal.</p>
          </div>
        </div>
      </section>

      <section id="solicitar" className="scroll-mt-5 bg-[#f7f9fe] px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div className="lg:pt-9">
            <span className="text-xs font-bold uppercase tracking-[.18em] text-[#2867e9]">Diagnóstico digital 360°</span>
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-[-.045em] sm:text-5xl">Descubre dónde estás perdiendo oportunidades.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#62718a]">No necesitas entender SEO ni herramientas de IA. Cuéntanos dónde encontrar tu negocio y revisaremos sus principales puntos de mejora.</p>
            <div className="mt-10 space-y-7">
              {services.map(({icon: Icon,title,text})=><div key={title} className="flex gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#dce7fa] bg-white"><Icon className="h-5 w-5 text-[#2867e9]"/></div><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#65758b]">{text}</p></div></div>)}
            </div>
          </div>
          <div className="rounded-[30px] border border-[#dce5f3] bg-white p-6 shadow-[0_26px_90px_rgba(27,61,111,.09)] sm:p-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eff5ff] px-3 py-2 text-xs font-bold text-[#245bf1]"><CheckCircle2 className="h-4 w-4"/> Gratis y sin compromiso</div>
            <h2 className="text-3xl font-extrabold tracking-[-.04em]">Pide tu diagnóstico.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#65758b]">Completa tus datos y te contactaremos para coordinar la revisión inicial.</p>
            <DiagnosticoForm />
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-16"><div className="mx-auto max-w-6xl"><h2 className="text-2xl font-bold tracking-tight">Primero claridad. Después decisiones.</h2><p className="mt-3 max-w-3xl leading-relaxed text-[#61718a]">Revisamos señales públicas verificables y priorizamos oportunidades. No prometemos posiciones en buscadores ni resultados comerciales garantizados.</p><p className="mt-7 flex items-center gap-2 text-xs text-[#6d7b91]"><ShieldCheck className="h-4 w-4"/> Tus datos se usan para responder a tu solicitud de diagnóstico.</p></div></section>
    </main>
    <footer className="bg-[#0c172c] px-6 py-8 text-center text-sm text-[#b8c7dd]">© Visual Art AI · <Link className="underline" href="/">Volver al sitio</Link></footer>
  </div>
}
