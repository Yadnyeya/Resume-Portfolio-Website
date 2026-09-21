/* Yadnyeya Vairat — portfolio behaviour.
   Three things only: mobile nav, scroll reveal, image lightbox. */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- mobile nav ---- */
  var burger = document.querySelector('.nav__burger');
  var links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---- scroll reveal ---- */
  var targets = document.querySelectorAll('.reveal');
  if (targets.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* ---- lightbox ---- */
  var group = [], at = -1, lb, lbImg, lbCap, lbPos, lastFocus;

  function build() {
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Project screenshot');
    lb.innerHTML =
      '<div class="lb__bar">' +
        '<button type="button" data-lb="prev">&larr; prev</button>' +
        '<button type="button" data-lb="next">next &rarr;</button>' +
        '<span class="lb__pos"></span>' +
        '<button type="button" class="lb__x" data-lb="close">close &times;</button>' +
      '</div>' +
      '<div class="lb__stage"><img alt=""></div>' +
      '<p class="lb__cap"></p>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('img');
    lbCap = lb.querySelector('.lb__cap');
    lbPos = lb.querySelector('.lb__pos');

    lb.addEventListener('click', function (e) {
      var act = e.target.getAttribute && e.target.getAttribute('data-lb');
      if (act === 'close' || e.target === lb || e.target.classList.contains('lb__stage')) close();
      else if (act === 'prev') step(-1);
      else if (act === 'next') step(1);
    });
  }

  function paint() {
    var fig = group[at];
    var img = fig.querySelector('img');
    lbImg.src = img.getAttribute('src');
    lbImg.alt = img.getAttribute('alt') || '';
    var cap = fig.querySelector('figcaption');
    lbCap.textContent = cap ? cap.textContent : (img.getAttribute('alt') || '');
    lbPos.textContent = (at + 1) + ' / ' + group.length;
  }

  function step(d) {
    if (group.length < 2) return;
    at = (at + d + group.length) % group.length;
    paint();
  }

  function open(fig) {
    if (!lb) build();
    var scope = fig.closest('.shots') || document;
    group = Array.prototype.slice.call(scope.querySelectorAll('.shot'));
    at = Math.max(0, group.indexOf(fig));
    lastFocus = document.activeElement;
    paint();
    lb.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    lb.querySelector('[data-lb="close"]').focus();
  }

  function close() {
    lb.removeAttribute('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.shot').forEach(function (fig) {
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('role', 'button');
    fig.addEventListener('click', function () { open(fig); });
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(fig); }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (!lb || !lb.hasAttribute('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
