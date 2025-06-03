window.addEventListener('scroll', () => {
  const scrollSpace = document.querySelector('.animation-scroll-space');
  const fixedContent = document.querySelector('.animation-fixed-content');
  const mainImage = document.querySelector('.main-image');
  const burstImages = document.querySelectorAll('.burst-image');

  const rect = scrollSpace.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const totalScroll = scrollSpace.offsetHeight - windowHeight;

  const scrollTop = window.scrollY;
  const scrollSpaceTop = scrollSpace.offsetTop;
  const scrollSpaceBottom = scrollSpaceTop + scrollSpace.offsetHeight;

  const isInView = rect.top <= 0 && rect.bottom > windowHeight;

  if (isInView) {
    // The animation is in progress
    fixedContent.classList.add('active');
    fixedContent.classList.remove('finished');

    const scrollProgress = -rect.top / totalScroll;
    const progress = Math.min(Math.max(scrollProgress, 0), 1);
    const eased = 1 - Math.pow(1 - progress, 2);

    const mainScale = 1 - 0.75 * eased;
    mainImage.style.transform = `translate(-50%, -50%) scale(${mainScale})`;

    const gridSize = 5;
    const spacingVw = 12;
    const centerIndex = Math.floor(gridSize / 2);
    const delayPerImage = 0.025;

    let burstImageIndex = 0;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (row === centerIndex && col === centerIndex) continue;

        const img = burstImages[burstImageIndex];
        if (!img) break;

        const delayOffset = burstImageIndex * delayPerImage;
        const effectiveProgress = Math.max(0, eased - delayOffset);
        const normalizedProgress = Math.min(effectiveProgress / (1 - delayOffset), 1);

        const dx = col - centerIndex;
        const dy = row - centerIndex;
        const angle = Math.atan2(dy, dx);
        const radius = Math.sqrt(dx * dx + dy * dy);

        const arcX = Math.cos(angle + normalizedProgress * 0.5) * radius * spacingVw * normalizedProgress;
        const arcY = Math.sin(angle + normalizedProgress * 0.5) * radius * spacingVw * normalizedProgress;

        img.style.transform = `translate(calc(-50% + ${arcX}vw), calc(-50% + ${arcY}vw)) scale(${normalizedProgress})`;
        img.style.opacity = normalizedProgress;

        burstImageIndex++;
      }
    }
  } else if (rect.bottom <= windowHeight) {
    // Scroll-space bottom has reached the bottom of the viewport — unpin
    fixedContent.classList.remove('active');
    fixedContent.classList.add('finished');
  } else {
    // Before scroll-space — reset
    fixedContent.classList.remove('active', 'finished');
    mainImage.style.transform = `translate(-50%, -50%) scale(1)`;
    burstImages.forEach(img => {
      img.style.opacity = 0;
      img.style.transform = 'translate(-50%, -50%) scale(0)';
    });
  }
});
