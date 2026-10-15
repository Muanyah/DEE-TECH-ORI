# Dee-TECH portfolio (HTML, CSS, vanilla JS)

**Run:** open `home.html`, or `python3 -m http.server 8000` and visit http://localhost:8000/home.html.
**Deploy:** upload the folder to any static host (Netlify, GitHub Pages, Cloudflare Pages).

## Edit it
| What | Where |
|---|---|
| Colours, fonts, corner radius | top of `css/style.css` (`:root` block) |
| All text, nav, categories, skills, projects, FAQs, WhatsApp number | `js/content.js` |
| Images | replace files in `assets/images/` (keep names) or change paths in `js/content.js` |
| Home page images | open `home.html`, find the 3 comments starting "IMAGE" and change each `src` to your file in `assets/images/` |
| Hero portrait | `assets/images/hero.svg`; use a transparent PNG for the best result, set `hero.image` |
| Add a project | add an object to `projects` (unique `id`); it appears in Work and Project pages |
| Résumé | put your PDF at `assets/resume.pdf` |

## Security (summary)
No eval, no unsafe innerHTML (text uses `textContent`), project IDs validated against the list, external links must be http(s) and open with `noopener noreferrer`. The contact form sends nothing itself: it opens WhatsApp (wa.me) with the message filled in. Set YOUR number in `content.js` (`whatsapp`, digits only with country code, e.g. 2348012345678).
Deploy with headers: `Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

## Before launch
Replace all "demo" text, `hello@example.com`, placeholder images, the testimonial (use a real, permitted one), and add `assets/resume.pdf`. Site uses fallback fonts (no external requests).
