import type { LocalizedString } from '@/lib/i18n'

export type Dimension = 'IDENTITY' | 'COMMUNITY' | 'SOCIALITY'

export interface Value {
  key: string
  name: LocalizedString
  dimension: Dimension
}

export interface Question {
  id: string
  valueKey: string
  dimension: Dimension
  emoji: string
  text: LocalizedString
}

export const VALUES: Value[] = [
  // IDENTITY
  { key: 'offenheit_kreativitaet', name: { de: 'Offenheit & Kreativität', en: 'Openness & Creativity' }, dimension: 'IDENTITY' },
  { key: 'respekt_disziplin', name: { de: 'Respekt & Disziplin', en: 'Respect & Discipline' }, dimension: 'IDENTITY' },
  { key: 'toleranz_geduld', name: { de: 'Toleranz & Geduld', en: 'Tolerance & Patience' }, dimension: 'IDENTITY' },
  { key: 'begeisterung_fleiss', name: { de: 'Begeisterung & Fleiß', en: 'Enthusiasm & Diligence' }, dimension: 'IDENTITY' },
  { key: 'fokus_aufmerksamkeit', name: { de: 'Fokus & Aufmerksamkeit', en: 'Focus & Attention' }, dimension: 'IDENTITY' },
  { key: 'verstehen_erkenntnis', name: { de: 'Verstehen & Erkenntnis', en: 'Understanding & Insight' }, dimension: 'IDENTITY' },
  // COMMUNITY
  { key: 'wertschaetzung_dankbarkeit', name: { de: 'Wertschätzung & Dankbarkeit', en: 'Appreciation & Gratitude' }, dimension: 'COMMUNITY' },
  { key: 'anteilnahme_solidaritaet', name: { de: 'Anteilnahme & Solidarität', en: 'Compassion & Solidarity' }, dimension: 'COMMUNITY' },
  { key: 'freundschaft_hilfsbereitschaft', name: { de: 'Freundschaft & Hilfsbereitschaft', en: 'Friendship & Helpfulness' }, dimension: 'COMMUNITY' },
  { key: 'fuersorge_unterstuetzung', name: { de: 'Fürsorge & Unterstützung', en: 'Care & Support' }, dimension: 'COMMUNITY' },
  // SOCIALITY
  { key: 'vertrauen_verantwortung', name: { de: 'Vertrauen & Verantwortung', en: 'Trust & Responsibility' }, dimension: 'SOCIALITY' },
  { key: 'mut_rechenschaft', name: { de: 'Mut & Rechenschaft', en: 'Courage & Accountability' }, dimension: 'SOCIALITY' },
]

export const QUESTIONS: Question[] = [
  // ── IDENTITY: Openness & Creativity ──────────────────────────────
  {
    id: 'ok_1',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🎨',
    text: {
      de: 'Wenn du etwas ausprobieren kannst, ohne zu wissen, wie es endet — machst du das gerne? Oder brauchst du erst einen Plan?',
      en: 'If you can try something without knowing how it\'ll turn out — do you enjoy that? Or do you need a plan first?',
    },
  },
  {
    id: 'ok_2',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🌀',
    text: {
      de: 'Wie wichtig ist es dir, bei Rückschlägen weiterzumachen und einen neuen Weg zu finden?',
      en: 'How important is it to you to keep going after setbacks and find a new way?',
    },
  },
  {
    id: 'ok_3',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🔄',
    text: {
      de: 'Wie wichtig ist es dir, aus Fehlern zu lernen — auch wenn es wehtut?',
      en: 'How important is it to you to learn from mistakes — even when it hurts?',
    },
  },
  {
    id: 'ok_4',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🗺️',
    text: {
      de: 'Stell dir vor, du kannst einen Beruf erfinden, den es noch gar nicht gibt. Würde dich das reizen?',
      en: 'Imagine you could invent a job that doesn\'t exist yet. Would that appeal to you?',
    },
  },
  {
    id: 'ok_5',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🎭',
    text: {
      de: 'Wenn du eine eigene Idee einbringen kannst — tust du das, auch wenn andere vielleicht lachen?',
      en: 'If you can bring in an idea of your own — do you, even if others might laugh?',
    },
  },

  // ── IDENTITY: Respect & Discipline ──────────────────────────────────
  {
    id: 'rd_1',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '⏰',
    text: {
      de: 'Wenn du dir selbst etwas vornimmst — hältst du dich daran, auch ohne dass jemand nachfragt?',
      en: 'When you set yourself a goal — do you stick to it, even if no one\'s checking?',
    },
  },
  {
    id: 'rd_2',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '🤫',
    text: {
      de: 'Wenn jemand etwas erklärt — hörst du wirklich zu, auch wenn du denkst, du weißt es schon?',
      en: 'When someone explains something — do you really listen, even if you think you already know it?',
    },
  },
  {
    id: 'rd_3',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '📋',
    text: {
      de: 'Wie wichtig ist es dir, schwierige Aufgaben durchzuziehen — auch wenn du keine Lust hast?',
      en: 'How important is it to you to push through hard tasks — even when you don\'t feel like it?',
    },
  },
  {
    id: 'rd_4',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '🏋️',
    text: {
      de: 'Gibt es etwas, das du regelmäßig übst — auch wenn du keine Lust hast, weil du weißt, dass es dich weiterbringt?',
      en: 'Is there something you practice regularly — even when you don\'t feel like it, because you know it moves you forward?',
    },
  },
  {
    id: 'rd_5',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '🪞',
    text: {
      de: 'Wenn du einen Fehler gemacht hast — kannst du das zugeben und daraus lernen, auch wenn es unangenehm ist?',
      en: 'When you\'ve made a mistake — can you admit it and learn from it, even when it\'s uncomfortable?',
    },
  },

  // ── IDENTITY: Tolerance & Patience ────────────────────────────────
  {
    id: 'tg_1',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🐢',
    text: {
      de: 'Wenn etwas länger dauert als du dachtest — kannst du ruhig bleiben und trotzdem weitermachen?',
      en: 'When something takes longer than you thought — can you stay calm and keep going anyway?',
    },
  },
  {
    id: 'tg_2',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🔥',
    text: {
      de: 'Wenn dich jemand oder etwas triggert — schaffst du es, erst nachzudenken, bevor du reagierst?',
      en: 'When someone or something triggers you — can you think before you react?',
    },
  },
  {
    id: 'tg_3',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🧩',
    text: {
      de: 'Wie wichtig ist es dir, neugierig zu bleiben — auch wenn du etwas noch nicht verstehst?',
      en: 'How important is it to you to stay curious — even when you don\'t understand something yet?',
    },
  },
  {
    id: 'tg_4',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🌍',
    text: {
      de: 'Wenn jemand sehr anders denkt oder lebt als du — kannst du trotzdem von ihm oder ihr lernen?',
      en: 'When someone thinks or lives very differently from you — can you still learn from them?',
    },
  },
  {
    id: 'tg_5',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🌊',
    text: {
      de: 'Wenn alles auf einmal kommt — Schule, Zuhause, Freunde — wie gehst du damit um? Hast du Wege, dich zu regulieren?',
      en: 'When everything hits at once — school, home, friends — how do you handle it? Do you have ways to regulate yourself?',
    },
  },

  // ── IDENTITY: Enthusiasm & Diligence ────────────────────────────
  {
    id: 'bf_1',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🔥',
    text: {
      de: 'Gibt es etwas, das dich so begeistert, dass du die Zeit vergisst? Lernst du in diesen Momenten anders als sonst?',
      en: 'Is there something that excites you so much you lose track of time? Do you learn differently in those moments?',
    },
  },
  {
    id: 'bf_2',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🏃',
    text: {
      de: 'Wenn du ein Ziel hast — gibst du auch dann alles, wenn niemand zuschaut und niemand applaudiert?',
      en: 'When you have a goal — do you give it your all even when no one\'s watching or applauding?',
    },
  },
  {
    id: 'bf_3',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🌟',
    text: {
      de: 'Wie wichtig ist es dir, Dinge zu tun, die dich wirklich begeistern — auch ohne Belohnung oder Note?',
      en: 'How important is it to you to do things that genuinely excite you — even without a reward or grade?',
    },
  },
  {
    id: 'bf_4',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '📚',
    text: {
      de: 'Lernst du manchmal Dinge, die dich interessieren — einfach so, ohne dass es jemand von dir verlangt?',
      en: 'Do you sometimes learn things that interest you — just because, without anyone requiring it?',
    },
  },
  {
    id: 'bf_5',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🎯',
    text: {
      de: 'Wenn du etwas wirklich willst — machst du dann auch einen Plan und hältst dich daran, auch wenn es Umwege gibt?',
      en: 'When you really want something — do you make a plan and stick to it, even when there are detours?',
    },
  },

  // ── IDENTITY: Focus & Attention ──────────────────────────────
  {
    id: 'fa_1',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '📵',
    text: {
      de: 'Kannst du dein Handy weglegen und dich wirklich auf eine Sache konzentrieren — für eine Stunde? Wie fühlt sich das an?',
      en: 'Can you put your phone away and truly focus on one thing — for an hour? How does that feel?',
    },
  },
  {
    id: 'fa_2',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🔍',
    text: {
      de: 'Wie wichtig ist es dir, Dinge wirklich genau zu machen — statt sie einfach schnell zu erledigen?',
      en: 'How important is it to you to do things really carefully — instead of just rushing through them?',
    },
  },
  {
    id: 'fa_3',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🧘',
    text: {
      de: 'Gibt es Momente, wo du einfach still bist — und in dieser Stille merkst du, was du wirklich denkst oder fühlst?',
      en: 'Are there moments when you\'re simply still — and in that stillness notice what you really think or feel?',
    },
  },
  {
    id: 'fa_4',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🎮',
    text: {
      de: 'Wenn du mitten in etwas bist, das Spaß macht, und du eigentlich lernen solltest — kannst du aufhören und wechseln?',
      en: 'When you\'re in the middle of something fun and you\'re actually supposed to study — can you stop and switch?',
    },
  },
  {
    id: 'fa_5',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🌊',
    text: {
      de: 'Wenn du in einem Gespräch oder einer Stunde bist — bist du wirklich dabei, oder denkst du schon an das nächste?',
      en: 'When you\'re in a conversation or a class — are you really present, or already thinking about what\'s next?',
    },
  },

  // ── IDENTITY: Understanding & Insight ──────────────────────────
  {
    id: 've_1',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '🤔',
    text: {
      de: 'Wenn du etwas nicht verstehst — fragst du nach, auch wenn du dich dabei komisch fühlst?',
      en: 'When you don\'t understand something — do you ask, even if it feels awkward?',
    },
  },
  {
    id: 've_2',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '🔭',
    text: {
      de: 'Interessiert es dich, warum Dinge so sind, wie sie sind — und wie sie sich verändern könnten?',
      en: 'Are you interested in why things are the way they are — and how they could change?',
    },
  },
  {
    id: 've_3',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '📰',
    text: {
      de: 'Wenn du etwas im Internet liest — fragst du dich, ob das auch wirklich stimmt?',
      en: 'When you read something online — do you ask yourself whether it\'s actually true?',
    },
  },
  {
    id: 've_4',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '💡',
    text: {
      de: 'Hattest du schon mal einen Moment, wo du plötzlich etwas wirklich verstanden hast — und das hat sich richtig gut angefühlt?',
      en: 'Have you ever had a moment where you suddenly truly understood something — and it felt really good?',
    },
  },
  {
    id: 've_5',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '🗣️',
    text: {
      de: 'Wenn ihr über ein schwieriges Thema redet — bringst du deine eigene Meinung ein, auch wenn du dir nicht 100% sicher bist?',
      en: 'When you\'re discussing a difficult topic — do you share your own opinion, even if you\'re not 100% sure?',
    },
  },

  // ── COMMUNITY: Appreciation & Gratitude ────────────────────────
  {
    id: 'wd_1',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '💌',
    text: {
      de: 'Wie wichtig ist es dir, Menschen zu sagen, was du an ihnen schätzt — einfach so, ohne besonderen Anlass?',
      en: 'How important is it to you to tell people what you appreciate about them — just because, without a special reason?',
    },
  },
  {
    id: 'wd_2',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '🌅',
    text: {
      de: 'Gibt es Menschen in deinem Leben, durch die du etwas gelernt hast — auch wenn sie dich manchmal genervt haben?',
      en: 'Are there people in your life you\'ve learned something from — even if they sometimes annoyed you?',
    },
  },
  {
    id: 'wd_3',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '👏',
    text: {
      de: 'Wenn jemand in deiner Gruppe etwas gut gemacht hat — sagst du das auch laut, oder denkst du es nur?',
      en: 'When someone in your group did something well — do you say it out loud, or just think it?',
    },
  },
  {
    id: 'wd_4',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '🎁',
    text: {
      de: 'Wie wichtig ist es dir, anderen etwas Gutes zu tun — auch ohne etwas dafür zu bekommen?',
      en: 'How important is it to you to do something good for others — even without getting anything back?',
    },
  },
  {
    id: 'wd_5',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '🪴',
    text: {
      de: 'Hast du schon mal gemerkt, dass du durch jemand anderen besser geworden bist — in etwas, das dir wichtig ist?',
      en: 'Have you ever noticed that someone else made you better — at something that matters to you?',
    },
  },

  // ── COMMUNITY: Compassion & Solidarity ──────────────────────
  {
    id: 'as_1',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '🫂',
    text: {
      de: 'Wenn jemand in deiner Klasse oder deinem Team gerade einen schlechten Tag hat — merkst du das, auch wenn er oder sie nichts sagt?',
      en: 'When someone in your class or team is having a bad day — do you notice, even if they don\'t say anything?',
    },
  },
  {
    id: 'as_2',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '⚖️',
    text: {
      de: 'Wenn du siehst, dass jemand ungerecht behandelt wird — sagst du etwas, auch wenn es dich eigentlich nichts angeht?',
      en: 'When you see someone treated unfairly — do you speak up, even if it isn\'t really your business?',
    },
  },
  {
    id: 'as_3',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '🌧️',
    text: {
      de: 'Wie wichtig ist es dir, anderen deine Zeit oder Energie zu geben — auch ohne etwas dafür zu erwarten?',
      en: 'How important is it to you to give others your time or energy — without expecting anything back?',
    },
  },
  {
    id: 'as_4',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '🏘️',
    text: {
      de: 'Interessiert es dich, wie es den Menschen um dich herum geht — nicht nur deinen besten Freunden?',
      en: 'Are you interested in how the people around you are doing — not just your closest friends?',
    },
  },
  {
    id: 'as_5',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '📣',
    text: {
      de: 'Wenn eine Gruppe von Menschen ungerecht behandelt wird — würdest du deine Stimme erheben, auch wenn du nicht direkt betroffen bist?',
      en: 'When a group of people is treated unfairly — would you raise your voice, even if you\'re not directly affected?',
    },
  },

  // ── COMMUNITY: Friendship & Helpfulness ───────────────────
  {
    id: 'fh_1',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🤝',
    text: {
      de: 'Wie wichtig ist es dir, Menschen in deinem Leben zu haben, auf die du dich wirklich verlassen kannst — und umgekehrt?',
      en: 'How important is it to you to have people in your life you can truly rely on — and vice versa?',
    },
  },
  {
    id: 'fh_2',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🧑‍🏫',
    text: {
      de: 'Wenn jemand etwas nicht versteht — erklärst du es ihm oder ihr gerne, auch wenn es Zeit kostet?',
      en: 'When someone doesn\'t understand something — do you enjoy explaining it, even if it takes time?',
    },
  },
  {
    id: 'fh_3',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🏆',
    text: {
      de: 'Wie wichtig ist es dir, dass dein Team als Ganzes erfolgreich ist — nicht nur du selbst?',
      en: 'How important is it to you that your team succeeds as a whole — not just you?',
    },
  },
  {
    id: 'fh_4',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '📞',
    text: {
      de: 'Wenn ein Freund oder eine Freundin dich um 23 Uhr anruft, weil er oder sie Hilfe braucht — gehst du ran?',
      en: 'If a friend calls you at 11pm because they need help — do you pick up?',
    },
  },
  {
    id: 'fh_5',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🌐',
    text: {
      de: 'Glaubst du, dass du durch andere Menschen Dinge lernst, die du alleine nie lernen würdest?',
      en: 'Do you believe other people teach you things you\'d never learn alone?',
    },
  },

  // ── COMMUNITY: Care & Support ───────────────────────────
  {
    id: 'fu_1',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🧡',
    text: {
      de: 'Gibt es Menschen in deinem Leben, um die du dich kümmerst — und was hast du dabei über dich selbst gelernt?',
      en: 'Are there people in your life you take care of — and what have you learned about yourself in doing so?',
    },
  },
  {
    id: 'fu_2',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🌱',
    text: {
      de: 'Wenn du siehst, dass jemand Potenzial hat — möchtest du ihm oder ihr helfen, es zu entfalten?',
      en: 'When you see that someone has potential — do you want to help them unlock it?',
    },
  },
  {
    id: 'fu_3',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🏠',
    text: {
      de: 'Wie wichtig ist es dir, für andere Menschen einen Raum zu schaffen, in dem sie sich sicher und wohl fühlen?',
      en: 'How important is it to you to create a space where others feel safe and comfortable?',
    },
  },
  {
    id: 'fu_4',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '💊',
    text: {
      de: 'Wenn jemand in deiner Gruppe überfordert ist — übernimmst du Verantwortung, auch wenn es nicht deine Aufgabe ist?',
      en: 'When someone in your group is overwhelmed — do you take responsibility, even if it isn\'t your job?',
    },
  },
  {
    id: 'fu_5',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🌙',
    text: {
      de: 'Achtest du auch auf dich selbst — damit du überhaupt für andere da sein kannst?',
      en: 'Do you also look after yourself — so you\'re even able to be there for others?',
    },
  },

  // ── SOCIALITY: Trust & Responsibility ──────────────────────
  {
    id: 'vv_1',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '🔑',
    text: {
      de: 'Wenn dir jemand etwas Wichtiges anvertraut — hältst du das für dich, egal was passiert?',
      en: 'When someone confides something important in you — do you keep it to yourself, no matter what?',
    },
  },
  {
    id: 'vv_2',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '🌳',
    text: {
      de: 'Wie wichtig ist es dir, bei deinen Entscheidungen — was du kaufst, isst, postest — an andere zu denken?',
      en: 'How important is it to you to think of others in your decisions — what you buy, eat, post?',
    },
  },
  {
    id: 'vv_3',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '♻️',
    text: {
      de: 'Wie wichtig ist es dir, im Alltag bewusst daran zu denken, wie dein Verhalten andere Menschen und die Umwelt betrifft?',
      en: 'How important is it to you to consciously consider, day to day, how your behavior affects other people and the environment?',
    },
  },
  {
    id: 'vv_4',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '📜',
    text: {
      de: 'Wenn du etwas versprichst — hältst du es auch, wenn es schwierig wird und niemand es kontrolliert?',
      en: 'When you make a promise — do you keep it even when it gets hard and no one\'s checking?',
    },
  },
  {
    id: 'vv_5',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '🏛️',
    text: {
      de: 'Würdest du lieber für eine Firma arbeiten, die wirklich etwas Gutes für die Welt tut — auch wenn du dort weniger verdienst?',
      en: 'Would you rather work for a company that genuinely does good in the world — even if you\'d earn less there?',
    },
  },

  // ── SOCIALITY: Courage & Accountability ─────────────────────────────
  {
    id: 'mr_1',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🦁',
    text: {
      de: 'Wie wichtig ist es dir, bei Ungerechtigkeiten nicht wegzuschauen — sondern etwas zu tun?',
      en: 'How important is it to you not to look away from injustice — but to do something about it?',
    },
  },
  {
    id: 'mr_2',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🚀',
    text: {
      de: 'Wenn du eine Idee hättest, die das Leben von Menschen verbessern könnte — würdest du sie ausprobieren, auch wenn du scheitern könntest?',
      en: 'If you had an idea that could improve people\'s lives — would you try it, even if you might fail?',
    },
  },
  {
    id: 'mr_3',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🪞',
    text: {
      de: 'Wenn du einen Fehler gemacht hast, der andere betroffen hat — stehst du dazu und machst es wieder gut, auch wenn es peinlich ist?',
      en: 'When you\'ve made a mistake that affected others — do you own up to it and make it right, even if it\'s embarrassing?',
    },
  },
  {
    id: 'mr_4',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🌊',
    text: {
      de: 'Wie wichtig ist es dir, als einzelne Person aktiv etwas in der Welt zu verändern?',
      en: 'How important is it to you, as one person, to actively change something in the world?',
    },
  },
  {
    id: 'mr_5',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🕊️',
    text: {
      de: 'Wie wichtig ist es dir, im Leben einen Beitrag zu leisten — etwas zu hinterlassen, das über dich hinausgeht?',
      en: 'How important is it to you to make a contribution in life — to leave behind something bigger than yourself?',
    },
  },
]
