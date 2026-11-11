// Page motion with GSAP. Progressive enhancement: every element is visible in
// the static HTML; these tweens only animate them in. Nothing runs for
// visitors who prefer reduced motion.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initMotion() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // ---- hero ----
    const title = document.querySelector<HTMLElement>('[data-hero-title]');
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (title) {
      const split = SplitText.create(title, { type: 'words', mask: 'words', wordsClass: 'word' });
      intro.from(split.words, { yPercent: 110, duration: 0.9, stagger: 0.06 }, 0.1);
    }
    intro
      .from('[data-hero-fade]', { y: 26, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.25)
      .from('[data-hero-phone]', { y: 120, rotate: 6, opacity: 0, duration: 1.2, ease: 'expo.out' }, 0.2)
      .from('[data-hero-clock]', { scale: 0.6, opacity: 0, duration: 1.2, ease: 'back.out(1.6)' }, 0.35)
      .from('[data-hero-chip]', { y: 30, scale: 0.85, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(2)' }, 0.9);

    gsap.utils.toArray<HTMLElement>('[data-hero-chip]').forEach((chip, i) => {
      gsap.to(chip, { y: i % 2 ? 10 : -10, duration: 2.6 + i * 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 });
    });

    // Hero visual drifts as you leave it.
    gsap.to('[data-hero-phone]', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true },
    });

    // ---- use-case marquee ----
    const track = document.querySelector<HTMLElement>('[data-marquee]');
    if (track) {
      const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      // Speeds up briefly with scroll velocity.
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 600, 4);
          gsap.to(loop, { timeScale: 1 + v, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
        },
      });
    }

    // ---- feature stories ----
    gsap.utils.toArray<HTMLElement>('[data-feature]').forEach((feature) => {
      const copy = feature.querySelectorAll('[data-feature-copy] > *');
      const front = feature.querySelector('[data-shot-front]');
      const back = feature.querySelector('[data-shot-back]');
      const glow = feature.querySelector('[data-glow]');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: feature, start: 'top 75%', toggleActions: 'play none none reverse' },
        defaults: { ease: 'power3.out' },
      });
      tl.from(copy, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08 });
      if (front) tl.from(front, { y: 140, rotate: -5, opacity: 0, duration: 1.1, ease: 'expo.out' }, 0);
      if (back) tl.from(back, { y: 200, rotate: 8, opacity: 0, duration: 1.3, ease: 'expo.out' }, 0.1);
      if (glow) tl.from(glow, { scale: 0.4, opacity: 0, duration: 1.4 }, 0);

      // Parallax between the two phones while scrolling through.
      if (back) {
        gsap.fromTo(
          back,
          { yPercent: 6 },
          { yPercent: -10, ease: 'none', scrollTrigger: { trigger: feature, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      }
    });

    // ---- everything else that should rise in ----
    gsap.set('[data-rise]', { opacity: 0, y: 50 });
    ScrollTrigger.batch('[data-rise]', {
      start: 'top 88%',
      onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', overwrite: true }),
    });

    // ---- final call to action: the icon rings when it arrives ----
    const bell = document.querySelector('[data-cta-icon]');
    if (bell) {
      gsap
        .timeline({ scrollTrigger: { trigger: bell, start: 'top 80%' } })
        .from(bell, { scale: 0.5, opacity: 0, duration: 0.8, ease: 'back.out(2)' })
        .to(bell, { rotate: 8, duration: 0.07, repeat: 9, yoyo: true, ease: 'sine.inOut' })
        .to(bell, { rotate: 0, duration: 0.2 });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  });
}
