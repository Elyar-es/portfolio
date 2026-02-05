# Updating Repository Statistics

The GitHub API is currently rate-limited. To update stars, forks, and languages for your projects:

## Option 1: Run the Update Script (Recommended)

Wait for the rate limit to reset (usually 1 hour), then run:

```bash
cd "/Users/elyaresmailzadeh/Downloads/CS-588-main-2/GITHUB/portfolio-site"
python3 update-repo-stats.py
```

This script will:
- Fetch current stars, forks, and languages from GitHub
- Display the results
- Optionally update `projects.js` automatically

## Option 2: Manual Update

1. Visit each repository on GitHub
2. Note the stars, forks, and primary language
3. Edit `projects.js` and update the values manually

## Current Known Values

- **CAPE**: 8 stars, 1 fork, Python ✓ (already correct)

## Rate Limit Info

GitHub API rate limits:
- Unauthenticated: 60 requests/hour
- Authenticated: 5,000 requests/hour

To increase the limit, you can:
1. Create a GitHub Personal Access Token
2. Add it to the script: `req.add_header('Authorization', 'token YOUR_TOKEN')`

