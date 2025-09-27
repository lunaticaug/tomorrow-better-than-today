// Post page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    const postUrl = window.location.href;
    const postTitle = document.querySelector('.post-title');

    if (shareButtons && postTitle) {
        const title = postTitle.textContent;

        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.dataset.share;
                let shareUrl = '';

                switch(platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
                        break;
                    case 'copy':
                        navigator.clipboard.writeText(postUrl).then(() => {
                            const originalHTML = this.innerHTML;
                            this.innerHTML = '✓';
                            this.style.color = 'var(--accent-color)';

                            setTimeout(() => {
                                this.innerHTML = originalHTML;
                                this.style.color = '';
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy:', err);
                            alert('Link copied!'); // Fallback for older browsers
                        });
                        return;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=550,height=450');
                }
            });
        });
    }

    // Table of Contents generation
    const tocList = document.querySelector('.toc-list');
    const headings = document.querySelectorAll('.post-content h2, .post-content h3');

    if (tocList && headings.length > 0) {
        headings.forEach((heading, index) => {
            // Add ID if missing
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }

            // Create TOC item
            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';

            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;

            // Smooth scroll
            a.addEventListener('click', function(e) {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Update URL without jumping
                history.pushState(null, null, `#${heading.id}`);
            });

            li.appendChild(a);
            tocList.appendChild(li);
        });

        // Highlight current section in TOC
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px'
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove all active classes
                    tocList.querySelectorAll('a').forEach(link => {
                        link.classList.remove('active');
                    });

                    // Add active class to current
                    const activeLink = tocList.querySelector(`a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        headings.forEach(heading => observer.observe(heading));
    }

    // Reading progress indicator (optional)
    const article = document.querySelector('.post-article');
    if (article) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: var(--accent-color);
            z-index: 1000;
            transition: width 0.2s;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        });
    }
});