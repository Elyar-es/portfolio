// Manual list of projects - Edit this array to add/remove projects
const PROJECTS = [
    {
        name: "CAPE",
        displayName: "CAPE",
        description: "This is the official repository for CAPE: Connectivity-Aware Path Enforcement accepted in MICCAI 2025.",
        url: "https://github.com/NeuraVisionLab/CAPE",
        stars: 8,
        forks: 1,
        language: "Python"
    },
    {
        name: "Active Learning With Uncertainty-Aware Generation",
        displayName: "Active Learning With Uncertainty-Aware Generation",
        description: "End-to-end experiments for uncertainty-driven active learning on tabular and vision datasets. Includes baseline active learning, uncertainty-conditioned CGAN augmentation, and VAE latent interpolation.",
        url: "https://github.com/Elyar-es/Active-Learning-With-Uncertainty-Aware-Generation",
        stars: 0,
        forks: 0,
        language: "Python"
    },
    {
        name: "Bounding Boxes Refinement Using Level Sets",
        displayName: "Bounding Boxes Refinement Using Level Sets",
        description: "Refining the predicted bounding boxes of object detection models using Level Sets. Improves segmentation accuracy through various initialization strategies for the Level Set function.",
        url: "https://github.com/Elyar-es/Bounding-Box-Refinement-Using-Level-Sets",
        stars: 0,
        forks: 0,
        language: "Jupyter Notebook"
    },
    {
        name: "Curvilinear Structure Segmentation",
        displayName: "Curvilinear Structure Segmentation",
        description: "2D curvilinear structure segmentation code base",
        url: "https://github.com/Elyar-es/Curvilinear-Structure-Segmentation",
        stars: 0,
        forks: 0,
        language: "Jupyter Notebook"
    },
    {
        name: "Data Science for Software Engineering",
        displayName: "Data Science for Software Engineering",
        description: "Iterative refinement of human-written code reviews using CRScore and LLMs. Includes reward rerank pipeline and comprehensive evaluation framework.",
        url: "https://github.com/Elyar-es/Data-science-for-Software-Engineering-Course-project",
        stars: 0,
        forks: 0,
        language: "Python"
    },
    {
        name: "facial_keypoint_detection",
        displayName: "Facial Keypoint Detection",
        description: "Facial keypoint detection for rhinoplasty",
        url: "https://github.com/Elyar-es/facial_keypoint_detection",
        stars: 0,
        forks: 0,
        language: "Python"
    },
    {
        name: "character-recognition",
        displayName: "Character Recognition",
        description: "This project is used to decide whether the selected pattern looks like an X or O",
        url: "https://github.com/Elyar-es/character-recognition",
        stars: 0,
        forks: 0,
        language: "Java"
    },
    {
        name: "online-shop-project",
        displayName: "Online Shop Project",
        description: "E-commerce platform with shopping cart, user authentication, and payment integration.",
        url: "https://github.com/Elyar-es/online-shop-project",
        stars: 1,
        forks: 0,
        language: "Java"
    },
    {
        name: "server",
        displayName: "Server",
        description: "Custom Implementation of HTTP protocol and a functioning web server",
        url: "https://github.com/Elyar-es/server",
        stars: 0,
        forks: 0,
        language: "Rust"
    }
];

// Format repository name by replacing dashes and underscores with spaces
function formatProjectName(name) {
    return name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Create project card HTML
function createProjectCard(project) {
    const displayName = project.displayName || formatProjectName(project.name);
    const description = project.description || 'No description available';
    const language = project.language || null;
    
    return `
        <div class="project-card" onclick="window.open('${project.url}', '_blank')">
            <div class="project-header">
                <div>
                    <h3 class="project-title">
                        <a href="${project.url}" class="project-link" target="_blank" onclick="event.stopPropagation()">
                            ${displayName}
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
                    <span>${project.stars || 0}</span>
                </div>
                <div class="meta-item forks">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    <span>${project.forks || 0}</span>
                </div>
                ${language ? `
                <div class="meta-item language">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    <span>${language}</span>
                </div>
                ` : ''}
            </div>
            <div class="project-footer">
                <a href="${project.url}" class="view-button" target="_blank" onclick="event.stopPropagation()">
                    View on GitHub →
                </a>
            </div>
        </div>
    `;
}

// Display projects
function displayProjects() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const gridEl = document.getElementById('projectsGrid');
    
    loadingEl.style.display = 'none';
    
    if (PROJECTS.length === 0) {
        gridEl.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No projects to display. Edit projects.js to add projects.</p>';
        return;
    }
    
    // Create cards for each project
    const cards = PROJECTS.map(project => createProjectCard(project));
    gridEl.innerHTML = cards.join('');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', displayProjects);
