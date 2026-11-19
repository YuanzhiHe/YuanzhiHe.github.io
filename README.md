# Yuanzhi He · Academic homepage

Bilingual academic website for Yuanzhi He, built with static HTML, CSS and JavaScript and deployed to GitHub Pages.

Live site: https://yuanzhihe.github.io/

## Files

- `index.html`: semantic content, publication records, and embedded English/Chinese translations.
- `styles.css`: responsive light academic layout and print rules.
- `app.js`: language switching, topic/status/search filters, mobile navigation and publication anchors.
- `assets/CV-en.pdf`, `assets/CV-zh.pdf`: current public academic CVs.
- `portrait.jpg` and institution image files: existing portrait and official institution marks.

## Publications

Each `.publication` record includes a topic and status. Confirmed work is listed first. Under-revision and submitted work is available in expandable groups, in that order. Journals are ordered by JCR quartile and then impact factor; conferences follow by the ratings already recorded for them. Unclassified work appears last within its status group.

Paper titles and resource links point to verified publisher pages where available. Accepted conference papers without a publisher record link to their labelled arXiv preprints. No publication link is invented for an unavailable record.

To add a paper, copy one `.publication`, set its topic and status, and include its venue, author role, optional ratings, resources and overview. Add bilingual overview text to the `site-translations` JSON. Update the group count when adding work under revision or submission.

Available topics: `robot`, `vision`, `bio`, `materials`, `game`.
Available statuses: `published`, `accepted`, `revision`, `submitted`.

## Local preview

Serve this directory with any static HTTP server. No package installation or build step is needed. Reload after changing files.

## Verification

Check both languages, topic and status filters, search and empty state, overview expansion, mobile navigation, direct research-to-paper anchors, and CV downloads. Confirm all 20 publication records remain present and that a narrow mobile viewport has no horizontal overflow.
