#!/usr/bin/env python3
"""
Script to fetch stars, forks, and languages from GitHub API and update projects.js
Run this script when you want to update the repository statistics.
"""

import json
import urllib.request
import time
import re

# Repository information
repos = [
    ("NeuraVisionLab", "CAPE", "CAPE"),
    ("Elyar-es", "Active-Learning-With-Uncertainty-Aware-Generation", "Active Learning With Uncertainty-Aware Generation"),
    ("Elyar-es", "Bounding-Box-Refinement-Using-Level-Sets", "Bounding Boxes Refinement Using Level Sets"),
    ("Elyar-es", "Curvilinear-Structure-Segmentation", "Curvilinear Structure Segmentation"),
    ("Elyar-es", "CS-588", "Data Science for Software Engineering"),
    ("Elyar-es", "facial_keypoint_detection", "facial_keypoint_detection"),
    ("Elyar-es", "character-recognition", "character-recognition"),
    ("Elyar-es", "online-shop-project", "online-shop-project"),
    ("Elyar-es", "server", "server"),
]

def fetch_repo_data(owner, repo):
    """Fetch repository data from GitHub API"""
    try:
        # Fetch repo info
        url = f"https://api.github.com/repos/{owner}/{repo}"
        print(f"Fetching {owner}/{repo}...", end=" ", flush=True)
        
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read())
            
            if 'message' in data:
                print(f"Error: {data['message']}")
                return None
                
            stars = data.get('stargazers_count', 0)
            forks = data.get('forks_count', 0)
            
            # Fetch languages
            time.sleep(1)  # Delay to avoid rate limiting
            lang_url = f"https://api.github.com/repos/{owner}/{repo}/languages"
            
            try:
                with urllib.request.urlopen(lang_url) as lang_response:
                    lang_data = json.loads(lang_response.read())
                    if lang_data and isinstance(lang_data, dict):
                        language = max(lang_data.items(), key=lambda x: x[1])[0]
                    else:
                        language = None
            except:
                language = None
            
            print(f"✓ {stars}⭐ {forks}🍴 {language or 'N/A'}")
            return {
                'stars': stars,
                'forks': forks,
                'language': language
            }
    except urllib.error.HTTPError as e:
        if e.code == 403:
            print("⚠ Rate limited")
        else:
            print(f"✗ HTTP {e.code}")
        return None
    except Exception as e:
        print(f"✗ Error: {str(e)[:50]}")
        return None

def update_projects_js(repo_data):
    """Update projects.js with fetched data"""
    with open('projects.js', 'r') as f:
        content = f.read()
    
    # Update each project
    for name, data in repo_data.items():
        if data is None:
            continue
            
        # Find the project entry
        pattern = rf'(name:\s*"{re.escape(name)}"[^}}]+?stars:\s*)\d+([^}}]+?forks:\s*)\d+([^}}]+?language:\s*)"[^"]*"'
        replacement = rf'\1{data["stars"]}\2{data["forks"]}\3"{data["language"] or ""}"'
        
        content = re.sub(pattern, replacement, content)
        
        # Also handle case where language might be None
        pattern2 = rf'(name:\s*"{re.escape(name)}"[^}}]+?language:\s*)[^,}}]+'
        if data["language"]:
            replacement2 = rf'\1"{data["language"]}"'
        else:
            replacement2 = rf'\1null'
        content = re.sub(pattern2, replacement2, content)
    
    with open('projects.js', 'w') as f:
        f.write(content)
    
    print("\n✓ Updated projects.js")

if __name__ == "__main__":
    print("Fetching repository statistics from GitHub...\n")
    
    repo_data = {}
    for owner, repo, name in repos:
        data = fetch_repo_data(owner, repo)
        repo_data[name] = data
        time.sleep(2)  # Delay between requests
    
    print("\n" + "="*50)
    print("Summary:")
    for name, data in repo_data.items():
        if data:
            print(f"  {name}: {data['stars']}⭐ {data['forks']}🍴 {data['language'] or 'N/A'}")
    
    update = input("\nUpdate projects.js with this data? (y/n): ")
    if update.lower() == 'y':
        update_projects_js(repo_data)
        print("\n✓ Done! Don't forget to commit and push the changes.")
    else:
        print("\nSkipped update. Data is shown above for manual entry.")

