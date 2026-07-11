import os
import glob

app_dir = '/Users/mohitthakur/.gemini/antigravity/scratch/wealthory/app.wealthoryglobal.com'
html_files = glob.glob(os.path.join(app_dir, '**', '*.html'), recursive=True)

for file in html_files:
    with open(file, 'r') as f:
        content = f.read()
    
    if '<<<<<<< HEAD' not in content:
        continue
        
    lines = content.split('\n')
    new_lines = []
    in_conflict = False
    conflict_head = []
    conflict_pr = []
    current_conflict_part = None
    
    for line in lines:
        if line.startswith('<<<<<<< HEAD'):
            in_conflict = True
            current_conflict_part = 'HEAD'
            conflict_head = []
            conflict_pr = []
        elif line.startswith('======='):
            current_conflict_part = 'PR'
        elif line.startswith('>>>>>>>'):
            in_conflict = False
            current_conflict_part = None
            
            head_text = '\n'.join(conflict_head)
            pr_text = '\n'.join(conflict_pr)
            
            if 'Subscribe to Newsletter' in head_text:
                new_lines.extend(conflict_pr)
            elif 'newsletter-banner' in head_text:
                banner_only = [l for l in conflict_head if 'compliance-footer' not in l]
                new_lines.extend(banner_only)
                new_lines.extend(conflict_pr)
            elif 'footer' in head_text or 'footer' in pr_text:
                new_lines.extend(conflict_pr)
            else:
                new_lines.extend(conflict_pr)
        else:
            if in_conflict:
                if current_conflict_part == 'HEAD':
                    conflict_head.append(line)
                else:
                    conflict_pr.append(line)
            else:
                new_lines.append(line)
                
    with open(file, 'w') as f:
        f.write('\n'.join(new_lines))

style_file = os.path.join(app_dir, 'css', 'style.css')
with open(style_file, 'r') as f:
    content = f.read()

lines = content.split('\n')
new_lines = []
in_conflict = False
conflict_head = []
conflict_pr = []
current_conflict_part = None

for line in lines:
    if line.startswith('<<<<<<< HEAD'):
        in_conflict = True
        current_conflict_part = 'HEAD'
        conflict_head = []
        conflict_pr = []
    elif line.startswith('======='):
        current_conflict_part = 'PR'
    elif line.startswith('>>>>>>>'):
        in_conflict = False
        current_conflict_part = None
        new_lines.extend(conflict_head)
    else:
        if in_conflict:
            if current_conflict_part == 'HEAD':
                conflict_head.append(line)
            else:
                conflict_pr.append(line)
        else:
            new_lines.append(line)
            
with open(style_file, 'w') as f:
    f.write('\n'.join(new_lines))
