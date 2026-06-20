export interface TrainingLevel {
  label: string
  emoji: string
  scoreRange: [number, number]
  challenge: string
}

export interface TrainingTopic {
  id: string
  emoji: string
  title: string
  subtitle: string
  levels: [TrainingLevel, TrainingLevel, TrainingLevel, TrainingLevel]
}

export const TRAINING_VALUE = {
  name: 'Offenheit & Kreativität',
  dimension: 'IDENTITY',
  emoji: '🌱',
}

export const TRAINING_DURATION = 7 // days

export const POINTS_PER_DAY = 10

export const TRAINING_TOPICS: TrainingTopic[] = [
  {
    id: 'neues-ausprobieren',
    emoji: '🆕',
    title: 'Neues ausprobieren',
    subtitle: 'Ich tue heute etwas, das ich gestern noch nicht getan habe.',
    levels: [
      {
        label: 'Schlafmodus',
        emoji: '😴',
        scoreRange: [0, 2],
        challenge:
          'Mach einmal am Tag eine winzig kleine Sache anders als sonst. Andere Playlist beim Aufstehen · anderer Sitzplatz · anderes Getränk · jemand anderen zuerst grüßen · Handy 5 Minuten später checken.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Mach heute etwas, das dich eine Sekunde zögern lässt — und tu es trotzdem. Jemanden ansprechen, den du sonst ignorierst · in der Klasse eine Frage stellen, die du dich nicht traust · 10 Minuten ohne Handy sitzen und einfach schauen, was passiert · jemandem ein ehrliches Kompliment machen.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Mach heute etwas Neues, das dich wirklich etwas kostet — Überwindung, Zeit oder Energie. Ein Gespräch mit jemandem führen, den du kaum kennst · etwas Kreatives starten ohne zu wissen, wie es endet · eine Meinung vertreten, die du sonst für dich behältst · jemandem helfen, ohne gefragt zu werden.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Du erfindest deine Challenge selbst. Aber eine Frage bleibt: Wer zieht mit dir? Lade jemanden ein, etwas Neues auszuprobieren · teile eine Geschichte, wie du mal gescheitert bist und was daraus wurde · starte etwas, das größer ist als du alleine.',
      },
    ],
  },
  {
    id: 'kreativ-sein',
    emoji: '🎨',
    title: 'Kreativ sein',
    subtitle: 'Ich drücke mich aus, auch wenn\'s nicht perfekt ist.',
    levels: [
      {
        label: 'Schlafmodus',
        emoji: '😴',
        scoreRange: [0, 2],
        challenge:
          'Mach heute eine kreative Sache — 5 Minuten — kein Ergebnis nötig. Kritzeln während du telefonierst · einen Satz aufschreiben, der dir durch den Kopf geht · ein Foto von etwas machen, das du schön findest · einen Song summen, den du magst.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Mach heute etwas Kreatives, das eine andere Person sehen könnte — auch wenn du es nicht zeigst. Einen Satz aufschreiben, der sich wahr anfühlt · ein Bild machen, das eine Stimmung zeigt · etwas kochen und anrichten, als wäre es ein Restaurant · eine Playlist für einen Moment erstellen.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Mach heute etwas Kreatives, das über dich hinausgeht — etwas, das jemand anderen berührt, überrascht oder zum Nachdenken bringt. Jemandem eine handgeschriebene Nachricht hinterlassen · ein Foto mit einer Geschichte dazu teilen · ein Problem kreativ lösen und erklären wie · etwas Selbstgemachtes verschenken.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Erschaffe heute etwas — egal wie klein — das ohne dich nicht existieren würde. Und frag dich dabei: Tue ich das für mich — oder für den Applaus?',
      },
    ],
  },
  {
    id: 'grosszuegig-sein',
    emoji: '🤲',
    title: 'Großzügig sein',
    subtitle: 'Ich gebe, ohne sofort eine Gegenleistung zu erwarten.',
    levels: [
      {
        label: 'Schlafmodus',
        emoji: '😴',
        scoreRange: [0, 2],
        challenge:
          'Tu heute eine kleine Sache für jemand anderen — ohne dass er es erwartet. Tür aufhalten · Notizen teilen · jemandem beim Tragen helfen · ein Lächeln, das du nicht schuldest.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Gib heute etwas, das dich wirklich etwas kostet — Zeit, Energie oder Aufmerksamkeit. Jemandem wirklich zuhören, ohne aufs Handy zu schauen · Wissen teilen, das dir nützt · Zeit investieren, die du eigentlich nicht hast · jemandem ein ehrliches, durchdachtes Kompliment machen.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Gib heute etwas, das einen echten Unterschied macht — für eine Person in deinem Umfeld. Jemandem helfen, der es nicht erwartet · eine Aufgabe übernehmen, die niemand will · jemandem sagen, was du an ihm schätzt — konkret und ehrlich · Zeit für jemanden schaffen, der gerade schwierig ist.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Gib heute etwas, das über deinen direkten Kreis hinausgeht. Einer fremden Person helfen · etwas in deiner Community beitragen · Wissen oder Erfahrung teilen, das anderen nützt, die du nie treffen wirst.',
      },
    ],
  },
  {
    id: 'bereit-sein',
    emoji: '🚪',
    title: 'Bereit sein',
    subtitle: 'Ich sage Ja, bevor ich weiß, wie es ausgeht.',
    levels: [
      {
        label: 'Schlafmodus',
        emoji: '😴',
        scoreRange: [0, 2],
        challenge:
          'Sag heute einmal Ja zu etwas, das du normalerweise ablehnst — auch wenn du nicht weißt, wie es ausgeht. Eine Einladung annehmen · eine Aufgabe übernehmen, die du nicht kennst · einen Vorschlag ausprobieren, den jemand anderes macht · einfach mitgehen, ohne den Plan zu kennen.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Sag heute Ja zu etwas, das dich wirklich einen Moment zögern lässt — und beobachte, was danach passiert. Eine Meinung vertreten, die du sonst für dich behältst · eine Rolle übernehmen, die du dir nicht zutraust · jemandem vertrauen, dem du noch nicht ganz vertraust · einen Plan loslassen und improvisieren.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Übernimm heute Verantwortung für etwas, das niemand sonst übernimmt. Eine Aufgabe in der Gruppe, die liegen bleibt · ein Gespräch, das niemand führen will · eine Entscheidung treffen, wenn alle warten · für jemanden eintreten, der sich nicht traut.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Geh heute in eine Situation, die größer ist als du alleine — und sei trotzdem bereit. Ein Projekt starten, dessen Ausgang offen ist · jemandem helfen, der dich überfordert · eine Verantwortung übernehmen, für die du dich nicht qualifiziert fühlst — und trotzdem anfangen.',
      },
    ],
  },
  {
    id: 'ideen-wertschaetzen',
    emoji: '👂',
    title: 'Ideen anderer wertschätzen',
    subtitle: 'Ich höre zu, ohne sofort zu urteilen.',
    levels: [
      {
        label: 'Schlafmodus',
        emoji: '😴',
        scoreRange: [0, 2],
        challenge:
          'Lass heute eine Person ausreden — komplett. Ohne zu unterbrechen, ohne innerlich schon zu antworten. Einmal reicht. Wirklich zuhören — auch wenn du schon weißt, was du sagen willst.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Finde heute in einer Idee, die dir fremd oder falsch vorkommt, einen Punkt, der Sinn macht. Nicht zustimmen müssen — nur einen Aspekt finden, der nachvollziehbar ist. Und ihn benennen.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Stell heute eine echte Frage — eine, die zeigt, dass du zugehört hast. Nicht "Ja, aber..." · nicht "Ich finde..." · sondern: "Was meinst du genau mit...?" oder "Wie bist du darauf gekommen?"',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Schaffe heute einen Moment, in dem jemand anderes wirklich gehört wird — von dir. Nicht um zu helfen. Nicht um zu lösen. Einfach: da sein und zuhören.',
      },
    ],
  },
  {
    id: 'offen-fuer-andere-welten',
    emoji: '🌍',
    title: 'Offen für andere Welten',
    subtitle: 'Ich begegne Fremdem mit Neugier statt Abwehr.',
    levels: [
      {
        label: 'Schlafmodus',
        emoji: '😴',
        scoreRange: [0, 2],
        challenge:
          'Lerne heute eine Kleinigkeit über etwas, das dir fremd ist — eine Kultur, eine Lebensweise, eine Meinung. Ein Wort in einer anderen Sprache · ein Gericht aus einem anderen Land nachschlagen · einen Artikel über etwas lesen, das du normalerweise überspringst.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Führe heute ein echtes Gespräch mit jemandem, dessen Hintergrund sich von deinem unterscheidet — und stelle eine echte Frage. Nicht "Woher kommst du?" — sondern: "Was ist dir wichtig?" oder "Was vermisst du manchmal?"',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Bring heute eine Perspektive aus einer anderen Welt in dein eigenes Denken ein. Wie würde jemand aus einem anderen Land dieses Problem sehen? · Was würde jemand aus einer anderen Generation dazu sagen? · Was würde jemand, der das Gegenteil von dir glaubt, als Argument bringen?',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Sei heute Brücke zwischen zwei Welten — bring zwei Menschen oder Perspektiven zusammen, die sich sonst nicht begegnen würden.',
      },
    ],
  },
]

export function getLevelForScore(score: number): 0 | 1 | 2 | 3 {
  if (score <= 2) return 0
  if (score <= 5) return 1
  if (score <= 8) return 2
  return 3
}
