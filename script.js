// Configuration - Update this with your GitHub username
const GITHUB_USERNAME = 'Elyar-es';
const API_BASE = 'https://api.github.com';

// Get all repositories for the user
async function fetchRepositories() {
    try {
        const response = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter out forks if you only want original projects
        // Uncomment the next line if you want to exclude forks
        // const originalRepos = repos.filter(repo => !repo.fork);
        
        return repos;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
}

// Get language statistics for a repository
async function fetchRepoLanguages(repo) {
    try {
        const response = await fetch(`${API_BASE}/repos/${repo.full_name}/languages`);
        if (!response.ok) return {};
        return await response.json();
    } catch (error) {
        console.error(`Error fetching languages for ${repo.name}:`, error);
        return {};
    }
}

// Format date to relative time
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

// Get primary language from languages object
function getPrimaryLanguage(languages) {
    if (!languages || Object.keys(languages).length === 0) return null;
    
    const sorted = Object.entries(languages).sort((a, b) => b[1] - a[1]);
    return sorted[0][0];
}

// Create project card HTML
function createProjectCard(repo, primaryLanguage) {
    const description = repo.description || 'No description available';
    const updatedDate = formatDate(repo.updated_at);
    
    return `
        <div class="project-card" onclick="window.open('${repo.html_url}', '_blank')">
            <div class="project-header">
                <div>
                    <h3 class="project-title">
                        <a href="${repo.html_url}" class="project-link" target="_blank" onclick="event.stopPropagation()">
                            ${repo.name}
                        </a>
                    </h3>
                </div>
            </div>
            <p class="project-description">${description}</p>
            <div class="project-meta">
                <div class="meta-item stars">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
                    </svg>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="meta-item forks">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    <span>${repo.forks_count}</span>
                </div>
                ${primaryLanguage ? `
                <div class="meta-item language">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>${primaryLanguage}</span>
                </div>
                ` : ''}
            </div>
            <div class="project-footer">
                <span class="updated-date">Updated ${updatedDate}</span>
                <a href="${repo.html_url}" class="view-button" target="_blank" onclick="event.stopPropagation()">
                    View on GitHub →
                </a>
            </div>
        </div>
    `;
}

// Display projects
async function displayProjects() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const gridEl = document.getElementById('projectsGrid');
    
    try {
        const repos = await fetchRepositories();
        
        if (repos.length === 0) {
            gridEl.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No repositories found.</p>';
            loadingEl.style.display = 'none';
            return;
        }
        
        // Sort by updated date (most recent first)
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        // Create cards for each repository
        const cards = await Promise.all(
            repos.map(async (repo) => {
                const languages = await fetchRepoLanguages(repo);
                const primaryLanguage = getPrimaryLanguage(languages);
                return createProjectCard(repo, primaryLanguage);
            })
        );
        
        gridEl.innerHTML = cards.join('');
        loadingEl.style.display = 'none';
        
    } catch (error) {
        console.error('Error displaying projects:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', displayProjects);

