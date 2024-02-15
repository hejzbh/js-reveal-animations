"use strict";

// DOM
const revealSections = document.querySelectorAll('section[data-reveal="true"]');

//

// 1)
function setDivAnimationClass(div) {
  const {
    dataset: { animation },
  } = div;

  div.classList.add(animation);
}

// 2)

function revealSection(entries, observer) {
  const [entry] = entries;
  const section = entry.target;

  const {
    dataset: { animation, once },
  } = section;

  const playOnce = Boolean(once);

  if (entry.isIntersecting) {
    section.classList.remove(animation);
  } else {
    if (playOnce) {
      observer.unobserve(section);
    } else {
      section.classList.add(animation);
    }
  }
}

const revealSectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: [0.2, 0.5, 0.8],
});

// When we enter the site.
window.addEventListener("DOMContentLoaded", () =>
  revealSections.forEach((section) => {
    setDivAnimationClass(section);
    revealSectionObserver.observe(section);
  })
);
