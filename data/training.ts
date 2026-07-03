import { VALUES, type Dimension } from './questions'

export interface TrainingLevel {
  label: string
  emoji: string
  scoreRange: [number, number]
  challenge: string
  neuroFakt: string
}

export interface TrainingTopic {
  id: string
  emoji: string
  title: string
  subtitle: string
  levels: [TrainingLevel, TrainingLevel, TrainingLevel, TrainingLevel]
}

export interface TrainingValueGroup {
  key: string
  name: string
  emoji: string
  dimension: Dimension
  topics: TrainingTopic[]
}

export const TRAINING_DURATION = 7
export const POINTS_PER_DAY = 10

const LEVEL_META = [
  { label: 'Schlafmodus', emoji: '😴', scoreRange: [0, 2] as [number, number] },
  { label: 'Augen auf', emoji: '👀', scoreRange: [3, 5] as [number, number] },
  { label: 'Profi-Training', emoji: '💪', scoreRange: [6, 8] as [number, number] },
  { label: 'Champion', emoji: '🏆', scoreRange: [9, 10] as [number, number] },
]

const PLACEHOLDER_INTROS = [
  'Mach heute einen ersten kleinen Schritt in diese Richtung.',
  'Trau dich, es heute bewusst zu tun — auch wenn es dich einen Moment zögern lässt.',
  'Geh heute einen Schritt weiter, der dich wirklich etwas kostet — Zeit, Mut oder Energie.',
  'Mach daraus heute etwas, das über dich hinausgeht — und andere mitzieht.',
]

// Placeholder content for values without a finished training catalog yet.
// Replace with real challenges + neuro-facts, same style as "Offenheit & Kreativität".
function placeholderLevels(valueName: string, topicTitle: string): [TrainingLevel, TrainingLevel, TrainingLevel, TrainingLevel] {
  return LEVEL_META.map((meta, i) => ({
    label: meta.label,
    emoji: meta.emoji,
    scoreRange: meta.scoreRange,
    challenge: `${PLACEHOLDER_INTROS[i]} Thema: „${topicTitle}“ (${valueName}). 🚧 Platzhalter — wird durch echten Trainingsinhalt ersetzt.`,
    neuroFakt: `🚧 Platzhalter: Hier folgt bald ein Neuro-Fakt, der erklärt, warum „${topicTitle}“ ${valueName} stärkt.`,
  })) as [TrainingLevel, TrainingLevel, TrainingLevel, TrainingLevel]
}

function placeholderTopic(valueKey: string, valueName: string, slug: string, emoji: string, title: string, subtitle: string): TrainingTopic {
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
    title: 'Neues ausprobieren',
    subtitle: 'Ich tue heute etwas, das ich gestern noch nicht getan habe.',
    levels: [
      {
        label: 'Schlafmodus',
        emoji: '😴',
        scoreRange: [0, 2],
        challenge:
          'Mach einmal am Tag eine winzig kleine Sache anders als sonst. Andere Playlist beim Aufstehen · anderer Sitzplatz · anderes Getränk · jemand anderen zuerst grüßen · Handy 5 Minuten später checken.',
        neuroFakt:
          'Dein Gehirn verbraucht 20 % seiner Energie — obwohl es nur 2 % deines Körpergewichts ist. Kein Wunder, dass es Routinen liebt. Aber mit 16–19 Jahren bist du auf dem Höhepunkt deiner Neuroplastizität. Jede winzige Abweichung vom Autopiloten ist ein echter Trainingsreiz für dein Gehirn.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Mach heute etwas, das dich eine Sekunde zögern lässt — und tu es trotzdem. Jemanden ansprechen, den du sonst ignorierst · in der Klasse eine Frage stellen, die du dich nicht traust · 10 Minuten ohne Handy sitzen und einfach schauen, was passiert · jemandem ein ehrliches Kompliment machen.',
        neuroFakt:
          'Das kurze Zögern, das du spürst? Das ist deine Amygdala — dein innerer Feueralarm. Sie piept bei allem Unbekannten. Früher: Säbelzahntiger. Heute: neue Person, neue Situation. Das Wahrnehmen dieser Reaktion ohne Selbstverurteilung ist der erste Schritt aus dem Autopiloten.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Mach heute etwas Neues, das dich wirklich etwas kostet — Überwindung, Zeit oder Energie. Ein Gespräch mit jemandem führen, den du kaum kennst · etwas Kreatives starten ohne zu wissen, wie es endet · eine Meinung vertreten, die du sonst für dich behältst · jemandem helfen, ohne gefragt zu werden.',
        neuroFakt:
          'Wenn du Neues mit anderen teilst, feuern deine Spiegelneuronen — du erlebst buchstäblich mit, was andere erleben. Mitgefühl ist trainierbar, genau wie ein Muskel. Es beginnt damit, deine eigenen Erfahrungen wahrzunehmen und zu teilen.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Du erfindest deine Challenge selbst. Aber eine Frage bleibt: Wer zieht mit dir? Lade jemanden ein, etwas Neues auszuprobieren · teile eine Geschichte, wie du mal gescheitert bist und was daraus wurde · starte etwas, das größer ist als du alleine.',
        neuroFakt:
          'Was Mbappé, Billie Eilish und alle, die du wirklich bewunderst, gemeinsam haben: Sie haben nie aufgehört zu lernen — und haben es nie als Pflicht gesehen. Menschen, die Empathie für sich selbst trainieren, treffen bessere Entscheidungen und sind resilienter unter Druck.',
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
        neuroFakt:
          'Dein Gehirn hat ein Netzwerk, das nur aktiv ist, wenn du nicht fokussiert arbeitest — das Default Mode Network. Es ist zuständig für Träumen, Fantasieren und kreative Verbindungen. Kreativität ist kein Talent, das manche haben und andere nicht — es ist ein Netzwerk, das jeder besitzt.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Mach heute etwas Kreatives, das eine andere Person sehen könnte — auch wenn du es nicht zeigst. Einen Satz aufschreiben, der sich wahr anfühlt · ein Bild machen, das eine Stimmung zeigt · etwas kochen und anrichten, als wäre es ein Restaurant · eine Playlist für einen Moment erstellen.',
        neuroFakt:
          'Wenn du etwas machst und sofort denkst "das ist schlecht" — das ist nicht die Wahrheit. Das ist deine Amygdala, die Bedrohung wittert. Soziale Bewertung ist für dein Gehirn genauso bedrohlich wie ein Säbelzahntiger. Freundlich mit sich selbst sein reduziert diese Alarmreaktion messbar.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Mach heute etwas Kreatives, das über dich hinausgeht — etwas, das jemand anderen berührt, überrascht oder zum Nachdenken bringt. Jemandem eine handgeschriebene Nachricht hinterlassen · ein Foto mit einer Geschichte dazu teilen · ein Problem kreativ lösen und erklären wie · etwas Selbstgemachtes verschenken.',
        neuroFakt:
          'Wenn du etwas Kreatives mit anderen teilst, feuern Spiegelneuronen — die andere Person erlebt mit, was du ausdrückst. Geteilte positive Erfahrungen aktivieren das Fürsorge-Motivationssystem: Oxytocin fließt, Verbindung entsteht. Kreativität ist eine der ältesten Formen menschlicher Verbindung.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Erschaffe heute etwas — egal wie klein — das ohne dich nicht existieren würde. Und frag dich dabei: Tue ich das für mich — oder für den Applaus?',
        neuroFakt:
          'Was Basquiat, Beyoncé und Virgil Abloh gemeinsam haben: Sie haben nicht gewartet, bis sie gut genug waren. Sie haben angefangen — und durch das Machen sind sie gut geworden. Dein Gehirn ist mit 16–19 Jahren auf dem Höhepunkt seiner Plastizität. Das ist deine Champion League. Jetzt.',
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
        neuroFakt:
          'Wenn du jemandem hilfst, schüttet dein Gehirn Oxytocin, Serotonin und Dopamin aus — gleichzeitig. Neurowissenschaftler nennen das den "Helper\'s High". Großzügigkeit aktiviert das Fürsorge-Motivationssystem — das System, das sich am tiefsten mit Sinn verbindet. Geben ist also nicht nur für andere gut.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Gib heute etwas, das dich wirklich etwas kostet — Zeit, Energie oder Aufmerksamkeit. Jemandem wirklich zuhören, ohne aufs Handy zu schauen · Wissen teilen, das dir nützt · Zeit investieren, die du eigentlich nicht hast · jemandem ein ehrliches, durchdachtes Kompliment machen.',
        neuroFakt:
          'Mitgefühl für andere beginnt mit Mitgefühl für sich selbst. Wenn du innerlich auf ein Danke wartest — das ist kein Fehler. Das ist dein Gehirn, das Fairness sucht. Fairness ist neurobiologisch tief verankert. Das zu bemerken, ohne dich zu verurteilen, trainiert den Muskel echter Großzügigkeit.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Gib heute etwas, das einen echten Unterschied macht — für eine Person in deinem Umfeld. Jemandem helfen, der es nicht erwartet · eine Aufgabe übernehmen, die niemand will · jemandem sagen, was du an ihm schätzt — konkret und ehrlich · Zeit für jemanden schaffen, der gerade schwierig ist.',
        neuroFakt:
          'Wenn jemand eine großzügige Geste erlebt, gibt er sie mit hoher Wahrscheinlichkeit weiter — an jemand völlig anderen. Das nennt sich "Pay it forward"-Effekt. Deine eine Geste heute kann eine Kettenreaktion auslösen, die du nie siehst.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Gib heute etwas, das über deinen direkten Kreis hinausgeht. Einer fremden Person helfen · etwas in deiner Community beitragen · Wissen oder Erfahrung teilen, das anderen nützt, die du nie treffen wirst.',
        neuroFakt:
          'Menschen, die regelmäßig großzügig handeln, haben nachweislich weniger Stresshormone, mehr soziale Verbindungen und ein stärkeres Gefühl von Sinn. Champions wissen: Geben ist keine Schwäche. Es ist Strategie — nicht weil du etwas zurückbekommst, sondern weil du weißt, wer du bist.',
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
        neuroFakt:
          'Unsicherheit aktiviert dein Bedrohungssystem — Cortisol steigt, Amygdala piept. Aber wenn du trotzdem Ja sagst und es gut ausgeht? Dopamin-Schub. Dein Gehirn lernt: Unsicherheit = manchmal Belohnung. Je öfter du das erlebst, desto mutiger wird dein Gehirn im Umgang mit dem Unbekannten.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Sag heute Ja zu etwas, das dich wirklich einen Moment zögern lässt — und beobachte, was danach passiert. Eine Meinung vertreten, die du sonst für dich behältst · eine Rolle übernehmen, die du dir nicht zutraust · jemandem vertrauen, dem du noch nicht ganz vertraust · einen Plan loslassen und improvisieren.',
        neuroFakt:
          'Freundlich mit sich selbst sein in schwierigen Momenten stärkt die Fähigkeit, Risiken einzugehen. Warum? Dein Gehirn verschwendet weniger Energie damit, sich selbst zu schützen — und hat mehr Energie, um sich zu öffnen. Bereitschaft beginnt nicht mit Mut. Sie beginnt damit, das Zögern nicht zu verurteilen.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Übernimm heute Verantwortung für etwas, das niemand sonst übernimmt. Eine Aufgabe in der Gruppe, die liegen bleibt · ein Gespräch, das niemand führen will · eine Entscheidung treffen, wenn alle warten · für jemanden eintreten, der sich nicht traut.',
        neuroFakt:
          'Wenn eine Person in einer Gruppe Verantwortung übernimmt, steigt die Wahrscheinlichkeit, dass andere folgen — messbar. Das nennt sich soziale Modellierung. Dein Gehirn lernt durch Beobachtung via Spiegelneuronen. Auf dieser Stufe machst du Bereitschaft für andere möglich — das ist Führung ohne Titel.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Geh heute in eine Situation, die größer ist als du alleine — und sei trotzdem bereit. Ein Projekt starten, dessen Ausgang offen ist · jemandem helfen, der dich überfordert · eine Verantwortung übernehmen, für die du dich nicht qualifiziert fühlst — und trotzdem anfangen.',
        neuroFakt:
          'Die größten Momente in deinem Leben werden nicht die sein, bei denen du alles wusstest. Sie werden die sein, bei denen du Ja gesagt hast — obwohl du es nicht wusstest. Menschen mit hoher Selbst-Empathie und sozialer Verbundenheit sind nachweislich resilienter unter Druck.',
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
        neuroFakt:
          'Menschen sprechen ~130 Wörter pro Minute. Dein Gehirn verarbeitet ~500. Das heißt: Dein Gehirn hat beim Zuhören Leerlauf — und füllt ihn mit eigenen Gedanken. Echtes Zuhören ist aktive Arbeit gegen den Autopiloten und trainiert deinen präfrontalen Kortex, der Impulse kontrolliert.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Finde heute in einer Idee, die dir fremd oder falsch vorkommt, einen Punkt, der Sinn macht. Nicht zustimmen müssen — nur einen Aspekt finden, der nachvollziehbar ist. Und ihn benennen.',
        neuroFakt:
          'Empathie und Mitgefühl sind zwei verschiedene Dinge. Empathie: Ich verstehe, wie du dich fühlst. Mitgefühl: Ich will, dass es dir gut geht. Du musst einer Idee nicht zustimmen, um sie zu verstehen — und Verstehen führt nachweislich zu besseren Entscheidungen als Urteilen.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Stell heute eine echte Frage — eine, die zeigt, dass du zugehört hast. Nicht "Ja, aber..." · nicht "Ich finde..." · sondern: "Was meinst du genau mit...?" oder "Wie bist du darauf gekommen?"',
        neuroFakt:
          'Wenn jemand wirklich zuhört, synchronisieren sich die Gehirnwellen von Sprecher und Zuhörer — buchstäblich. Das nennt sich neuronales Koppeln. Je besser das Zuhören, desto stärker die Synchronisation und desto tiefer das gegenseitige Verständnis.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Schaffe heute einen Moment, in dem jemand anderes wirklich gehört wird — von dir. Nicht um zu helfen. Nicht um zu lösen. Einfach: da sein und zuhören.',
        neuroFakt:
          '"Das tiefste Zuhören ist das, das den anderen verändert, ohne dass du ein Wort gesagt hast." (Otto Scharmer) Menschen, die wirklich gehört werden, zeigen messbar weniger Stressreaktionen im Gehirn. Dein Zuhören ist aktive Fürsorge.',
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
        neuroFakt:
          'Dein Gehirn sortiert blitzschnell in "vertraut" und "fremd". Fremd = erstmal Vorsicht. Das ist Biologie, kein Fehler. Aber Biologie ist kein Schicksal: Jede kleine Begegnung mit dem Fremden trainiert dein Gehirn, die Kategorie "fremd" zu erweitern.',
      },
      {
        label: 'Augen auf',
        emoji: '👀',
        scoreRange: [3, 5],
        challenge:
          'Führe heute ein echtes Gespräch mit jemandem, dessen Hintergrund sich von deinem unterscheidet — und stelle eine echte Frage. Nicht "Woher kommst du?" — sondern: "Was ist dir wichtig?" oder "Was vermisst du manchmal?"',
        neuroFakt:
          'Die Kontakthypothese — eine der robustesten Erkenntnisse der Sozialpsychologie: Echter Kontakt mit Menschen, die wir als "fremd" kategorisieren, verändert diese Kategorie messbar. Nicht durch Überzeugung — durch Erfahrung. Jedes echte Gespräch ist ein kleiner Schritt dahin.',
      },
      {
        label: 'Profi-Training',
        emoji: '💪',
        scoreRange: [6, 8],
        challenge:
          'Bring heute eine Perspektive aus einer anderen Welt in dein eigenes Denken ein. Wie würde jemand aus einem anderen Land dieses Problem sehen? · Was würde jemand aus einer anderen Generation dazu sagen? · Was würde jemand, der das Gegenteil von dir glaubt, als Argument bringen?',
        neuroFakt:
          'Gruppen mit unterschiedlichen Hintergründen lösen komplexe Probleme nachweislich besser als homogene Gruppen — auch wenn die homogenen Gruppen aus "klügeren" Einzelpersonen bestehen. Offenheit ist keine Tugend. Sie ist ein kognitiver Vorteil.',
      },
      {
        label: 'Champion',
        emoji: '🏆',
        scoreRange: [9, 10],
        challenge:
          'Sei heute Brücke zwischen zwei Welten — bring zwei Menschen oder Perspektiven zusammen, die sich sonst nicht begegnen würden.',
        neuroFakt:
          'Nelson Mandela verbrachte 27 Jahre im Gefängnis — und kam raus mit mehr Verständnis für seine Feinde als die meisten Menschen je für ihre Freunde aufbringen. Menschen mit hoher sozialer Offenheit sind nachweislich resilienter, kreativer und führungsstärker.',
      },
    ],
  },
]

// title + subtitle + emoji per topic for the 11 values that don't have a
// finished catalog yet. Levels are auto-filled with placeholder content.
const PLACEHOLDER_TOPIC_SPECS: Record<string, { slug: string; emoji: string; title: string; subtitle: string }[]> = {
  respekt_disziplin: [
    { slug: 'regeln-einhalten', emoji: '📏', title: 'Regeln einhalten', subtitle: 'Ich halte mich an Vereinbarungen, auch wenn keiner zuschaut.' },
    { slug: 'verlaesslich-sein', emoji: '⏰', title: 'Verlässlich sein', subtitle: 'Ich bin pünktlich und halte, was ich zusage.' },
    { slug: 'grenzen-respektieren', emoji: '🚧', title: 'Grenzen respektieren', subtitle: 'Ich achte die Grenzen anderer, auch ungefragt.' },
    { slug: 'diszipliniert-bleiben', emoji: '🧱', title: 'Diszipliniert bleiben', subtitle: 'Ich bleibe dran, auch wenn es unbequem wird.' },
    { slug: 'respektvoll-kommunizieren', emoji: '💬', title: 'Respektvoll kommunizieren', subtitle: 'Ich sage meine Meinung, ohne andere abzuwerten.' },
    { slug: 'verantwortung-uebernehmen', emoji: '🧾', title: 'Verantwortung übernehmen', subtitle: 'Ich stehe zu dem, was ich tue.' },
  ],
  toleranz_geduld: [
    { slug: 'geduldig-bleiben', emoji: '⏳', title: 'Geduldig bleiben', subtitle: 'Ich halte Unsicherheit und Wartezeit aus.' },
    { slug: 'andere-meinungen-aushalten', emoji: '🗯️', title: 'Andere Meinungen aushalten', subtitle: 'Ich halte Widerspruch aus, ohne sofort zu kontern.' },
    { slug: 'nicht-sofort-urteilen', emoji: '⚖️', title: 'Nicht sofort urteilen', subtitle: 'Ich warte mit meinem Urteil, bis ich mehr weiß.' },
    { slug: 'ruhig-bleiben', emoji: '🌊', title: 'Ruhig bleiben', subtitle: 'Ich bleibe gelassen, auch wenn es stressig wird.' },
    { slug: 'anders-sein-lassen', emoji: '🌈', title: 'Anders sein lassen', subtitle: 'Ich lasse andere so sein, wie sie sind.' },
    { slug: 'warten-koennen', emoji: '🕰️', title: 'Warten können', subtitle: 'Ich ertrage es, wenn Dinge nicht sofort passieren.' },
  ],
  begeisterung_fleiss: [
    { slug: 'dranbleiben', emoji: '🔁', title: 'Dranbleiben', subtitle: 'Ich mache weiter, auch wenn die erste Motivation weg ist.' },
    { slug: 'mit-energie-starten', emoji: '⚡', title: 'Mit Energie starten', subtitle: 'Ich gehe Dinge mit vollem Einsatz an.' },
    { slug: 'extra-meile-gehen', emoji: '🏃', title: 'Extra Meile gehen', subtitle: 'Ich tue mehr, als unbedingt nötig wäre.' },
    { slug: 'begeisterung-zeigen', emoji: '🎉', title: 'Begeisterung zeigen', subtitle: 'Ich zeige offen, wenn mich etwas begeistert.' },
    { slug: 'fleissig-sein', emoji: '🛠️', title: 'Fleißig sein', subtitle: 'Ich arbeite konzentriert und ohne Ausreden.' },
    { slug: 'durchhalten', emoji: '🏋️', title: 'Durchhalten', subtitle: 'Ich bleibe dran, wenn es schwierig wird.' },
  ],
  fokus_aufmerksamkeit: [
    { slug: 'ablenkungen-ausschalten', emoji: '📵', title: 'Ablenkungen ausschalten', subtitle: 'Ich schaffe mir bewusst störungsfreie Zeit.' },
    { slug: 'eine-sache-zu-ende-bringen', emoji: '✅', title: 'Eine Sache zu Ende bringen', subtitle: 'Ich beende, was ich anfange, bevor ich Neues starte.' },
    { slug: 'praesent-sein', emoji: '🧘', title: 'Präsent sein', subtitle: 'Ich bin ganz da, wo ich gerade bin.' },
    { slug: 'konzentriert-arbeiten', emoji: '🎯', title: 'Konzentriert arbeiten', subtitle: 'Ich arbeite fokussiert an einer Sache.' },
    { slug: 'aufmerksam-zuhoeren', emoji: '👂', title: 'Aufmerksam zuhören', subtitle: 'Ich schenke anderen meine volle Aufmerksamkeit.' },
    { slug: 'fokus-zurueckholen', emoji: '🔄', title: 'Fokus zurückholen', subtitle: 'Ich merke Ablenkung und finde zurück zur Sache.' },
  ],
  verstehen_erkenntnis: [
    { slug: 'fragen-stellen', emoji: '❓', title: 'Fragen stellen', subtitle: 'Ich frage nach, statt anzunehmen.' },
    { slug: 'neues-verstehen-wollen', emoji: '🔍', title: 'Neues verstehen wollen', subtitle: 'Ich will wirklich verstehen, nicht nur wissen.' },
    { slug: 'nachdenken-statt-reagieren', emoji: '🤔', title: 'Nachdenken statt reagieren', subtitle: 'Ich denke nach, bevor ich reagiere.' },
    { slug: 'zusammenhaenge-erkennen', emoji: '🧩', title: 'Zusammenhänge erkennen', subtitle: 'Ich suche das große Bild hinter den Details.' },
    { slug: 'wissen-anwenden', emoji: '🛠️', title: 'Wissen anwenden', subtitle: 'Ich nutze, was ich gelernt habe, aktiv.' },
    { slug: 'aus-fehlern-lernen', emoji: '📘', title: 'Aus Fehlern lernen', subtitle: 'Ich ziehe aus Fehlern eine echte Lehre.' },
  ],
  wertschaetzung_dankbarkeit: [
    { slug: 'danke-sagen', emoji: '🙏', title: 'Danke sagen', subtitle: 'Ich bedanke mich bewusst und konkret.' },
    { slug: 'wertschaetzung-zeigen', emoji: '💛', title: 'Wertschätzung zeigen', subtitle: 'Ich zeige, was mir an jemandem wichtig ist.' },
    { slug: 'kleines-wuerdigen', emoji: '✨', title: 'Kleines würdigen', subtitle: 'Ich nehme kleine gute Dinge bewusst wahr.' },
    { slug: 'komplimente-machen', emoji: '💬', title: 'Komplimente machen', subtitle: 'Ich mache ehrliche, konkrete Komplimente.' },
    { slug: 'dankbarkeit-spueren', emoji: '🌤️', title: 'Dankbarkeit spüren', subtitle: 'Ich halte kurz inne, um Dankbarkeit zu fühlen.' },
    { slug: 'anerkennung-geben', emoji: '🏅', title: 'Anderen Anerkennung geben', subtitle: 'Ich erkenne die Leistung anderer öffentlich an.' },
  ],
  anteilnahme_solidaritaet: [
    { slug: 'fuer-andere-da-sein', emoji: '🤗', title: 'Für andere da sein', subtitle: 'Ich bin präsent, wenn es jemandem nicht gut geht.' },
    { slug: 'mitfuehlen', emoji: '💞', title: 'Mitfühlen', subtitle: 'Ich versuche nachzuempfinden, wie es anderen geht.' },
    { slug: 'solidarisch-handeln', emoji: '✊', title: 'Solidarisch handeln', subtitle: 'Ich stelle mich hinter Menschen, die es schwer haben.' },
    { slug: 'position-beziehen', emoji: '🗣️', title: 'Position beziehen', subtitle: 'Ich beziehe Stellung, wenn Unrecht passiert.' },
    { slug: 'anteil-nehmen', emoji: '❤️', title: 'Anteil nehmen', subtitle: 'Ich frage aktiv nach, wie es jemandem geht.' },
    { slug: 'gemeinsam-stark-sein', emoji: '🤜🤛', title: 'Gemeinsam stark sein', subtitle: 'Ich unterstütze das Wir statt nur das Ich.' },
  ],
  freundschaft_hilfsbereitschaft: [
    { slug: 'freundschaft-pflegen', emoji: '🌻', title: 'Freundschaft pflegen', subtitle: 'Ich investiere aktiv Zeit in meine Freundschaften.' },
    { slug: 'hilfe-anbieten', emoji: '🙋', title: 'Hilfe anbieten', subtitle: 'Ich biete Hilfe an, bevor ich gefragt werde.' },
    { slug: 'fuer-jemanden-da-sein', emoji: '🫱', title: 'Für jemanden da sein', subtitle: 'Ich bin verlässlich erreichbar, wenn es zählt.' },
    { slug: 'verlaesslicher-freund-sein', emoji: '🔑', title: 'Verlässlicher Freund sein', subtitle: 'Ich halte, was ich Freunden verspreche.' },
    { slug: 'kontakt-halten', emoji: '📱', title: 'Kontakt halten', subtitle: 'Ich melde mich aktiv, auch ohne Anlass.' },
    { slug: 'ungefragt-helfen', emoji: '🎁', title: 'Ungefragt helfen', subtitle: 'Ich helfe, ohne dass ich darum gebeten werde.' },
  ],
  fuersorge_unterstuetzung: [
    { slug: 'fuersorge-zeigen', emoji: '🫶', title: 'Fürsorge zeigen', subtitle: 'Ich kümmere mich aktiv um das Wohl anderer.' },
    { slug: 'unterstuetzung-anbieten', emoji: '🤲', title: 'Unterstützung anbieten', subtitle: 'Ich biete konkrete Unterstützung an.' },
    { slug: 'auf-andere-achten', emoji: '👀', title: 'Auf andere achten', subtitle: 'Ich merke, wenn es jemandem nicht gut geht.' },
    { slug: 'zuhoeren-und-da-sein', emoji: '👂', title: 'Zuhören und da sein', subtitle: 'Ich höre zu, ohne gleich zu lösen.' },
    { slug: 'jemanden-staerken', emoji: '💪', title: 'Jemanden stärken', subtitle: 'Ich baue jemanden aktiv auf.' },
    { slug: 'fuer-andere-sorgen', emoji: '🏡', title: 'Für andere sorgen', subtitle: 'Ich übernehme Sorge-Aufgaben, ohne gefragt zu werden.' },
  ],
  vertrauen_verantwortung: [
    { slug: 'vertrauen-aufbauen', emoji: '🧱', title: 'Vertrauen aufbauen', subtitle: 'Ich handle so, dass andere mir vertrauen können.' },
    { slug: 'verantwortung-uebernehmen', emoji: '🧾', title: 'Verantwortung übernehmen', subtitle: 'Ich übernehme Verantwortung, auch wenn es unbequem ist.' },
    { slug: 'verlaesslich-sein', emoji: '⏰', title: 'Verlässlich sein', subtitle: 'Ich tue, was ich sage.' },
    { slug: 'zu-fehlern-stehen', emoji: '🪞', title: 'Zu Fehlern stehen', subtitle: 'Ich gebe eigene Fehler offen zu.' },
    { slug: 'vertrauen-schenken', emoji: '🔓', title: 'Vertrauen schenken', subtitle: 'Ich gebe anderen einen Vertrauensvorschuss.' },
    { slug: 'verantwortung-fuer-andere', emoji: '🛟', title: 'Verantwortung für andere übernehmen', subtitle: 'Ich übernehme Verantwortung, die über mich hinausgeht.' },
  ],
  mut_rechenschaft: [
    { slug: 'mutig-sein', emoji: '🦁', title: 'Mutig sein', subtitle: 'Ich tue heute etwas, das mich Überwindung kostet.' },
    { slug: 'fuer-fehler-geradestehen', emoji: '🙋‍♂️', title: 'Für Fehler geradestehen', subtitle: 'Ich stehe zu Fehlern, statt sie zu vertuschen.' },
    { slug: 'unbequemes-ansprechen', emoji: '🗣️', title: 'Unbequemes ansprechen', subtitle: 'Ich spreche aus, was unangenehm, aber wichtig ist.' },
    { slug: 'position-beziehen', emoji: '🚩', title: 'Position beziehen', subtitle: 'Ich beziehe klar Stellung, auch gegen den Strom.' },
    { slug: 'rechenschaft-ablegen', emoji: '📋', title: 'Rechenschaft ablegen', subtitle: 'Ich erkläre offen, warum ich etwas getan habe.' },
    { slug: 'risiken-eingehen', emoji: '🎲', title: 'Risiken eingehen', subtitle: 'Ich gehe kalkulierte Risiken bewusst ein.' },
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
