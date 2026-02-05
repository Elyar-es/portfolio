// Publications data - Edit this array to add your publications
const publications = [
    {
        title: "Sample Publication Title",
        authors: "Author 1, Author 2, Your Name",
        venue: "Conference/Journal Name, Year",
        description: "Brief description of the publication. This is a placeholder - edit publications.js to add your actual publications.",
        links: {
            pdf: "#",
            arxiv: "#",
            code: "#"
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
    //         arxiv: "https://arxiv.org/abs/xxxx.xxxxx",
    //         code: "https://github.com/yourusername/repo"
    //     }
    // }
];

// Create publication item HTML
function createPublicationItem(pub) {
    const linksHtml = Object.entries(pub.links)
        .filter(([key, url]) => url && url !== '#')
        .map(([key, url]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return `<a href="${url}" class="publication-link" target="_blank">${label}</a>`;
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

