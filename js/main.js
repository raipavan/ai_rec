(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  var animateCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) {
      el.textContent = prefix + target.toFixed(decimals) + suffix;
      return;
    }
    var duration = 1400;
    var start = null;
    var tick = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Pricing billing toggle ---------- */
  var billing = document.querySelector(".billing-toggle");
  if (billing) {
    var opts = billing.querySelectorAll(".opt");
    var prices = document.querySelectorAll("[data-monthly]");
    var switchPlan = function (mode) {
      opts.forEach(function (o) {
        o.setAttribute("aria-pressed", o.getAttribute("data-mode") === mode ? "true" : "false");
      });
      prices.forEach(function (p) {
        var val = mode === "annual" ? p.getAttribute("data-annual") : p.getAttribute("data-monthly");
        var numEl = p.querySelector(".price-num");
        if (numEl) {
          numEl.textContent = val;
          p.classList.remove("is-flipping");
          void p.offsetWidth; /* restart transition */
          p.classList.add("is-flipping");
        }
      });
      document.querySelectorAll("[data-bill-note]").forEach(function (n) {
        n.textContent = mode === "annual" ? "billed annually" : "billed monthly";
      });
    };
    opts.forEach(function (o) {
      o.addEventListener("click", function () { switchPlan(o.getAttribute("data-mode")); });
    });
  }

  /* ---------- Customer story carousel ---------- */
  var quotes = document.getElementById("quote-scroller");
  if (quotes) {
    var qTrack = quotes.querySelector(".quote-track");
    var qCards = qTrack ? Array.prototype.slice.call(qTrack.children) : [];
    var qPrev = document.querySelector('.quote-btn[data-dir="-1"]');
    var qNext = document.querySelector('.quote-btn[data-dir="1"]');
    var qCount = document.querySelector(".quote-count");

    var qMax = function () {
      return quotes.scrollWidth - quotes.clientWidth;
    };
    var qIndex = function () {
      var mid = quotes.scrollLeft + quotes.clientWidth / 2;
      var best = 0;
      var bestDist = Infinity;
      qCards.forEach(function (card, i) {
        var d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    };
    var qState = function () {
      if (qCount) qCount.textContent = (qIndex() + 1) + " / " + qCards.length;
      if (qPrev) qPrev.disabled = quotes.scrollLeft <= 2;
      if (qNext) qNext.disabled = quotes.scrollLeft >= qMax() - 2;
    };
    var qGo = function (dir) {
      var idx = Math.max(0, Math.min(qCards.length - 1, qIndex() + dir));
      var card = qCards[idx];
      var left = card.offsetLeft + card.offsetWidth / 2 - quotes.clientWidth / 2;
      quotes.scrollTo({
        left: Math.max(0, Math.min(left, qMax())),
        behavior: prefersReduced ? "auto" : "smooth"
      });
    };
    if (qPrev) qPrev.addEventListener("click", function () { qGo(-1); });
    if (qNext) qNext.addEventListener("click", function () { qGo(1); });
    quotes.addEventListener("scroll", function () {
      window.clearTimeout(quotes._settle);
      quotes._settle = window.setTimeout(qState, 90);
    }, { passive: true });
    quotes.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); qGo(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); qGo(-1); }
    });
    window.addEventListener("resize", qState);
    qState();
  }

  /* ---------- Newsletter ---------- */
  var newsletter = document.querySelector(".newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", function (e) {
      e.preventDefault();
      var hint = newsletter.querySelector(".newsletter-hint");
      if (hint) hint.textContent = "You're on the list — the first notes arrive next month.";
      newsletter.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
