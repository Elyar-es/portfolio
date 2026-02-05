// Publications data - Edit this array to add your publications
const publications = [
    {
        title: "Sample Publication Title",
        authors: "Author 1, Author 2, Your Name",
        venue: "Conference/Journal Name, Year",
        description: "Brief description of the publication. This is a placeholder - edit publications.js to add your actual publications.",
        links: {
            pdf: "#",
            webpage: "#",
            github: "#"
        }
    }
    // Add more publications here:
    // {
    //     title: "Your Publication Title",
    //     authors: "Co-author 1, Co-author 2, Your Name",
    //     venue: "Conference Name, 2024",
    //     description: "Description of your work...",
    //     links: {
    //         pdf: "https://example.com/paper.pdf",
    //         webpage: "https://example.com/publication-page",
    //         github: "https://github.com/yourusername/repo"
    //     }
    // }
];

// Create publication item HTML
function createPublicationItem(pub) {
    const linkIcons = {
        pdf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
        webpage: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
        github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
    };

    const linkLabels = {
        pdf: "PDF",
        webpage: "Webpage",
        github: "GitHub"
    };

    const linksHtml = Object.entries(pub.links)
        .filter(([key, url]) => url && url !== '#')
        .map(([key, url]) => {
            const icon = linkIcons[key] || '';
            const label = linkLabels[key] || key.charAt(0).toUpperCase() + key.slice(1);
            return `<a href="${url}" class="publication-link" target="_blank" title="${label}">${icon} ${label}</a>`;
        })
        .join('');

    return `
        <div class="publication-item">
            <div class="publication-content">
                <h3 class="publication-title">${pub.title}</h3>
                <p class="publication-authors">${pub.authors}</p>
                <p class="publication-venue">${pub.venue}</p>
                <p class="publication-description">${pub.description}</p>
                ${linksHtml ? `<div class="publication-links">${linksHtml}</div>` : ''}
            </div>
        </div>
    `;
}

// Display publications
function displayPublications() {
    const listEl = document.getElementById('publicationsList');
    
    if (publications.length === 0) {
        listEl.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No publications yet. Edit publications.js to add your publications.</p>';
        return;
    }
    
    const items = publications.map(createPublicationItem).join('');
    listEl.innerHTML = items;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', displayPublications);

