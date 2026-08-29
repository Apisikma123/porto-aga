import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
// highlight.js loaded lazily (deferred from critical path)
let _hljs = null;
const ensureHljs = async () => {
  if (_hljs) return _hljs;
  const [mod] = await Promise.all([
    import('highlight.js'),
    import('highlight.js/styles/atom-one-dark.css'),
  ]);
  _hljs = mod.default;
  return _hljs;
};

marked.use({
  gfm: true,
  breaks: true,
});

const renderMarkdown = (text) => {
  if (!text) return '';
  try {
    const raw = marked.parse(text);
    return typeof raw === 'string' ? raw : (raw?.toString?.() || text);
  } catch (e) {
    console.warn('Markdown render error:', e);
    return text;
  }
};

export default function ProjectDetailApp() {
  const [lang, setLang] = useState(() => localStorage.getItem('porto_lang') || 'id');
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const getUrlParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  useEffect(() => {
    const projectId = getUrlParam('id') || 'foodify';

    const loadData = async () => {
      setLoading(true);
      let all = [];
      try {
        const res = await fetch('/all_projects.json');
        if (res.ok) {
          all = await res.json();
        }
      } catch (e) {
        console.warn('all_projects.json error:', e);
      }

      let current = all.find((p) => p.id.toLowerCase() === projectId.toLowerCase());

      if (!current) {
        try {
          const ghRes = await fetch(`https://api.github.com/repos/Apisikma123/${projectId}`);
          if (ghRes.ok) {
            const ghData = await ghRes.json();
            current = {
              id: ghData.name,
              displayName: ghData.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
              category: 'Open Source Repository',
              language: ghData.language || 'Code',
              tags: ghData.topics && ghData.topics.length ? ghData.topics : [ghData.language || 'GitHub'],
              description: ghData.description || 'Open source software project by Muhammad Aga Putra (@Apisikma123).',
              descriptionEn: ghData.description || 'Open source software project by Muhammad Aga Putra (@Apisikma123).',
              html_url: ghData.html_url,
              previewImage: `/projects/${ghData.name}.webp`,
              readme: '# ' + ghData.name + '\n\n' + (ghData.description || ''),
            };
            all.unshift(current);
          }
        } catch (ghErr) {
          console.warn('GitHub API fallback notice:', ghErr);
        }
      }

      setProject(current);
      if (current) {
        setOtherProjects(all.filter((p) => p.id !== current.id).slice(0, 4));
        document.title = `${current.displayName} — Muhammad Aga Putra`;

        // Fetch live readme
        fetch(`https://raw.githubusercontent.com/Apisikma123/${current.id}/main/README.md`)
          .then((r) => (r.ok ? r.text() : fetch(`https://raw.githubusercontent.com/Apisikma123/${current.id}/master/README.md`).then((res) => (res.ok ? res.text() : ''))))
          .then((liveText) => {
            if (liveText && liveText.trim()) {
              setProject((prev) => (prev ? { ...prev, readme: liveText } : prev));
            }
          })
          .catch(() => {});
      }
      setLoading(false);
      setTimeout(() => {
        if (window.update3DSceneForView) window.update3DSceneForView('project');
        if (typeof window !== 'undefined' && window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 120);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (project) {
      setTimeout(() => {
        const blocks = document.querySelectorAll('.markdown-body pre code');
        if (blocks.length) {
          ensureHljs().then((hljs) => {
            blocks.forEach((block) => {
              try { hljs.highlightElement(block); } catch (e) {}
            });
          });
        }
      }, 50);
    }
  }, [project?.readme, project?.id]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aga_portfolio_theme', next);
    if (window.updateThreeTheme) window.updateThreeTheme(next);
  };

  const switchLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('porto_lang', newLang);
  };

  const copyClone = () => {
    if (!project) return;
    navigator.clipboard.writeText(`git clone ${project.html_url}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dict = {
    id: {
      back: 'Portofolio 3D',
      allProjects: 'Projects (04)',
      loading: 'Memuat dokumentasi proyek…',
      notFound: 'Proyek Tidak Ditemukan',
      notFoundDesc: 'Repositori yang Anda cari tidak ditemukan atau telah dipindahkan.',
      seeAll: 'Lihat Semua Karya',
      preview: 'Visual Architecture Preview',
      sourceCode: 'Source Code',
      readmeTitle: 'README.md',
      telemetry: 'REPOSITORY TELEMETRY',
      author: 'AUTHOR',
      techStack: 'TECH STACK',
      status: 'STATUS',
      public: 'Public Open Source',
      discussTitle: 'Tertarik dengan Proyek Ini?',
      discussDesc: 'Konsultasikan kebutuhan implementasi fitur, arsitektur serupa, atau custom build.',
      discussBtn: 'Diskusi via WhatsApp',
      otherProj: 'PROYEK LAINNYA',
    },
    en: {
      back: '3D Portfolio',
      allProjects: 'Projects (04)',
      loading: 'Loading project documentation…',
      notFound: 'Project Not Found',
      notFoundDesc: 'The repository you are looking for was not found or has been moved.',
      seeAll: 'View All Works',
      preview: 'Visual Architecture Preview',
      sourceCode: 'Source Code',
      readmeTitle: 'README.md',
      telemetry: 'REPOSITORY TELEMETRY',
      author: 'AUTHOR',
      techStack: 'TECH STACK',
      status: 'STATUS',
      public: 'Public Open Source',
      discussTitle: 'Interested in this project?',
      discussDesc: 'Consult feature implementation, similar architectures, or custom software builds.',
      discussBtn: 'Discuss via WhatsApp',
      otherProj: 'OTHER PROJECTS',
    },
  }[lang];

  const waNum = typeof atob === 'function' ? atob('NjI4NTE2OTA4NDEzNg==') : '6285169084136';
  const waText = project
    ? encodeURIComponent(
        lang === 'en'
          ? `Hello Aga, I am interested in discussing your project "${project.displayName}".`
          : `Halo Aga, saya tertarik untuk diskusi proyek "${project.displayName}".`
      )
    : '';

  return (
    <div className="relative min-h-screen flex flex-col justify-between text-zinc-100 selection:bg-[#DC143C]/40">
      
      {/* 1. TOP FLOATING NAVIGATION BAR (Matches Homepage & Pricing) */}
      <header className="fixed top-0 inset-x-0 z-40 pt-4 sm:pt-6 px-4 sm:px-6 md:px-12 flex justify-between items-center pointer-events-none">
        <a
          href="/#start"
          className="pointer-events-auto eyebrow text-zinc-100 hover:text-white transition-colors duration-300 font-bold cursor-pointer flex items-center gap-2"
          style={{ letterSpacing: '0.12em' }}
        >
          <span className="text-[#DC143C]">◆</span> AGA STUDIO
        </a>

        {/* Center Navigation Pill */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-2.5 lg:gap-3.5 rounded-full border border-white/10 bg-zinc-950/85 backdrop-blur-2xl px-4 lg:px-5 py-2 shadow-md transition-all duration-300 hover:border-white/20 absolute left-1/2 -translate-x-1/2 max-w-[55vw]">
          <a href="/#start" className="eyebrow text-[0.62rem] lg:text-[0.68rem] text-zinc-300 hover:text-white transition-colors">Start</a>
          <a href="/#about" className="eyebrow text-[0.62rem] lg:text-[0.68rem] text-zinc-300 hover:text-white transition-colors">About</a>
          <a href="/#activity" className="eyebrow text-[0.62rem] lg:text-[0.68rem] text-zinc-300 hover:text-white transition-colors">Activity</a>
          <a href="/projects.html" className="eyebrow text-[0.62rem] lg:text-[0.68rem] text-[#DC143C] font-semibold transition-colors">Projects</a>
          <a href="/pricing.html" className="eyebrow text-[0.62rem] lg:text-[0.68rem] text-zinc-300 hover:text-white transition-colors">Studio</a>
          <a href="/#contact" className="eyebrow text-[0.62rem] lg:text-[0.68rem] text-zinc-300 hover:text-white transition-colors">Contact</a>
          <a href="/#footer" className="eyebrow text-[0.62rem] lg:text-[0.68rem] text-zinc-300 hover:text-white transition-colors">Footer</a>
        </nav>

        {/* Right Actions: Language Switcher + Contact Button */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5">
          <div className="flex items-center gap-0.5 rounded-lg border border-white/12 bg-zinc-950/70 backdrop-blur-xl p-1 shadow-md font-mono text-xs">
            <button
              type="button"
              className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-[#DC143C] text-white font-bold' : 'text-zinc-300 hover:text-white'}`}
              onClick={() => switchLanguage('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded transition-colors ${lang === 'id' ? 'bg-[#DC143C] text-white font-bold' : 'text-zinc-300 hover:text-white'}`}
              onClick={() => switchLanguage('id')}
            >
              ID
            </button>
          </div>

          <a
            href="/#contact"
            className="rounded-lg border border-white/15 bg-white/[0.04] backdrop-blur-md px-3.5 sm:px-4 py-2 eyebrow text-[0.62rem] text-zinc-200 hover:text-white transition-all duration-300 hover:border-[#DC143C]/60 hover:bg-[#DC143C]/10 cursor-pointer hidden sm:flex items-center gap-1.5 leading-none"
          >
            <span>Let's Talk</span>
          </a>
        </div>
      </header>

      {/* 2. CLICKABLE VERTICAL NUMERIC SIDEBAR (Stays on No 4) */}
      <aside
        aria-label="Section Navigation"
        className="fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-30 hidden lg:block pointer-events-auto select-none transition-all duration-300"
      >
        <p className="eyebrow mb-5 text-zinc-400 text-[0.65rem] tracking-wider font-semibold">On this page</p>
        <ul className="space-y-3" id="side-nav">
          <li>
            <a href="/#start" className="side-nav-item group flex items-center text-left py-1">
              <span className="side-nav-num font-mono text-[0.72rem] text-zinc-400 group-hover:text-white mr-2 tabular-nums">01</span>
              <span className="side-nav-line mr-3 h-px w-4 bg-white/20 group-hover:bg-white/50"></span>
              <span className="side-nav-label text-[0.78rem] font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors duration-300">Start</span>
            </a>
          </li>
          <li>
            <a href="/#about" className="side-nav-item group flex items-center text-left py-1">
              <span className="side-nav-num font-mono text-[0.72rem] text-zinc-500 group-hover:text-zinc-300 mr-2 tabular-nums">02</span>
              <span className="side-nav-line mr-3 h-px w-4 bg-white/20 group-hover:bg-white/50"></span>
              <span className="side-nav-label text-[0.78rem] font-light tracking-wide text-zinc-500 group-hover:text-zinc-200 transition-colors duration-300">About</span>
            </a>
          </li>
          <li>
            <a href="/#activity" className="side-nav-item group flex items-center text-left py-1">
              <span className="side-nav-num font-mono text-[0.72rem] text-zinc-500 group-hover:text-zinc-300 mr-2 tabular-nums">03</span>
              <span className="side-nav-line mr-3 h-px w-4 bg-white/20 group-hover:bg-white/50"></span>
              <span className="side-nav-label text-[0.78rem] font-light tracking-wide text-zinc-500 group-hover:text-zinc-200 transition-colors duration-300">Activity</span>
            </a>
          </li>
          <li>
            <a href="/projects.html" className="side-nav-item active group flex items-center text-left py-1">
              <span className="side-nav-num font-mono text-[0.72rem] text-[#DC143C] font-bold mr-2 tabular-nums">04</span>
              <span className="side-nav-line mr-3 h-px w-6 bg-[#DC143C]"></span>
              <span className="side-nav-label text-[0.78rem] font-bold tracking-wide text-[#DC143C]">Projects</span>
            </a>
          </li>
          <li>
            <a href="/pricing.html" className="side-nav-item group flex items-center text-left py-1">
              <span className="side-nav-num font-mono text-[0.72rem] text-zinc-500 group-hover:text-zinc-300 mr-2 tabular-nums">05</span>
              <span className="side-nav-line mr-3 h-px w-4 bg-white/20 group-hover:bg-white/50"></span>
              <span className="side-nav-label text-[0.78rem] font-light tracking-wide text-zinc-500 group-hover:text-zinc-200 transition-colors duration-300">Studio</span>
            </a>
          </li>
          <li>
            <a href="/#contact" className="side-nav-item group flex items-center text-left py-1">
              <span className="side-nav-num font-mono text-[0.72rem] text-zinc-500 group-hover:text-zinc-300 mr-2 tabular-nums">06</span>
              <span className="side-nav-line mr-3 h-px w-4 bg-white/20 group-hover:bg-white/50"></span>
              <span className="side-nav-label text-[0.78rem] font-light tracking-wide text-zinc-500 group-hover:text-zinc-200 transition-colors duration-300">Contact</span>
            </a>
          </li>
          <li>
            <a href="/#footer" className="side-nav-item group flex items-center text-left py-1">
              <span className="side-nav-num font-mono text-[0.72rem] text-zinc-500 group-hover:text-zinc-300 mr-2 tabular-nums">07</span>
              <span className="side-nav-line mr-3 h-px w-4 bg-white/20 group-hover:bg-white/50"></span>
              <span className="side-nav-label text-[0.78rem] font-light tracking-wide text-zinc-500 group-hover:text-zinc-200 transition-colors duration-300">Footer</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* 3. MAIN PROJECT CASE STUDY CONTAINER */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-10 lg:pl-28 xl:pl-36 pt-24 sm:pt-28 pb-16">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-10 h-10 border-2 border-[#DC143C] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-mono text-xs text-zinc-400">{dict.loading}</p>
          </div>
        ) : !project ? (
          <div className="py-32 text-center max-w-md mx-auto">
            <span className="material-symbols-outlined text-5xl text-zinc-600 mb-4 block">folder_off</span>
            <h2 className="text-2xl font-bold text-white mb-2">{dict.notFound}</h2>
            <p className="text-sm text-zinc-400 mb-8 leading-relaxed">{dict.notFoundDesc}</p>
            <a
              href="/projects.html"
              className="rounded-lg bg-[#DC143C] text-white px-6 py-3 font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#b01030] transition-colors inline-block"
            >
              {dict.seeAll}
            </a>
          </div>
        ) : (
          <div>
            {/* Top Action / Back to Portfolio Breadcrumb Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <a
                href="/#activity"
                className="btn-back"
                title={lang === 'en' ? 'Back to Portfolio' : 'Kembali ke Portofolio'}
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>{lang === 'en' ? 'Back to Portfolio' : 'Kembali ke Portofolio'}</span>
              </a>

              <div className="flex items-center gap-2.5">
                <a
                  href="/projects.html"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono text-xs cursor-pointer transition-colors leading-none touch-manipulation active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>{lang === 'en' ? 'All Works (17)' : 'Semua Karya (17)'}</span>
                </a>

                {project.html_url && (
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#DC143C] hover:bg-[#b01030] text-white font-mono text-xs font-semibold cursor-pointer transition-all shadow-sm leading-none touch-manipulation active:scale-95 group"
                  >
                    <span>GitHub</span>
                    <svg className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Visual Preview Banner (iPhone Mockup if Mobile with known image, wide landscape if web with known image, or macOS Terminal Window if placeholder/empty) */}
            {(() => {
              const KNOWN_PROJECT_IMAGES = {
                foodify: "/projects/foodify.webp",
                wilmarbuku: "/projects/wilmarbuku.webp",
                "cinta--website-konseling-sekola-": "/projects/cinta-counseling.webp",
                "grow-a-garden": "/projects/grow-a-garden.webp",
                bkj: "/projects/bkj.webp",
              };
              const normId = (project.id || '').toLowerCase();
              const hasKnownImg = KNOWN_PROJECT_IMAGES[normId] || (project.previewImage && KNOWN_PROJECT_IMAGES[project.previewImage.replace('/projects/', '').replace('.png', '').replace('.webp', '').toLowerCase()]);

              if (normId === 'foodify' || (hasKnownImg && (project.category === 'Mobile' || project.categoryTag === 'Mobile' || (project.tags && project.tags.some(t => /flutter|mobile|android|ios|dart/i.test(t)))))) {
                return (
                  <div className="phone-mockup-banner mb-8 rounded-2xl overflow-hidden relative border border-white/10 glass-card bg-gradient-to-b from-[#141724] via-[#0d0e17] to-[#07080e] flex items-center justify-center p-6 sm:p-8 min-h-[340px] max-h-[440px]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#DC143C]/20 via-[#FF5500]/15 to-transparent blur-2xl opacity-60 pointer-events-none"></div>
                    <div className="relative h-64 sm:h-80 aspect-[9/18.5] rounded-[24px] sm:rounded-[32px] border-2 border-zinc-800 bg-black overflow-hidden group-hover:border-[#DC143C]/70 transition-colors duration-300">
                      <img
                        src={hasKnownImg || `/projects/${project.id}.webp`}
                        alt={`${project.displayName} Preview`}
                        className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>
                );
              }

              if (hasKnownImg) {
                return (
                  <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 glass-card aspect-video max-h-[380px] w-full relative group">
                    <img
                      src={hasKnownImg}
                      alt={`${project.displayName} Preview`}
                      className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none font-mono text-[0.65rem] text-zinc-300">
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse"></span>
                        <span>{dict.preview || 'Visual Architecture Preview'}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10">{project.language || 'Code'}</span>
                    </div>
                  </div>
                );
              }

              // Niche macOS Terminal Banner Placeholder
              return (
                <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 glass-card bg-[#0b0c14] relative select-none">
                  {/* macOS Title Bar */}
                  <div className="px-4 py-3 bg-[#12131e] border-b border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
                      <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
                      <span className="ml-2 text-zinc-500 text-xs font-sans">Terminal</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                      <span className="text-zinc-500">zsh —</span>
                      <span className="text-zinc-300 font-semibold">{project.id}</span>
                      <span className="text-zinc-500">git:(<span className="text-amber-400">main</span>)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[0.65rem] text-zinc-400 font-mono">{project.language || 'Code'}</span>
                    </div>
                  </div>

                  {/* macOS Terminal Body */}
                  <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm text-zinc-300 space-y-3 bg-gradient-to-b from-[#0b0c14] to-[#07080d]">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span className="text-[#DC143C] font-bold">❯</span>
                      <span className="text-emerald-400">aga@studio</span>
                      <span className="text-zinc-600">:</span>
                      <span className="text-cyan-400">~/projects/{project.id}</span>
                      <span className="text-zinc-500">git:(<span className="text-amber-400">main</span>)</span>
                    </div>
                    <div className="text-zinc-200 flex items-center gap-2 pl-4">
                      <span className="text-zinc-500">$</span>
                      <span>git log -1 --pretty=format:"%h %s (%cr)"</span>
                    </div>
                    <div className="text-zinc-500 pl-4 text-xs">
                      commit <span className="text-amber-400 font-semibold">a8f2d1e</span> (<span className="text-emerald-400">HEAD -&gt; main</span>) • Architecture baseline verified
                    </div>
                    <div className="pt-2 flex items-center gap-2 text-zinc-400">
                      <span className="text-[#DC143C] font-bold">❯</span>
                      <span className="text-zinc-200">cat project-manifest.json</span>
                    </div>
                    <div className="bg-black/50 border border-white/5 rounded-xl p-4 text-xs font-mono space-y-1 text-zinc-400">
                      <div><span className="text-zinc-600">"name":</span> <span className="text-emerald-300">"{project.displayName}"</span>,</div>
                      <div><span className="text-zinc-600">"category":</span> <span className="text-cyan-300">"{project.category || 'Software Engineering'}"</span>,</div>
                      <div><span className="text-zinc-600">"stack":</span> [<span className="text-amber-300">{(project.tags || [project.language]).map(t => `"${t}"`).join(', ')}</span>],</div>
                      <div><span className="text-zinc-600">"status":</span> <span className="text-emerald-400">"Production Ready"</span></div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 pt-1">
                      <span className="text-[#DC143C] font-bold">❯</span>
                      <span className="inline-block w-2.5 h-4 bg-[#DC143C] animate-pulse align-middle"></span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Hero Header */}
            <div className="border-b border-white/10 pb-10 mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="eyebrow text-[#DC143C] text-xs">{(project.category || 'CASE STUDY').toUpperCase()}</span>
                <span className="text-zinc-600">/</span>
                <span className="font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                  {project.language || 'Code'}
                </span>
                {project.featured && (
                  <span className="font-mono text-[0.65rem] text-[#DC143C] bg-[#DC143C]/10 border border-[#DC143C]/20 px-2 py-0.5 rounded-md">
                    Featured Case Study
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                {project.displayName}
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 font-light max-w-3xl leading-relaxed mb-8">
                {lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description}
              </p>

              {/* Tags & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {(project.tags || [project.language]).map((t, idx) => (
                    <span key={idx} className="font-mono text-xs text-zinc-300 bg-white/5 border border-white/10 px-3 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/15 bg-white/[0.04] hover:border-[#DC143C]/60 hover:text-white px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-zinc-300 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">code</span>
                    <span>{dict.sourceCode}</span>
                    <span className="material-symbols-outlined text-xs">arrow_outward</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 2-Column Content: Markdown + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Markdown */}
              <div className="lg:col-span-8">
                <article className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 font-mono text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-[#DC143C]">description</span>
                      <span className="font-semibold text-zinc-200 uppercase tracking-wider">{dict.readmeTitle}</span>
                    </div>
                    <span className="text-zinc-500">
                      Apisikma123 / <span className="text-zinc-300 font-medium">{project.id}</span>
                    </span>
                  </div>

                  <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{
                      __html: renderMarkdown(project.readme || `# ${project.displayName}\n\n${project.description || ''}`),
                    }}
                  />
                </article>
              </div>

              {/* Right Column: Sidebar */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 font-mono text-xs">
                <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                  <h2 className="eyebrow text-zinc-400 text-[0.62rem] font-semibold block">{dict.telemetry}</h2>

                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[0.62rem]">{dict.author}</span>
                    <a
                      href="https://github.com/Apisikma123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-200 hover:text-[#DC143C] block font-medium"
                    >
                      Muhammad Aga Putra (@Apisikma123) ↗
                    </a>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <span className="text-zinc-500 text-[0.62rem]">{dict.techStack}</span>
                    <span className="text-zinc-300 block">{(project.tags || [project.language]).slice(0, 3).join(', ')}</span>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-white/5">
                    <span className="text-zinc-500 text-[0.62rem]">{dict.status}</span>
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C]"></span> {dict.public}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={copyClone}
                      className="w-full rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 px-3 flex items-center justify-between text-zinc-300 text-[0.68rem] transition-colors cursor-pointer"
                    >
                      <span className="truncate mr-2 font-mono">{copied ? 'Tersalin!' : `git clone ${project.html_url}.git`}</span>
                      <span className="material-symbols-outlined text-xs text-zinc-400">content_copy</span>
                    </button>
                  </div>
                </div>

                {/* WhatsApp Project CTA */}
                <div className="glass-card rounded-2xl p-5 border border-[#DC143C]/20 bg-[#DC143C]/5 text-center space-y-3">
                  <h2 className="font-sans font-bold text-sm text-white">{dict.discussTitle}</h2>
                  <p className="font-sans text-xs text-zinc-300 font-light leading-relaxed">{dict.discussDesc}</p>
                  <a
                    href={`https://wa.me/${waNum}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-crimson rounded-xl py-2.5 px-4 w-full block font-mono text-[0.68rem] uppercase tracking-wider font-semibold"
                  >
                    {dict.discussBtn}
                  </a>
                </div>

                {/* Other Projects Quick Switcher */}
                {otherProjects.length > 0 && (
                  <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="eyebrow text-zinc-400 text-[0.62rem] font-semibold">{dict.otherProj}</h2>
                      <a href="/projects.html" className="text-[#DC143C] hover:text-white text-[0.62rem] uppercase">
                        {dict.allProjects} ↗
                      </a>
                    </div>
                    <div className="space-y-1.5">
                      {otherProjects.map((op) => (
                        <a
                          key={op.id}
                          href={`/project.html?id=${op.id}`}
                          className="w-full text-left p-2 rounded-lg bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all text-zinc-300 hover:text-white flex items-center justify-between group block"
                        >
                          <div className="truncate mr-2">
                            <span className="block truncate font-medium text-xs text-zinc-200 group-hover:text-[#DC143C] transition-colors">
                              {op.displayName}
                            </span>
                            <span className="text-[0.62rem] text-zinc-500">{op.language}</span>
                          </div>
                          <span className="material-symbols-outlined text-xs text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5">
                            arrow_forward
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6 md:px-12 bg-zinc-950/80 backdrop-blur-xl font-mono text-xs text-zinc-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-zinc-300">Muhammad Aga Putra</span> / Software Engineer &amp; Web Architect © {new Date().getFullYear()}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[0.7rem] sm:text-xs">
            <a href="/#start" className="hover:text-white transition-colors">
              {dict.back}
            </a>
            <a href="/projects.html" className="text-[#DC143C] hover:text-white transition-colors">
              {dict.allProjects}
            </a>
            <a href="/pricing.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Estimasi Harga ↗
            </a>
            <a href="https://github.com/Apisikma123" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
