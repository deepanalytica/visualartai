# Visual Art AI — Custom domain migration checklist
Prepared: 2026-10-06
Target: https://visualartai.cl/

Do not execute until DNS/domain cutover is approved.

## Before cutover
- Confirm GitHub Pages custom-domain support / DNS target.
- Back up current sitemap, robots.txt and canonical map.
- Confirm HTTPS issuance.
- Confirm visualartai.cl and www.visualartai.cl preferred host.
- Add domain property to Google Search Console.
- Add site to Bing Webmaster Tools.
- Prepare analytics property / consent approach.
- Verify contact endpoint before replacing mailto handoff.

## Cutover changes
- Add CNAME for visualartai.cl.
- Replace canonical base in homepage, service pages, about, methodology, audit, case pages, blog and all 20 articles.
- Replace Organization/WebSite/Service @id values.
- Replace sitemap and robots Sitemap URL.
- Replace llms.txt absolute URLs.
- Replace RSS feed absolute URLs.
- Add redirects where supported from GitHub Pages URL to custom domain.
- Update Open Graph URLs and image URLs.
- Update public references on Deep Analytica and client attribution pages.

## After cutover
- Submit sitemap in Search Console and Bing.
- Request indexing for home, service hub, six services, about, methodology, audit and case hub.
- Validate structured data.
- Run Core Web Vitals on mobile and desktop.
- Run the 40-query AI Recommendation Benchmark.
- Record which sources ChatGPT/Gemini/Perplexity cite.
- Recheck at 7, 30 and 90 days.
