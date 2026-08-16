/* ==========================================================================
   火廻（ひまわり） — スクリプト
   ライブラリなしの素の JavaScript です。
   ========================================================================== */

(function () {
  'use strict';

  /* --- スクロールでヘッダーに背景をつける ------------------------------- */

  const header = document.getElementById('siteHeader');

  if (header) {
    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  /* --- スマホのハンバーガーメニュー ------------------------------------- */

  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('navMenu');

  if (toggle && nav) {
    const setNav = (open) => {
      nav.classList.toggle('open', open);
      // 開いている間はヘッダーも不透過にする（後ろの写真が透けないように）
      if (header) header.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    };

    toggle.addEventListener('click', () => {
      setNav(!nav.classList.contains('open'));
    });

    // メニュー内のリンクを押したら閉じる
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNav(false));
    });

    // メニューの外側を押しても閉じる
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      setNav(false);
    });

    // Esc キーでも閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* --- YouTube はクリックされてから読み込む ----------------------------- */
  /* 最初からプレイヤーを埋め込むと表示が重くなるので、
     サムネイルを押したタイミングで iframe に差し替えています。 */

  document.querySelectorAll('.yt-facade').forEach((facade) => {
    facade.addEventListener('click', () => {
      const id = facade.dataset.video;
      if (!id) return;

      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
                   '?autoplay=1&rel=0&modestbranding=1';
      iframe.title = facade.dataset.title || 'YouTube の動画';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; ' +
                     'gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      facade.replaceWith(iframe);
      iframe.focus();
    }, { once: true });
  });

  /* --- スクロールに合わせて要素をふわっと表示 --------------------------- */

  const revealTargets = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // 古いブラウザではアニメーションなしで全部表示する
    revealTargets.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 一度表示したら監視をやめる
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el, i) => {
    // 同じ列の要素が少しずつ遅れて出るように
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    observer.observe(el);
  });
})();
