// ============================================================
//  Calarmi — "Beta para Android": recruits testers for Google
//  Play's closed test (12 testers who stay in for 14 days).
//  Written for people who have never joined a test: three
//  steps, one button each, then the questions they'll ask.
// ============================================================
import type { Lang } from './ui';
import { SUPPORT_EMAIL } from './help';

export interface BetaStep {
  title: string;
  body: string;
  /** The button's label. */
  cta: string;
}

export interface BetaCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  tipLead: string;
  tip: string;
  stepsTitle: string;
  /** Join the group, opt in on Play, install. */
  steps: [BetaStep, BetaStep, BetaStep];
  notesTitle: string;
  /** `a` is rendered with set:html (it may carry the email link). */
  notes: { q: string; a: string }[];
  iphoneQ: string;
  iphoneA: string;
  /** Link to this page from the footer. */
  footLink: string;
  /** Link to this page under the landing's final App Store button. */
  ctaLink: string;
}

const mail = `<a href="mailto:${SUPPORT_EMAIL}?subject=Calarmi%20Android%20beta">${SUPPORT_EMAIL}</a>`;

const es: BetaCopy = {
  metaTitle: 'Calarmi — Beta para Android',
  metaDescription: 'Calarmi para Android está en prueba cerrada en Google Play. Únete en tres pasos y ayúdanos a lanzarla para todos.',
  eyebrow: 'Beta para Android',
  title: 'Ayúdanos a lanzar Calarmi en Android',
  lead: 'Calarmi para Android ya funciona, pero antes de publicarla para todos, Google pide que al menos 12 personas la prueben durante 14 días seguidos. Si tienes un teléfono Android, puedes ser una de ellas: son tres pasos y te toma un par de minutos.',
  tipLead: 'Antes de empezar:',
  tip: 'hazlo desde tu teléfono Android y con la misma cuenta de Google que usas en Play Store. Con otra cuenta, la invitación no te va a aparecer.',
  stepsTitle: 'Cómo unirte',
  steps: [
    {
      title: 'Únete al grupo «Calarmi Testers»',
      body: 'Es un grupo de Google: cualquiera puede unirse y nadie ve quién más está. Ábrelo y toca el botón para unirte.',
      cta: 'Unirme al grupo',
    },
    {
      title: 'Acepta la invitación',
      body: 'Ya dentro del grupo, abre la página de prueba de Google Play y toca el botón para convertirte en tester. Si dice que no está disponible, espera unos minutos y vuelve a intentarlo: Google tarda un poco en notar que ya estás en el grupo.',
      cta: 'Aceptar la invitación',
    },
    {
      title: 'Instala Calarmi desde Google Play',
      body: 'Descárgala como cualquier otra app. Cuando la abras, inicia sesión con Google o con tu correo.',
      cta: 'Instalar desde Google Play',
    },
  ],
  notesTitle: 'Preguntas frecuentes',
  notes: [
    {
      q: '¿Qué necesito?',
      a: 'Un teléfono con Android 8.0 o posterior y una cuenta de Google. Para usar Calarmi tienes que iniciar sesión, con Google o con tu correo.',
    },
    {
      q: '¿Por qué 14 días?',
      a: 'Es lo que pide Google para publicar una app nueva: al menos 12 testers durante 14 días seguidos. Por favor, no salgas del grupo y deja Calarmi instalada al menos 14 días: cada persona cuenta.',
    },
    {
      q: '¿Encontraste un error o tienes una idea?',
      a: `Escríbenos a ${mail} o envíanos un comentario privado desde la ficha de Calarmi en Google Play. Leemos todo: lo que te gusta y lo que falla.`,
    },
    {
      q: '¿Quién ve mi correo?',
      a: 'Al unirte al grupo, tu correo de Google se comparte solo con el desarrollador de Calarmi, y solo para darte acceso a la prueba. Nunca es público y los demás miembros no lo ven. Puedes salir del grupo cuando quieras; eso también te saca de la prueba.',
    },
  ],
  iphoneQ: '¿Tienes iPhone?',
  iphoneA: 'Calarmi ya está en el App Store: no necesitas unirte a nada.',
  footLink: 'Beta para Android',
  ctaLink: '¿Tienes Android? Únete a la beta',
};

const en: BetaCopy = {
  metaTitle: 'Calarmi — Android beta',
  metaDescription: 'Calarmi for Android is in closed testing on Google Play. Join in three steps and help us launch it for everyone.',
  eyebrow: 'Android beta',
  title: 'Help us launch Calarmi on Android',
  lead: 'Calarmi for Android already works, but before it can go out to everyone, Google asks that at least 12 people test it for 14 days in a row. If you have an Android phone, you can be one of them: it takes three steps and a couple of minutes.',
  tipLead: 'Before you start:',
  tip: "do this on your Android phone, with the same Google account you use in the Play Store. With a different account, the invitation won't show up.",
  stepsTitle: 'How to join',
  steps: [
    {
      title: 'Join the “Calarmi Testers” group',
      body: "It's a Google group: anyone can join, and nobody can see who else is in it. Open it and tap the button to join.",
      cta: 'Join the group',
    },
    {
      title: 'Accept the invitation',
      body: "Once you're in the group, open the Google Play testing page and tap the button to become a tester. If it says the test isn't available, wait a few minutes and try again: Google takes a moment to notice you've joined.",
      cta: 'Accept the invitation',
    },
    {
      title: 'Install Calarmi from Google Play',
      body: 'Download it like any other app. When you open it, sign in with Google or with your email.',
      cta: 'Install from Google Play',
    },
  ],
  notesTitle: 'Frequently asked questions',
  notes: [
    {
      q: 'What do I need?',
      a: 'A phone with Android 8.0 or later and a Google account. To use Calarmi you need to sign in, with Google or with your email.',
    },
    {
      q: 'Why 14 days?',
      a: "It's what Google asks before a new app can be published: at least 12 testers for 14 days in a row. Please stay in the group and keep Calarmi installed for at least 14 days: every person counts.",
    },
    {
      q: 'Found a bug or have an idea?',
      a: `Email us at ${mail} or send private feedback from Calarmi's page on Google Play. We read everything: what you like and what breaks.`,
    },
    {
      q: 'Who sees my email address?',
      a: "When you join the group, your Google email address is shared only with Calarmi's developer, and only so you can access the test. It's never public and other members can't see it. You can leave the group any time; that also takes you out of the test.",
    },
  ],
  iphoneQ: 'Have an iPhone?',
  iphoneA: 'Calarmi is already on the App Store: no need to join anything.',
  footLink: 'Android beta',
  ctaLink: 'On Android? Join the beta',
};

const pt: BetaCopy = {
  metaTitle: 'Calarmi — Beta para Android',
  metaDescription: 'O Calarmi para Android está em teste fechado no Google Play. Participe em três passos e ajude a gente a lançá-lo para todo mundo.',
  eyebrow: 'Beta para Android',
  title: 'Ajude a gente a lançar o Calarmi no Android',
  lead: 'O Calarmi para Android já funciona, mas antes de publicá-lo para todo mundo, o Google pede que pelo menos 12 pessoas o testem por 14 dias seguidos. Se você tem um celular Android, pode ser uma delas: são três passos e leva só uns minutinhos.',
  tipLead: 'Antes de começar:',
  tip: 'faça isso no seu celular Android, com a mesma conta do Google que você usa na Play Store. Com outra conta, o convite não aparece.',
  stepsTitle: 'Como participar',
  steps: [
    {
      title: 'Entre no grupo “Calarmi Testers”',
      body: 'É um grupo do Google: qualquer pessoa pode entrar e ninguém vê quem mais está nele. Abra e toque no botão para participar.',
      cta: 'Entrar no grupo',
    },
    {
      title: 'Aceite o convite',
      body: 'Já dentro do grupo, abra a página de teste do Google Play e toque no botão para virar testador. Se aparecer que o teste não está disponível, espere alguns minutos e tente de novo: o Google demora um pouco para perceber que você já está no grupo.',
      cta: 'Aceitar o convite',
    },
    {
      title: 'Instale o Calarmi pelo Google Play',
      body: 'Baixe como qualquer outro app. Ao abrir, entre com o Google ou com seu e-mail.',
      cta: 'Instalar pelo Google Play',
    },
  ],
  notesTitle: 'Perguntas frequentes',
  notes: [
    {
      q: 'Do que eu preciso?',
      a: 'Um celular com Android 8.0 ou mais recente e uma conta do Google. Para usar o Calarmi é preciso entrar na sua conta, com o Google ou com seu e-mail.',
    },
    {
      q: 'Por que 14 dias?',
      a: 'É o que o Google pede para publicar um app novo: pelo menos 12 testadores durante 14 dias seguidos. Por favor, continue no grupo e mantenha o Calarmi instalado por pelo menos 14 dias: cada pessoa conta.',
    },
    {
      q: 'Achou um erro ou tem uma ideia?',
      a: `Escreva pra gente em ${mail} ou envie um comentário privado pela página do Calarmi no Google Play. Lemos tudo: o que você curte e o que dá errado.`,
    },
    {
      q: 'Quem vê meu e-mail?',
      a: 'Ao entrar no grupo, seu e-mail do Google é compartilhado só com o desenvolvedor do Calarmi, e só para liberar seu acesso ao teste. Ele nunca fica público e os outros membros não o veem. Você pode sair do grupo quando quiser; isso também tira você do teste.',
    },
  ],
  iphoneQ: 'Tem iPhone?',
  iphoneA: 'O Calarmi já está na App Store: não precisa entrar em nada.',
  footLink: 'Beta para Android',
  ctaLink: 'Tem Android? Participe do beta',
};

const de: BetaCopy = {
  metaTitle: 'Calarmi — Android-Beta',
  metaDescription: 'Calarmi für Android ist bei Google Play im geschlossenen Test. Mach in drei Schritten mit und hilf uns, die App für alle zu veröffentlichen.',
  eyebrow: 'Android-Beta',
  title: 'Hilf uns, Calarmi auf Android zu starten',
  lead: 'Calarmi für Android funktioniert schon, aber bevor die App für alle erscheinen darf, verlangt Google, dass mindestens 12 Personen sie 14 Tage am Stück testen. Wenn du ein Android-Handy hast, kannst du eine davon sein: Es sind nur drei Schritte, und es dauert ein paar Minuten.',
  tipLead: 'Bevor du loslegst:',
  tip: 'Mach es auf deinem Android-Handy und mit demselben Google-Konto, das du im Play Store nutzt. Mit einem anderen Konto taucht die Einladung nicht auf.',
  stepsTitle: 'So machst du mit',
  steps: [
    {
      title: 'Tritt der Gruppe „Calarmi Testers“ bei',
      body: 'Das ist eine Google-Gruppe: Jeder kann beitreten, und niemand sieht, wer sonst noch dabei ist. Öffne sie und tippe auf den Button zum Beitreten.',
      cta: 'Gruppe beitreten',
    },
    {
      title: 'Nimm die Einladung an',
      body: 'Sobald du in der Gruppe bist, öffne die Testseite von Google Play und tippe auf den Button, um Tester zu werden. Steht dort, dass der Test nicht verfügbar ist, warte ein paar Minuten und versuch es noch einmal: Google braucht kurz, bis es merkt, dass du in der Gruppe bist.',
      cta: 'Einladung annehmen',
    },
    {
      title: 'Installiere Calarmi über Google Play',
      body: 'Lade die App wie jede andere herunter. Beim ersten Öffnen meldest du dich mit Google oder mit deiner E-Mail-Adresse an.',
      cta: 'Bei Google Play installieren',
    },
  ],
  notesTitle: 'Häufige Fragen',
  notes: [
    {
      q: 'Was brauche ich?',
      a: 'Ein Handy mit Android 8.0 oder neuer und ein Google-Konto. Um Calarmi zu nutzen, musst du dich anmelden, mit Google oder mit deiner E-Mail-Adresse. Die App selbst gibt es auf Englisch, Spanisch und Portugiesisch.',
    },
    {
      q: 'Warum 14 Tage?',
      a: 'Das verlangt Google, bevor eine neue App veröffentlicht werden darf: mindestens 12 Tester, 14 Tage am Stück. Bitte bleib in der Gruppe und lass Calarmi mindestens 14 Tage installiert: Jede Person zählt.',
    },
    {
      q: 'Einen Fehler gefunden oder eine Idee?',
      a: `Schreib uns (auf Englisch oder Spanisch) an ${mail} oder schick privates Feedback über die Seite von Calarmi bei Google Play. Wir lesen alles: was dir gefällt und was hakt.`,
    },
    {
      q: 'Wer sieht meine E-Mail-Adresse?',
      a: 'Wenn du der Gruppe beitrittst, wird deine Google-E-Mail-Adresse nur mit dem Entwickler von Calarmi geteilt, und nur, damit du Zugang zum Test bekommst. Sie ist nie öffentlich, und andere Mitglieder sehen sie nicht. Du kannst die Gruppe jederzeit verlassen; damit bist du auch aus dem Test raus.',
    },
  ],
  iphoneQ: 'Du hast ein iPhone?',
  iphoneA: 'Calarmi gibt es schon im App Store: Du musst nirgends beitreten.',
  footLink: 'Android-Beta',
  ctaLink: 'Du hast Android? Mach bei der Beta mit',
};

export const beta: Record<Lang, BetaCopy> = { es, en, pt, de };
