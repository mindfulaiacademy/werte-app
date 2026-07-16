'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'de' | 'en'

export interface LocalizedString {
  de: string
  en: string
}

export function tr(s: LocalizedString, lang: Lang): string {
  return s[lang]
}

const LANG_KEY = 'wt_lang'

const UI_STRINGS = {
  home: {
    eyebrow: { de: 'Wertetraining', en: 'Values Training' },
    heading: { de: 'Was willst du heute tun?', en: 'What do you want to do today?' },
    module1Badge: { de: 'Modul 1', en: 'Module 1' },
    module1Title: { de: 'Werte-Fitness Checkin (Selbsteinschätzung)', en: 'Values Fitness Check-in (Self-Assessment)' },
    module1Desc: { de: 'Entdecke, welche Werte am stärksten in dir stecken.', en: 'Discover which values run strongest in you.' },
    module2Badge: { de: 'Modul 2', en: 'Module 2' },
    module2Title: { de: 'Trainingsplan', en: 'Training Plan' },
    module2Desc: { de: 'Trainiere einen Wert 7 Tage lang mit täglichen Micro-Challenges.', en: 'Train one value for 7 days with daily micro-challenges.' },
  },
  survey: {
    startEyebrow: { de: 'Finde es in 4 Minuten heraus', en: 'Find out in 4 minutes' },
    startHeading: { de: 'Was ist dir wichtig?', en: 'What matters to you?' },
    startSub: { de: 'Wirklich wichtig.', en: 'Really matters.' },
    hintStrong: { de: 'Spontan antworten.', en: 'Answer spontaneously.' },
    hintText: { de: 'Dein erster Gedanke ist der passendste.', en: 'Your first instinct is the best fit.' },
    startButton: { de: 'Los geht\'s →', en: 'Let\'s go →' },
    promptText: { de: 'Was ist dir wichtig?', en: 'What matters to you?' },
  },
  surveyCard: {
    labelLeft: { de: 'gar nicht wichtig', en: 'not important at all' },
    labelRight: { de: 'mega wichtig', en: 'super important' },
  },
  peer: {
    eyebrow: { de: 'Fremdeinschätzung', en: 'Peer Assessment' },
    heading: { de: 'Du wurdest gebeten, jemanden einzuschätzen.', en: 'You\'ve been asked to assess someone.' },
    sub: { de: 'Deine Antworten sind anonym.', en: 'Your answers are anonymous.' },
    hintStrong: { de: 'Spontan antworten.', en: 'Answer spontaneously.' },
    hintText: { de: 'Wie erlebst du diese Person wirklich?', en: 'How do you really experience this person?' },
    startButton: { de: 'Los geht\'s →', en: 'Let\'s go →' },
    promptText: { de: 'Wie schätzt du diese Person ein?', en: 'How would you assess this person?' },
    round1: { de: 'Runde 1 geschafft', en: 'Round 1 done' },
    round2: { de: 'Runde 2 geschafft', en: 'Round 2 done' },
    round3: { de: 'Danke!', en: 'Thank you!' },
    nextRound2: { de: 'Runde 2 starten', en: 'Start round 2' },
    nextRound3: { de: 'Runde 3 starten', en: 'Start round 3' },
    questionsAnswered: { de: 'Fragen beantwortet.', en: 'questions answered.' },
    submittedNote: {
      de: 'Deine Einschätzung wurde übermittelt und fließt anonym in das Ergebnis ein.',
      en: 'Your assessment has been submitted and is included anonymously in the result.',
    },
  },
  ergebnis: {
    round: { de: 'Runde', en: 'Round' },
    questionsShort: { de: 'Fragen', en: 'questions' },
    round1Label: { de: 'Erste Selbsteinschätzung', en: 'First self-assessment' },
    round1Sub: { de: 'Basiert auf 20 von 60 Fragen.', en: 'Based on 20 of 60 questions.' },
    round1Next: { de: 'Runde 2 starten', en: 'Start round 2' },
    round2Label: { de: 'Dein Profil wächst', en: 'Your profile is growing' },
    round2Sub: { de: 'Basiert auf 40 von 60 Fragen.', en: 'Based on 40 of 60 questions.' },
    round2Next: { de: 'Runde 3 starten', en: 'Start round 3' },
    round3Label: { de: 'Dein vollständiges Profil', en: 'Your complete profile' },
    round3Sub: { de: 'Alle 60 Fragen beantwortet.', en: 'All 60 questions answered.' },
    heatmapTitle: { de: 'Ergebnis Heatmap', en: 'Result Heatmap' },
    identity: { de: 'Identität', en: 'Identity' },
    community: { de: 'Gemeinschaft', en: 'Community' },
    sociality: { de: 'Gesellschaft', en: 'Society' },
    identityLabel: { de: '🌱 Identität', en: '🌱 Identity' },
    communityLabel: { de: '🤝 Gemeinschaft', en: '🤝 Community' },
    socialityLabel: { de: '🌍 Gesellschaft', en: '🌍 Society' },
    peerCompareLabel: { de: 'Fremdeinschätzung', en: 'Peer assessment' },
    peerCompareLabelAvg: { de: 'Fremdeinschätzung (Ø von', en: 'Peer assessment (avg of' },
    finishTraining: { de: 'Abschließen und Werte-Training starten', en: 'Finish and start values training' },
    getPeerFeedback: { de: 'Fremdeinschätzung bekommen', en: 'Get a peer assessment' },
    linkCopied: { de: 'Link kopiert ✓', en: 'Link copied ✓' },
    restart: { de: 'Von vorne beginnen', en: 'Start over' },
    shareTitle: { de: 'Fremdeinschätzung', en: 'Peer Assessment' },
    shareText: { de: 'Schätze mich in wenigen Minuten anonym ein:', en: 'Assess me anonymously in just a few minutes:' },
  },
  training: {
    back: { de: '← Zurück', en: '← Back' },
    module2: { de: 'Modul 2', en: 'Module 2' },
    valueStepHeading: { de: 'Welchen Wert willst du trainieren?', en: 'Which value do you want to train?' },
    topicStepHeading: { de: 'Wie willst du trainieren?', en: 'How do you want to train?' },
    durationStepHeading: { de: 'Wie lange willst du trainieren?', en: 'How long do you want to train?' },
    selfHeadingFromSurvey: { de: 'Hier stehst du gerade beim Wert', en: 'Here\'s where you stand on the value' },
    selfSubFromSurvey: { de: 'Basierend auf deiner Selbsteinschätzung.', en: 'Based on your self-assessment.' },
    selfHeading: { de: 'Wo stehst du gerade?', en: 'Where do you stand right now?' },
    selfSub: { de: 'Sei ehrlich — kein Richtig oder Falsch.', en: 'Be honest — there\'s no right or wrong.' },
    yourLevel: { de: 'Dein Level', en: 'Your level' },
    next: { de: 'Weiter →', en: 'Next →' },
    targetHeading: { de: 'Wo willst du hin?', en: 'Where do you want to get to?' },
    targetSub: { de: 'Dein Ziel für die nächsten', en: 'Your goal for the next' },
    targetSubDays: { de: 'Tage.', en: 'days.' },
    targetLevel: { de: 'Ziel-Level', en: 'Target level' },
    planHeading: { de: 'Dein Trainingsplan', en: 'Your training plan' },
    planSub: { de: 'Tage · täglich 1 Micro-Challenge', en: 'days · 1 daily micro-challenge' },
    summaryTopic: { de: 'Thema', en: 'Topic' },
    summaryStart: { de: 'Dein Start', en: 'Your start' },
    summaryGoal: { de: 'Dein Ziel', en: 'Your goal' },
    summaryDuration: { de: 'Dauer', en: 'Duration' },
    summaryDurationDays: { de: 'Tage', en: 'days' },
    summaryPointsPossible: { de: 'Punkte möglich', en: 'points possible' },
    summaryPoints: { de: 'Punkte', en: 'points' },
    startTraining: { de: 'Training starten →', en: 'Start training →' },
    scoreMin: { de: 'gar nicht', en: 'not at all' },
    scoreMax: { de: 'richtig stark', en: 'really strong' },
  },
  trainingActive: {
    home: { de: '← Home', en: '← Home' },
    module2: { de: 'Modul 2', en: 'Module 2' },
    day: { de: 'Tag', en: 'Day' },
    demo: { de: 'Demo', en: 'Demo' },
    target: { de: 'Ziel', en: 'Goal' },
    progress: { de: 'Dein Fortschritt', en: 'Your progress' },
    points: { de: 'Punkte', en: 'points' },
    todaysChallenge: { de: 'Deine heutige Challenge', en: 'Today\'s challenge' },
    whyHelps: { de: 'Warum hilft das?', en: 'Why does this help?' },
    didYouDoIt: { de: 'Hast du die Challenge heute erfüllt?', en: 'Did you complete today\'s challenge?' },
    yesGotIt: { de: '✓ Ja, hab ich!', en: '✓ Yes, I did!' },
    notToday: { de: 'Heute nicht', en: 'Not today' },
    pointsEarned: { de: 'Punkte!', en: 'points!' },
    tomorrowContinues: { de: 'Morgen geht\'s weiter.', en: 'Tomorrow continues.' },
    tryAgain: { de: 'Morgen wieder!', en: 'Try again tomorrow!' },
    noProblem: { de: 'Kein Problem — morgen ist ein neuer Tag.', en: 'No problem — tomorrow is a new day.' },
  },
  trainingDone: {
    weekDone: { de: 'Woche abgeschlossen!', en: 'Week complete!' },
    round21Done: { de: '21-Tage-Runde abgeschlossen!', en: '21-day round complete!' },
    trainingDone: { de: 'Training abgeschlossen!', en: 'Training complete!' },
    days: { de: 'Tage', en: 'days' },
    yourPoints: { de: 'Deine Punkte', en: 'Your points' },
    ofPossible: { de: 'von', en: 'of' },
    possiblePoints: { de: 'möglichen', en: 'possible' },
    daysCompleted: { de: 'von', en: 'of' },
    daysMet: { de: 'Tagen erfüllt', en: 'days completed' },
    yourHistory: { de: 'Dein Verlauf', en: 'Your history' },
    yourGoalWas: { de: 'Dein Ziel war', en: 'Your goal was' },
    newRound: { de: 'Neue Runde starten →', en: 'Start a new round →' },
    backHome: { de: 'Zurück zur Startseite', en: 'Back to home' },
  },
} as const

type UiStrings = typeof UI_STRINGS

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: UiStrings
  tr: (s: LocalizedString) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY)
      if (stored === 'de' || stored === 'en') setLangState(stored)
    } catch {
      // ignore
    }
  }, [])

  function setLang(next: Lang) {
    setLangState(next)
    try { localStorage.setItem(LANG_KEY, next) } catch { /* ignore */ }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: UI_STRINGS,
    tr: (s: LocalizedString) => s[lang],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
