"""Bygger dist/ för GitHub Pages: src/app.html (samma sida som på claude.ai) får ett
riktigt <head> med manifest och ikoner, och public/ kopieras med."""
import pathlib, re, shutil

root = pathlib.Path(__file__).resolve().parent.parent
dist = root / "dist"
shutil.rmtree(dist, ignore_errors=True)
shutil.copytree(root / "public", dist)

body = (root / "src" / "app.html").read_text(encoding="utf-8")
body = re.sub(r'^<title>.*?</title>\s*', "", body, count=1)
body = re.sub(r'<meta name="(claude:viewport-fit-sides|apple-mobile-web-app-title)"[^>]*>\s*', "", body)

head = """<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Ordträning</title>
<meta name="theme-color" content="#11131a">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Ordträning">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="icon" href="icon-192.png">
</head>
<body>
"""
tail = """
<style>
body { margin: 0; }
[hidden] { display: none !important; }
#app { padding-top: calc(12px + env(safe-area-inset-top, 0px)); }
</style>
</body>
</html>
"""
(dist / "index.html").write_text(head + body + tail, encoding="utf-8")
print("dist/ klar")
