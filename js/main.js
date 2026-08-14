/* ============================================================
   Renders the whole page from PORTFOLIO (see config.js).
   No content should be hardcoded here — edit config.js instead.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderSocials();
  renderSkills();
  renderLiveProjects();
  renderEngineeringProjects();
  renderGithubProjects();
  renderResume();
  setupModal();
});

/* ---------- ABOUT ---------- */
function renderAbout() {
  document.title = `${PORTFOLIO.name} — Portfolio`;
  setText("nav-brand", PORTFOLIO.name.toUpperCase());
  setText("hero-name", PORTFOLIO.name);
  setText("hero-role", PORTFOLIO.role);
  setText("hero-bio", PORTFOLIO.bio);
  setText("footer-name", PORTFOLIO.name);
}

function renderSocials() {
  const links = [];
  const s = PORTFOLIO.socials || {};
  if (s.email) links.push({ label: "Email", href: `mailto:${s.email}` });
  if (s.github) links.push({ label: "GitHub", href: s.github });
  if (s.linkedin) links.push({ label: "LinkedIn", href: s.linkedin });
  if (s.website) links.push({ label: "Website", href: s.website });

  const html = links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join("");
  document.getElementById("hero-links").innerHTML = html;
  document.getElementById("footer-links").innerHTML = html;

  if (s.github) document.getElementById("github-all-link").href = s.github;
  else if (PORTFOLIO.githubUsername) document.getElementById("github-all-link").href = `https://github.com/${PORTFOLIO.githubUsername}`;
}

/* ---------- SKILLS ---------- */
function renderSkills() {
  const el = document.getElementById("skills-grid");
  el.innerHTML = (PORTFOLIO.skills || []).map(group => `
    <div class="skill-group">
      <h3>${escapeHtml(group.category)}</h3>
      <div class="skill-tags">
        ${group.items.map(i => `<span class="tag">${escapeHtml(i)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/* ---------- LIVE WEBSITE RESULTS ---------- */
function renderLiveProjects() {
  const el = document.getElementById("live-grid");
  el.innerHTML = (PORTFOLIO.liveProjects || []).map((p, i) => `
    <div class="card" tabindex="0" data-modal="live" data-index="${i}">
       <div class="card-media">
        ${p.image
          ? `<img src="${p.image}" alt="${escapeHtml(p.title)} preview">`
          : "PDF"
        }
      </div>
      <div class="card-body">
        <span class="pill">${escapeHtml(p.category || "Project")}</span>
        <h3 class="card-title">${escapeHtml(p.title)}</h3>
        <p class="card-desc">${escapeHtml(p.description || "")}</p>
        <div class="card-skills">
          ${(p.skills || []).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  el.querySelectorAll(".card").forEach(card => card.addEventListener("click", () => {
    const p = PORTFOLIO.liveProjects[card.dataset.index];
    openModal(`
      <span class="pill">${escapeHtml(p.category || "Project")}</span>
      <h2 style="margin-top:.6rem;">${escapeHtml(p.title)}</h2>
      <p class="card-desc" style="margin:.8rem 0;">${escapeHtml(p.description || "")}</p>
      <div class="card-skills" style="margin-bottom:1.2rem;">
        ${(p.skills || []).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
      </div>
      ${p.url ? `<a class="btn" href="${p.url}" target="_blank" rel="noopener">Visit live site →</a>` : ""}
    `);
  }));
  bindKeyboardActivation(el);
}

/* ---------- ENGINEERING PROJECT RESULTS ---------- */
function renderEngineeringProjects() {
  const el = document.getElementById("engineering-grid");
  el.innerHTML = (PORTFOLIO.engineeringProjects || []).map((p, i) => `
    <div class="card accent-amber" tabindex="0" data-modal="engineering" data-index="${i}">
      <div class="card-media">PDF</div>
      <div class="card-body">
        <span class="pill">${escapeHtml(p.category || "Engineering")}</span>
        <h3 class="card-title">${escapeHtml(p.title)}</h3>
        <p class="card-desc">${escapeHtml(p.description || "")}</p>
        <div class="card-skills">
          ${(p.skills || []).map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
        </div>
        <div class="card-meta">${escapeHtml(p.date || "")}</div>
      </div>
    </div>
  `).join("");

  el.querySelectorAll(".card").forEach(card => card.addEventListener("click", () => {
    const p = PORTFOLIO.engineeringProjects[card.dataset.index];
    openModal(`
      <span class="pill">${escapeHtml(p.category || "Engineering")}</span>
      <h2 style="margin-top:.6rem;">${escapeHtml(p.title)}</h2>
      <p class="card-desc" style="margin:.8rem 0;">${escapeHtml(p.description || "")}</p>
      <iframe src="${p.file}" title="${escapeHtml(p.title)}"></iframe>
      <p style="margin-top:.9rem;"><a class="text-link" href="${p.file}" download>Download PDF ↓</a></p>
    `);
  }));
  bindKeyboardActivation(el);
}

/* ---------- CODING PROJECTS (live from GitHub) ---------- */
async function renderGithubProjects() {
  const el = document.getElementById("code-grid");
  const status = document.getElementById("code-status");
  const username = PORTFOLIO.githubUsername;

  if (!username || username === "your-github-username") {
    status.textContent = "Set githubUsername in js/config.js to pull in your repos.";
    return;
  }

  status.textContent = "Loading repositories from GitHub…";

  try {
    let repos;
    if (PORTFOLIO.githubPinnedRepos && PORTFOLIO.githubPinnedRepos.length) {
      const results = await Promise.all(
        PORTFOLIO.githubPinnedRepos.map(name =>
          fetch(`https://api.github.com/repos/${username}/${name}`).then(r => r.ok ? r.json() : null)
        )
      );
      repos = results.filter(Boolean);
    } else {
      const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
      let all = await res.json();
      if (PORTFOLIO.githubExcludeForks) all = all.filter(r => !r.fork);
      repos = all.slice(0, PORTFOLIO.githubMaxRepos || 6);
    }

    if (!repos.length) {
      status.textContent = "No public repositories found.";
      return;
    }
    status.textContent = "";

    el.innerHTML = repos.map((r, i) => `
      <div class="card accent-green" tabindex="0" data-modal="code" data-index="${i}">
        <div class="card-media">&lt;/&gt;</div>
        <div class="card-body">
          <span class="pill">${escapeHtml(r.language || "Code")}</span>
          <h3 class="card-title">${escapeHtml(r.name)}</h3>
          <p class="card-desc">${escapeHtml(r.description || "No description provided.")}</p>
          <div class="card-meta">
            <span>★ ${r.stargazers_count}</span>
            <span>·</span>
            <span>Updated ${new Date(r.updated_at).toLocaleDateString(undefined, { year: "numeric", month: "short" })}</span>
          </div>
        </div>
      </div>
    `).join("");

    window.__repos = repos;
    el.querySelectorAll(".card").forEach(card => card.addEventListener("click", () => {
      const r = window.__repos[card.dataset.index];
      openModal(`
        <span class="pill">${escapeHtml(r.language || "Code")}</span>
        <h2 style="margin-top:.6rem;">${escapeHtml(r.name)}</h2>
        <p class="card-desc" style="margin:.8rem 0;">${escapeHtml(r.description || "No description provided.")}</p>
        <div class="card-meta" style="margin-bottom:1.2rem;">
          <span>★ ${r.stargazers_count}</span><span>·</span><span>${r.forks_count} forks</span>
          <span>·</span><span>Updated ${new Date(r.updated_at).toLocaleDateString()}</span>
        </div>
        <a class="btn" href="${r.html_url}" target="_blank" rel="noopener">View on GitHub →</a>
      `);
    }));
    bindKeyboardActivation(el);

  } catch (err) {
    status.textContent = "Couldn't load repositories right now — check githubUsername in config.js.";
    console.error(err);
  }
}

/* ---------- RESUME ---------- */
function renderResume() {
  const link = document.getElementById("resume-link");
  if (PORTFOLIO.resumeFile) link.href = PORTFOLIO.resumeFile;
}

/* ---------- MODAL ---------- */
function setupModal() {
  const overlay = document.getElementById("modal-overlay");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}
function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal-overlay").classList.add("open");
}
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.getElementById("modal-body").innerHTML = "";
}

/* ---------- helpers ---------- */
function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function bindKeyboardActivation(container) {
  container.querySelectorAll(".card").forEach(card => {
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.click(); }
    });
  });
}
