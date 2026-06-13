export type Dimension = 'IDENTITY' | 'COMMUNITY' | 'SOCIALITY'

export interface Value {
  key: string
  name: string
  dimension: Dimension
}

export interface Question {
  id: string
  valueKey: string
  dimension: Dimension
  emoji: string
  text: string
}

export const VALUES: Value[] = [
  // IDENTITY
  { key: 'offenheit_kreativitaet', name: 'Offenheit & Kreativität', dimension: 'IDENTITY' },
  { key: 'respekt_disziplin', name: 'Respekt & Disziplin', dimension: 'IDENTITY' },
  { key: 'toleranz_geduld', name: 'Toleranz & Geduld', dimension: 'IDENTITY' },
  { key: 'begeisterung_fleiss', name: 'Begeisterung & Fleiß', dimension: 'IDENTITY' },
  { key: 'fokus_aufmerksamkeit', name: 'Fokus & Aufmerksamkeit', dimension: 'IDENTITY' },
  { key: 'verstehen_erkenntnis', name: 'Verstehen & Erkenntnis', dimension: 'IDENTITY' },
  // COMMUNITY
  { key: 'wertschaetzung_dankbarkeit', name: 'Wertschätzung & Dankbarkeit', dimension: 'COMMUNITY' },
  { key: 'anteilnahme_solidaritaet', name: 'Anteilnahme & Solidarität', dimension: 'COMMUNITY' },
  { key: 'freundschaft_hilfsbereitschaft', name: 'Freundschaft & Hilfsbereitschaft', dimension: 'COMMUNITY' },
  { key: 'fuersorge_unterstuetzung', name: 'Fürsorge & Unterstützung', dimension: 'COMMUNITY' },
  // SOCIALITY
  { key: 'vertrauen_verantwortung', name: 'Vertrauen & Verantwortung', dimension: 'SOCIALITY' },
  { key: 'mut_rechenschaft', name: 'Mut & Rechenschaft', dimension: 'SOCIALITY' },
]

export const QUESTIONS: Question[] = [
  // ── IDENTITY: Offenheit & Kreativität ──────────────────────────────
  {
    id: 'ok_1',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🎨',
    text: 'Wenn du etwas ausprobieren kannst, ohne zu wissen, wie es endet — machst du das gerne? Oder brauchst du erst einen Plan?',
  },
  {
    id: 'ok_2',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🌀',
    text: 'Wenn du bei einer Aufgabe nicht weiterkommst — suchst du dann einen neuen Weg, oder gibst du auf?',
  },
  {
    id: 'ok_3',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🔄',
    text: 'Wenn du etwas falsch gemacht hast — lernst du daraus, oder ärgert dich das einfach nur?',
  },
  {
    id: 'ok_4',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🗺️',
    text: 'Stell dir vor, du kannst einen Beruf erfinden, den es noch gar nicht gibt. Würde dich das reizen?',
  },
  {
    id: 'ok_5',
    valueKey: 'offenheit_kreativitaet',
    dimension: 'IDENTITY',
    emoji: '🎭',
    text: 'Wenn du eine eigene Idee einbringen kannst — tust du das, auch wenn andere vielleicht lachen?',
  },

  // ── IDENTITY: Respekt & Disziplin ──────────────────────────────────
  {
    id: 'rd_1',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '⏰',
    text: 'Wenn du dir selbst etwas vornimmst — hältst du dich daran, auch ohne dass jemand nachfragt?',
  },
  {
    id: 'rd_2',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '🤫',
    text: 'Wenn jemand etwas erklärt — hörst du wirklich zu, auch wenn du denkst, du weißt es schon?',
  },
  {
    id: 'rd_3',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '📋',
    text: 'Wenn eine Aufgabe schwierig wird — machst du trotzdem weiter, oder schiebst du sie auf?',
  },
  {
    id: 'rd_4',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '🏋️',
    text: 'Gibt es etwas, das du regelmäßig übst — auch wenn du keine Lust hast, weil du weißt, dass es dich weiterbringt?',
  },
  {
    id: 'rd_5',
    valueKey: 'respekt_disziplin',
    dimension: 'IDENTITY',
    emoji: '🪞',
    text: 'Wenn du einen Fehler gemacht hast — kannst du das zugeben und daraus lernen, auch wenn es unangenehm ist?',
  },

  // ── IDENTITY: Toleranz & Geduld ────────────────────────────────────
  {
    id: 'tg_1',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🐢',
    text: 'Wenn etwas länger dauert als du dachtest — kannst du ruhig bleiben und trotzdem weitermachen?',
  },
  {
    id: 'tg_2',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🔥',
    text: 'Wenn dich jemand oder etwas triggert — schaffst du es, erst nachzudenken, bevor du reagierst?',
  },
  {
    id: 'tg_3',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🧩',
    text: 'Wenn du etwas noch nicht verstehst — bleibst du neugierig, oder verlierst du die Lust?',
  },
  {
    id: 'tg_4',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🌍',
    text: 'Wenn jemand sehr anders denkt oder lebt als du — kannst du trotzdem von ihm oder ihr lernen?',
  },
  {
    id: 'tg_5',
    valueKey: 'toleranz_geduld',
    dimension: 'IDENTITY',
    emoji: '🌊',
    text: 'Wenn alles auf einmal kommt — Schule, Zuhause, Freunde — wie gehst du damit um? Hast du Wege, dich zu regulieren?',
  },

  // ── IDENTITY: Begeisterung & Fleiß ────────────────────────────────
  {
    id: 'bf_1',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🔥',
    text: 'Gibt es etwas, das dich so begeistert, dass du die Zeit vergisst? Lernst du in diesen Momenten anders als sonst?',
  },
  {
    id: 'bf_2',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🏃',
    text: 'Wenn du ein Ziel hast — gibst du auch dann alles, wenn niemand zuschaut und niemand applaudiert?',
  },
  {
    id: 'bf_3',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🌟',
    text: 'Was würdest du lernen oder tun, auch wenn du kein Geld dafür bekommst und keine Note dafür kriegst?',
  },
  {
    id: 'bf_4',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '📚',
    text: 'Lernst du manchmal Dinge, die dich interessieren — einfach so, ohne dass es jemand von dir verlangt?',
  },
  {
    id: 'bf_5',
    valueKey: 'begeisterung_fleiss',
    dimension: 'IDENTITY',
    emoji: '🎯',
    text: 'Wenn du etwas wirklich willst — machst du dann auch einen Plan und hältst dich daran, auch wenn es Umwege gibt?',
  },

  // ── IDENTITY: Fokus & Aufmerksamkeit ──────────────────────────────
  {
    id: 'fa_1',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '📵',
    text: 'Kannst du dein Handy weglegen und dich wirklich auf eine Sache konzentrieren — für eine Stunde? Wie fühlt sich das an?',
  },
  {
    id: 'fa_2',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🔍',
    text: 'Wenn du etwas lernst oder machst — machst du es richtig und genau, oder eher schnell und fertig?',
  },
  {
    id: 'fa_3',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🧘',
    text: 'Gibt es Momente, wo du einfach still bist — und in dieser Stille merkst du, was du wirklich denkst oder fühlst?',
  },
  {
    id: 'fa_4',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🎮',
    text: 'Wenn du mitten in etwas bist, das Spaß macht, und du eigentlich lernen solltest — kannst du aufhören und wechseln?',
  },
  {
    id: 'fa_5',
    valueKey: 'fokus_aufmerksamkeit',
    dimension: 'IDENTITY',
    emoji: '🌊',
    text: 'Wenn du in einem Gespräch oder einer Stunde bist — bist du wirklich dabei, oder denkst du schon an das nächste?',
  },

  // ── IDENTITY: Verstehen & Erkenntnis ──────────────────────────────
  {
    id: 've_1',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '🤔',
    text: 'Wenn du etwas nicht verstehst — fragst du nach, auch wenn du dich dabei komisch fühlst?',
  },
  {
    id: 've_2',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '🔭',
    text: 'Interessiert es dich, warum Dinge so sind, wie sie sind — und wie sie sich verändern könnten?',
  },
  {
    id: 've_3',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '📰',
    text: 'Wenn du etwas im Internet liest — fragst du dich, ob das auch wirklich stimmt?',
  },
  {
    id: 've_4',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '💡',
    text: 'Hattest du schon mal einen Moment, wo du plötzlich etwas wirklich verstanden hast — und das hat sich richtig gut angefühlt?',
  },
  {
    id: 've_5',
    valueKey: 'verstehen_erkenntnis',
    dimension: 'IDENTITY',
    emoji: '🗣️',
    text: 'Wenn ihr über ein schwieriges Thema redet — bringst du deine eigene Meinung ein, auch wenn du dir nicht 100% sicher bist?',
  },

  // ── COMMUNITY: Wertschätzung & Dankbarkeit ────────────────────────
  {
    id: 'wd_1',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '💌',
    text: 'Hast du jemandem schon mal gesagt, was du an ihm oder ihr wirklich schätzt — nicht weil du musstest, sondern weil du es wolltest?',
  },
  {
    id: 'wd_2',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '🌅',
    text: 'Gibt es Menschen in deinem Leben, durch die du etwas gelernt hast — auch wenn sie dich manchmal genervt haben?',
  },
  {
    id: 'wd_3',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '👏',
    text: 'Wenn jemand in deiner Gruppe etwas gut gemacht hat — sagst du das auch laut, oder denkst du es nur?',
  },
  {
    id: 'wd_4',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '🎁',
    text: 'Freust du dich mehr, wenn du jemandem etwas Gutes tust — oder wenn du selbst etwas bekommst?',
  },
  {
    id: 'wd_5',
    valueKey: 'wertschaetzung_dankbarkeit',
    dimension: 'COMMUNITY',
    emoji: '🪴',
    text: 'Hast du schon mal gemerkt, dass du durch jemand anderen besser geworden bist — in etwas, das dir wichtig ist?',
  },

  // ── COMMUNITY: Anteilnahme & Solidarität ──────────────────────────
  {
    id: 'as_1',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '🫂',
    text: 'Wenn jemand in deiner Klasse oder deinem Team gerade einen schlechten Tag hat — merkst du das, auch wenn er oder sie nichts sagt?',
  },
  {
    id: 'as_2',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '⚖️',
    text: 'Wenn du siehst, dass jemand ungerecht behandelt wird — sagst du etwas, auch wenn es dich eigentlich nichts angeht?',
  },
  {
    id: 'as_3',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '🌧️',
    text: 'Hast du schon mal deine eigene Zeit oder Energie gegeben, um jemandem zu helfen — ohne etwas dafür zu erwarten?',
  },
  {
    id: 'as_4',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '🏘️',
    text: 'Interessiert es dich, wie es den Menschen um dich herum geht — nicht nur deinen besten Freunden?',
  },
  {
    id: 'as_5',
    valueKey: 'anteilnahme_solidaritaet',
    dimension: 'COMMUNITY',
    emoji: '📣',
    text: 'Wenn eine Gruppe von Menschen ungerecht behandelt wird — würdest du deine Stimme erheben, auch wenn du nicht direkt betroffen bist?',
  },

  // ── COMMUNITY: Freundschaft & Hilfsbereitschaft ───────────────────
  {
    id: 'fh_1',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🤝',
    text: 'Hast du Menschen in deinem Leben, auf die du dich wirklich verlassen kannst — und die sich auf dich verlassen können?',
  },
  {
    id: 'fh_2',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🧑‍🏫',
    text: 'Wenn jemand etwas nicht versteht — erklärst du es ihm oder ihr gerne, auch wenn es Zeit kostet?',
  },
  {
    id: 'fh_3',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🏆',
    text: 'Ist es dir wichtiger, dass dein Team gewinnt — oder dass du persönlich der Beste bist?',
  },
  {
    id: 'fh_4',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '📞',
    text: 'Wenn ein Freund oder eine Freundin dich um 23 Uhr anruft, weil er oder sie Hilfe braucht — gehst du ran?',
  },
  {
    id: 'fh_5',
    valueKey: 'freundschaft_hilfsbereitschaft',
    dimension: 'COMMUNITY',
    emoji: '🌐',
    text: 'Glaubst du, dass du durch andere Menschen Dinge lernst, die du alleine nie lernen würdest?',
  },

  // ── COMMUNITY: Fürsorge & Unterstützung ───────────────────────────
  {
    id: 'fu_1',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🧡',
    text: 'Gibt es Menschen in deinem Leben, um die du dich kümmerst — und was hast du dabei über dich selbst gelernt?',
  },
  {
    id: 'fu_2',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🌱',
    text: 'Wenn du siehst, dass jemand Potenzial hat — möchtest du ihm oder ihr helfen, es zu entfalten?',
  },
  {
    id: 'fu_3',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🏠',
    text: 'Was bedeutet für dich ein Ort, an dem du dich sicher und wohl fühlst? Schaffst du so einen Ort auch für andere?',
  },
  {
    id: 'fu_4',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '💊',
    text: 'Wenn jemand in deiner Gruppe überfordert ist — übernimmst du Verantwortung, auch wenn es nicht deine Aufgabe ist?',
  },
  {
    id: 'fu_5',
    valueKey: 'fuersorge_unterstuetzung',
    dimension: 'COMMUNITY',
    emoji: '🌙',
    text: 'Achtest du auch auf dich selbst — damit du überhaupt für andere da sein kannst?',
  },

  // ── SOCIALITY: Vertrauen & Verantwortung ──────────────────────────
  {
    id: 'vv_1',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '🔑',
    text: 'Wenn dir jemand etwas Wichtiges anvertraut — hältst du das für dich, egal was passiert?',
  },
  {
    id: 'vv_2',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '🌳',
    text: 'Glaubst du, dass deine Entscheidungen — was du kaufst, isst, postest — andere Menschen auf der Welt beeinflussen?',
  },
  {
    id: 'vv_3',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '♻️',
    text: 'Denkst du manchmal daran, wie dein Alltag die Umwelt oder Menschen in anderen Ländern betrifft?',
  },
  {
    id: 'vv_4',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '📜',
    text: 'Wenn du etwas versprichst — hältst du es auch, wenn es schwierig wird und niemand es kontrolliert?',
  },
  {
    id: 'vv_5',
    valueKey: 'vertrauen_verantwortung',
    dimension: 'SOCIALITY',
    emoji: '🏛️',
    text: 'Würdest du lieber für eine Firma arbeiten, die wirklich etwas Gutes für die Welt tut — auch wenn du dort weniger verdienst?',
  },

  // ── SOCIALITY: Mut & Rechenschaft ─────────────────────────────────
  {
    id: 'mr_1',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🦁',
    text: 'Gibt es etwas in der Welt, das dich wirklich wütend macht — eine Ungerechtigkeit, ein Problem? Und was tust du damit?',
  },
  {
    id: 'mr_2',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🚀',
    text: 'Wenn du eine Idee hättest, die das Leben von Menschen verbessern könnte — würdest du sie ausprobieren, auch wenn du scheitern könntest?',
  },
  {
    id: 'mr_3',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🪞',
    text: 'Wenn du einen Fehler gemacht hast, der andere betroffen hat — stehst du dazu und machst es wieder gut, auch wenn es peinlich ist?',
  },
  {
    id: 'mr_4',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🌊',
    text: 'Glaubst du, dass du — als einzelne Person — wirklich etwas in der Welt verändern kannst?',
  },
  {
    id: 'mr_5',
    valueKey: 'mut_rechenschaft',
    dimension: 'SOCIALITY',
    emoji: '🕊️',
    text: 'Wenn du an die Welt in 20 Jahren denkst — was möchtest du, dass man über dich sagt? Was hast du beigetragen?',
  },
]
