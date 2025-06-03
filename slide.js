document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".slide");

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains("reveal")) {
                const delay = index * 200;
                entry.target.dataset.delay = delay;
                
                setTimeout(() => {
                    entry.target.classList.add("reveal");
                }, delay);
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(element => observer.observe(element));
});
