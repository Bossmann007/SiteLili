import { gsap, ScrollTrigger, SplitText, Flip } from './gsap-setup';

const splits: SplitText[] = [];

function revertSplits() {
  splits.forEach((split) => split.revert());
  splits.length = 0;
}

function initEssentialMotion() {
  document.querySelectorAll<HTMLElement>('[data-motion-track]').forEach((track) => {
    track.addEventListener('pointerenter', () => {
      track.style.animationPlayState = 'paused';
    });
    track.addEventListener('pointerleave', () => {
      track.style.animationPlayState = 'running';
    });
  });
}

function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const trigger = el.closest('section') ?? el.parentElement;
    if (!trigger) return;

    gsap.fromTo(
      el,
      { y: -32 },
      {
        y: 32,
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

function initHorizontalScroll() {
  document.querySelectorAll<HTMLElement>('[data-h-scroll-section]').forEach((section) => {
    const track = section.querySelector<HTMLElement>('[data-h-scroll-track]');
    if (!track) return;

    const getScrollAmount = () => Math.max(track.scrollWidth - window.innerWidth + 32, 0);
    if (getScrollAmount() <= 0) return;

    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.85,
        start: 'top top',
        end: () => '+=' + (getScrollAmount() + window.innerHeight * 0.25),
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  });
}

function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.15,
    },
  });
}

function initMagneticButtons() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((button) => {
    const strength = 14;

    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: (x / rect.width) * strength,
        y: (y / rect.height) * strength,
        duration: 0.35,
        ease: 'power3.out',
      });
    });

    button.addEventListener('pointerleave', () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.55)' });
    });
  });
}

function initInteractiveCards() {
  document.querySelectorAll<HTMLElement>('[data-card-interactive]').forEach((card) => {
    const activate = () => {
      document.querySelectorAll('[data-card-interactive].is-active').forEach((el) => {
        if (el !== card) el.classList.remove('is-active');
      });
      card.classList.add('is-active');
    };

    card.addEventListener('pointerenter', activate);
    card.addEventListener('focusin', activate);
    card.addEventListener('pointerleave', () => card.classList.remove('is-active'));
    card.addEventListener('focusout', () => card.classList.remove('is-active'));
  });
}

function initTiltCards() {
  document.querySelectorAll<HTMLElement>('[data-tilt-card]').forEach((card) => {
    gsap.set(card, { transformPerspective: 900, transformOrigin: 'center center' });

    const onMove = (event: PointerEvent) => {
      if (card.classList.contains('is-expanded')) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 12,
        rotateX: -y * 10,
        y: -10,
        scale: 1.02,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: true,
      });
      card.classList.add('is-active');
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.55)',
      });
      card.classList.remove('is-active');
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    card.addEventListener('focusin', () => card.classList.add('is-active'));
    card.addEventListener('focusout', onLeave);
  });
}

function initServiceShowcase() {
  const section = document.querySelector<HTMLElement>('[data-services-section]');
  const showcase = document.querySelector<HTMLElement>('[data-services-showcase]');
  if (!showcase) return;

  const cards = showcase.querySelectorAll<HTMLElement>('[data-service-card]');
  const numbers = showcase.querySelectorAll<HTMLElement>('[data-service-number]');
  const spotlight = section?.querySelector<HTMLElement>('[data-service-spotlight]');

  if (section && spotlight) {
    gsap.set(spotlight, { opacity: 0 });

    section.addEventListener('pointerenter', () => {
      gsap.to(spotlight, { opacity: 1, duration: 0.35 });
    });

    section.addEventListener('pointerleave', () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.35 });
    });

    section.addEventListener('pointermove', (event) => {
      const rect = section.getBoundingClientRect();
      gsap.to(spotlight, {
        left: event.clientX - rect.left,
        top: event.clientY - rect.top,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  }

  cards.forEach((card) => {
    const shine = card.querySelector<HTMLElement>('[data-service-shine]');
    const line = card.querySelector<HTMLElement>('[data-line-accent]');
    const cta = card.querySelector<HTMLElement>('[data-service-cta]');
    const toggle = card.querySelector<HTMLButtonElement>('[data-service-toggle]');
    const expandable = card.hasAttribute('data-service-expand');

    card.addEventListener('pointermove', (event) => {
      if (!shine) return;
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      gsap.to(shine, {
        opacity: 0.55,
        x: `${x - 50}%`,
        y: `${y - 50}%`,
        duration: 0.35,
        ease: 'power2.out',
      });
    });

    card.addEventListener('pointerleave', () => {
      if (shine) gsap.to(shine, { opacity: 0, duration: 0.4 });
    });

    if (!expandable || !toggle) return;

    const toggleExpand = () => {
      const isExpanded = card.classList.contains('is-expanded');

      cards.forEach((other) => {
        other.classList.remove('is-expanded', 'is-active', 'is-dimmed');
        other.querySelector<HTMLButtonElement>('[data-service-toggle]')?.setAttribute('aria-expanded', 'false');
        const otherCta = other.querySelector<HTMLElement>('[data-service-cta]');
        otherCta?.setAttribute('tabindex', '-1');
        otherCta?.setAttribute('hidden', '');
      });

      if (!isExpanded) {
        card.classList.add('is-expanded', 'is-active');
        toggle.setAttribute('aria-expanded', 'true');
        cards.forEach((other) => {
          if (other !== card) other.classList.add('is-dimmed');
        });

        if (line) {
          gsap.fromTo(line, { scaleX: 0.35 }, { scaleX: 1, duration: 0.55, ease: 'power3.out' });
        }

        if (cta) {
          cta.removeAttribute('hidden');
          cta.setAttribute('tabindex', '0');
          gsap.fromTo(cta, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
        }

        gsap.to(card, {
          scale: 1.01,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: true,
        });
      }
    };

    toggle.addEventListener('click', toggleExpand);
  });

  gsap.from(cards, {
    opacity: 0,
    y: 72,
    rotateX: 12,
    duration: 0.95,
    ease: 'power3.out',
    stagger: 0.14,
    transformPerspective: 900,
    scrollTrigger: {
      trigger: showcase,
      start: 'top 78%',
      once: true,
    },
  });

  gsap.from(numbers, {
    opacity: 0,
    scale: 0.6,
    duration: 0.8,
    ease: 'back.out(1.6)',
    stagger: 0.12,
    scrollTrigger: {
      trigger: showcase,
      start: 'top 78%',
      once: true,
    },
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

function initGalleryItems() {
  gsap.utils.toArray<HTMLElement>('[data-gallery-item]').forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      duration: 0.75,
      ease: 'power3.out',
      delay: index * 0.04,
      scrollTrigger: {
        trigger: item,
        start: 'top 92%',
        once: true,
      },
    });
  });
}

function safeSplitText(element: HTMLElement, vars: ConstructorParameters<typeof SplitText.create>[1]) {
  try {
    const split = SplitText.create(element, vars);
    splits.push(split);
    return split;
  } catch {
    return null;
  }
}

export function initAnimations(): () => void {
  initEssentialMotion();

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
          '[data-animate], [data-reveal], [data-service-card], [data-nav-item], [data-header-logo], [data-hero-media], [data-hero-cta] > *, [data-cta-block] > *, [data-stagger-item], [data-line-accent], [data-motion-dot], [data-flip-item], [data-parallax], [data-gallery-item], [data-scroll-progress], [data-magnetic], [data-h-scroll-track], [data-tilt-card], [data-service-number]',
          { opacity: 1, clearProps: 'transform' },
        );
        document.querySelectorAll('[data-flip-grid]').forEach((grid) => grid.classList.add('is-flipped'));
        document.querySelector('[data-scroll-progress]')?.classList.add('scale-x-100');
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
        const split = safeSplitText(heroTitle, { type: 'words,chars', aria: 'auto' });
        if (split?.chars) {
          heroTl.from(
            split.chars,
            { opacity: 0, y: 36, duration: 0.65, ease: 'power4.out', stagger: 0.012 },
            '-=0.2',
          );
        } else {
          heroTl.from(heroTitle, { opacity: 0, y: 24, duration: 0.65 }, '-=0.2');
        }
      }

      const heroSubtitle = document.querySelector<HTMLElement>('[data-hero-subtitle]');
      if (heroSubtitle) {
        const subSplit = safeSplitText(heroSubtitle, { type: 'lines', aria: 'auto' });
        if (subSplit?.lines) {
          heroTl.from(subSplit.lines, { opacity: 0, y: 20, stagger: 0.08, duration: 0.55 }, '-=0.25');
        } else {
          heroTl.from(heroSubtitle, { opacity: 0, y: 16, duration: 0.55 }, '-=0.25');
        }
      }

      const heroCta = document.querySelector('[data-hero-cta]');
      if (heroCta) heroTl.from(heroCta.children, { opacity: 0, y: 18, stagger: 0.1, duration: 0.5 }, '-=0.2');

      initHeroMedia();
      initParallax();
      initScrollProgress();
      initMagneticButtons();
      initInteractiveCards();
      initTiltCards();
      initServiceShowcase();
      initMotionPaths();
      initGalleryItems();

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
        const ctaItems = ctaBlock.querySelectorAll('p, h2, h3, a, img');
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
