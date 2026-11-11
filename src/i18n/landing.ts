// ============================================================
//  Calarmi — landing copy, one object per locale.
//  Spanish is the source. Screenshot names refer to
//  src/assets/images/screens/<lang>/<name>.jpg (German uses the English
//  ones: the app itself is in Spanish, English and Portuguese).
// ============================================================
import type { Lang } from './ui';

export type ShotName =
  | 'list'
  | 'challenge'
  | 'challengePicker'
  | 'countdowns'
  | 'countdownDetail'
  | 'editor'
  | 'widgets'
  | 'agenda'
  | 'calendar'
  | 'assistant'
  | 'paywall'
  | 'appIcons'
  | 'helpers'
  | 'tones';

export interface Feature {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  /** One or two screens; the second one sits behind, offset. */
  shots: ShotName[];
  alts: string[];
}

export interface BentoItem {
  title: string;
  body: string;
  shot?: ShotName;
  alt?: string;
}

export interface LandingCopy {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    h1a: string;
    h1b: string;
    sub: string;
    storeLine1: string;
    secondary: string;
    ticks: string[];
    phoneAlt: string;
    chip1Title: string;
    chip1Sub: string;
    chip2Title: string;
    chip2Sub: string;
    chip2Button: string;
  };
  usesLabel: string;
  uses: string[];
  features: Feature[];
  bento: { title: string; items: BentoItem[] };
  pricing: {
    eyebrow: string;
    title1: string;
    title2: string;
    body: string;
    free: { name: string; price: string; per: string; items: string[] };
    plus: { name: string; price: string; per: string; alt: string; lead: string; items: string[] };
    note: string;
    shotAlt: string;
  };
  privacy: { title: string; body: string; link: string };
  cta: { title: string; sub: string };
  footer: { by: string; languages: string };
  /** Shown only on the German page: the app has no German UI yet. */
  appLanguageNote?: string;
}

const es: LandingCopy = {
  meta: {
    title: 'Calarmi — Las alarmas que no te dejan olvidar',
    description:
      'Alarmas que suenan aunque el iPhone esté en silencio: medicinas, cumpleaños, reuniones y cuentas regresivas, con retos para apagarlas y un asistente con Apple Intelligence. Gratis, sin anuncios y sin cuenta.',
  },
  hero: {
    badge: 'Alarmas con inteligencia, gratis en el App Store',
    h1a: 'Las alarmas que',
    h1b: 'no te dejan olvidar.',
    sub: 'Calarmi suena fuerte aunque el iPhone esté en silencio: para la pastilla de las 8, el cumpleaños de tu mamá, la reunión de Teams y todo lo que de verdad importa.',
    storeLine1: 'Descárgala en el',
    secondary: 'Ver cómo funciona',
    ticks: ['Gratis', 'Sin anuncios', 'Sin cuenta', 'Todo queda en tu iPhone'],
    phoneAlt: 'Lista de alarmas de Calarmi agrupadas por hoy, mañana y esta semana',
    chip1Title: 'Pastilla de la mañana',
    chip1Sub: '08:00 · suena aunque esté en silencio',
    chip2Title: 'Reunión con el equipo',
    chip2Sub: '11:00 · Microsoft Teams',
    chip2Button: 'Unirse',
  },
  usesLabel: 'Para qué la usan',
  uses: [
    'La pastilla de las 8',
    'El cumpleaños de mamá',
    'La reunión de Teams',
    'El pago de la renta',
    'El turno del sábado',
    'El concierto en el estadio',
    'La cita con el dentista',
    'El viaje a Japón',
  ],
  features: [
    {
      id: 'retos',
      eyebrow: 'Retos para apagar',
      title: 'Resuelve un juego para apagarla.',
      body: 'Cálculo, memoria, pasos, un código QR que dejas lejos de la cama o los juegos Arcade de Calarmi Plus. Si la detienes sin resolverlo, vuelve a sonar.',
      bullets: [
        'Dieciséis retos: mente, cuerpo, levantarte y Arcade',
        'Uno distinto para cada alarma',
        'Si la apagas sin resolverlo, insiste a los 2, 5 y 10 minutos',
      ],
      shots: ['challenge', 'challengePicker'],
      alts: ['Reto de cálculo para apagar el despertador', 'Selector de retos: cálculo, memoria, ordenar números y más'],
    },
    {
      id: 'cuenta-regresiva',
      eyebrow: 'Cuenta regresiva',
      title: 'Cuenta los días que faltan para lo que importa.',
      body: 'Un viaje, un concierto, un cumpleaños. Con foto o emoji, en tu pantalla de inicio y compartida con quien va contigo: si cambias la fecha, cambia para todos.',
      bullets: [
        'Invita por WhatsApp, Mensajes o donde quieras',
        'Widgets para la pantalla de inicio y la bloqueada',
        'Los cumpleaños y aniversarios se repiten solos',
      ],
      shots: ['countdowns', 'countdownDetail'],
      alts: ['Cuentas regresivas con foto y días que faltan', 'Detalle de una cuenta regresiva con horas, minutos y segundos'],
    },
    {
      id: 'calendario',
      eyebrow: 'Calendario',
      title: 'Tus reuniones, con alarma de verdad.',
      body: 'Calarmi lee tu Calendario y pone hasta 3 avisos a cada evento. Si es una reunión de Teams, Zoom o Meet, aparece «Unirse»; si tiene dirección, «Ir» abre Mapas con la ruta.',
      bullets: [
        'Al inicio, 15 minutos antes o una hora antes',
        'Tus alarmas también aparecen en tu Calendario',
        'Vista de mes con alarmas y eventos juntos',
      ],
      shots: ['agenda', 'calendar'],
      alts: ['Eventos de mañana con el botón Unirse en Teams', 'Vista de mes con alarmas y eventos'],
    },
    {
      id: 'asistente',
      eyebrow: 'Asistente con IA',
      title: 'Díselo y listo.',
      body: '«Recuérdame la pastilla todos los días a las 9.» El asistente crea, busca y cambia alarmas con Apple Intelligence, y nada sale de tu iPhone.',
      bullets: [
        'También con Siri y Atajos',
        'Entiende fechas como «el sábado 14» o «cada 21 días»',
        'Necesita un iPhone compatible con Apple Intelligence',
      ],
      shots: ['assistant'],
      alts: ['Asistente de Calarmi con sugerencias para crear alarmas'],
    },
  ],
  bento: {
    title: 'Y todo lo que una alarma debería hacer bien',
    items: [
      { title: 'Widgets', body: 'Tu próxima alarma y tus cuentas regresivas, en la pantalla de inicio.', shot: 'widgets', alt: 'Widgets de próxima alarma y cuenta regresiva' },
      { title: 'Cumpleaños que se repiten solos', body: 'Con foto de la persona y avisos un día antes.', shot: 'editor', alt: 'Editor de un cumpleaños que se repite cada año' },
      { title: 'Varios horarios, una alarma', body: 'Lunes a las 5 p. m. y sábado a las 11, en la misma alarma.' },
      { title: 'Isla Dinámica', body: 'Detén o pospón la alarma sin desbloquear el iPhone.' },
      { title: 'Tus tonos', body: 'Seis tonos propios, o tu audio desde Archivos con Calarmi Plus.', shot: 'tones', alt: 'Selector de tonos de Calarmi' },
      { title: 'Íconos de colores', body: 'Azul, morado, verde o rosa, además del coral, con Calarmi Plus.', shot: 'appIcons', alt: 'Selector de ícono de la app' },
      { title: 'En todos tus dispositivos', body: 'Se sincroniza por tu iCloud. Sin cuenta nueva, sin contraseña nueva.' },
      { title: 'Personas de confianza', body: 'Alguien de tu familia programa tus alarmas desde su teléfono, y suenan en el tuyo.' },
    ],
  },
  pricing: {
    eyebrow: 'Precios',
    title1: 'Gratis para siempre.',
    title2: 'Plus, si quieres más.',
    body: 'Lo esencial no cuesta nada y no tiene anuncios. Calarmi Plus suma extras y ayuda a que la app siga mejorando.',
    free: {
      name: 'Gratis',
      price: '0 USD',
      per: 'para siempre',
      items: [
        'Alarmas que suenan aunque el iPhone esté en silencio',
        'Tu calendario, con alarma de verdad',
        'Alarmas compartidas y personas de confianza',
        'Asistente con Apple Intelligence y Siri',
        'Retos para apagar: cálculo, memoria, pasos y más',
        'Hasta 3 cuentas regresivas propias',
      ],
    },
    plus: {
      name: 'Calarmi Plus',
      price: '9,99 USD',
      per: 'al año, con 1 semana gratis',
      alt: 'o 24,99 USD una sola vez, de por vida',
      lead: 'Todo lo gratis, más:',
      items: [
        'Retos Arcade: Vuelo, Ovejas, Cañón y Tirachinas',
        'Tus propios tonos desde Archivos',
        'Cuentas regresivas sin límite',
        'Íconos de la app en colores',
      ],
    },
    note: 'Precios de EE. UU.; el App Store te muestra el de tu país, en tu moneda. La suscripción se renueva sola y la cancelas cuando quieras en los ajustes de tu cuenta de Apple. Lo que ya tengas configurado sigue funcionando aunque no tengas Plus.',
    shotAlt: 'Pantalla de Calarmi Plus con el plan anual y el de por vida',
  },
  privacy: {
    title: 'Tus alarmas son tuyas.',
    body: 'Sin anuncios, sin rastreo y sin servidores nuestros. Lo que guardas se queda en tu iPhone y en tu iCloud.',
    link: 'Leer la política de privacidad',
  },
  cta: {
    title: 'Nunca más «se me olvidó».',
    sub: 'Gratis en el App Store para iPhone con iOS 26.',
  },
  footer: { by: 'Por Mathyu Solutions', languages: 'Idiomas' },
};

const en: LandingCopy = {
  meta: {
    title: 'Calarmi — Alarms that never let you forget',
    description:
      'Alarms that ring even when your iPhone is on silent: meds, birthdays, meetings and countdowns, with wake-up challenges and an Apple Intelligence assistant. Free, no ads, no account.',
  },
  hero: {
    badge: 'Smart alarms, free on the App Store',
    h1a: 'The alarms that',
    h1b: 'never let you forget.',
    sub: "Calarmi rings loud even when your iPhone is on silent: for the 8 a.m. pill, your mom's birthday, the Teams call and everything that really matters.",
    storeLine1: 'Download on the',
    secondary: 'See how it works',
    ticks: ['Free', 'No ads', 'No account', 'Everything stays on your iPhone'],
    phoneAlt: "Calarmi's alarm list grouped by today, tomorrow and this week",
    chip1Title: 'Morning pill',
    chip1Sub: '8:00 AM · rings even on silent',
    chip2Title: 'Team sync',
    chip2Sub: '11:00 AM · Microsoft Teams',
    chip2Button: 'Join',
  },
  usesLabel: 'What people use it for',
  uses: [
    'The 8 a.m. pill',
    "Mom's birthday",
    'The Teams call',
    'Rent day',
    'The Saturday shift',
    'The stadium concert',
    'The dentist',
    'The trip to Japan',
  ],
  features: [
    {
      id: 'challenges',
      eyebrow: 'Wake-up challenges',
      title: 'Solve a game to turn it off.',
      body: "Math, memory, steps, a QR code you leave far from bed, or the Arcade games in Calarmi Plus. Stop it without solving and it rings again.",
      bullets: [
        'Sixteen challenges: mind, body, get-up and Arcade',
        'A different one for every alarm',
        "Stop it without solving and it's back at 2, 5 and 10 minutes",
      ],
      shots: ['challenge', 'challengePicker'],
      alts: ['Math challenge to turn the alarm off', 'Challenge picker: math, memory, number order and more'],
    },
    {
      id: 'countdown',
      eyebrow: 'Countdown',
      title: 'Count down the days to what matters.',
      body: "A trip, a concert, a birthday. With a photo or an emoji, on your Home Screen, and shared with whoever's going: change the date and it changes for everyone.",
      bullets: [
        'Invite over WhatsApp, Messages or anywhere',
        'Widgets for the Home Screen and Lock Screen',
        'Birthdays and anniversaries repeat on their own',
      ],
      shots: ['countdowns', 'countdownDetail'],
      alts: ['Countdowns with photos and days left', 'A countdown counting hours, minutes and seconds'],
    },
    {
      id: 'calendar',
      eyebrow: 'Calendar',
      title: 'Your meetings, with a real alarm.',
      body: 'Calarmi reads your Calendar and gives every event up to 3 alerts. For a Teams, Zoom or Meet call, “Join” takes you straight in; with an address, “Go” opens Maps with directions.',
      bullets: [
        'At start, 15 minutes or an hour before',
        'Your alarms show up in your Calendar too',
        'Month view with alarms and events together',
      ],
      shots: ['agenda', 'calendar'],
      alts: ["Tomorrow's events with the Join in Teams button", 'Month view with alarms and events'],
    },
    {
      id: 'assistant',
      eyebrow: 'AI assistant',
      title: 'Just say it.',
      body: '“Remind me to take my pill every day at 9.” The assistant creates, finds and edits alarms with Apple Intelligence, and nothing leaves your iPhone.',
      bullets: [
        'Works with Siri and Shortcuts too',
        'Understands dates like “Saturday the 14th” or “every 21 days”',
        'Needs an iPhone that supports Apple Intelligence',
      ],
      shots: ['assistant'],
      alts: ["Calarmi's assistant with suggestions to create alarms"],
    },
  ],
  bento: {
    title: 'And everything an alarm should get right',
    items: [
      { title: 'Widgets', body: 'Your next alarm and your countdowns, right on your Home Screen.', shot: 'widgets', alt: 'Next alarm and countdown widgets' },
      { title: 'Birthdays that repeat themselves', body: "With the person's photo and a heads-up the day before.", shot: 'editor', alt: 'Editing a birthday that repeats every year' },
      { title: 'Several times, one alarm', body: 'Monday at 5 p.m. and Saturday at 11, in the same alarm.' },
      { title: 'Dynamic Island', body: 'Stop or snooze the alarm without unlocking your iPhone.' },
      { title: 'Your tones', body: 'Six original tones, or your own audio from Files with Calarmi Plus.', shot: 'tones', alt: "Calarmi's tone picker" },
      { title: 'Colored icons', body: 'Blue, purple, green or pink, on top of coral, with Calarmi Plus.', shot: 'appIcons', alt: 'App icon picker' },
      { title: 'On all your devices', body: 'Syncs through your own iCloud. No new account, no new password.' },
      { title: 'Trusted helpers', body: 'Someone in your family schedules your alarms from their phone, and they ring on yours.' },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title1: 'Free forever.',
    title2: 'Plus, if you want more.',
    body: 'The essentials cost nothing and have no ads. Calarmi Plus adds extras and helps the app keep getting better.',
    free: {
      name: 'Free',
      price: '$0',
      per: 'forever',
      items: [
        'Alarms that ring even when your iPhone is on silent',
        'Your calendar, with a real alarm',
        'Shared alarms and trusted helpers',
        'Assistant with Apple Intelligence and Siri',
        'Wake-up challenges: math, memory, steps and more',
        'Up to 3 countdowns of your own',
      ],
    },
    plus: {
      name: 'Calarmi Plus',
      price: '$9.99',
      per: 'a year, with a 1-week free trial',
      alt: 'or $24.99 once, for life',
      lead: 'Everything in Free, plus:',
      items: [
        'Arcade challenges: Flight, Sheep, Cannon and Slingshot',
        'Your own tones from Files',
        'Unlimited countdowns',
        'Colored app icons',
      ],
    },
    note: "US prices; the App Store shows yours in your local currency. The subscription renews automatically and you can cancel anytime in your Apple Account settings. Anything you've already set up keeps working without Plus.",
    shotAlt: 'Calarmi Plus screen with the yearly and lifetime plans',
  },
  privacy: {
    title: 'Your alarms are yours.',
    body: 'No ads, no tracking and no servers of ours. What you save stays on your iPhone and in your iCloud.',
    link: 'Read the privacy policy',
  },
  cta: {
    title: 'No more “I forgot.”',
    sub: 'Free on the App Store for iPhone with iOS 26.',
  },
  footer: { by: 'By Mathyu Solutions', languages: 'Languages' },
};

// Brazilian Portuguese. The Portuguese assistant and Siri phrases are not
// verified on a device yet, so this page doesn't promise them: no assistant
// feature, and the free plan lists widgets in its place.
const pt: LandingCopy = {
  meta: {
    title: 'Calarmi — Os alarmes que não te deixam esquecer',
    description:
      'Alarmes que tocam mesmo com o iPhone no silencioso: remédios, aniversários, reuniões e contagens regressivas, com desafios para desligar e widgets na Tela de Início. Grátis, sem anúncios e sem cadastro.',
  },
  hero: {
    badge: 'Alarmes inteligentes, grátis na App Store',
    h1a: 'Os alarmes que',
    h1b: 'não te deixam esquecer.',
    sub: 'O Calarmi toca alto mesmo com o iPhone no silencioso: para o remédio das 8h, o aniversário da sua mãe, a reunião no Teams e tudo o que realmente importa.',
    storeLine1: 'Baixar na',
    secondary: 'Veja como funciona',
    ticks: ['Grátis', 'Sem anúncios', 'Sem cadastro', 'Tudo fica no seu iPhone'],
    phoneAlt: 'Lista de alarmes do Calarmi agrupados por hoje, amanhã e esta semana',
    chip1Title: 'Remédio da manhã',
    chip1Sub: '08:00 · toca mesmo no silencioso',
    chip2Title: 'Reunião com a equipe',
    chip2Sub: '11:00 · Microsoft Teams',
    chip2Button: 'Entrar',
  },
  usesLabel: 'Para que as pessoas usam',
  uses: [
    'O remédio das 8h',
    'O aniversário da mãe',
    'A reunião no Teams',
    'O boleto do aluguel',
    'O plantão de sábado',
    'O show no estádio',
    'A consulta no dentista',
    'A viagem para o Japão',
  ],
  features: [
    {
      id: 'desafios',
      eyebrow: 'Desafios para desligar',
      title: 'Resolva um jogo para desligar.',
      body: 'Contas, memória, passos, um código QR que você deixa longe da cama ou os jogos Arcade do Calarmi Plus. Se você parar o alarme sem resolver, ele volta a tocar.',
      bullets: [
        'Dezesseis desafios em quatro grupos: Mente, Corpo, Levantar e Arcade',
        'Um diferente para cada alarme',
        'Se você desligar sem resolver, ele insiste depois de 2, 5 e 10 minutos',
      ],
      shots: ['challenge', 'challengePicker'],
      alts: ['Desafio de cálculo para desligar o despertador', 'Seletor de desafios: cálculo, memória, ordenar números e mais'],
    },
    {
      id: 'contagem-regressiva',
      eyebrow: 'Contagem regressiva',
      title: 'Conte os dias até o que importa.',
      body: 'Uma viagem, um show, um aniversário. Com foto ou emoji, na sua Tela de Início e compartilhada com quem vai junto: se você muda a data, muda para todo mundo.',
      bullets: [
        'Convide pelo WhatsApp, Mensagens ou onde quiser',
        'Widgets para a Tela de Início e a Tela Bloqueada',
        'Aniversários e datas especiais se repetem sozinhos',
      ],
      shots: ['countdowns', 'countdownDetail'],
      alts: ['Contagens regressivas com foto e os dias que faltam', 'Detalhe de uma contagem regressiva com horas, minutos e segundos'],
    },
    {
      id: 'calendario',
      eyebrow: 'Calendário',
      title: 'Suas reuniões, com um alarme de verdade.',
      body: 'O Calarmi lê o seu Calendário e coloca até 3 alertas em cada evento. Se for uma reunião do Teams, Zoom ou Meet, aparece “Entrar”; se tiver endereço, “Ir” abre o Mapas com a rota.',
      bullets: [
        'No início, 15 minutos antes ou uma hora antes',
        'Seus alarmes também aparecem no seu Calendário',
        'Visualização do mês com alarmes e eventos juntos',
      ],
      shots: ['agenda', 'calendar'],
      alts: ['Eventos de amanhã com o botão Entrar no Teams', 'Visualização do mês com alarmes e eventos'],
    },
  ],
  bento: {
    title: 'E tudo o que um alarme deveria fazer bem',
    items: [
      { title: 'Widgets', body: 'Seu próximo alarme e suas contagens regressivas, na Tela de Início.', shot: 'widgets', alt: 'Widgets de próximo alarme e contagem regressiva' },
      { title: 'Aniversários que se repetem sozinhos', body: 'Com a foto da pessoa e um aviso um dia antes.', shot: 'editor', alt: 'Editor de um aniversário que se repete todo ano' },
      { title: 'Vários horários, um só alarme', body: 'Segunda às 17h e sábado às 11h, no mesmo alarme.' },
      { title: 'Dynamic Island', body: 'Pare ou adie o alarme sem desbloquear o iPhone.' },
      { title: 'Seus toques', body: 'Seis toques exclusivos, ou seu próprio áudio do app Arquivos com o Calarmi Plus.', shot: 'tones', alt: 'Seletor de toques do Calarmi' },
      { title: 'Ícones coloridos', body: 'Azul, roxo, verde ou rosa, além do coral, com o Calarmi Plus.', shot: 'appIcons', alt: 'Seletor de ícone do app' },
      { title: 'Em todos os seus dispositivos', body: 'Sincroniza pelo seu iCloud. Sem conta nova, sem senha nova.' },
      { title: 'Pessoas de confiança', body: 'Alguém da sua família programa seus alarmes pelo próprio celular, e eles tocam no seu.' },
    ],
  },
  pricing: {
    eyebrow: 'Preços',
    title1: 'Grátis para sempre.',
    title2: 'Plus, se você quiser mais.',
    body: 'O essencial não custa nada e não tem anúncios. O Calarmi Plus adiciona extras e ajuda o app a continuar melhorando.',
    free: {
      name: 'Grátis',
      price: 'R$ 0',
      per: 'para sempre',
      items: [
        'Alarmes que tocam mesmo com o iPhone no silencioso',
        'Seu calendário, com alarme de verdade',
        'Alarmes compartilhados e pessoas de confiança',
        'Widgets na Tela de Início e na Tela Bloqueada',
        'Desafios para desligar: cálculo, memória, passos e mais',
        'Até 3 contagens regressivas próprias',
      ],
    },
    plus: {
      name: 'Calarmi Plus',
      price: 'R$ 59,90',
      per: 'por ano, com 1 semana grátis',
      alt: 'ou R$ 149,90 uma vez, para sempre',
      lead: 'Tudo do plano grátis, e mais:',
      items: [
        'Desafios Arcade: Voo, Ovelhas, Canhão e Estilingue',
        'Seus próprios toques do app Arquivos',
        'Contagens regressivas ilimitadas',
        'Ícones do app coloridos',
      ],
    },
    note: 'Preços do Brasil; a App Store mostra o do seu país, na sua moeda. A assinatura renova automaticamente e você pode cancelar quando quiser nos ajustes da sua Conta Apple. O que você já configurou continua funcionando mesmo sem o Plus.',
    shotAlt: 'Tela do Calarmi Plus com o plano anual e o vitalício',
  },
  privacy: {
    title: 'Seus alarmes são seus.',
    body: 'Sem anúncios, sem rastreamento e sem servidores nossos. O que você salva fica no seu iPhone e no seu iCloud.',
    link: 'Ler a política de privacidade',
  },
  cta: {
    title: 'Nunca mais “esqueci”.',
    sub: 'Grátis na App Store para iPhone com iOS 26.',
  },
  footer: { by: 'Por Mathyu Solutions', languages: 'Idiomas' },
};

// German. The app has no German UI, so the copy doesn't quote German button
// labels and the assistant speaks the app's own languages.
const de: LandingCopy = {
  meta: {
    title: 'Calarmi — Wecker, die dich nichts vergessen lassen',
    description:
      'Wecker, die auch klingeln, wenn dein iPhone stumm ist: Medikamente, Geburtstage, Meetings und Countdowns, mit Aufgaben zum Ausschalten und einem Assistenten mit Apple Intelligence. Kostenlos, ohne Werbung, ohne Konto.',
  },
  hero: {
    badge: 'Smarte Wecker, kostenlos im App Store',
    h1a: 'Die Wecker, die dich',
    h1b: 'nichts vergessen lassen.',
    sub: 'Calarmi klingelt laut, auch wenn dein iPhone stumm ist: für die Tablette um 8, Mamas Geburtstag, das Teams-Meeting und alles, was wirklich zählt.',
    storeLine1: 'Laden im',
    secondary: 'So funktioniert’s',
    ticks: ['Kostenlos', 'Ohne Werbung', 'Ohne Konto', 'Alles bleibt auf deinem iPhone'],
    phoneAlt: 'Weckerliste von Calarmi, gruppiert nach heute, morgen und dieser Woche',
    chip1Title: 'Tablette am Morgen',
    chip1Sub: '08:00 · klingelt auch im Stumm-Modus',
    chip2Title: 'Team-Meeting',
    chip2Sub: '11:00 · Microsoft Teams',
    chip2Button: 'Join',
  },
  usesLabel: 'Wofür man Calarmi nutzt',
  uses: [
    'Die Tablette um 8',
    'Mamas Geburtstag',
    'Das Teams-Meeting',
    'Die Miete am Ersten',
    'Die Samstagsschicht',
    'Das Konzert im Stadion',
    'Der Zahnarzttermin',
    'Die Reise nach Japan',
  ],
  features: [
    {
      id: 'aufgaben',
      eyebrow: 'Aufgaben zum Ausschalten',
      title: 'Ausschalten? Erst die Aufgabe lösen.',
      body: 'Rechnen, Memory, Schritte, ein QR-Code, den du weit weg vom Bett hinlegst, oder die Arcade-Spiele von Calarmi Plus. Stoppst du den Wecker, ohne zu lösen, klingelt er wieder.',
      bullets: [
        'Sechzehn Aufgaben: Kopf, Körper, Aufstehen und Arcade',
        'Für jeden Wecker eine andere',
        'Ohne Lösung meldet er sich nach 2, 5 und 10 Minuten wieder',
      ],
      shots: ['challenge', 'challengePicker'],
      alts: ['Rechenaufgabe zum Ausschalten des Weckers', 'Auswahl der Aufgaben: Rechnen, Memory, Zahlen ordnen und mehr'],
    },
    {
      id: 'countdown',
      eyebrow: 'Countdown',
      title: 'Zähl die Tage bis zu dem, was zählt.',
      body: 'Eine Reise, ein Konzert, ein Geburtstag. Mit Foto oder Emoji, auf deinem Home-Bildschirm und geteilt mit allen, die mitkommen: Änderst du das Datum, ändert es sich für alle.',
      bullets: [
        'Einladen per WhatsApp, Nachrichten oder wo du willst',
        'Widgets für Home-Bildschirm und Sperrbildschirm',
        'Geburtstage und Jahrestage wiederholen sich von selbst',
      ],
      shots: ['countdowns', 'countdownDetail'],
      alts: ['Countdowns mit Foto und den verbleibenden Tagen', 'Ein Countdown mit Stunden, Minuten und Sekunden'],
    },
    {
      id: 'kalender',
      eyebrow: 'Kalender',
      title: 'Deine Meetings, mit einem echten Wecker.',
      body: 'Calarmi liest deinen Kalender und gibt jedem Termin bis zu 3 Hinweise. Bei einem Teams-, Zoom- oder Meet-Meeting bist du mit einem Tipp drin; hat der Termin eine Adresse, öffnet ein Tipp Karten mit der Route.',
      bullets: [
        'Zum Start, 15 Minuten oder eine Stunde vorher',
        'Deine Wecker erscheinen auch in deinem Kalender',
        'Monatsansicht mit Weckern und Terminen zusammen',
      ],
      shots: ['agenda', 'calendar'],
      alts: ['Termine von morgen mit der Taste zum Beitreten in Teams', 'Monatsansicht mit Weckern und Terminen'],
    },
    {
      id: 'assistent',
      eyebrow: 'KI-Assistent',
      title: 'Sag es einfach.',
      body: '„Remind me to take my pill every day at 9.“ Der Assistent legt Wecker an, findet und ändert sie mit Apple Intelligence, und nichts verlässt dein iPhone. Er versteht Englisch und Spanisch.',
      bullets: [
        'Auch mit Siri auf Englisch oder Spanisch und mit Kurzbefehlen',
        'Versteht Daten wie „Saturday the 14th“ oder „every 21 days“',
        'Braucht ein iPhone, das Apple Intelligence unterstützt',
      ],
      shots: ['assistant'],
      alts: ['Calarmi-Assistent mit Vorschlägen zum Anlegen von Weckern'],
    },
  ],
  bento: {
    title: 'Und alles, was ein Wecker richtig machen sollte',
    items: [
      { title: 'Widgets', body: 'Dein nächster Wecker und deine Countdowns, direkt auf dem Home-Bildschirm.', shot: 'widgets', alt: 'Widgets für den nächsten Wecker und einen Countdown' },
      { title: 'Geburtstage, die sich von selbst wiederholen', body: 'Mit Foto der Person und einer Erinnerung am Vortag.', shot: 'editor', alt: 'Editor für einen Geburtstag, der sich jedes Jahr wiederholt' },
      { title: 'Mehrere Zeiten, ein Wecker', body: 'Montags um 17 Uhr und samstags um 11 Uhr, im selben Wecker.' },
      { title: 'Dynamic Island', body: 'Stoppe oder schlummere den Wecker, ohne dein iPhone zu entsperren.' },
      { title: 'Deine Töne', body: 'Sechs exklusive Töne, oder mit Calarmi Plus dein eigenes Audio aus der Dateien-App.', shot: 'tones', alt: 'Tonauswahl von Calarmi' },
      { title: 'Farbige Symbole', body: 'Blau, Lila, Grün oder Rosa zusätzlich zu Koralle, mit Calarmi Plus.', shot: 'appIcons', alt: 'Auswahl des App-Symbols' },
      { title: 'Auf all deinen Geräten', body: 'Synchronisiert über deine eigene iCloud. Kein neues Konto, kein neues Passwort.' },
      { title: 'Vertrauenspersonen', body: 'Jemand aus deiner Familie stellt deine Wecker auf dem eigenen Handy, und sie klingeln auf deinem.' },
    ],
  },
  pricing: {
    eyebrow: 'Preise',
    title1: 'Für immer kostenlos.',
    title2: 'Plus, wenn du mehr willst.',
    body: 'Das Wichtigste kostet nichts und hat keine Werbung. Calarmi Plus bringt Extras und hilft, dass die App immer besser wird.',
    free: {
      name: 'Kostenlos',
      price: '0 €',
      per: 'für immer',
      items: [
        'Wecker, die auch klingeln, wenn das iPhone stumm ist',
        'Dein Kalender, mit echtem Wecker',
        'Geteilte Wecker und Vertrauenspersonen',
        'Assistent mit Apple Intelligence und Siri',
        'Aufgaben zum Ausschalten: Rechnen, Memory, Schritte und mehr',
        'Bis zu 3 eigene Countdowns',
      ],
    },
    plus: {
      name: 'Calarmi Plus',
      price: '9,99 €',
      per: 'pro Jahr, mit 1 Woche gratis',
      alt: 'oder 29,99 € einmalig, für immer',
      lead: 'Alles aus Kostenlos, dazu:',
      items: [
        'Arcade-Aufgaben: Flug, Schafe, Kanone und Steinschleuder',
        'Eigene Töne aus der Dateien-App',
        'Unbegrenzte Countdowns',
        'Farbige App-Symbole',
      ],
    },
    note: 'Preise für Deutschland; der App Store zeigt dir den Preis für dein Land, in deiner Währung. Das Abo verlängert sich automatisch, und du kannst es jederzeit in den Einstellungen deines Apple Accounts kündigen. Was du schon eingerichtet hast, funktioniert auch ohne Plus weiter.',
    shotAlt: 'Calarmi-Plus-Bildschirm mit Jahresabo und Einmalkauf',
  },
  privacy: {
    title: 'Deine Wecker gehören dir.',
    body: 'Keine Werbung, kein Tracking und keine Server von uns. Was du speicherst, bleibt auf deinem iPhone und in deiner iCloud.',
    link: 'Datenschutzerklärung lesen',
  },
  cta: {
    title: 'Nie wieder „Hab ich vergessen“.',
    sub: 'Kostenlos im App Store, für iPhone mit iOS 26.',
  },
  footer: { by: 'Von Mathyu Solutions', languages: 'Sprachen' },
  appLanguageNote: 'Die App selbst ist auf Englisch, Spanisch und Portugiesisch verfügbar.',
};

export const landing: Record<Lang, LandingCopy> = { es, en, pt, de };
