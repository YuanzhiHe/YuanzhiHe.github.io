/* Bilingual content and client-side publication discovery. No tracking or external runtime. */
const translations = JSON.parse(document.getElementById('site-translations').textContent);
let language = 'en';
try {
  const preferred = localStorage.getItem('yh_lang') || navigator.language.slice(0, 2);
  if (translations[preferred]) language = preferred;
} catch (_) { /* Storage may be unavailable in private browser contexts. */ }
let topic = 'all';
const papers = [...document.querySelectorAll('.publication')];
const search = document.getElementById('paper-search');
const statusFilter = document.getElementById('status-filter');

function filterPapers() {
  const query = search.value.trim().toLocaleLowerCase();
  const status = statusFilter.value;
  let count = 0;
  const groupCounts = {confirmed: 0, revision: 0, submitted: 0};
  for (const paper of papers) {
    const number = paper.querySelector('.pub-number');
    const searchableText = paper.textContent.replace(number.textContent, '');
    const matches = (topic === 'all' || paper.dataset.topic === topic)
      && (status === 'all' || paper.dataset.status === status)
      && (!query || searchableText.toLocaleLowerCase().includes(query));
    paper.hidden = !matches;
    if (matches) {
      count++;
      const group = ['published', 'accepted'].includes(paper.dataset.status)
        ? 'confirmed' : paper.dataset.status;
      // Number only visible results, restarting within each status group.
      number.textContent = `[${++groupCounts[group]}]`;
    }
  }
  document.getElementById('paper-count').textContent = language === 'zh'
    ? `显示 ${count} / ${papers.length} 篇论文`
    : `${count} of ${papers.length} papers`;
  document.getElementById('empty-state').hidden = count !== 0;
  document.getElementById('clear-filters').hidden = topic === 'all' && status === 'all' && !query;
  const filtering = topic !== 'all' || status !== 'all' || Boolean(query);
  document.querySelectorAll('[data-pub-group]').forEach(group => {
    group.hidden = !group.querySelector('.publication:not([hidden])');
    if (filtering && !group.hidden) group.open = true;
  });
}

function applyLanguage(next) {
  language = next;
  const dict = translations[next];
  document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = dict[element.dataset.i18n];
    if (typeof value === 'string') element.innerHTML = value;
  });
  for (const [data, attribute] of [['i18nPlaceholder', 'placeholder'], ['i18nAria', 'aria-label']]) {
    document.querySelectorAll(`[data-${data.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}]`).forEach(element => {
      const value = dict[element.dataset[data]];
      if (typeof value === 'string') element.setAttribute(attribute, value);
    });
  }
  for (const code of ['en', 'zh']) {
    const button = document.getElementById(`lang-${code}`);
    button.classList.toggle('active', code === next);
    button.setAttribute('aria-pressed', String(code === next));
  }
  try { localStorage.setItem('yh_lang', next); } catch (_) { /* Keep language usable without storage. */ }
  filterPapers();
}

function resetFilters() {
  topic = 'all';
  search.value = '';
  statusFilter.value = 'all';
  document.querySelectorAll('[data-topic-filter]').forEach(button => {
    const active = button.dataset.topicFilter === 'all';
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  filterPapers();
  document.querySelectorAll('[data-pub-group]').forEach(group => { group.open = false; });
}

document.querySelectorAll('[data-topic-filter]').forEach(button => {
  button.addEventListener('click', () => {
    topic = button.dataset.topicFilter;
    document.querySelectorAll('[data-topic-filter]').forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    filterPapers();
  });
});
search.addEventListener('input', filterPapers);
statusFilter.addEventListener('change', filterPapers);
document.getElementById('clear-filters').addEventListener('click', resetFilters);
document.getElementById('empty-clear').addEventListener('click', resetFilters);
document.getElementById('lang-en').addEventListener('click', () => applyLanguage('en'));
document.getElementById('lang-zh').addEventListener('click', () => applyLanguage('zh'));

const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
menu.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
});

function revealLinkedPaper() {
  if (!location.hash.startsWith('#paper-')) return;
  const paper = document.getElementById(location.hash.slice(1));
  if (!paper) return;
  resetFilters();
  const group = paper.closest('[data-pub-group]');
  if (group) group.open = true;
  requestAnimationFrame(() => paper.scrollIntoView({block: 'center'}));
}
window.addEventListener('hashchange', revealLinkedPaper);

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    navigation.querySelectorAll('a').forEach(link => {
      link.classList.toggle('active', link.hash === '#' + entry.target.id);
    });
  }
}, {rootMargin: '-15% 0px -60% 0px'});
document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
applyLanguage(language);
revealLinkedPaper();
