document.addEventListener('DOMContentLoaded', function() {

    const customSelect = document.querySelector('.custom_select');
    const selectedValue = document.querySelector('.selected_value');
    const customOptions = document.querySelector('.custom_options');
    const options = document.querySelectorAll('.custom_option');
    const projects = document.querySelectorAll('.project');
    const projectsContainer = document.querySelector('.projects_container');

    customSelect.addEventListener('click', function() {
        customOptions.classList.toggle('show');
        customSelect.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target)) {
            customOptions.classList.remove('show');
            customSelect.classList.remove('open');
        }
    });

    options.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();

            const value = this.getAttribute('data-value');
            selectedValue.querySelector('span').textContent = this.textContent;

            options.forEach(opt => opt.setAttribute('aria-selected', 'false'));
            this.setAttribute('aria-selected', 'true');

            filterProjects(value);

            customOptions.classList.remove('show');
            customSelect.classList.remove('open');
        });
    });

    function filterProjects(category) {
        let visibleCount = 0;

        projects.forEach((project, index) => {
            if (category === 'all') {
                visibleCount++;
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 50);
            } else {
                const projectCategories = project.getAttribute('data-category');
                if (projectCategories && projectCategories.includes(category)) {
                    visibleCount++;
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            }
        });

        setTimeout(() => {
            if (visibleCount === 1) {
                projectsContainer.style.gridTemplateColumns = 'minmax(350px, 420px)';
                projectsContainer.style.justifyContent = 'center';
            } else if (visibleCount === 2) {
                projectsContainer.style.gridTemplateColumns = 'repeat(2, minmax(350px, 420px))';
                projectsContainer.style.justifyContent = 'center';
                projectsContainer.style.gap = '2rem';
            } else if (visibleCount > 2) {
                projectsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
                projectsContainer.style.justifyContent = 'center';
                projectsContainer.style.gap = '2rem';
            }
        }, 100);

        handleEmptyState(visibleCount);
    }

    function handleEmptyState(visibleCount) {
        let emptyMessage = document.querySelector('.empty-state-message');

        if (visibleCount === 0) {
            if (!emptyMessage) {
                emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-state-message';
                emptyMessage.innerHTML = `
                    <div class="empty-icon">🚀</div>
                    <h3>Nothing here yet!</h3>
                    <p>This category is still under construction. <br>More amazing projects dropping soon.</p>
                `;
                projectsContainer.parentNode.insertBefore(emptyMessage, projectsContainer.nextSibling);

                setTimeout(() => {
                    emptyMessage.style.opacity = '1';
                    emptyMessage.style.transform = 'translateY(0)';
                }, 100);
            }
        } else {
            if (emptyMessage) {
                emptyMessage.style.opacity = '0';
                emptyMessage.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    emptyMessage.remove();
                }, 300);
            }
        }
    }

    const scrollBtn = document.querySelector("#scrollToTopBtn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 100) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    if(scrollBtn) {
        scrollBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    projects.forEach(project => {
        project.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    customSelect.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            customOptions.classList.toggle('show');
            customSelect.classList.toggle('open');
        }

        if (e.key === 'Escape') {
            customOptions.classList.remove('show');
            customSelect.classList.remove('open');
        }
    });

    filterProjects('all');
});
