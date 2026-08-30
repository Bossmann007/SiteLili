import { gsap, ScrollTrigger, SplitText, Flip } from './gsap-setup';

const splits: SplitText[] = [];

function revertSplits() {
  splits.forEach((split) => split.revert());
  splits.length = 0;
}

function initMarquees() {
  document.querySelectorAll<HTMLElement>('[data-marquee-track]').forEach((track) => {
    const inner = track.querySelector<HTMLElement>('[data-marquee-inner]');
    if (!inner) return;

    const clone = inner.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);

    gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 28,
      repeat: -1,
    });
  });
}

function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const trigger = el.closest('section') ?? el.parentElement;
    if (!trigger) return;

    gsap.fromTo(
      el,
      { y: -28 },
      {
        y: 28,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

function initHeroMedia() {
  const media = document.querySelector<HTMLElement>('[data-hero-media]');
  if (!media) return;

  gsap.from(media, {
    opacity: 0,
    scale: 0.96,
    duration: 1.05,
    ease: 'power3.out',
    delay: 0.45,
  });
}

function initMotionPaths() {
  document.querySelectorAll<HTMLElement>('[data-motion-path-wrap]').forEach((wrap) => {
    const path = wrap.querySelector('path');
    const dot = wrap.querySelector<HTMLElement>('[data-motion-dot]');
    const section = wrap.closest('section');
    if (!path || !dot || !section) return;

    gsap.set(dot, { opacity: 0, scale: 0.6 });

    gsap
      .timeline({ delay: 0.5 })
      .to(dot, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' })
      .to(dot, {
        duration: 1.4,
        ease: 'power3.inOut',
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 0.35 },
      });

    gsap.to(dot, {
      ease: 'none',
      motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 },
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.85 },
    });
  });
}

function initFlipGrids() {
  document.querySelectorAll<HTMLElement>('[data-flip-grid]').forEach((grid) => {
    const items = grid.querySelectorAll<HTMLElement>('[data-flip-item]');
    if (!items.length) return;

    ScrollTrigger.create({
      trigger: grid,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        const state = Flip.getState(items);
        grid.classList.add('is-flipped');
        Flip.from(state, {
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.07,
          absolute: true,
          scale: true,
        });
      },
    });
  });
}

function initSplitTitles() {
  document.querySelectorAll<HTMLElement>('[data-split-title]').forEach((el) => {
    if (el.hasAttribute('data-hero-title') || el.hasAttribute('data-section-title')) return;

    const split = SplitText.create(el, { type: 'lines,words', aria: 'auto' });
    splits.push(split);

    gsap.from(split.words, {
      opacity: 0,
      y: 18,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.045,
      scrollTrigger: {
        trigger: el.closest('[data-flip-item], [data-service-card]') ?? el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}

export function initAnimations(): () => void {
  const mm = gsap.matchMedia();

  mm.add(
    {
      reduceMotion: '(prefers-reduced-motion: reduce)',
      motion: '(prefers-reduced-motion: no-preference)',
    },
    (context) => {
      const { reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.set(
          '[data-animate], [data-reveal], [data-service-card], [data-nav-item], [data-header-logo], [data-hero-media], [data-hero-cta] > *, [data-cta-block] > *, [data-stagger-item], [data-line-accent], [data-motion-dot], [data-flip-item], [data-parallax]',
          { opacity: 1, clearProps: 'transform' },
        );
        document.querySelectorAll('[data-flip-grid]').forEach((grid) => grid.classList.add('is-flipped'));
        return;
      }

      const headerTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });
      headerTl
        .from('[data-header-logo]', { opacity: 0, y: -16, duration: 0.75 })
        .from('[data-nav-item]', { opacity: 0, y: -10, stagger: 0.07, duration: 0.5 }, '-=0.4')
        .from('[data-header-cta]', { opacity: 0, scale: 0.94, duration: 0.45 }, '-=0.25');

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 });

      const heroEyebrow = document.querySelector('[data-hero-eyebrow]');
      if (heroEyebrow) heroTl.from(heroEyebrow, { opacity: 0, y: 20, duration: 0.6 });

      const heroTitle = document.querySelector<HTMLElement>('[data-hero-title]');
      if (heroTitle) {
        const split = SplitText.create(heroTitle, { type: 'words,chars', aria: 'auto' });
        splits.push(split);
        heroTl.from(
          split.chars,
          { opacity: 0, y: 36, duration: 0.65, ease: 'power4.out', stagger: 0.012 },
          '-=0.2',
        );
      }

      const heroSubtitle = document.querySelector<HTMLElement>('[data-hero-subtitle]');
      if (heroSubtitle) {
        const subSplit = SplitText.create(heroSubtitle, { type: 'lines', aria: 'auto' });
        splits.push(subSplit);
        heroTl.from(subSplit.lines, { opacity: 0, y: 20, stagger: 0.08, duration: 0.55 }, '-=0.25');
      }

      const heroCta = document.querySelector('[data-hero-cta]');
      if (heroCta) heroTl.from(heroCta.children, { opacity: 0, y: 18, stagger: 0.1, duration: 0.5 }, '-=0.2');

      initHeroMedia();
      initMarquees();
      initParallax();
      initMotionPaths();

      document.querySelectorAll<HTMLElement>('[data-section-title]').forEach((el) => {
        if (el.hasAttribute('data-hero-title')) return;
        const split = SplitText.create(el, { type: 'words', aria: 'auto' });
        splits.push(split);
        gsap.from(split.words, {
          opacity: 0,
          y: 32,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      initSplitTitles();
      initFlipGrids();

      gsap.utils.toArray<HTMLElement>('[data-eyebrow]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -18,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-line-accent]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 44,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
            overwrite: true,
          });
        },
      });

      ScrollTrigger.batch('[data-stagger-item]', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 24,
            duration: 0.65,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          });
        },
      });

      const ctaBlock = document.querySelector('[data-cta-block]');
      if (ctaBlock) {
        const ctaItems = ctaBlock.querySelectorAll('p, h2, h3, a');
        gsap.from(ctaItems, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: ctaBlock, start: 'top 80%', once: true },
        });
      }

      const footer = document.querySelector('footer');
      if (footer) {
        gsap.from('[data-footer-reveal]', {
          opacity: 0,
          y: 28,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: footer, start: 'top 94%', once: true },
        });
      }

      return () => revertSplits();
    },
  );

  return () => {
    revertSplits();
    mm.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}

if (typeof document !== 'undefined') {
  let cleanup = initAnimations();
  document.addEventListener('astro:before-swap', () => {
    cleanup();
    cleanup = () => undefined;
  });
  document.addEventListener('astro:page-load', () => {
    cleanup = initAnimations();
  });
}
