import os
from datetime import datetime

SITE_URL = "https://www.vetcardiohub.com"
BLOG_DIR = "./blog"
OUTPUT_FILE = "./public/sitemap.xml"

def generate_sitemap():
    urls = []

    static_pages = [
        ("", "1.0"),
        ("about.html", "0.8"),
        ("videos.html", "0.9"),
        ("blog.html", "0.8")
    ]

    for page, priority in static_pages:
        urls.append(f"""  <url>
    <loc>{SITE_URL}/{page}</loc>
    <lastmod>{datetime.today().date()}</lastmod>
    <priority>{priority}</priority>
  </url>""")

    for filename in os.listdir(BLOG_DIR):
        if filename.endswith(".html"):
            url = f"{SITE_URL}/blog/{filename}"
            path = os.path.join(BLOG_DIR, filename)
            lastmod = datetime.fromtimestamp(os.path.getmtime(path)).date()
            urls.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>{lastmod}</lastmod>
    <priority>0.7</priority>
  </url>""")

    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n"""
    sitemap += "\n".join(urls)
    sitemap += "\n</urlset>"

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w") as f:
        f.write(sitemap)

generate_sitemap()
