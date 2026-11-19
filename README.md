# Yuanzhi He · Academic homepage

Bilingual academic website for Yuanzhi He, built with static HTML, CSS and JavaScript and deployed to GitHub Pages.

Live site: https://yuanzhihe.github.io/

## Files

- `index.html`: semantic content, publication records, and embedded English/Chinese translations.
- `styles.css`: responsive light academic layout and print rules.
- `app.js`: language switching, topic/status/search filters, mobile navigation and publication anchors.
- `portrait.jpg` and institution image files: existing portrait and official institution marks.
- `ETH-Zurich-official.svg`: black positive-version logo paths from the ETH Zurich official homepage, https://ethz.ch/en.html. Keep its aspect ratio and do not apply a brightness filter.

## Publications

Each `.publication` record includes a topic and status. Confirmed work is listed first. Under-revision and submitted work is available in expandable groups, in that order. Journals are ordered by JCR quartile and then impact factor; conferences follow by the ratings already recorded for them. Unclassified work appears last within its status group.

Paper titles and resource links point to verified publisher pages where available. Accepted conference papers without a publisher record link to their labelled arXiv preprints. No publication link is invented for an unavailable record.

To add a paper, copy one `.publication`, set its topic and status, and include its venue, author role, optional ratings, resources and overview. Add bilingual overview text to the `site-translations` JSON. Update the group count when adding work under revision or submission.

Available topics: `robot`, `vision`, `bio`, `materials`, `game`.
Available statuses: `published`, `accepted`, `revision`, `submitted`.

## Local preview

Serve this directory with any static HTTP server. No package installation or build step is needed. Reload after changing files.

## Verification

Check both languages, topic and status filters, search and empty state, overview expansion, mobile navigation, and direct research-to-paper anchors. Confirm all 20 publication records remain present and that a narrow mobile viewport has no horizontal overflow.

## Experience wording

Use `Role · Institution` for every research/appointment heading. Put the school, laboratory or research area underneath. Put the geographical location after the date. The PUMCH entry describes online research collaboration, not an on-site appointment. Keep the Chinese and English wording aligned. CV files are maintained locally and are not hosted on the website.

## Institution marks and visiting research

Institution marks use fixed logo slots so adjacent labels align. Size each mark by its visible artwork, keeping its original aspect ratio; PNG whitespace is contained inside the slot rather than changing the official artwork. The NII role is described as Visiting Researcher; KTH uses the same wording for its NII research visits for doctoral and master’s students: https://www.kth.se/en/2.674/aktuellt/apply-to-international-internship-program-in-informatics-at-nii-in-tokyo-1.1246740. Zhejiang University is listed in two periods: visiting research in February–June 2027 and postdoctoral research from July 2027. Display dates directly without incoming/planned labels.

Publication numbers run continuously from 1 to 20 across status groups and stay fixed during filtering. Keep the Zhejiang appointments in one entry, with both role-specific date ranges.

Keep each publication number inside its `.pub-status` flex row. On screens at most 700px wide, put this row above the paper title. The stylesheet URL includes a content hash; refresh that hash whenever CSS changes to prevent cached layout mismatches.
