import os
import glob

app_dir = '/Users/mohitthakur/.gemini/antigravity/scratch/wealthory/app.wealthoryglobal.com'
html_files = glob.glob(os.path.join(app_dir, '**', '*.html'), recursive=True)

target_str = '<a href="https://admin.wealthoryglobal.com" class="nav-utility">Advisor Login</a>'

for file in html_files:
    with open(file, 'r') as f:
        lines = f.readlines()
        
    new_lines = []
    for line in lines:
        if target_str in line:
            continue
        new_lines.append(line)
        
    with open(file, 'w') as f:
        f.writelines(new_lines)

print("Removed Advisor Login from all HTML files.")
