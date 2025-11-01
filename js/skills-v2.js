// Animate tech cards when they come into view
const observeTechCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const level = parseInt(card.dataset.level);

            card.style.setProperty('--progress', level);
            card.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.tech-card').forEach(card => {
    observeTechCards.observe(card);
});
