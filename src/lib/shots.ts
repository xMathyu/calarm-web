import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';
import type { ShotName } from '../i18n/landing';

// Real screenshots of the app, captured from the simulator per language
// (src/assets/images/screens/<lang>/<name>.jpg, 660×1434).
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/screens/*/*.jpg', { eager: true });

// The app has no German UI: the German page shows the English app.
const shotLang: Record<Lang, 'es' | 'en' | 'pt'> = { es: 'es', en: 'en', pt: 'pt', de: 'en' };

export function shot(lang: Lang, name: ShotName): ImageMetadata | undefined {
  const own = files[`../assets/images/screens/${shotLang[lang]}/${name}.jpg`];
  return (own ?? files[`../assets/images/screens/en/${name}.jpg`])?.default;
}
