import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, Search, MapPin, MessageCircle, ShieldCheck } from "lucide-react"
import { DiagnosticoForm } from "./DiagnosticoForm"

export const metadata: Metadata = {
  title: "Diagnóstico digital gratuito | Visual Art AI",
  description: "Descubre qué dificulta que tus clientes te encuentren en Google, Maps y buscadores con IA. Solicita una revisión inicial sin costo ni compromiso.",
  alternates: { canonical: "/diagnostico" },
  openGraph: { title: "¿Te buscan y encuentran a tu competencia? | Visual Art AI", description: "Solicita tu diagnóstico digital gratuito.", url: "/diagnostico" },
}

const checks = [
  { icon: Search, title: "Google y buscadores con IA", text: "Revisamos cómo se presenta tu negocio y qué señales de visibilidad pueden mejorarse." },
  { icon: MapPin, title: "Presencia local", text: "Analizamos tu información pública y la facilidad para encontrarte en Maps, cuando corresponda." },
  { icon: MessageCircle, title: "Contacto y conversión", text: "Evaluamos si un posible cliente entiende tu oferta y puede comunicarse fácilmente." },
]

export default function DiagnosticoPage() {
  return <main className="min-h-screen bg-[#f7f9fd] text-[#101d36]">
    <header className="border-b border-[#dce4f0] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="/" className="text-xl font-bold tracking-tight">Visual <span className="text-[#2866ec]">Art AI</span></a>
        <span className="text-xs font-semibold uppercase tracking-[.16em] text-[#62738c]">Diagnóstico 360°</span>
      </div>
    </header>
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full bg-[#dce8ff] blur-[90px]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-14 md:grid-cols-[1.05fr_.95fr] md:items-start md:pt-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c9d9fb] bg-white px-4 py-2 text-xs font-semibold text-[#2259c8]"><span className="h-2 w-2 rounded-full bg-[#fa775f]" /> Para negocios y profesionales en Chile</div>
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-.045em] sm:text-5xl lg:text-[62px]">¿Buscan lo que vendes y <span className="text-[#2866ec]">encuentran a tu competencia?</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#50617a]">Puede que haya personas buscando servicios como el tuyo y no sepan que existes. Revisemos qué está pasando con tu presencia digital y por dónde empezar a mejorarla.</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#344761]">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2866ec]"/> Gratis</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2866ec]"/> Sin compromiso</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#2866ec]"/> Revisión personalizada</span>
          </div>
          <div className="mt-12 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[.14em] text-[#6b7b93]">Qué revisaremos</h2>
            {checks.map(({icon: Icon,title,text}) => <div key={title} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6e3f8] bg-white"><Icon className="h-5 w-5 text-[#2866ec]"/></div>
              <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#61728a]">{text}</p></div>
            </div>)}
          </div>
        </div>
        <div id="solicitar" className="rounded-[28px] border border-[#dbe4f1] bg-white p-6 shadow-[0_28px_85px_rgba(18,45,90,.11)] sm:p-9">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#2866ec]">Primer paso</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Descubre qué puedes mejorar.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#61728a]">Cuéntanos cómo encontrar tu negocio. Te contactaremos para coordinar la revisión inicial.</p>
          <DiagnosticoForm />
        </div>
      </div>
    </section>
    <section className="border-t border-[#e0e7f2] bg-white px-5 py-14">
      <div className="mx-auto max-w-6xl"><h2 className="text-2xl font-bold tracking-tight">Sin informes genéricos ni promesas vacías.</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-[#61728a]">Una revisión inicial basada en lo que podamos verificar públicamente. Si detectamos oportunidades de mejora, te explicaremos cuáles son y qué podrías hacer después. No garantizamos posiciones ni ventas.</p>
      <p className="mt-8 flex items-center gap-2 text-xs text-[#61728a]"><ShieldCheck className="h-4 w-4"/> Tus datos se utilizarán para responder a tu solicitud. No se publicarán.</p></div>
    </section>
    <footer className="bg-[#0e1930] px-5 py-7 text-center text-xs text-[#b7c6de]">© Visual Art AI · <a className="underline" href="/">Volver al sitio</a></footer>
  </main>
}
