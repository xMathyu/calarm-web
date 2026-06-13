// ============================================================
//  Calarm — i18n dictionaries
//  Spanish is the source language; English mirrors it.
//  Each locale renders as a real, crawlable route (/ and /en).
// ============================================================

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es';

export type Lang = keyof typeof ui;

export const ui = {
  es: {
    // ---- meta / SEO ----
    'site.title': 'Calarm — Alarmas para lo que de verdad importa',
    'site.description':
      'Calarm convierte tus fechas importantes en alarmas que suenan aunque tu iPhone esté en silencio, bloqueado o en Focus. Gratis, privado y hecho para iOS 26.',
    'privacy.metaTitle': 'Calarm — Política de Privacidad',
    'privacy.metaDescription':
      'Política de privacidad de Calarm. Sin servidor, sin cuentas, sin tracking. Tus datos se quedan en tu dispositivo.',

    // ---- nav ----
    'nav.features': 'Funciones',
    'nav.privacy': 'Privacidad',
    'nav.policy': 'Política',
    'nav.get': 'Descargar',

    // ---- hero ----
    'hero.eyebrow': 'Hecho para iOS 26',
    'hero.h1a': 'Alarmas para',
    'hero.h1b': 'lo que de verdad importa',
    'hero.sub':
      'Cumpleaños, aniversarios, medicinas y eventos del calendario. Suenan fuerte aunque tu iPhone esté en silencio, bloqueado o en Focus.',
    'store.l1': 'Descargar en',
    'hero.explore': 'Ver funciones',
    'hero.f1': 'Gratis',
    'hero.f2': 'Sin anuncios',
    'hero.f3': 'Sin tracking',
    'hero.imgAlt': 'Calarm — pantalla de alarmas',

    // ---- trust ----
    'trust.1': 'Suena en silencio y en Focus',
    'trust.2': 'Privado en tu dispositivo',
    'trust.3': 'Español e Inglés',
    'trust.4': 'Sin servidor, sin cuentas',

    // ---- features grid ----
    'feat.h2a': 'Todo lo que el Reloj',
    'feat.h2b': 'no hace',
    'feat.p': 'Calarm fue diseñada para los eventos de la vida real — no solo para despertarte.',
    'g1.h': 'Suena aunque esté en silencio',
    'g1.p': 'Usa AlarmKit del sistema: la alarma suena fuerte con el iPhone bloqueado, en silencio o en modo Focus.',
    'g2.h': 'Recurrencias avanzadas',
    'g2.p': 'Cada N días, semanas, meses o años. Lunes y miércoles, cada 2 semanas, una fecha exacta cada año.',
    'g3.h': 'Eventos del calendario',
    'g3.p': 'Lee tu Calendario de Apple y configura hasta 3 avisos por evento: al inicio, 15 min antes, 1 hora antes.',
    'g4.h': 'Botón "Ir" al manejar',
    'g4.p': 'Si el evento tiene ubicación, la alarma muestra un botón Ir que la detiene y abre Maps con direcciones.',
    'g5.h': 'Reuniones de Teams, Zoom y Meet',
    'g5.p': 'Detecta el enlace de la reunión en tu evento y muestra un botón Unirse que abre la app correcta.',
    'g6.h': 'Foto, icono y compartir',
    'g6.p': 'Ponle la foto de un amigo a su cumpleaños, elige un emoji, y comparte tu lista con personas de confianza.',

    // ---- showcase rows ----
    's1.ey': 'Cumpleaños y aniversarios',
    's1.h': 'Una vez. Y suena cada año.',
    's1.p': 'Programa el cumpleaños de un amigo con su foto y se repite automáticamente — sin que tengas que volver a tocarlo.',
    's1.l1': 'Recurrencia anual automática',
    's1.l2': 'Foto o icono para cada persona',
    's1.l3': 'Categorías con color propio',
    's1.imgAlt': 'Lista de alarmas',
    's2.ey': 'Recurrencias',
    's2.h': 'El control que tú quieres.',
    's2.p': 'Elige la frecuencia, el intervalo y los días exactos. Calarm te muestra las próximas ocurrencias antes de guardar.',
    's2.l1': 'Diaria, semanal, mensual o anual',
    's2.l2': 'Días específicos de la semana',
    's2.l3': 'Vista previa de próximas fechas',
    's2.imgAlt': 'Pantalla de repetición',
    's3.ey': 'Calendario · Botón Ir',
    's3.h': 'Tus eventos también suenan.',
    's3.p': 'Activa el tab Calendario y Calarm lee tus eventos de Apple. Cuando el evento tiene ubicación, en lugar de "posponer" aparece "Ir".',
    's3.l1': 'Hasta 3 avisos por evento',
    's3.l2': '"Ir" detiene la alarma y abre Maps',
    's3.l3': 'Direcciones automáticas',
    's3.tag': 'Ir · Maps',
    's3.imgAlt': 'Detalle de evento',

    // ---- meetings ----
    'm.ey': 'Reuniones',
    'm.h': 'Un toque para unirte.',
    'm.p': 'Calarm detecta automáticamente los enlaces de tus reuniones y muestra un botón que abre la app correcta — sin buscar el link.',
    'm.join': 'Unirse',

    // ---- privacy band ----
    'p.h': 'Todo privado en tu dispositivo',
    'p.p': 'Calarm no tiene servidor, no pide cuenta y no te rastrea. Lo que es tuyo, se queda en tu iPhone.',
    'p1.h': 'Fotos',
    'p1.p': 'Solo para mostrar la foto de un recordatorio que tú creaste. Se guardan localmente, nunca salen del dispositivo.',
    'p2.h': 'Calendario (lectura)',
    'p2.p': 'Leemos tus eventos solo para programar las alarmas. No se almacenan ni se envían fuera del dispositivo.',
    'p3.h': 'Cero tracking',
    'p3.p': 'Sin analítica de terceros, sin anuncios, sin identificadores publicitarios. Nada que recolectar.',
    'p.link': 'Leer la política de privacidad',

    // ---- final cta ----
    'cta.h1': 'Nunca olvides',
    'cta.h2': 'lo que importa.',
    'cta.p': 'Gratis. Privado. Hecho para iOS 26.',

    // ---- footer ----
    'foot.tag': 'Alarmas para cumpleaños, aniversarios y eventos de la vida real. Por Mathyu Solutions.',
    'foot.product': 'Producto',
    'foot.features': 'Funciones',
    'foot.privacy': 'Privacidad',
    'foot.support': 'Soporte',
    'foot.issues': 'Reportar un problema',
    'foot.policy': 'Política de privacidad',
    'foot.made': 'Hecho para iOS 26 · Liquid Glass · AlarmKit · SwiftData',

    // ============== Privacy page ==============
    'pv.back': 'Volver al sitio',
    'pv.ey': 'Calarm · Mathyu Solutions',
    'pv.title': 'Política de Privacidad',
    'pv.lead': 'Calarm está diseñada para funcionar por completo en tu dispositivo. No tenemos servidor, no pedimos cuenta y no te rastreamos.',
    'pv.updated': 'Última actualización: 12 de junio de 2026',
    'pv.tldr_h': 'En resumen',
    'pv.tldr1': 'No recolectamos ni vendemos tus datos personales.',
    'pv.tldr2': 'Sin servidor, sin cuentas y sin inicio de sesión.',
    'pv.tldr3': 'Sin anuncios, sin analítica de terceros y sin identificadores publicitarios.',
    'pv.tldr4': 'Tus alarmas, fotos y eventos se quedan en tu iPhone.',
    'pv.s1_h': '1. A qué accede Calarm',
    'pv.s1_p': 'Para que la app funcione, Calarm puede pedirte permiso para acceder a lo siguiente. Tú lo autorizas y puedes revocarlo en cualquier momento desde Ajustes de iOS.',
    'pv.s1a_h': 'Fotos',
    'pv.s1a_p': 'Si eliges una foto para un recordatorio (por ejemplo, la foto de un amigo en su cumpleaños), Calarm guarda esa imagen <strong>localmente en tu dispositivo</strong> para mostrarla cuando suene la alarma. Las fotos nunca se suben a ningún servidor.',
    'pv.s1b_h': 'Calendario (solo lectura)',
    'pv.s1b_p': 'Si activas el tab Calendario, Calarm <strong>lee</strong> los eventos de la app Calendario de Apple para programar las alarmas y detectar enlaces de reuniones (Teams, Zoom, Google Meet) y ubicaciones. No modificamos tus eventos y no los almacenamos ni enviamos fuera del dispositivo.',
    'pv.s1c_h': 'Alarmas y notificaciones (AlarmKit)',
    'pv.s1c_p': 'Calarm usa AlarmKit del sistema para que tus alarmas suenen aunque el iPhone esté en silencio, bloqueado o en modo Focus. Esta programación ocurre por completo en tu dispositivo a través de las APIs de Apple.',
    'pv.s2_h': '2. Resumen de prácticas de datos',
    'pv.s2_p': 'Esta tabla corresponde a la sección "Privacidad de la app" en App Store Connect.',
    'pv.th1': 'Tipo de dato',
    'pv.th2': 'Uso',
    'pv.th3': 'Vinculado a ti',
    'pv.th4': 'Tracking',
    'pv.r1c1': 'Fotos (contenido del usuario)',
    'pv.r1c2': 'Mostrar la foto de un recordatorio. Guardadas localmente.',
    'pv.r2c1': 'Eventos de calendario (lectura)',
    'pv.r2c2': 'Detectar eventos y reuniones para programar alarmas. No se almacenan fuera del dispositivo.',
    'pv.r3c1': 'Identificadores, ubicación, contactos, uso, diagnósticos',
    'pv.r3c2': 'No se recolectan',
    'pv.no': 'No',
    'pv.s3_h': '3. Almacenamiento y seguridad',
    'pv.s3_p': 'Toda tu información (alarmas, recordatorios, categorías, fotos y preferencias) se guarda localmente usando SwiftData en tu dispositivo. Como no hay servidor, no existe una base de datos central que pueda ser vulnerada.',
    'pv.s3_callout': 'Cuando agreguemos sincronización con iCloud, tu contenido se almacenará en tu base de datos privada de iCloud (Apple), cifrada de extremo a extremo. Actualizaremos esta política antes de habilitar esa función.',
    'pv.s4_h': '4. Compartir con personas de confianza',
    'pv.s4_p': 'Si usas la función para compartir tu lista de alarmas con una persona de confianza, esos datos se comparten mediante los servicios de Apple que tú autorizas. Calarm no actúa como intermediario ni guarda copias en ningún servidor propio.',
    'pv.s5_h': '5. Menores de edad',
    'pv.s5_p': 'Calarm tiene clasificación 4+ y es apta para todas las edades. No recolectamos conscientemente datos personales de nadie, incluidos los menores.',
    'pv.s6_h': '6. Cambios a esta política',
    'pv.s6_p': 'Si actualizamos esta política, cambiaremos la fecha de "Última actualización" y, cuando el cambio sea importante (por ejemplo, sincronización con iCloud), te lo avisaremos dentro de la app.',
    'pv.s7_h': '7. Contacto',
    'pv.s7_p': '¿Tienes preguntas sobre tu privacidad o esta política? Escríbenos:',
    'pv.foot_back': 'calarm.mathyusolutions.com',
  },
  en: {
    // ---- meta / SEO ----
    'site.title': 'Calarm — Alarms for what really matters',
    'site.description':
      'Calarm turns your important dates into alarms that ring even when your iPhone is silent, locked or in Focus. Free, private and built for iOS 26.',
    'privacy.metaTitle': 'Calarm — Privacy Policy',
    'privacy.metaDescription':
      "Calarm's privacy policy. No server, no accounts, no tracking. Your data stays on your device.",

    // ---- nav ----
    'nav.features': 'Features',
    'nav.privacy': 'Privacy',
    'nav.policy': 'Policy',
    'nav.get': 'Download',

    // ---- hero ----
    'hero.eyebrow': 'Built for iOS 26',
    'hero.h1a': 'Alarms for',
    'hero.h1b': 'what really matters',
    'hero.sub':
      'Birthdays, anniversaries, medications and calendar events. They ring loud even when your iPhone is silent, locked or in Focus.',
    'store.l1': 'Download on the',
    'hero.explore': 'See features',
    'hero.f1': 'Free',
    'hero.f2': 'No ads',
    'hero.f3': 'No tracking',
    'hero.imgAlt': 'Calarm — alarms screen',

    // ---- trust ----
    'trust.1': 'Rings on silent & Focus',
    'trust.2': 'Private on your device',
    'trust.3': 'English & Spanish',
    'trust.4': 'No server, no accounts',

    // ---- features grid ----
    'feat.h2a': "Everything the Clock",
    'feat.h2b': "can't do",
    'feat.p': 'Calarm was designed for real-life events — not just for waking you up.',
    'g1.h': 'Rings even on silent',
    'g1.p': "Powered by the system's AlarmKit: the alarm rings loud while your iPhone is locked, silenced or in Focus mode.",
    'g2.h': 'Advanced recurrences',
    'g2.p': 'Every N days, weeks, months or years. Mondays and Wednesdays, every 2 weeks, an exact date each year.',
    'g3.h': 'Calendar events',
    'g3.p': 'Reads your Apple Calendar and sets up to 3 alerts per event: at start, 15 min before, 1 hour before.',
    'g4.h': '"Go" button while driving',
    'g4.p': 'If the event has a location, the alarm shows a Go button that stops it and opens Maps with directions.',
    'g5.h': 'Teams, Zoom & Meet meetings',
    'g5.p': 'Detects the meeting link in your event and shows a Join button that opens the right app.',
    'g6.h': 'Photo, icon & sharing',
    'g6.p': "Put a friend's photo on their birthday, pick an emoji, and share your list with trusted helpers.",

    // ---- showcase rows ----
    's1.ey': 'Birthdays & anniversaries',
    's1.h': 'Set once. Rings every year.',
    's1.p': "Schedule a friend's birthday with their photo and it repeats automatically — you never touch it again.",
    's1.l1': 'Automatic yearly recurrence',
    's1.l2': 'Photo or icon for each person',
    's1.l3': 'Categories with their own color',
    's1.imgAlt': 'Alarm list',
    's2.ey': 'Recurrences',
    's2.h': 'The control you actually want.',
    's2.p': 'Choose the frequency, the interval and the exact days. Calarm previews the next occurrences before you save.',
    's2.l1': 'Daily, weekly, monthly or yearly',
    's2.l2': 'Specific days of the week',
    's2.l3': 'Preview of upcoming dates',
    's2.imgAlt': 'Repeat screen',
    's3.ey': 'Calendar · Go button',
    's3.h': 'Your events ring too.',
    's3.p': 'Turn on the Calendar tab and Calarm reads your Apple events. When the event has a location, "Go" replaces "snooze."',
    's3.l1': 'Up to 3 alerts per event',
    's3.l2': '"Go" stops the alarm and opens Maps',
    's3.l3': 'Automatic directions',
    's3.tag': 'Go · Maps',
    's3.imgAlt': 'Event detail',

    // ---- meetings ----
    'm.ey': 'Meetings',
    'm.h': 'One tap to join.',
    'm.p': 'Calarm automatically detects your meeting links and shows a button that opens the right app — no link hunting.',
    'm.join': 'Join',

    // ---- privacy band ----
    'p.h': 'Everything private on your device',
    'p.p': "Calarm has no server, asks for no account and never tracks you. What's yours stays on your iPhone.",
    'p1.h': 'Photos',
    'p1.p': 'Only to show the photo of a reminder you created. Stored locally, they never leave the device.',
    'p2.h': 'Calendar (read)',
    'p2.p': 'We read your events only to schedule alarms. Nothing is stored or sent off the device.',
    'p3.h': 'Zero tracking',
    'p3.p': 'No third-party analytics, no ads, no advertising identifiers. Nothing to collect.',
    'p.link': 'Read the privacy policy',

    // ---- final cta ----
    'cta.h1': 'Never forget',
    'cta.h2': 'what matters.',
    'cta.p': 'Free. Private. Built for iOS 26.',

    // ---- footer ----
    'foot.tag': 'Alarms for birthdays, anniversaries and real-life events. By Mathyu Solutions.',
    'foot.product': 'Product',
    'foot.features': 'Features',
    'foot.privacy': 'Privacy',
    'foot.support': 'Support',
    'foot.issues': 'Report an issue',
    'foot.policy': 'Privacy policy',
    'foot.made': 'Built for iOS 26 · Liquid Glass · AlarmKit · SwiftData',

    // ============== Privacy page ==============
    'pv.back': 'Back to site',
    'pv.ey': 'Calarm · Mathyu Solutions',
    'pv.title': 'Privacy Policy',
    'pv.lead': 'Calarm is designed to run entirely on your device. We have no server, ask for no account and never track you.',
    'pv.updated': 'Last updated: June 12, 2026',
    'pv.tldr_h': 'In short',
    'pv.tldr1': "We don't collect or sell your personal data.",
    'pv.tldr2': 'No server, no accounts and no sign-in.',
    'pv.tldr3': 'No ads, no third-party analytics and no advertising identifiers.',
    'pv.tldr4': 'Your alarms, photos and events stay on your iPhone.',
    'pv.s1_h': '1. What Calarm accesses',
    'pv.s1_p': 'For the app to work, Calarm may ask permission to access the following. You grant it, and you can revoke it anytime from iOS Settings.',
    'pv.s1a_h': 'Photos',
    'pv.s1a_p': "If you pick a photo for a reminder (for example, a friend's photo on their birthday), Calarm stores that image <strong>locally on your device</strong> to show it when the alarm rings. Photos are never uploaded to any server.",
    'pv.s1b_h': 'Calendar (read only)',
    'pv.s1b_p': "If you enable the Calendar tab, Calarm <strong>reads</strong> events from Apple's Calendar app to schedule alarms and detect meeting links (Teams, Zoom, Google Meet) and locations. We don't modify your events and don't store or send them off the device.",
    'pv.s1c_h': 'Alarms & notifications (AlarmKit)',
    'pv.s1c_p': "Calarm uses the system's AlarmKit so your alarms ring even when the iPhone is silent, locked or in Focus mode. This scheduling happens entirely on your device through Apple's APIs.",
    'pv.s2_h': '2. Data practices summary',
    'pv.s2_p': 'This table maps to the "App Privacy" section in App Store Connect.',
    'pv.th1': 'Data type',
    'pv.th2': 'Use',
    'pv.th3': 'Linked to you',
    'pv.th4': 'Tracking',
    'pv.r1c1': 'Photos (user content)',
    'pv.r1c2': "Show a reminder's photo. Stored locally.",
    'pv.r2c1': 'Calendar events (read)',
    'pv.r2c2': 'Detect events and meetings to schedule alarms. Not stored off-device.',
    'pv.r3c1': 'Identifiers, location, contacts, usage, diagnostics',
    'pv.r3c2': 'Not collected',
    'pv.no': 'No',
    'pv.s3_h': '3. Storage & security',
    'pv.s3_p': "All your information (alarms, reminders, categories, photos and preferences) is stored locally using SwiftData on your device. Since there's no server, there's no central database that could be breached.",
    'pv.s3_callout': 'When we add iCloud sync, your content will be stored in your private iCloud database (Apple), end-to-end encrypted. We’ll update this policy before enabling that feature.',
    'pv.s4_h': '4. Sharing with trusted helpers',
    'pv.s4_p': 'If you use the feature to share your alarm list with a trusted person, that data is shared via the Apple services you authorize. Calarm is not an intermediary and keeps no copies on any server of ours.',
    'pv.s5_h': '5. Children',
    'pv.s5_p': 'Calarm is rated 4+ and is suitable for all ages. We do not knowingly collect personal data from anyone, including children.',
    'pv.s6_h': '6. Changes to this policy',
    'pv.s6_p': 'If we update this policy, we’ll change the "Last updated" date and, when the change is significant (for example, iCloud sync), we’ll let you know inside the app.',
    'pv.s7_h': '7. Contact',
    'pv.s7_p': 'Questions about your privacy or this policy? Reach us:',
    'pv.foot_back': 'calarm.mathyusolutions.com',
  },
} as const;
