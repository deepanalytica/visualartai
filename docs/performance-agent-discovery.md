# Homepage loading and agent discovery

Updated: 2026-10-06.

## Styles

The homepage loads one preassembled stylesheet instead of three stylesheets plus four nested CSS imports. Its contents preserve the previous cascade order: tokens, foundations, components, shared motion, brand motion, homepage styles.

Edit the source files and run:

```sh
node scripts/build-home-css.mjs
```

Commit the generated `site/home-core.css` with its sources. Bump the homepage stylesheet query version after changes so previously cached pages request the new asset. Cloudflare Pages can keep serving the checked-in static site with its existing build setup.

The three small accent label groups flagged by Lighthouse now use the existing darker coral token. The layout, fonts, contact flow, and consent runtime are retained.

## Agent resources

- `/llms.txt`: Markdown summary with labelled links to the public site.
- `/.well-known/ard.json`: current ARD discovery path.
- `/.well-known/ai-catalog.json`: identical compatibility manifest for Lighthouse 13.5.0 and older consumers.
- `/agent-guide.md`: a Markdown agent skill describing how to consult public pages and evidence and orient a diagnosis request.

The manifest advertises that actual navigation guide as `text/markdown; profile="urn:air:agent-skills"`. It exposes no executable tools, lead data, API credentials, MCP server, or automated submission endpoint. The guide notes that the current form prepares email and does not prove delivery or capture of a lead.

The homepage links both discovery names. These emerging formats help discovery and interoperability; validation is not a Google ranking or AI recommendation guarantee. The guide must stay aligned with the public offer and real contact workflow.

## Verification

The installed Lighthouse 13.5.0 audit code validates both the llms.txt and ARD manifest with score 1. Mobile performance and browser interaction checks are measured on the Cloudflare preview before publication.

References:
- https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt
- https://github.com/GoogleChrome/lighthouse/issues/17251
- https://web.dev/articles/optimize-lcp
