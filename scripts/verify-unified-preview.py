#!/usr/bin/env python3
"""Read-only AVES preview checks. Never submit forms or write application data."""
import argparse
import copy
import http.cookiejar
import json
import re
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path


class PageMetadata(HTMLParser):
    # SVG maps contain region <title> elements. They are not document titles.
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.svg = 0
        self.in_title = False
        self.titles = []
        self.meta = {}
        self.canonical = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "svg":
            self.svg += 1
        elif tag == "title" and not self.svg:
            self.in_title = True
            self.titles.append("")
        elif tag == "meta":
            self.meta[attrs.get("name") or attrs.get("property")] = attrs.get("content", "")
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")

    def handle_endtag(self, tag):
        if tag == "svg":
            self.svg = max(0, self.svg - 1)
        elif tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title and not self.svg:
            self.titles[-1] += data


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", required=True)
    parser.add_argument("--share-url", required=True, help="Temporary Vercel share link; never include it in Git or the report")
    parser.add_argument("--commit", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    base = args.base_url.rstrip("/")
    origin = urllib.parse.urlsplit(base)
    share = urllib.parse.urlsplit(args.share_url)
    if origin.scheme != "https" or not origin.hostname.endswith(".vercel.app") or (share.scheme, share.netloc) != (origin.scheme, origin.netloc):
        parser.error("Use a Vercel preview and a share URL on exactly the same origin")

    class SameOrigin(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            target = urllib.parse.urlsplit(newurl)
            if (target.scheme, target.netloc) != (origin.scheme, origin.netloc):
                raise RuntimeError("Refused a redirect outside the selected preview")
            return super().redirect_request(req, fp, code, msg, headers, newurl)

    jar = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(SameOrigin(), urllib.request.HTTPCookieProcessor(jar))
    with opener.open(args.share_url, timeout=25) as response:
        response.read()

    def fetch(path):
        # Each request has its own opener; temporary access cookies stay in memory.
        local_jar = http.cookiejar.CookieJar()
        for cookie in jar:
            local_jar.set_cookie(copy.copy(cookie))
        local = urllib.request.build_opener(SameOrigin(), urllib.request.HTTPCookieProcessor(local_jar))
        try:
            try:
                response = local.open(base + path, timeout=25)
            except urllib.error.HTTPError as error:
                response = error
            with response:
                text = response.read().decode("utf-8")
                headers = response.headers
                page = PageMetadata()
                page.feed(text)
                row = {"path": path, "status": response.status, "title": page.titles[-1] if page.titles else None,
                       "canonical": page.canonical, "ogUrl": page.meta.get("og:url"), "ogTitle": page.meta.get("og:title"),
                       "twitterTitle": page.meta.get("twitter:title"), "description": page.meta.get("description"),
                       "robots": page.meta.get("robots"), "robotsHeader": headers.get("x-robots-tag"),
                       "cacheControl": headers.get("cache-control"), "contentType": headers.get_content_type(),
                       "frameOptions": headers.get("x-frame-options"), "streamedNotFound": "NEXT_HTTP_ERROR_FALLBACK;404" in text}
                return row, text
        except Exception as error:
            return {"path": path, "error": type(error).__name__}, ""

    sitemap_row, sitemap = fetch("/sitemap.xml")
    if sitemap_row.get("status") != 200:
        raise SystemExit("Could not read the preview sitemap")
    locations = [node.text for node in ET.fromstring(sitemap).iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
    if not 1 <= len(locations) <= 300 or len(set(locations)) != len(locations):
        raise SystemExit("Unexpected sitemap inventory")
    public_paths = []
    for url in locations:
        parts = urllib.parse.urlsplit(url)
        if parts.scheme != "https" or parts.netloc != "aves.bio" or parts.query or parts.fragment:
            raise SystemExit("Unexpected canonical sitemap URL")
        public_paths.append(parts.path or "/")
    private_paths = ["/api/account/plans", "/api/admin/quotes", "/australia/api/account/plans", "/australia/api/admin/quotes"]
    paths = public_paths + private_paths + ["/robots.txt", "/australia/robots.txt", "/australia/sitemap.xml"]
    with ThreadPoolExecutor(max_workers=8) as pool:
        responses = list(pool.map(fetch, paths))
    rows, issues = [sitemap_row], []
    titles = set()
    normalize = lambda value: (value or "").rstrip("/")
    for row, body in responses:
        rows.append(row)
        path = row["path"]
        if path in public_paths:
            expected = "https://aves.bio" + path
            valid = (row.get("status") == 200 and normalize(row.get("canonical")) == normalize(expected)
                     and normalize(row.get("ogUrl")) == normalize(expected) and row.get("title")
                     and row.get("description") and row.get("twitterTitle") and not row.get("streamedNotFound")
                     and "noindex" in (row.get("robots") or "") and "noindex" in (row.get("robotsHeader") or "")
                     and row.get("frameOptions") == "DENY")
            if row.get("title") in titles:
                issues.append({"path": path, "check": "duplicate document title"})
            titles.add(row.get("title"))
        elif path in private_paths:
            valid = (row.get("status") in [401, 503] and "no-store" in (row.get("cacheControl") or "")
                     and "noindex" in (row.get("robotsHeader") or "") and row.get("contentType") == "application/json")
        elif path.endswith("robots.txt"):
            valid = row.get("status") == 200 and row.get("contentType") == "text/plain" and re.search(r"(?m)^Disallow: /$", body)
        else:
            valid = row.get("status") == 200 and row.get("contentType") == "application/xml" and "<urlset" in body
        if not valid:
            issues.append({"path": path, "check": "response contract", "response": row})
    report = {"commit": args.commit, "previewUrl": base, "requests": len(rows), "publicPages": len(public_paths),
              "readOnly": True, "passed": not issues, "issues": issues, "responses": rows}
    Path(args.output).write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps({key: report[key] for key in ["requests", "publicPages", "passed", "issues"]}))
    return 0 if not issues else 1


if __name__ == "__main__":
    raise SystemExit(main())
