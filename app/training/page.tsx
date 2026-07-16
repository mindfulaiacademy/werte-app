'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { TRAINING_VALUES, TRAINING_DURATION_OPTIONS, DEFAULT_TRAINING_DURATION, POINTS_PER_DAY, getLevelForScore } from '@/data/training'
import { getTrainingState, startTraining } from '@/lib/training'
import { syncToSupabase } from '@/lib/sync'
import { getAnswers, computeScores } from '@/lib/survey'
import { useLanguage } from '@/lib/i18n'

type Step = 'value' | 'topic' | 'duration' | 'self' | 'target' | 'confirm'

const DIMENSION_COLORS: Record<string, string> = {
  IDENTITY: '#FFD21F',
  COMMUNITY: '#ef4444',
  SOCIALITY: '#14b8a6',
}

export default function TrainingSetupPage() {
  const router = useRouter()
  const { lang, tr, t } = useLanguage()
  const DIMENSION_LABELS: Record<string, string> = {
    IDENTITY: t.ergebnis.identity[lang],
    COMMUNITY: t.ergebnis.community[lang],
    SOCIALITY: t.ergebnis.sociality[lang],
  }
  const [step, setStep] = useState<Step>('value')
  const [selectedValueKey, setSelectedValueKey] = useState<string | null>(null)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [selfScore, setSelfScore] = useState(5)
  const [selfScoreFromSurvey, setSelfScoreFromSurvey] = useState(false)
  const [targetScore, setTargetScore] = useState(7)
  const [durationDays, setDurationDays] = useState(DEFAULT_TRAINING_DURATION)

  useEffect(() => {
    const state = getTrainingState()
    if (state) {
      router.replace('/training/aktiv')
    }
  }, [router])

  useEffect(() => {
    if (!selectedValueKey) return
    const scores = computeScores(getAnswers(), lang)
    const result = scores.find((s) => s.valueKey === selectedValueKey)
    if (result && result.answeredCount > 0) {
      const surveyScore = Math.min(10, Math.round(result.score * 2))
      setSelfScore(surveyScore)
      setSelfScoreFromSurvey(true)
      setTargetScore((prev) => Math.max(prev, surveyScore))
    } else {
      setSelfScoreFromSurvey(false)
    }
  }, [selectedValueKey, lang])

  const selectedValue = TRAINING_VALUES.find((v) => v.key === selectedValueKey)
  const selectedTopic = selectedValue?.topics.find((t) => t.id === selectedTopicId)
  const dimensions = ['IDENTITY', 'COMMUNITY', 'SOCIALITY'] as const
  const selfLevel = selectedTopic?.levels[getLevelForScore(selfScore)]
  const targetLevel = selectedTopic?.levels[getLevelForScore(targetScore)]

  function handleStart() {
    if (!selectedTopicId) return
    startTraining(selectedTopicId, selfScore, targetScore, durationDays)
    syncToSupabase()
    router.push('/training/aktiv')
  }

  return (
    <div className="flex flex-col min-h-screen px-5 pt-12 pb-10" style={{ background: 'var(--bg)' }}>
      {/* Back */}
      <button
        onClick={() =>
          step === 'value'
            ? router.push('/')
            : setStep(
                step === 'topic'
                  ? 'value'
                  : step === 'duration'
                  ? 'topic'
                  : step === 'self'
                  ? 'duration'
                  : step === 'target'
                  ? 'self'
                  : 'target'
              )
        }
        className="text-sm font-semibold mb-8 text-left"
        style={{ color: 'var(--text-muted)' }}
      >
        {t.training.back[lang]}
      </button>

      {/* Step: Value selection */}
      {step === 'value' && (
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              {t.training.module2[lang]}
            </p>
            <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
              {t.training.valueStepHeading[lang]}
            </h1>
          </div>
          {dimensions.map((dim) => (
            <div key={dim} className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: DIMENSION_COLORS[dim] }}>
                {DIMENSION_LABELS[dim]}
              </p>
              {TRAINING_VALUES.filter((v) => v.dimension === dim).map((value) => (
                <button
                  key={value.key}
                  onClick={() => {
                    setSelectedValueKey(value.key)
                    setStep('topic')
                  }}
                  className="w-full text-left rounded-xl p-4 transition-all active:scale-95 flex items-center gap-3"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <span className="text-2xl">{value.emoji}</span>
                  <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{tr(value.name)}</p>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Step: Topic selection */}
      {step === 'topic' && selectedValue && (
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              {selectedValue.emoji} {tr(selectedValue.name)}
            </p>
            <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
              {t.training.topicStepHeading[lang]}
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            {selectedValue.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id)
                  setStep('duration')
                }}
                className="w-full text-left rounded-xl p-4 transition-all active:scale-95 flex items-start gap-3"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <span className="text-2xl">{topic.emoji}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{tr(topic.title)}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{tr(topic.subtitle)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Duration selection */}
      {step === 'duration' && selectedTopic && (
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              {selectedTopic.emoji} {tr(selectedTopic.title)}
            </p>
            <h1 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
              {t.training.durationStepHeading[lang]}
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            {TRAINING_DURATION_OPTIONS.map((option) => (
              <button
                key={option.days}
                onClick={() => {
                  setDurationDays(option.days)
                  setStep('self')
                }}
                className="w-full text-left rounded-xl p-4 transition-all active:scale-95"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <p className="font-black text-lg mb-1" style={{ color: 'var(--text)' }}>{tr(option.label)}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{tr(option.neuroFakt)}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: Self-assessment */}
      {step === 'self' && selectedTopic && selectedValue && (
        <div className="flex flex-col gap-6 flex-1">
          {selfScoreFromSurvey ? (
            <>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                  {selectedTopic.emoji} {tr(selectedTopic.title)}
                </p>
                <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>
                  {t.training.selfHeadingFromSurvey[lang]} „{tr(selectedValue.name)}“
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {t.training.selfSubFromSurvey[lang]}
                </p>
              </div>

              {selfLevel && (
                <div
                  className="rounded-xl p-4"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                    {t.training.yourLevel[lang]}
                  </p>
                  <p className="font-black text-lg" style={{ color: 'var(--text)' }}>
                    {selfLevel.emoji} {tr(selfLevel.label)} ({selfScore}/10)
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                  {selectedTopic.emoji} {tr(selectedTopic.title)}
                </p>
                <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>
                  {t.training.selfHeading[lang]}
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {t.training.selfSub[lang]}
                </p>
              </div>

              <ScoreSelector value={selfScore} onChange={setSelfScore} labels={[t.training.scoreMin[lang], t.training.scoreMax[lang]]} />

              {selfLevel && (
                <div
                  className="rounded-xl p-4"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                    {t.training.yourLevel[lang]}
                  </p>
                  <p className="font-black text-lg" style={{ color: 'var(--text)' }}>
                    {selfLevel.emoji} {tr(selfLevel.label)}
                  </p>
                </div>
              )}
            </>
          )}

          <div className="mt-auto">
            <button
              onClick={() => setStep('target')}
              className="w-full py-4 font-black text-lg rounded-xl transition-all active:scale-95"
              style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderRadius: 'var(--btn-radius)' }}
            >
              {t.training.next[lang]}
            </button>
          </div>
        </div>
      )}

      {/* Step: Target */}
      {step === 'target' && selectedTopic && (
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              {selectedTopic.emoji} {tr(selectedTopic.title)}
            </p>
            <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>
              {t.training.targetHeading[lang]}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t.training.targetSub[lang]} {durationDays} {t.training.targetSubDays[lang]}
            </p>
          </div>

          <ScoreSelector value={targetScore} onChange={setTargetScore} min={selfScore} labels={[t.training.scoreMin[lang], t.training.scoreMax[lang]]} />

          {targetLevel && (
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                {t.training.targetLevel[lang]}
              </p>
              <p className="font-black text-lg" style={{ color: 'var(--text)' }}>
                {targetLevel.emoji} {tr(targetLevel.label)}
              </p>
            </div>
          )}

          <div className="mt-auto">
            <button
              onClick={() => setStep('confirm')}
              className="w-full py-4 font-black text-lg rounded-xl transition-all active:scale-95"
              style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderRadius: 'var(--btn-radius)' }}
            >
              {t.training.next[lang]}
            </button>
          </div>
        </div>
      )}

      {/* Step: Confirm */}
      {step === 'confirm' && selectedTopic && selfLevel && targetLevel && (
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <h1 className="text-2xl font-black mb-1" style={{ color: 'var(--text)' }}>
              {t.training.planHeading[lang]}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {durationDays} {t.training.planSub[lang]}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <SummaryRow label={t.training.summaryTopic[lang]} value={`${selectedTopic.emoji} ${tr(selectedTopic.title)}`} />
            <SummaryRow label={t.training.summaryStart[lang]} value={`${selfLevel.emoji} ${tr(selfLevel.label)} (${selfScore}/10)`} />
            <SummaryRow label={t.training.summaryGoal[lang]} value={`${targetLevel.emoji} ${tr(targetLevel.label)} (${targetScore}/10)`} />
            <SummaryRow label={t.training.summaryDuration[lang]} value={`${durationDays} ${t.training.summaryDurationDays[lang]}`} />
            <SummaryRow label={t.training.summaryPointsPossible[lang]} value={`${durationDays * POINTS_PER_DAY} ${t.training.summaryPoints[lang]}`} />
          </div>

          <div className="mt-auto">
            <button
              onClick={handleStart}
              className="w-full py-4 font-black text-lg rounded-xl transition-all active:scale-95"
              style={{ background: 'var(--accent)', color: 'var(--accent-text)', borderRadius: 'var(--btn-radius)' }}
            >
              {t.training.startTraining[lang]}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ScoreSelector({ value, onChange, min = 0, labels = ['0', '10'] }: { value: number; onChange: (v: number) => void; min?: number; labels?: [string, string] | string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
        <span>0</span>
        <span className="text-2xl font-black" style={{ color: 'var(--text)' }}>{value}</span>
        <span>10</span>
      </div>
      <input
        type="range"
        min={min}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: 'var(--accent)' }}
      />
      <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
        <span>{labels[0]}</span>
        <span>{labels[1]}</span>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between items-center rounded-xl px-4 py-3"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{value}</span>
    </div>
  )
}
