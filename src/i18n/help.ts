// ============================================================
//  Calarmi — "Ayuda y contacto": the App Store's Support URL.
//  Apple asks that it give users a way to get in touch, so the
//  contact card comes first and the answers follow.
// ============================================================
import type { Lang } from './ui';

export interface HelpCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  contactTitle: string;
  contactBody: string;
  emailCta: string;
  issueCta: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  privacyLink: string;
  back: string;
}

const SUPPORT_EMAIL = 'xmathyu@gmail.com';
export { SUPPORT_EMAIL };

const es: HelpCopy = {
  metaTitle: 'Calarmi — Ayuda y contacto',
  metaDescription: 'Respuestas rápidas sobre Calarmi (alarmas, Calarmi Plus, invitaciones) y cómo escribirnos.',
  eyebrow: 'Soporte',
  title: 'Ayuda y contacto',
  lead: '¿Algo no funciona como esperabas? Escríbenos: leemos cada mensaje.',
  contactTitle: 'Escríbenos',
  contactBody: 'Cuéntanos qué pasó, tu modelo de iPhone y tu versión de iOS. Respondemos en español e inglés.',
  emailCta: 'Enviar un correo',
  issueCta: 'Reportar un problema',
  faqTitle: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Por qué no sonó una alarma?',
      a: 'Revisa en Ajustes de iOS › Calarmi que las alarmas estén permitidas, y en Calarmi › Ajustes que el interruptor general «Alarmas activas» esté encendido: si está apagado, ninguna alarma suena. Con eso, suenan aunque el iPhone esté en silencio, bloqueado o en Enfoque.',
    },
    {
      q: '¿Cómo cancelo Calarmi Plus?',
      a: 'En Ajustes de iOS › tu nombre › Suscripciones › Calarmi, al menos 24 horas antes de que se renueve. Plus sigue activo hasta el final del período que ya pagaste, y lo que configuraste sigue funcionando después.',
    },
    {
      q: 'Cambié de iPhone, ¿cómo recupero Plus?',
      a: 'Abre Calarmi › Ajustes › Restaurar compras con la misma cuenta de Apple. Tus alarmas y cuentas regresivas vuelven solas por iCloud.',
    },
    {
      q: '¿Cómo comparto una alarma o una cuenta regresiva?',
      a: 'Ábrela y toca «Compartir» (en una cuenta regresiva, «Invitar amigos»): el enlace llega por WhatsApp, Mensajes o donde prefieras. Quien lo recibe necesita Calarmi en su iPhone; si la cambias, la ven cambiada.',
    },
    {
      q: '¿Por qué no aparece el asistente?',
      a: 'Necesita un iPhone compatible con Apple Intelligence, con Apple Intelligence activado en Ajustes de iOS. Todo ocurre en tu iPhone, sin internet.',
    },
    {
      q: '¿Qué datos guardan de mí?',
      a: 'Ninguno en servidores nuestros: tus alarmas viven en tu iPhone y en tu iCloud. No hay anuncios ni rastreo.',
    },
  ],
  privacyLink: 'Leer la política de privacidad',
  back: 'Volver a Calarmi',
};

const en: HelpCopy = {
  metaTitle: 'Calarmi — Help & contact',
  metaDescription: 'Quick answers about Calarmi (alarms, Calarmi Plus, invitations) and how to reach us.',
  eyebrow: 'Support',
  title: 'Help & contact',
  lead: "Something not working the way you expected? Write to us: we read every message.",
  contactTitle: 'Write to us',
  contactBody: "Tell us what happened, your iPhone model and your iOS version. We reply in English and Spanish.",
  emailCta: 'Send an email',
  issueCta: 'Report a problem',
  faqTitle: 'Frequently asked questions',
  faq: [
    {
      q: "Why didn't an alarm ring?",
      a: 'Check that alarms are allowed in iOS Settings › Calarmi, and that the master switch “Alarms enabled” is on in Calarmi › Settings: when it is off, no alarm rings. With both on, alarms ring even when your iPhone is silent, locked or in a Focus.',
    },
    {
      q: 'How do I cancel Calarmi Plus?',
      a: 'In iOS Settings › your name › Subscriptions › Calarmi, at least 24 hours before it renews. Plus stays active until the end of the period you paid for, and what you set up keeps working afterwards.',
    },
    {
      q: 'I got a new iPhone. How do I get Plus back?',
      a: 'Open Calarmi › Settings › Restore Purchases with the same Apple Account. Your alarms and countdowns come back on their own through iCloud.',
    },
    {
      q: 'How do I share an alarm or a countdown?',
      a: "Open it and tap “Share” (on a countdown, “Invite friends”): the link goes out over WhatsApp, Messages or wherever you like. The person needs Calarmi on their iPhone; if you change it, they see the change.",
    },
    {
      q: "Why don't I see the assistant?",
      a: 'It needs an iPhone that supports Apple Intelligence, with Apple Intelligence turned on in iOS Settings. Everything happens on your iPhone, offline.',
    },
    {
      q: 'What data do you keep about me?',
      a: 'None on servers of ours: your alarms live on your iPhone and in your iCloud. No ads, no tracking.',
    },
  ],
  privacyLink: 'Read the privacy policy',
  back: 'Back to Calarmi',
};

const pt: HelpCopy = {
  metaTitle: 'Calarmi — Ajuda e contato',
  metaDescription: 'Respostas rápidas sobre o Calarmi (alarmes, Calarmi Plus, convites) e como falar com a gente.',
  eyebrow: 'Suporte',
  title: 'Ajuda e contato',
  lead: 'Algo não funcionou como você esperava? Escreva pra gente: lemos todas as mensagens.',
  contactTitle: 'Fale com a gente',
  contactBody: 'Conte o que aconteceu, o modelo do seu iPhone e a versão do iOS. Respondemos em espanhol e inglês.',
  emailCta: 'Enviar um e-mail',
  issueCta: 'Relatar um problema',
  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Por que um alarme não tocou?',
      a: 'Confira em Ajustes do iOS › Calarmi se os alarmes estão permitidos, e em Calarmi › Ajustes se a chave geral “Alarmes ativados” está ligada: desligada, nenhum alarme toca. Com isso, eles tocam mesmo com o iPhone no silencioso, bloqueado ou em Foco.',
    },
    {
      q: 'Como cancelo o Calarmi Plus?',
      a: 'Em Ajustes do iOS › seu nome › Assinaturas › Calarmi, pelo menos 24 horas antes da renovação. O Plus continua ativo até o fim do período pago, e o que você configurou continua funcionando depois.',
    },
    {
      q: 'Troquei de iPhone. Como recupero o Plus?',
      a: 'Abra Calarmi › Ajustes › Restaurar Compras com a mesma Conta Apple. Seus alarmes e contagens regressivas voltam sozinhos pelo iCloud.',
    },
    {
      q: 'Como compartilho um alarme ou uma contagem regressiva?',
      a: 'Abra e toque em “Compartilhar” (numa contagem regressiva, “Convidar amigos”): o link vai por WhatsApp, Mensagens ou onde preferir. Quem recebe precisa do Calarmi no iPhone; se você mudar, a pessoa vê a mudança.',
    },
    {
      q: 'Que dados vocês guardam sobre mim?',
      a: 'Nenhum em servidores nossos: seus alarmes ficam no seu iPhone e no seu iCloud. Sem anúncios e sem rastreamento.',
    },
  ],
  privacyLink: 'Ler a política de privacidade',
  back: 'Voltar ao Calarmi',
};

const de: HelpCopy = {
  metaTitle: 'Calarmi — Hilfe & Kontakt',
  metaDescription: 'Schnelle Antworten zu Calarmi (Wecker, Calarmi Plus, Einladungen) und wie du uns erreichst.',
  eyebrow: 'Support',
  title: 'Hilfe & Kontakt',
  lead: 'Funktioniert etwas nicht wie erwartet? Schreib uns: Wir lesen jede Nachricht.',
  contactTitle: 'Schreib uns',
  contactBody: 'Erzähl uns, was passiert ist, dazu dein iPhone-Modell und deine iOS-Version. Wir antworten auf Englisch und Spanisch.',
  emailCta: 'E-Mail senden',
  issueCta: 'Problem melden',
  faqTitle: 'Häufige Fragen',
  faq: [
    {
      q: 'Warum hat ein Wecker nicht geklingelt?',
      a: 'Prüfe in den iOS-Einstellungen › Calarmi, dass Wecker erlaubt sind, und in Calarmi › Einstellungen, dass der Hauptschalter „Alarms enabled“ aktiviert ist: Ist er aus, klingelt kein Wecker. Dann klingeln sie auch, wenn dein iPhone stumm, gesperrt oder im Fokus ist.',
    },
    {
      q: 'Wie kündige ich Calarmi Plus?',
      a: 'In den iOS-Einstellungen › dein Name › Abonnements › Calarmi, mindestens 24 Stunden vor der Verlängerung. Plus bleibt bis zum Ende des bezahlten Zeitraums aktiv, und was du eingerichtet hast, funktioniert danach weiter.',
    },
    {
      q: 'Neues iPhone: Wie bekomme ich Plus zurück?',
      a: 'Öffne Calarmi › Settings › Restore Purchases mit demselben Apple Account. Deine Wecker und Countdowns kommen über iCloud von selbst zurück.',
    },
    {
      q: 'Wie teile ich einen Wecker oder einen Countdown?',
      a: 'Öffne ihn und tippe auf „Share“ (bei einem Countdown „Invite friends“): Der Link geht per WhatsApp, Nachrichten oder wo du willst. Die andere Person braucht Calarmi auf dem iPhone; änderst du etwas, sieht sie die Änderung.',
    },
    {
      q: 'Warum sehe ich den Assistenten nicht?',
      a: 'Er braucht ein iPhone mit Apple Intelligence, das in den iOS-Einstellungen aktiviert ist. Alles passiert auf deinem iPhone, offline. Er versteht Englisch und Spanisch.',
    },
    {
      q: 'Welche Daten speichert ihr über mich?',
      a: 'Keine auf unseren Servern: Deine Wecker liegen auf deinem iPhone und in deiner iCloud. Keine Werbung, kein Tracking.',
    },
  ],
  privacyLink: 'Datenschutzerklärung lesen',
  back: 'Zurück zu Calarmi',
};

export const help: Record<Lang, HelpCopy> = { es, en, pt, de };
