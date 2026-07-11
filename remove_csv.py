import os
import re

directory = "app.wealthoryglobal.com"

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, "r") as f:
                content = f.read()

            modified = False
            
            # Remove CSV button
            csv_btn_pattern = r'\s*<button class="btn btn-secondary" onclick="requireAuth\(handleDownloadCSV\)".*?>Download CSV</button>'
            if re.search(csv_btn_pattern, content):
                content = re.sub(csv_btn_pattern, '', content)
                modified = True
            
            # Remove handleDownloadCSV function
            csv_func_pattern = r'\s*function handleDownloadCSV\(\) \{[\s\S]*?generateCSV\([\s\S]*?\}\n'
            if re.search(csv_func_pattern, content):
                content = re.sub(csv_func_pattern, '\n', content)
                modified = True
                
            # Add defer to jspdf and autotable if not present
            if '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>' in content:
                content = content.replace(
                    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>',
                    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" defer></script>'
                )
                modified = True
                
            if '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>' in content:
                content = content.replace(
                    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>',
                    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js" defer></script>'
                )
                modified = True

            if modified:
                with open(filepath, "w") as f:
                    f.write(content)
                print(f"Updated {filepath}")
