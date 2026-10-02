import os
import zipfile

def build_shopify_theme_zip():
    theme_root = r"c:\Users\Al Wahid\Desktop\SHOPIFY STORE WATCHES"
    zip_output = os.path.join(theme_root, "AURA-TIMEPIECES-SHOPIFY-THEME.zip")
    
    # Official Shopify OS 2.0 folders to include at root
    shopify_folders = ["assets", "config", "layout", "locales", "sections", "snippets", "templates"]
    
    if os.path.exists(zip_output):
        os.remove(zip_output)
        print(f"Removed previous {zip_output}")

    with zipfile.ZipFile(zip_output, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for folder in shopify_folders:
            folder_path = os.path.join(theme_root, folder)
            if not os.path.exists(folder_path):
                print(f"Warning: folder {folder} not found, skipping.")
                continue
                
            for root, dirs, files in os.walk(folder_path):
                for file in files:
                    full_path = os.path.join(root, file)
                    rel_path = os.path.relpath(full_path, theme_root)
                    # CRITICAL: Replace Windows backslashes with POSIX forward slashes for Linux/Shopify compatibility
                    archive_name = rel_path.replace(os.path.sep, '/')
                    
                    zipf.write(full_path, arcname=archive_name)
                    print(f"Added: {archive_name}")

    print("\n--- Validating ZIP contents ---")
    with zipfile.ZipFile(zip_output, 'r') as verify_zip:
        namelist = verify_zip.namelist()
        print(f"Total entries: {len(namelist)}")
        has_theme_liquid = "layout/theme.liquid" in namelist
        has_settings_schema = "config/settings_schema.json" in namelist
        has_index_json = "templates/index.json" in namelist
        
        print(f"layout/theme.liquid present: {has_theme_liquid}")
        print(f"config/settings_schema.json present: {has_settings_schema}")
        print(f"templates/index.json present: {has_index_json}")
        
        if not (has_theme_liquid and has_settings_schema and has_index_json):
            raise ValueError("Validation failed: essential Shopify files are missing!")
            
    print(f"\nSUCCESS! Valid Shopify Theme ZIP created at: {zip_output}")

if __name__ == '__main__':
    build_shopify_theme_zip()
