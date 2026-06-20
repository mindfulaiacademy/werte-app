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

export const TRAINING_VALUE = {
  name: 'Offenheit & Kreativität',
  dimension: 'IDENTITY',
  emoji: '🌱',
}

export const TRAINING_DURATION = 7
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

export function getLevelForScore(score: number): 0 | 1 | 2 | 3 {
  if (score <= 2) return 0
  if (score <= 5) return 1
  if (score <= 8) return 2
  return 3
}
