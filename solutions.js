const sections = document.querySelectorAll('.solutions-tabs-left-content');
const videos = document.querySelectorAll('.solutions-tabs-video');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  const baseOffset = vh * 0.7;
  const firstOffset = vh * 1.5; // extra space for first container

  sections.forEach((section, index) => {
    let start, end;

    if (index === 0) {
      // First section: extended active period
      start = 0;
      end = vh + firstOffset;
    } else {
      // Next sections: shift their scroll window down to prevent overlap
      start = vh + firstOffset + (index - 1) * (vh + baseOffset);
      end = start + vh + baseOffset;
    }

    if (scrollY >= start && scrollY < end) {
      section.classList.add('active');
      videos[index].classList.add('active');
    } else {
      section.classList.remove('active');
      videos[index].classList.remove('active');
    }
  });

  // Final fallback to keep last section active
  const lastIndex = sections.length - 1;
  const finalTrigger = vh + firstOffset + (lastIndex - 1) * (vh + baseOffset);
  if (scrollY > finalTrigger) {
    sections[lastIndex].classList.add('active');
    videos[lastIndex].classList.add('active');
  }
});
