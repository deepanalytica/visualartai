import { NeonCard } from "@/components/brand/NeonCard"
import { AudioOverview } from "./AudioOverview"
import { FlashcardDeck } from "./FlashcardDeck"
import { QuizBlock } from "./QuizBlock"
import { SlidesEmbed } from "./SlidesEmbed"
import { MindMapViewer } from "./MindMapViewer"
import type { FlashCard, LessonQuiz } from "@/lib/content"

interface Props {
  content: string
  audioUrl?: string
  slidesUrl?: string
  mindmapUrl?: string
  infographicUrl?: string
  flashcards?: FlashCard[]
  quiz?: LessonQuiz
  checklist?: string[]
  lessonId?: string
}

export function LessonRichContent({
  content,
  audioUrl,
  slidesUrl,
  mindmapUrl,
  infographicUrl,
  flashcards,
  quiz,
  checklist,
  lessonId,
}: Props) {
  const hasRichContent = audioUrl || slidesUrl || mindmapUrl || infographicUrl || flashcards?.length || quiz || checklist?.length

  if (!content && !hasRichContent) return null

  return (
    <div className="space-y-6">
      {/* Audio overview */}
      {audioUrl && <AudioOverview src={audioUrl} />}

      {/* MDX body */}
      {content && (
        <NeonCard glow="none" className="p-8">
          <div className="prose-neon" dangerouslySetInnerHTML={{ __html: content }} />
        </NeonCard>
      )}

      {/* Slides */}
      {slidesUrl && <SlidesEmbed url={slidesUrl} />}

      {/* Mind map */}
      {mindmapUrl && <MindMapViewer src={mindmapUrl} />}

      {/* Infographic */}
      {infographicUrl && (
        <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-overlay)] flex items-center gap-2">
            <span className="text-xs text-[var(--neon-cyan)]">◈</span>
            <span className="text-xs font-medium text-[var(--text-secondary)]">Infografía</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={infographicUrl}
            alt="Infografía de la lección"
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Checklist */}
      {checklist && checklist.length > 0 && (
        <NeonCard glow="none" className="p-6">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <span className="text-[var(--neon-cyan)]">✓</span>
            Lista de verificación
          </h3>
          <ul className="space-y-2">
            {checklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <div className="w-4 h-4 mt-0.5 flex-shrink-0 rounded border border-[var(--border-default)]" />
                {item}
              </li>
            ))}
          </ul>
        </NeonCard>
      )}

      {/* Flashcards */}
      {flashcards && flashcards.length > 0 && (
        <FlashcardDeck cards={flashcards} />
      )}

      {/* Quiz */}
      {quiz && quiz.questions.length > 0 && (
        <QuizBlock quiz={quiz} lessonId={lessonId} />
      )}
    </div>
  )
}
