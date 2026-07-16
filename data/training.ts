import { VALUES, type Dimension } from './questions'
import type { LocalizedString } from '@/lib/i18n'

export interface TrainingLevel {
  label: LocalizedString
  emoji: string
  scoreRange: [number, number]
  challenge: LocalizedString
  neuroFakt: LocalizedString
}

export interface TrainingTopic {
  id: string
  emoji: string
  title: LocalizedString
  subtitle: LocalizedString
  levels: [TrainingLevel, TrainingLevel, TrainingLevel, TrainingLevel]
}

export interface TrainingValueGroup {
  key: string
  name: LocalizedString
  emoji: string
  dimension: Dimension
  topics: TrainingTopic[]
}

export const DEFAULT_TRAINING_DURATION = 7
export const POINTS_PER_DAY = 10

export interface DurationOption {
  days: number
  label: LocalizedString
  neuroFakt: LocalizedString
}

export const TRAINING_DURATION_OPTIONS: DurationOption[] = [
  {
    days: 7,
    label: { de: '7 Tage', en: '7 days' },
    neuroFakt: {
      de: 'Ein erster Trainingsreiz — genug, um eine neue Reaktion in deinem Gehirn zu spüren.',
      en: 'A first training stimulus — enough to feel a new response take shape in your brain.',
    },
  },
  {
    days: 21,
    label: { de: '21 Tage', en: '21 days' },
    neuroFakt: {
      de: 'Der Punkt, an dem eine Handlung anfängt, sich weniger nach Anstrengung und mehr nach Routine anzufühlen.',
      en: 'The point where an action starts to feel less like effort and more like routine.',
    },
  },
  {
    days: 90,
    label: { de: '90 Tage', en: '90 days' },
    neuroFakt: {
      de: 'Studien zeigen: Gewohnheiten werden im Schnitt nach 66 Tagen automatisch (Lally et al., 2010) — 90 Tage geben dir echten Spielraum.',
      en: 'Studies show habits become automatic after 66 days on average (Lally et al., 2010) — 90 days gives you real room to spare.',
    },
  },
]

const LEVEL_META = [
  { label: { de: 'Schlafmodus', en: 'Sleep mode' }, emoji: '😴', scoreRange: [0, 2] as [number, number] },
  { label: { de: 'Augen auf', en: 'Eyes open' }, emoji: '👀', scoreRange: [3, 5] as [number, number] },
  { label: { de: 'Profi-Training', en: 'Pro training' }, emoji: '💪', scoreRange: [6, 8] as [number, number] },
  { label: { de: 'Champion', en: 'Champion' }, emoji: '🏆', scoreRange: [9, 10] as [number, number] },
]

const PLACEHOLDER_INTROS: LocalizedString[] = [
  { de: 'Mach heute einen ersten kleinen Schritt in diese Richtung.', en: 'Take a first small step in this direction today.' },
  { de: 'Trau dich, es heute bewusst zu tun — auch wenn es dich einen Moment zögern lässt.', en: 'Dare to do it consciously today — even if it makes you hesitate for a moment.' },
  { de: 'Geh heute einen Schritt weiter, der dich wirklich etwas kostet — Zeit, Mut oder Energie.', en: 'Today, take a step further that actually costs you something — time, courage, or energy.' },
  { de: 'Mach daraus heute etwas, das über dich hinausgeht — und andere mitzieht.', en: 'Today, turn this into something bigger than yourself — that brings others along.' },
]

// Placeholder content for values without a finished training catalog yet.
// Replace with real challenges + neuro-facts, same style as "Openness & Creativity".
function placeholderLevels(valueName: LocalizedString, topicTitle: LocalizedString): [TrainingLevel, TrainingLevel, TrainingLevel, TrainingLevel] {
  return LEVEL_META.map((meta, i) => ({
    label: meta.label,
    emoji: meta.emoji,
    scoreRange: meta.scoreRange,
    challenge: {
      de: `${PLACEHOLDER_INTROS[i].de} Thema: „${topicTitle.de}“ (${valueName.de}). 🚧 Platzhalter — wird durch echten Trainingsinhalt ersetzt.`,
      en: `${PLACEHOLDER_INTROS[i].en} Topic: "${topicTitle.en}" (${valueName.en}). 🚧 Placeholder — will be replaced with real training content.`,
    },
    neuroFakt: {
      de: `🚧 Platzhalter: Hier folgt bald ein Neuro-Fakt, der erklärt, warum „${topicTitle.de}“ ${valueName.de} stärkt.`,
      en: `🚧 Placeholder: a neuro-fact explaining why "${topicTitle.en}" strengthens ${valueName.en} will follow soon.`,
    },
  })) as [TrainingLevel, TrainingLevel, TrainingLevel, TrainingLevel]
}

function placeholderTopic(valueKey: string, valueName: LocalizedString, slug: string, emoji: string, title: LocalizedString, subtitle: LocalizedString): TrainingTopic {
  return {
    id: `${valueKey}__${slug}`,
    emoji,
    title,
    subtitle,
    levels: placeholderLevels(valueName, title),
  }
}

const OFFENHEIT_KREATIVITAET_TOPICS: TrainingTopic[] = [
  {
    id: 'neues-ausprobieren',
    emoji: '🆕',
    title: { de: 'Neues ausprobieren', en: 'Trying new things' },
    subtitle: { de: 'Ich tue heute etwas, das ich gestern noch nicht getan habe.', en: 'I do something today that I hadn\'t done yesterday.' },
    levels: [
      {
        label: { de: 'Schlafmodus', en: 'Sleep mode' },
        emoji: '😴',
        scoreRange: [0, 2],
        challenge: {
          de: 'Mach einmal am Tag eine winzig kleine Sache anders als sonst. Andere Playlist beim Aufstehen · anderer Sitzplatz · anderes Getränk · jemand anderen zuerst grüßen · Handy 5 Minuten später checken.',
          en: 'Once a day, do one tiny thing differently than usual. Different playlist when you wake up · a different seat · a different drink · greet someone else first · check your phone 5 minutes later.',
        },
        neuroFakt: {
          de: 'Dein Gehirn verbraucht 20 % seiner Energie — obwohl es nur 2 % deines Körpergewichts ist. Kein Wunder, dass es Routinen liebt. Aber mit 16–19 Jahren bist du auf dem Höhepunkt deiner Neuroplastizität. Jede winzige Abweichung vom Autopiloten ist ein echter Trainingsreiz für dein Gehirn.',
          en: 'Your brain uses 20% of your energy — despite being only 2% of your body weight. No wonder it loves routine. But at 16–19 you\'re at the peak of your neuroplasticity. Every tiny deviation from autopilot is a real training stimulus for your brain.',
        },
      },
      {
        label: { de: 'Augen auf', en: 'Eyes open' },
        emoji: '👀',
        scoreRange: [3, 5],
        challenge: {
          de: 'Mach heute etwas, das dich eine Sekunde zögern lässt — und tu es trotzdem. Jemanden ansprechen, den du sonst ignorierst · in der Klasse eine Frage stellen, die du dich nicht traust · 10 Minuten ohne Handy sitzen und einfach schauen, was passiert · jemandem ein ehrliches Kompliment machen.',
          en: 'Do something today that makes you hesitate for a second — and do it anyway. Talk to someone you\'d usually ignore · ask a question in class you normally wouldn\'t dare · sit for 10 minutes without your phone and just see what happens · give someone an honest compliment.',
        },
        neuroFakt: {
          de: 'Das kurze Zögern, das du spürst? Das ist deine Amygdala — dein innerer Feueralarm. Sie piept bei allem Unbekannten. Früher: Säbelzahntiger. Heute: neue Person, neue Situation. Das Wahrnehmen dieser Reaktion ohne Selbstverurteilung ist der erste Schritt aus dem Autopiloten.',
          en: 'That brief hesitation you feel? That\'s your amygdala — your inner fire alarm. It goes off at anything unknown. Back then: saber-toothed tigers. Today: a new person, a new situation. Noticing that reaction without judging yourself is the first step out of autopilot.',
        },
      },
      {
        label: { de: 'Profi-Training', en: 'Pro training' },
        emoji: '💪',
        scoreRange: [6, 8],
        challenge: {
          de: 'Mach heute etwas Neues, das dich wirklich etwas kostet — Überwindung, Zeit oder Energie. Ein Gespräch mit jemandem führen, den du kaum kennst · etwas Kreatives starten ohne zu wissen, wie es endet · eine Meinung vertreten, die du sonst für dich behältst · jemandem helfen, ohne gefragt zu werden.',
          en: 'Do something new today that actually costs you something — effort, time, or energy. Have a conversation with someone you barely know · start something creative without knowing how it\'ll end · voice an opinion you\'d usually keep to yourself · help someone without being asked.',
        },
        neuroFakt: {
          de: 'Wenn du Neues mit anderen teilst, feuern deine Spiegelneuronen — du erlebst buchstäblich mit, was andere erleben. Mitgefühl ist trainierbar, genau wie ein Muskel. Es beginnt damit, deine eigenen Erfahrungen wahrzunehmen und zu teilen.',
          en: 'When you share something new with others, your mirror neurons fire — you literally experience what others experience. Compassion is trainable, just like a muscle. It starts with noticing and sharing your own experiences.',
        },
      },
      {
        label: { de: 'Champion', en: 'Champion' },
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge: {
          de: 'Du erfindest deine Challenge selbst. Aber eine Frage bleibt: Wer zieht mit dir? Lade jemanden ein, etwas Neues auszuprobieren · teile eine Geschichte, wie du mal gescheitert bist und was daraus wurde · starte etwas, das größer ist als du alleine.',
          en: 'You invent your own challenge. But one question remains: who\'s coming with you? Invite someone to try something new · share a story about a time you failed and what came of it · start something bigger than yourself alone.',
        },
        neuroFakt: {
          de: 'Was Mbappé, Billie Eilish und alle, die du wirklich bewunderst, gemeinsam haben: Sie haben nie aufgehört zu lernen — und haben es nie als Pflicht gesehen. Menschen, die Empathie für sich selbst trainieren, treffen bessere Entscheidungen und sind resilienter unter Druck.',
          en: 'What Mbappé, Billie Eilish, and everyone you truly admire have in common: they never stopped learning — and never treated it as an obligation. People who train self-compassion make better decisions and are more resilient under pressure.',
        },
      },
    ],
  },
  {
    id: 'kreativ-sein',
    emoji: '🎨',
    title: { de: 'Kreativ sein', en: 'Being creative' },
    subtitle: { de: 'Ich drücke mich aus, auch wenn\'s nicht perfekt ist.', en: 'I express myself, even when it\'s not perfect.' },
    levels: [
      {
        label: { de: 'Schlafmodus', en: 'Sleep mode' },
        emoji: '😴',
        scoreRange: [0, 2],
        challenge: {
          de: 'Mach heute eine kreative Sache — 5 Minuten — kein Ergebnis nötig. Kritzeln während du telefonierst · einen Satz aufschreiben, der dir durch den Kopf geht · ein Foto von etwas machen, das du schön findest · einen Song summen, den du magst.',
          en: 'Do one creative thing today — 5 minutes — no result needed. Doodle while you\'re on the phone · write down a sentence that\'s stuck in your head · take a photo of something you find beautiful · hum a song you like.',
        },
        neuroFakt: {
          de: 'Dein Gehirn hat ein Netzwerk, das nur aktiv ist, wenn du nicht fokussiert arbeitest — das Default Mode Network. Es ist zuständig für Träumen, Fantasieren und kreative Verbindungen. Kreativität ist kein Talent, das manche haben und andere nicht — es ist ein Netzwerk, das jeder besitzt.',
          en: 'Your brain has a network that\'s only active when you\'re not focused on a task — the default mode network. It\'s responsible for daydreaming, imagining, and creative connections. Creativity isn\'t a talent some people have and others don\'t — it\'s a network everyone has.',
        },
      },
      {
        label: { de: 'Augen auf', en: 'Eyes open' },
        emoji: '👀',
        scoreRange: [3, 5],
        challenge: {
          de: 'Mach heute etwas Kreatives, das eine andere Person sehen könnte — auch wenn du es nicht zeigst. Einen Satz aufschreiben, der sich wahr anfühlt · ein Bild machen, das eine Stimmung zeigt · etwas kochen und anrichten, als wäre es ein Restaurant · eine Playlist für einen Moment erstellen.',
          en: 'Make something creative today that another person could see — even if you don\'t show it. Write a sentence that feels true · take a photo that captures a mood · cook and plate something like it\'s a restaurant dish · build a playlist for a moment.',
        },
        neuroFakt: {
          de: 'Wenn du etwas machst und sofort denkst "das ist schlecht" — das ist nicht die Wahrheit. Das ist deine Amygdala, die Bedrohung wittert. Soziale Bewertung ist für dein Gehirn genauso bedrohlich wie ein Säbelzahntiger. Freundlich mit sich selbst sein reduziert diese Alarmreaktion messbar.',
          en: 'When you make something and immediately think "this is bad" — that\'s not the truth. That\'s your amygdala sensing a threat. Social judgment is just as threatening to your brain as a saber-toothed tiger. Being kind to yourself measurably reduces that alarm response.',
        },
      },
      {
        label: { de: 'Profi-Training', en: 'Pro training' },
        emoji: '💪',
        scoreRange: [6, 8],
        challenge: {
          de: 'Mach heute etwas Kreatives, das über dich hinausgeht — etwas, das jemand anderen berührt, überrascht oder zum Nachdenken bringt. Jemandem eine handgeschriebene Nachricht hinterlassen · ein Foto mit einer Geschichte dazu teilen · ein Problem kreativ lösen und erklären wie · etwas Selbstgemachtes verschenken.',
          en: 'Make something creative today that reaches beyond you — something that moves, surprises, or makes someone else think. Leave someone a handwritten note · share a photo with a story behind it · solve a problem creatively and explain how · give away something you made yourself.',
        },
        neuroFakt: {
          de: 'Wenn du etwas Kreatives mit anderen teilst, feuern Spiegelneuronen — die andere Person erlebt mit, was du ausdrückst. Geteilte positive Erfahrungen aktivieren das Fürsorge-Motivationssystem: Oxytocin fließt, Verbindung entsteht. Kreativität ist eine der ältesten Formen menschlicher Verbindung.',
          en: 'When you share something creative with others, mirror neurons fire — the other person experiences what you express. Shared positive experiences activate the caregiving motivation system: oxytocin flows, connection forms. Creativity is one of the oldest forms of human connection.',
        },
      },
      {
        label: { de: 'Champion', en: 'Champion' },
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge: {
          de: 'Erschaffe heute etwas — egal wie klein — das ohne dich nicht existieren würde. Und frag dich dabei: Tue ich das für mich — oder für den Applaus?',
          en: 'Create something today — no matter how small — that wouldn\'t exist without you. And ask yourself: am I doing this for myself — or for the applause?',
        },
        neuroFakt: {
          de: 'Was Basquiat, Beyoncé und Virgil Abloh gemeinsam haben: Sie haben nicht gewartet, bis sie gut genug waren. Sie haben angefangen — und durch das Machen sind sie gut geworden. Dein Gehirn ist mit 16–19 Jahren auf dem Höhepunkt seiner Plastizität. Das ist deine Champion League. Jetzt.',
          en: 'What Basquiat, Beyoncé, and Virgil Abloh have in common: they didn\'t wait until they were good enough. They started — and became good through doing. Your brain is at the peak of its plasticity at 16–19. This is your Champions League. Now.',
        },
      },
    ],
  },
  {
    id: 'grosszuegig-sein',
    emoji: '🤲',
    title: { de: 'Großzügig sein', en: 'Being generous' },
    subtitle: { de: 'Ich gebe, ohne sofort eine Gegenleistung zu erwarten.', en: 'I give without expecting anything back right away.' },
    levels: [
      {
        label: { de: 'Schlafmodus', en: 'Sleep mode' },
        emoji: '😴',
        scoreRange: [0, 2],
        challenge: {
          de: 'Tu heute eine kleine Sache für jemand anderen — ohne dass er es erwartet. Tür aufhalten · Notizen teilen · jemandem beim Tragen helfen · ein Lächeln, das du nicht schuldest.',
          en: 'Do one small thing for someone else today — without them expecting it. Hold the door · share your notes · help someone carry something · smile at someone who didn\'t ask for it.',
        },
        neuroFakt: {
          de: 'Wenn du jemandem hilfst, schüttet dein Gehirn Oxytocin, Serotonin und Dopamin aus — gleichzeitig. Neurowissenschaftler nennen das den "Helper\'s High". Großzügigkeit aktiviert das Fürsorge-Motivationssystem — das System, das sich am tiefsten mit Sinn verbindet. Geben ist also nicht nur für andere gut.',
          en: 'When you help someone, your brain releases oxytocin, serotonin, and dopamine — all at once. Neuroscientists call this the "helper\'s high." Generosity activates the caregiving motivation system — the system most deeply tied to a sense of meaning. So giving isn\'t only good for others.',
        },
      },
      {
        label: { de: 'Augen auf', en: 'Eyes open' },
        emoji: '👀',
        scoreRange: [3, 5],
        challenge: {
          de: 'Gib heute etwas, das dich wirklich etwas kostet — Zeit, Energie oder Aufmerksamkeit. Jemandem wirklich zuhören, ohne aufs Handy zu schauen · Wissen teilen, das dir nützt · Zeit investieren, die du eigentlich nicht hast · jemandem ein ehrliches, durchdachtes Kompliment machen.',
          en: 'Give something today that actually costs you something — time, energy, or attention. Really listen to someone without checking your phone · share knowledge that helps you · invest time you don\'t really have · give someone an honest, thoughtful compliment.',
        },
        neuroFakt: {
          de: 'Mitgefühl für andere beginnt mit Mitgefühl für sich selbst. Wenn du innerlich auf ein Danke wartest — das ist kein Fehler. Das ist dein Gehirn, das Fairness sucht. Fairness ist neurobiologisch tief verankert. Das zu bemerken, ohne dich zu verurteilen, trainiert den Muskel echter Großzügigkeit.',
          en: 'Compassion for others starts with compassion for yourself. If part of you is waiting for a thank you — that\'s not a flaw. That\'s your brain seeking fairness. Fairness is deeply rooted in neurobiology. Noticing that without judging yourself trains the muscle of real generosity.',
        },
      },
      {
        label: { de: 'Profi-Training', en: 'Pro training' },
        emoji: '💪',
        scoreRange: [6, 8],
        challenge: {
          de: 'Gib heute etwas, das einen echten Unterschied macht — für eine Person in deinem Umfeld. Jemandem helfen, der es nicht erwartet · eine Aufgabe übernehmen, die niemand will · jemandem sagen, was du an ihm schätzt — konkret und ehrlich · Zeit für jemanden schaffen, der gerade schwierig ist.',
          en: 'Give something today that makes a real difference — to someone in your circle. Help someone who doesn\'t expect it · take on a task no one wants · tell someone what you appreciate about them — specifically and honestly · make time for someone who\'s being difficult right now.',
        },
        neuroFakt: {
          de: 'Wenn jemand eine großzügige Geste erlebt, gibt er sie mit hoher Wahrscheinlichkeit weiter — an jemand völlig anderen. Das nennt sich "Pay it forward"-Effekt. Deine eine Geste heute kann eine Kettenreaktion auslösen, die du nie siehst.',
          en: 'When someone experiences a generous gesture, they\'re highly likely to pass it on — to someone else entirely. This is called the "pay it forward" effect. Your one gesture today can trigger a chain reaction you\'ll never see.',
        },
      },
      {
        label: { de: 'Champion', en: 'Champion' },
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge: {
          de: 'Gib heute etwas, das über deinen direkten Kreis hinausgeht. Einer fremden Person helfen · etwas in deiner Community beitragen · Wissen oder Erfahrung teilen, das anderen nützt, die du nie treffen wirst.',
          en: 'Give something today that reaches beyond your immediate circle. Help a stranger · contribute something to your community · share knowledge or experience that helps people you\'ll never meet.',
        },
        neuroFakt: {
          de: 'Menschen, die regelmäßig großzügig handeln, haben nachweislich weniger Stresshormone, mehr soziale Verbindungen und ein stärkeres Gefühl von Sinn. Champions wissen: Geben ist keine Schwäche. Es ist Strategie — nicht weil du etwas zurückbekommst, sondern weil du weißt, wer du bist.',
          en: 'People who act generously on a regular basis measurably have lower stress hormones, more social connections, and a stronger sense of meaning. Champions know: giving isn\'t weakness. It\'s strategy — not because you get something back, but because you know who you are.',
        },
      },
    ],
  },
  {
    id: 'bereit-sein',
    emoji: '🚪',
    title: { de: 'Bereit sein', en: 'Being ready' },
    subtitle: { de: 'Ich sage Ja, bevor ich weiß, wie es ausgeht.', en: 'I say yes before I know how it\'ll turn out.' },
    levels: [
      {
        label: { de: 'Schlafmodus', en: 'Sleep mode' },
        emoji: '😴',
        scoreRange: [0, 2],
        challenge: {
          de: 'Sag heute einmal Ja zu etwas, das du normalerweise ablehnst — auch wenn du nicht weißt, wie es ausgeht. Eine Einladung annehmen · eine Aufgabe übernehmen, die du nicht kennst · einen Vorschlag ausprobieren, den jemand anderes macht · einfach mitgehen, ohne den Plan zu kennen.',
          en: 'Say yes today to something you\'d usually turn down — even without knowing how it\'ll turn out. Accept an invitation · take on a task you don\'t know · try a suggestion someone else makes · just go along without knowing the plan.',
        },
        neuroFakt: {
          de: 'Unsicherheit aktiviert dein Bedrohungssystem — Cortisol steigt, Amygdala piept. Aber wenn du trotzdem Ja sagst und es gut ausgeht? Dopamin-Schub. Dein Gehirn lernt: Unsicherheit = manchmal Belohnung. Je öfter du das erlebst, desto mutiger wird dein Gehirn im Umgang mit dem Unbekannten.',
          en: 'Uncertainty activates your threat system — cortisol rises, the amygdala fires. But if you say yes anyway and it goes well? A dopamine hit. Your brain learns: uncertainty = sometimes a reward. The more often you experience that, the braver your brain gets with the unknown.',
        },
      },
      {
        label: { de: 'Augen auf', en: 'Eyes open' },
        emoji: '👀',
        scoreRange: [3, 5],
        challenge: {
          de: 'Sag heute Ja zu etwas, das dich wirklich einen Moment zögern lässt — und beobachte, was danach passiert. Eine Meinung vertreten, die du sonst für dich behältst · eine Rolle übernehmen, die du dir nicht zutraust · jemandem vertrauen, dem du noch nicht ganz vertraust · einen Plan loslassen und improvisieren.',
          en: 'Say yes today to something that genuinely makes you hesitate — and watch what happens next. Voice an opinion you\'d usually keep to yourself · take on a role you don\'t feel ready for · trust someone you don\'t fully trust yet · let go of a plan and improvise.',
        },
        neuroFakt: {
          de: 'Freundlich mit sich selbst sein in schwierigen Momenten stärkt die Fähigkeit, Risiken einzugehen. Warum? Dein Gehirn verschwendet weniger Energie damit, sich selbst zu schützen — und hat mehr Energie, um sich zu öffnen. Bereitschaft beginnt nicht mit Mut. Sie beginnt damit, das Zögern nicht zu verurteilen.',
          en: 'Being kind to yourself in difficult moments strengthens your ability to take risks. Why? Your brain wastes less energy protecting itself — and has more energy to open up. Readiness doesn\'t start with courage. It starts with not judging your own hesitation.',
        },
      },
      {
        label: { de: 'Profi-Training', en: 'Pro training' },
        emoji: '💪',
        scoreRange: [6, 8],
        challenge: {
          de: 'Übernimm heute Verantwortung für etwas, das niemand sonst übernimmt. Eine Aufgabe in der Gruppe, die liegen bleibt · ein Gespräch, das niemand führen will · eine Entscheidung treffen, wenn alle warten · für jemanden eintreten, der sich nicht traut.',
          en: 'Take responsibility today for something no one else will. A task in the group that\'s been left undone · a conversation no one wants to have · making a decision when everyone\'s waiting · standing up for someone who doesn\'t dare.',
        },
        neuroFakt: {
          de: 'Wenn eine Person in einer Gruppe Verantwortung übernimmt, steigt die Wahrscheinlichkeit, dass andere folgen — messbar. Das nennt sich soziale Modellierung. Dein Gehirn lernt durch Beobachtung via Spiegelneuronen. Auf dieser Stufe machst du Bereitschaft für andere möglich — das ist Führung ohne Titel.',
          en: 'When one person in a group takes responsibility, the odds that others will follow measurably rise. This is called social modeling. Your brain learns through observation via mirror neurons. At this level, you make readiness possible for others — that\'s leadership without a title.',
        },
      },
      {
        label: { de: 'Champion', en: 'Champion' },
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge: {
          de: 'Geh heute in eine Situation, die größer ist als du alleine — und sei trotzdem bereit. Ein Projekt starten, dessen Ausgang offen ist · jemandem helfen, der dich überfordert · eine Verantwortung übernehmen, für die du dich nicht qualifiziert fühlst — und trotzdem anfangen.',
          en: 'Step into a situation today that\'s bigger than you alone — and be ready anyway. Start a project with an uncertain outcome · help someone who overwhelms you · take on a responsibility you don\'t feel qualified for — and start anyway.',
        },
        neuroFakt: {
          de: 'Die größten Momente in deinem Leben werden nicht die sein, bei denen du alles wusstest. Sie werden die sein, bei denen du Ja gesagt hast — obwohl du es nicht wusstest. Menschen mit hoher Selbst-Empathie und sozialer Verbundenheit sind nachweislich resilienter unter Druck.',
          en: 'The biggest moments in your life won\'t be the ones where you knew everything. They\'ll be the ones where you said yes — even though you didn\'t know. People with high self-compassion and social connectedness are measurably more resilient under pressure.',
        },
      },
    ],
  },
  {
    id: 'ideen-wertschaetzen',
    emoji: '👂',
    title: { de: 'Ideen anderer wertschätzen', en: 'Valuing others\' ideas' },
    subtitle: { de: 'Ich höre zu, ohne sofort zu urteilen.', en: 'I listen without judging right away.' },
    levels: [
      {
        label: { de: 'Schlafmodus', en: 'Sleep mode' },
        emoji: '😴',
        scoreRange: [0, 2],
        challenge: {
          de: 'Lass heute eine Person ausreden — komplett. Ohne zu unterbrechen, ohne innerlich schon zu antworten. Einmal reicht. Wirklich zuhören — auch wenn du schon weißt, was du sagen willst.',
          en: 'Let one person finish speaking today — completely. Without interrupting, without already forming your reply in your head. Once is enough. Really listen — even if you already know what you want to say.',
        },
        neuroFakt: {
          de: 'Menschen sprechen ~130 Wörter pro Minute. Dein Gehirn verarbeitet ~500. Das heißt: Dein Gehirn hat beim Zuhören Leerlauf — und füllt ihn mit eigenen Gedanken. Echtes Zuhören ist aktive Arbeit gegen den Autopiloten und trainiert deinen präfrontalen Kortex, der Impulse kontrolliert.',
          en: 'People speak at about 130 words per minute. Your brain processes about 500. That means your brain has idle time while listening — and fills it with its own thoughts. Real listening is active work against autopilot, and it trains the prefrontal cortex that controls impulses.',
        },
      },
      {
        label: { de: 'Augen auf', en: 'Eyes open' },
        emoji: '👀',
        scoreRange: [3, 5],
        challenge: {
          de: 'Finde heute in einer Idee, die dir fremd oder falsch vorkommt, einen Punkt, der Sinn macht. Nicht zustimmen müssen — nur einen Aspekt finden, der nachvollziehbar ist. Und ihn benennen.',
          en: 'Today, in an idea that feels foreign or wrong to you, find one point that makes sense. You don\'t have to agree — just find one aspect that\'s understandable. And name it.',
        },
        neuroFakt: {
          de: 'Empathie und Mitgefühl sind zwei verschiedene Dinge. Empathie: Ich verstehe, wie du dich fühlst. Mitgefühl: Ich will, dass es dir gut geht. Du musst einer Idee nicht zustimmen, um sie zu verstehen — und Verstehen führt nachweislich zu besseren Entscheidungen als Urteilen.',
          en: 'Empathy and compassion are two different things. Empathy: I understand how you feel. Compassion: I want things to go well for you. You don\'t have to agree with an idea to understand it — and understanding measurably leads to better decisions than judging.',
        },
      },
      {
        label: { de: 'Profi-Training', en: 'Pro training' },
        emoji: '💪',
        scoreRange: [6, 8],
        challenge: {
          de: 'Stell heute eine echte Frage — eine, die zeigt, dass du zugehört hast. Nicht "Ja, aber..." · nicht "Ich finde..." · sondern: "Was meinst du genau mit...?" oder "Wie bist du darauf gekommen?"',
          en: 'Ask a real question today — one that shows you were listening. Not "Yes, but..." · not "I think..." · but: "What exactly do you mean by...?" or "How did you come up with that?"',
        },
        neuroFakt: {
          de: 'Wenn jemand wirklich zuhört, synchronisieren sich die Gehirnwellen von Sprecher und Zuhörer — buchstäblich. Das nennt sich neuronales Koppeln. Je besser das Zuhören, desto stärker die Synchronisation und desto tiefer das gegenseitige Verständnis.',
          en: 'When someone truly listens, the brain waves of speaker and listener literally synchronize. This is called neural coupling. The better the listening, the stronger the synchronization and the deeper the mutual understanding.',
        },
      },
      {
        label: { de: 'Champion', en: 'Champion' },
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge: {
          de: 'Schaffe heute einen Moment, in dem jemand anderes wirklich gehört wird — von dir. Nicht um zu helfen. Nicht um zu lösen. Einfach: da sein und zuhören.',
          en: 'Create a moment today where someone else is truly heard — by you. Not to help. Not to solve. Just: be there and listen.',
        },
        neuroFakt: {
          de: '"Das tiefste Zuhören ist das, das den anderen verändert, ohne dass du ein Wort gesagt hast." (Otto Scharmer) Menschen, die wirklich gehört werden, zeigen messbar weniger Stressreaktionen im Gehirn. Dein Zuhören ist aktive Fürsorge.',
          en: '"The deepest form of listening is the one that changes the other person without you saying a single word." (Otto Scharmer) People who are truly heard show measurably fewer stress responses in the brain. Your listening is active care.',
        },
      },
    ],
  },
  {
    id: 'offen-fuer-andere-welten',
    emoji: '🌍',
    title: { de: 'Offen für andere Welten', en: 'Open to other worlds' },
    subtitle: { de: 'Ich begegne Fremdem mit Neugier statt Abwehr.', en: 'I meet the unfamiliar with curiosity instead of defensiveness.' },
    levels: [
      {
        label: { de: 'Schlafmodus', en: 'Sleep mode' },
        emoji: '😴',
        scoreRange: [0, 2],
        challenge: {
          de: 'Lerne heute eine Kleinigkeit über etwas, das dir fremd ist — eine Kultur, eine Lebensweise, eine Meinung. Ein Wort in einer anderen Sprache · ein Gericht aus einem anderen Land nachschlagen · einen Artikel über etwas lesen, das du normalerweise überspringst.',
          en: 'Learn one small thing today about something unfamiliar to you — a culture, a way of life, an opinion. A word in another language · look up a dish from another country · read an article about something you\'d normally skip.',
        },
        neuroFakt: {
          de: 'Dein Gehirn sortiert blitzschnell in "vertraut" und "fremd". Fremd = erstmal Vorsicht. Das ist Biologie, kein Fehler. Aber Biologie ist kein Schicksal: Jede kleine Begegnung mit dem Fremden trainiert dein Gehirn, die Kategorie "fremd" zu erweitern.',
          en: 'Your brain instantly sorts things into "familiar" and "foreign." Foreign = caution first. That\'s biology, not a flaw. But biology isn\'t destiny: every small encounter with the unfamiliar trains your brain to widen the category of "familiar."',
        },
      },
      {
        label: { de: 'Augen auf', en: 'Eyes open' },
        emoji: '👀',
        scoreRange: [3, 5],
        challenge: {
          de: 'Führe heute ein echtes Gespräch mit jemandem, dessen Hintergrund sich von deinem unterscheidet — und stelle eine echte Frage. Nicht "Woher kommst du?" — sondern: "Was ist dir wichtig?" oder "Was vermisst du manchmal?"',
          en: 'Have a real conversation today with someone whose background differs from yours — and ask a real question. Not "Where are you from?" — but: "What matters to you?" or "What do you sometimes miss?"',
        },
        neuroFakt: {
          de: 'Die Kontakthypothese — eine der robustesten Erkenntnisse der Sozialpsychologie: Echter Kontakt mit Menschen, die wir als "fremd" kategorisieren, verändert diese Kategorie messbar. Nicht durch Überzeugung — durch Erfahrung. Jedes echte Gespräch ist ein kleiner Schritt dahin.',
          en: 'The contact hypothesis — one of social psychology\'s most robust findings: real contact with people we categorize as "foreign" measurably changes that category. Not through persuasion — through experience. Every real conversation is a small step toward that.',
        },
      },
      {
        label: { de: 'Profi-Training', en: 'Pro training' },
        emoji: '💪',
        scoreRange: [6, 8],
        challenge: {
          de: 'Bring heute eine Perspektive aus einer anderen Welt in dein eigenes Denken ein. Wie würde jemand aus einem anderen Land dieses Problem sehen? · Was würde jemand aus einer anderen Generation dazu sagen? · Was würde jemand, der das Gegenteil von dir glaubt, als Argument bringen?',
          en: 'Bring a perspective from another world into your own thinking today. How would someone from another country see this problem? · What would someone from another generation say about it? · What argument would someone who believes the opposite of you make?',
        },
        neuroFakt: {
          de: 'Gruppen mit unterschiedlichen Hintergründen lösen komplexe Probleme nachweislich besser als homogene Gruppen — auch wenn die homogenen Gruppen aus "klügeren" Einzelpersonen bestehen. Offenheit ist keine Tugend. Sie ist ein kognitiver Vorteil.',
          en: 'Groups with diverse backgrounds are demonstrably better at solving complex problems than homogeneous groups — even when the homogeneous groups consist of "smarter" individuals. Openness isn\'t a virtue. It\'s a cognitive advantage.',
        },
      },
      {
        label: { de: 'Champion', en: 'Champion' },
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge: {
          de: 'Sei heute Brücke zwischen zwei Welten — bring zwei Menschen oder Perspektiven zusammen, die sich sonst nicht begegnen würden.',
          en: 'Be a bridge between two worlds today — bring together two people or perspectives that wouldn\'t otherwise meet.',
        },
        neuroFakt: {
          de: 'Nelson Mandela verbrachte 27 Jahre im Gefängnis — und kam raus mit mehr Verständnis für seine Feinde als die meisten Menschen je für ihre Freunde aufbringen. Menschen mit hoher sozialer Offenheit sind nachweislich resilienter, kreativer und führungsstärker.',
          en: 'Nelson Mandela spent 27 years in prison — and came out with more understanding for his enemies than most people ever muster for their friends. People with high social openness are demonstrably more resilient, more creative, and stronger leaders.',
        },
      },
    ],
  },
]

// title + subtitle + emoji per topic for the 11 values that don't have a
// finished catalog yet. Levels are auto-filled with placeholder content.
const PLACEHOLDER_TOPIC_SPECS: Record<string, { slug: string; emoji: string; title: LocalizedString; subtitle: LocalizedString }[]> = {
  respekt_disziplin: [
    { slug: 'regeln-einhalten', emoji: '📏', title: { de: 'Regeln einhalten', en: 'Following rules' }, subtitle: { de: 'Ich halte mich an Vereinbarungen, auch wenn keiner zuschaut.', en: 'I stick to agreements, even when no one\'s watching.' } },
    { slug: 'verlaesslich-sein', emoji: '⏰', title: { de: 'Verlässlich sein', en: 'Being reliable' }, subtitle: { de: 'Ich bin pünktlich und halte, was ich zusage.', en: 'I\'m on time and keep what I promise.' } },
    { slug: 'grenzen-respektieren', emoji: '🚧', title: { de: 'Grenzen respektieren', en: 'Respecting boundaries' }, subtitle: { de: 'Ich achte die Grenzen anderer, auch ungefragt.', en: 'I respect others\' boundaries, even unasked.' } },
    { slug: 'diszipliniert-bleiben', emoji: '🧱', title: { de: 'Diszipliniert bleiben', en: 'Staying disciplined' }, subtitle: { de: 'Ich bleibe dran, auch wenn es unbequem wird.', en: 'I stick with it, even when it gets uncomfortable.' } },
    { slug: 'respektvoll-kommunizieren', emoji: '💬', title: { de: 'Respektvoll kommunizieren', en: 'Communicating respectfully' }, subtitle: { de: 'Ich sage meine Meinung, ohne andere abzuwerten.', en: 'I say what I think without putting others down.' } },
    { slug: 'verantwortung-uebernehmen', emoji: '🧾', title: { de: 'Verantwortung übernehmen', en: 'Taking responsibility' }, subtitle: { de: 'Ich stehe zu dem, was ich tue.', en: 'I stand by what I do.' } },
  ],
  toleranz_geduld: [
    { slug: 'geduldig-bleiben', emoji: '⏳', title: { de: 'Geduldig bleiben', en: 'Staying patient' }, subtitle: { de: 'Ich halte Unsicherheit und Wartezeit aus.', en: 'I can tolerate uncertainty and waiting.' } },
    { slug: 'andere-meinungen-aushalten', emoji: '🗯️', title: { de: 'Andere Meinungen aushalten', en: 'Tolerating other opinions' }, subtitle: { de: 'Ich halte Widerspruch aus, ohne sofort zu kontern.', en: 'I can handle disagreement without countering right away.' } },
    { slug: 'nicht-sofort-urteilen', emoji: '⚖️', title: { de: 'Nicht sofort urteilen', en: 'Not judging right away' }, subtitle: { de: 'Ich warte mit meinem Urteil, bis ich mehr weiß.', en: 'I hold off judging until I know more.' } },
    { slug: 'ruhig-bleiben', emoji: '🌊', title: { de: 'Ruhig bleiben', en: 'Staying calm' }, subtitle: { de: 'Ich bleibe gelassen, auch wenn es stressig wird.', en: 'I stay composed, even when it gets stressful.' } },
    { slug: 'anders-sein-lassen', emoji: '🌈', title: { de: 'Anders sein lassen', en: 'Letting others be different' }, subtitle: { de: 'Ich lasse andere so sein, wie sie sind.', en: 'I let others be who they are.' } },
    { slug: 'warten-koennen', emoji: '🕰️', title: { de: 'Warten können', en: 'Being able to wait' }, subtitle: { de: 'Ich ertrage es, wenn Dinge nicht sofort passieren.', en: 'I can handle it when things don\'t happen right away.' } },
  ],
  begeisterung_fleiss: [
    { slug: 'dranbleiben', emoji: '🔁', title: { de: 'Dranbleiben', en: 'Sticking with it' }, subtitle: { de: 'Ich mache weiter, auch wenn die erste Motivation weg ist.', en: 'I keep going, even after the initial motivation fades.' } },
    { slug: 'mit-energie-starten', emoji: '⚡', title: { de: 'Mit Energie starten', en: 'Starting with energy' }, subtitle: { de: 'Ich gehe Dinge mit vollem Einsatz an.', en: 'I approach things with full commitment.' } },
    { slug: 'extra-meile-gehen', emoji: '🏃', title: { de: 'Extra Meile gehen', en: 'Going the extra mile' }, subtitle: { de: 'Ich tue mehr, als unbedingt nötig wäre.', en: 'I do more than strictly necessary.' } },
    { slug: 'begeisterung-zeigen', emoji: '🎉', title: { de: 'Begeisterung zeigen', en: 'Showing enthusiasm' }, subtitle: { de: 'Ich zeige offen, wenn mich etwas begeistert.', en: 'I openly show when something excites me.' } },
    { slug: 'fleissig-sein', emoji: '🛠️', title: { de: 'Fleißig sein', en: 'Being diligent' }, subtitle: { de: 'Ich arbeite konzentriert und ohne Ausreden.', en: 'I work focused, without excuses.' } },
    { slug: 'durchhalten', emoji: '🏋️', title: { de: 'Durchhalten', en: 'Persevering' }, subtitle: { de: 'Ich bleibe dran, wenn es schwierig wird.', en: 'I stick with it when things get hard.' } },
  ],
  fokus_aufmerksamkeit: [
    { slug: 'ablenkungen-ausschalten', emoji: '📵', title: { de: 'Ablenkungen ausschalten', en: 'Eliminating distractions' }, subtitle: { de: 'Ich schaffe mir bewusst störungsfreie Zeit.', en: 'I deliberately create uninterrupted time.' } },
    { slug: 'eine-sache-zu-ende-bringen', emoji: '✅', title: { de: 'Eine Sache zu Ende bringen', en: 'Finishing one thing' }, subtitle: { de: 'Ich beende, was ich anfange, bevor ich Neues starte.', en: 'I finish what I start before beginning something new.' } },
    { slug: 'praesent-sein', emoji: '🧘', title: { de: 'Präsent sein', en: 'Being present' }, subtitle: { de: 'Ich bin ganz da, wo ich gerade bin.', en: 'I\'m fully present wherever I am.' } },
    { slug: 'konzentriert-arbeiten', emoji: '🎯', title: { de: 'Konzentriert arbeiten', en: 'Working with focus' }, subtitle: { de: 'Ich arbeite fokussiert an einer Sache.', en: 'I focus on one thing at a time.' } },
    { slug: 'aufmerksam-zuhoeren', emoji: '👂', title: { de: 'Aufmerksam zuhören', en: 'Listening attentively' }, subtitle: { de: 'Ich schenke anderen meine volle Aufmerksamkeit.', en: 'I give others my full attention.' } },
    { slug: 'fokus-zurueckholen', emoji: '🔄', title: { de: 'Fokus zurückholen', en: 'Regaining focus' }, subtitle: { de: 'Ich merke Ablenkung und finde zurück zur Sache.', en: 'I notice distraction and find my way back.' } },
  ],
  verstehen_erkenntnis: [
    { slug: 'fragen-stellen', emoji: '❓', title: { de: 'Fragen stellen', en: 'Asking questions' }, subtitle: { de: 'Ich frage nach, statt anzunehmen.', en: 'I ask instead of assuming.' } },
    { slug: 'neues-verstehen-wollen', emoji: '🔍', title: { de: 'Neues verstehen wollen', en: 'Wanting to understand' }, subtitle: { de: 'Ich will wirklich verstehen, nicht nur wissen.', en: 'I want to truly understand, not just know.' } },
    { slug: 'nachdenken-statt-reagieren', emoji: '🤔', title: { de: 'Nachdenken statt reagieren', en: 'Thinking before reacting' }, subtitle: { de: 'Ich denke nach, bevor ich reagiere.', en: 'I think before I react.' } },
    { slug: 'zusammenhaenge-erkennen', emoji: '🧩', title: { de: 'Zusammenhänge erkennen', en: 'Recognizing connections' }, subtitle: { de: 'Ich suche das große Bild hinter den Details.', en: 'I look for the bigger picture behind the details.' } },
    { slug: 'wissen-anwenden', emoji: '🛠️', title: { de: 'Wissen anwenden', en: 'Applying knowledge' }, subtitle: { de: 'Ich nutze, was ich gelernt habe, aktiv.', en: 'I actively use what I\'ve learned.' } },
    { slug: 'aus-fehlern-lernen', emoji: '📘', title: { de: 'Aus Fehlern lernen', en: 'Learning from mistakes' }, subtitle: { de: 'Ich ziehe aus Fehlern eine echte Lehre.', en: 'I draw a real lesson from mistakes.' } },
  ],
  wertschaetzung_dankbarkeit: [
    { slug: 'danke-sagen', emoji: '🙏', title: { de: 'Danke sagen', en: 'Saying thank you' }, subtitle: { de: 'Ich bedanke mich bewusst und konkret.', en: 'I thank people deliberately and specifically.' } },
    { slug: 'wertschaetzung-zeigen', emoji: '💛', title: { de: 'Wertschätzung zeigen', en: 'Showing appreciation' }, subtitle: { de: 'Ich zeige, was mir an jemandem wichtig ist.', en: 'I show what matters to me about someone.' } },
    { slug: 'kleines-wuerdigen', emoji: '✨', title: { de: 'Kleines würdigen', en: 'Valuing small things' }, subtitle: { de: 'Ich nehme kleine gute Dinge bewusst wahr.', en: 'I consciously notice small good things.' } },
    { slug: 'komplimente-machen', emoji: '💬', title: { de: 'Komplimente machen', en: 'Giving compliments' }, subtitle: { de: 'Ich mache ehrliche, konkrete Komplimente.', en: 'I give honest, specific compliments.' } },
    { slug: 'dankbarkeit-spueren', emoji: '🌤️', title: { de: 'Dankbarkeit spüren', en: 'Feeling gratitude' }, subtitle: { de: 'Ich halte kurz inne, um Dankbarkeit zu fühlen.', en: 'I pause briefly to feel gratitude.' } },
    { slug: 'anerkennung-geben', emoji: '🏅', title: { de: 'Anderen Anerkennung geben', en: 'Giving others recognition' }, subtitle: { de: 'Ich erkenne die Leistung anderer öffentlich an.', en: 'I publicly acknowledge others\' achievements.' } },
  ],
  anteilnahme_solidaritaet: [
    { slug: 'fuer-andere-da-sein', emoji: '🤗', title: { de: 'Für andere da sein', en: 'Being there for others' }, subtitle: { de: 'Ich bin präsent, wenn es jemandem nicht gut geht.', en: 'I show up when someone isn\'t doing well.' } },
    { slug: 'mitfuehlen', emoji: '💞', title: { de: 'Mitfühlen', en: 'Empathizing' }, subtitle: { de: 'Ich versuche nachzuempfinden, wie es anderen geht.', en: 'I try to sense how others are feeling.' } },
    { slug: 'solidarisch-handeln', emoji: '✊', title: { de: 'Solidarisch handeln', en: 'Acting in solidarity' }, subtitle: { de: 'Ich stelle mich hinter Menschen, die es schwer haben.', en: 'I stand behind people who are struggling.' } },
    { slug: 'position-beziehen', emoji: '🗣️', title: { de: 'Position beziehen', en: 'Taking a stand' }, subtitle: { de: 'Ich beziehe Stellung, wenn Unrecht passiert.', en: 'I take a stand when injustice happens.' } },
    { slug: 'anteil-nehmen', emoji: '❤️', title: { de: 'Anteil nehmen', en: 'Showing you care' }, subtitle: { de: 'Ich frage aktiv nach, wie es jemandem geht.', en: 'I actively ask how someone is doing.' } },
    { slug: 'gemeinsam-stark-sein', emoji: '🤜🤛', title: { de: 'Gemeinsam stark sein', en: 'Being stronger together' }, subtitle: { de: 'Ich unterstütze das Wir statt nur das Ich.', en: 'I support the "we" instead of just the "I".' } },
  ],
  freundschaft_hilfsbereitschaft: [
    { slug: 'freundschaft-pflegen', emoji: '🌻', title: { de: 'Freundschaft pflegen', en: 'Nurturing friendship' }, subtitle: { de: 'Ich investiere aktiv Zeit in meine Freundschaften.', en: 'I actively invest time in my friendships.' } },
    { slug: 'hilfe-anbieten', emoji: '🙋', title: { de: 'Hilfe anbieten', en: 'Offering help' }, subtitle: { de: 'Ich biete Hilfe an, bevor ich gefragt werde.', en: 'I offer help before being asked.' } },
    { slug: 'fuer-jemanden-da-sein', emoji: '🫱', title: { de: 'Für jemanden da sein', en: 'Being there for someone' }, subtitle: { de: 'Ich bin verlässlich erreichbar, wenn es zählt.', en: 'I\'m reliably there when it counts.' } },
    { slug: 'verlaesslicher-freund-sein', emoji: '🔑', title: { de: 'Verlässlicher Freund sein', en: 'Being a reliable friend' }, subtitle: { de: 'Ich halte, was ich Freunden verspreche.', en: 'I keep what I promise my friends.' } },
    { slug: 'kontakt-halten', emoji: '📱', title: { de: 'Kontakt halten', en: 'Staying in touch' }, subtitle: { de: 'Ich melde mich aktiv, auch ohne Anlass.', en: 'I reach out actively, even without a reason.' } },
    { slug: 'ungefragt-helfen', emoji: '🎁', title: { de: 'Ungefragt helfen', en: 'Helping unasked' }, subtitle: { de: 'Ich helfe, ohne dass ich darum gebeten werde.', en: 'I help without being asked to.' } },
  ],
  fuersorge_unterstuetzung: [
    { slug: 'fuersorge-zeigen', emoji: '🫶', title: { de: 'Fürsorge zeigen', en: 'Showing care' }, subtitle: { de: 'Ich kümmere mich aktiv um das Wohl anderer.', en: 'I actively look after others\' wellbeing.' } },
    { slug: 'unterstuetzung-anbieten', emoji: '🤲', title: { de: 'Unterstützung anbieten', en: 'Offering support' }, subtitle: { de: 'Ich biete konkrete Unterstützung an.', en: 'I offer concrete support.' } },
    { slug: 'auf-andere-achten', emoji: '👀', title: { de: 'Auf andere achten', en: 'Paying attention to others' }, subtitle: { de: 'Ich merke, wenn es jemandem nicht gut geht.', en: 'I notice when someone isn\'t doing well.' } },
    { slug: 'zuhoeren-und-da-sein', emoji: '👂', title: { de: 'Zuhören und da sein', en: 'Listening and being there' }, subtitle: { de: 'Ich höre zu, ohne gleich zu lösen.', en: 'I listen without jumping to solve it.' } },
    { slug: 'jemanden-staerken', emoji: '💪', title: { de: 'Jemanden stärken', en: 'Building someone up' }, subtitle: { de: 'Ich baue jemanden aktiv auf.', en: 'I actively build someone up.' } },
    { slug: 'fuer-andere-sorgen', emoji: '🏡', title: { de: 'Für andere sorgen', en: 'Caring for others' }, subtitle: { de: 'Ich übernehme Sorge-Aufgaben, ohne gefragt zu werden.', en: 'I take on caretaking tasks without being asked.' } },
  ],
  vertrauen_verantwortung: [
    { slug: 'vertrauen-aufbauen', emoji: '🧱', title: { de: 'Vertrauen aufbauen', en: 'Building trust' }, subtitle: { de: 'Ich handle so, dass andere mir vertrauen können.', en: 'I act so that others can trust me.' } },
    { slug: 'verantwortung-uebernehmen', emoji: '🧾', title: { de: 'Verantwortung übernehmen', en: 'Taking responsibility' }, subtitle: { de: 'Ich übernehme Verantwortung, auch wenn es unbequem ist.', en: 'I take responsibility, even when it\'s uncomfortable.' } },
    { slug: 'verlaesslich-sein', emoji: '⏰', title: { de: 'Verlässlich sein', en: 'Being reliable' }, subtitle: { de: 'Ich tue, was ich sage.', en: 'I do what I say.' } },
    { slug: 'zu-fehlern-stehen', emoji: '🪞', title: { de: 'Zu Fehlern stehen', en: 'Owning up to mistakes' }, subtitle: { de: 'Ich gebe eigene Fehler offen zu.', en: 'I openly admit my own mistakes.' } },
    { slug: 'vertrauen-schenken', emoji: '🔓', title: { de: 'Vertrauen schenken', en: 'Extending trust' }, subtitle: { de: 'Ich gebe anderen einen Vertrauensvorschuss.', en: 'I give others the benefit of the doubt.' } },
    { slug: 'verantwortung-fuer-andere', emoji: '🛟', title: { de: 'Verantwortung für andere übernehmen', en: 'Taking responsibility for others' }, subtitle: { de: 'Ich übernehme Verantwortung, die über mich hinausgeht.', en: 'I take on responsibility that reaches beyond myself.' } },
  ],
  mut_rechenschaft: [
    { slug: 'mutig-sein', emoji: '🦁', title: { de: 'Mutig sein', en: 'Being brave' }, subtitle: { de: 'Ich tue heute etwas, das mich Überwindung kostet.', en: 'I do something today that takes courage.' } },
    { slug: 'fuer-fehler-geradestehen', emoji: '🙋‍♂️', title: { de: 'Für Fehler geradestehen', en: 'Owning your mistakes' }, subtitle: { de: 'Ich stehe zu Fehlern, statt sie zu vertuschen.', en: 'I own my mistakes instead of covering them up.' } },
    { slug: 'unbequemes-ansprechen', emoji: '🗣️', title: { de: 'Unbequemes ansprechen', en: 'Naming what\'s uncomfortable' }, subtitle: { de: 'Ich spreche aus, was unangenehm, aber wichtig ist.', en: 'I say what\'s uncomfortable but important.' } },
    { slug: 'position-beziehen', emoji: '🚩', title: { de: 'Position beziehen', en: 'Taking a stand' }, subtitle: { de: 'Ich beziehe klar Stellung, auch gegen den Strom.', en: 'I take a clear stand, even against the current.' } },
    { slug: 'rechenschaft-ablegen', emoji: '📋', title: { de: 'Rechenschaft ablegen', en: 'Being accountable' }, subtitle: { de: 'Ich erkläre offen, warum ich etwas getan habe.', en: 'I openly explain why I did something.' } },
    { slug: 'risiken-eingehen', emoji: '🎲', title: { de: 'Risiken eingehen', en: 'Taking risks' }, subtitle: { de: 'Ich gehe kalkulierte Risiken bewusst ein.', en: 'I deliberately take calculated risks.' } },
  ],
}

const VALUE_EMOJIS: Record<string, string> = {
  offenheit_kreativitaet: '🌱',
  respekt_disziplin: '🎯',
  toleranz_geduld: '⏳',
  begeisterung_fleiss: '🔥',
  fokus_aufmerksamkeit: '🧠',
  verstehen_erkenntnis: '💡',
  wertschaetzung_dankbarkeit: '🙏',
  anteilnahme_solidaritaet: '🤝',
  freundschaft_hilfsbereitschaft: '🧑‍🤝‍🧑',
  fuersorge_unterstuetzung: '🫂',
  vertrauen_verantwortung: '🛡️',
  mut_rechenschaft: '🦁',
}

export const TRAINING_VALUES: TrainingValueGroup[] = VALUES.map((v) => {
  const topics =
    v.key === 'offenheit_kreativitaet'
      ? OFFENHEIT_KREATIVITAET_TOPICS
      : (PLACEHOLDER_TOPIC_SPECS[v.key] ?? []).map((spec) =>
          placeholderTopic(v.key, v.name, spec.slug, spec.emoji, spec.title, spec.subtitle)
        )

  return {
    key: v.key,
    name: v.name,
    emoji: VALUE_EMOJIS[v.key] ?? '⭐',
    dimension: v.dimension,
    topics,
  }
})

// Flat lookup across all values — topic ids are unique across the whole catalog.
export const TRAINING_TOPICS: TrainingTopic[] = TRAINING_VALUES.flatMap((v) => v.topics)

export function getLevelForScore(score: number): 0 | 1 | 2 | 3 {
  if (score <= 2) return 0
  if (score <= 5) return 1
  if (score <= 8) return 2
  return 3
}
