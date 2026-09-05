/* ============================================================
   Renders the whole page from PORTFOLIO (see config.js).
   No content should be hardcoded here — edit config.js instead.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  renderAbout();
  renderEducation();
  renderSocials();
  renderSkills();
  renderLiveProjects();
  renderEngineeringProjects();
  renderGithubProjects();

  setupEngineeringCarousel(
    "environmental-grid",
    "environmental-prev",
    "environmental-next"
  );

  setupEngineeringCarousel(
    "mechanical-grid",
    "mechanical-prev",
    "mechanical-next"
  );

  setupModal();
});

/* ============================================================
   ABOUT
   ============================================================ */

function renderAbout() {
  document.title = `${PORTFOLIO.name} — Portfolio`;

  setText("nav-brand", PORTFOLIO.name.toUpperCase());
  setText("hero-name", PORTFOLIO.name);
  setText("hero-role", PORTFOLIO.role);

  const bio = document.getElementById("hero-bio");

  if (bio) {
    bio.innerHTML = PORTFOLIO.bio;
  }

  setText("footer-name", PORTFOLIO.name);
}

/* ============================================================
   EDUCATION
   ============================================================ */

function renderEducation() {
  const el = document.getElementById("hero-education");

  if (!el) return;

  el.innerHTML = (PORTFOLIO.education || [])
    .map(
      item => `
        <div class="education-item">

          <div class="education-icon">
            ${
              item.icon
                ? `<img
                    src="${item.icon}"
                    alt="${escapeHtml(item.school)} logo"
                  >`
                : ""
            }
          </div>

          <div class="education-info">

            <div class="education-degree">
              ${escapeHtml(item.degree)}
            </div>

            <div class="education-school">
              ${escapeHtml(item.school)}

              ${
                item.location
                  ? `<span class="education-location">
                      · ${escapeHtml(item.location)}
                    </span>`
                  : ""
              }
            </div>

          </div>

        </div>
      `
    )
    .join("");
}

/* ============================================================
   SOCIAL LINKS
   ============================================================ */

function renderSocials() {
  const links = [];
  const s = PORTFOLIO.socials || {};

  if (s.email) {
    links.push({
      label: "Email",
      href: `mailto:${s.email}`
    });
  }

  if (s.github) {
    links.push({
      label: "GitHub",
      href: s.github
    });
  }

  if (s.linkedin) {
    links.push({
      label: "LinkedIn",
      href: s.linkedin
    });
  }

  if (s.website) {
    links.push({
      label: "Website",
      href: s.website
    });
  }

  const socialHtml = links
    .map(
      link => `
        <a
          href="${link.href}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${link.label}
        </a>
      `
    )
    .join("");

  const heroLinks = document.getElementById("hero-links");

  if (heroLinks) {
    heroLinks.innerHTML = `
      ${socialHtml}

      <a
        class="btn"
        href="${PORTFOLIO.resumeFile}"
        download
      >
        Download Résumé
      </a>
    `;
  }

  const footerLinks = document.getElementById("footer-links");

  if (footerLinks) {
    footerLinks.innerHTML = socialHtml;
  }

  const githubAllLink =
    document.getElementById("github-all-link");

  if (githubAllLink) {
    if (s.github) {
      githubAllLink.href = s.github;
    } else if (PORTFOLIO.githubUsername) {
      githubAllLink.href =
        `https://github.com/${PORTFOLIO.githubUsername}`;
    }
  }
}

/* ============================================================
   SKILLS
   ============================================================ */

function renderSkills() {
  const el = document.getElementById("skills-grid");

  if (!el) return;

  el.innerHTML = (PORTFOLIO.skills || [])
    .map(
      group => `
        <div class="skill-group">

          <h3>
            ${escapeHtml(group.category)}
          </h3>

          <div class="skill-tags">
            ${(group.items || [])
              .map(
                item =>
                  `<span class="tag">${escapeHtml(item)}</span>`
              )
              .join("")}
          </div>

        </div>
      `
    )
    .join("");
}

/* ============================================================
   LIVE WEBSITE PROJECTS
   ============================================================ */

function renderLiveProjects() {
  const el = document.getElementById("live-grid");

  if (!el) return;

  el.innerHTML = (PORTFOLIO.liveProjects || [])
    .map(
      (p, i) => `
        <div
          class="card"
          tabindex="0"
          data-modal="live"
          data-index="${i}"
        >

          <div class="card-media">
            ${
              p.image
                ? `<img
                    src="${p.image}"
                    alt="${escapeHtml(p.title)} screenshot"
                  >`
                : "PREVIEW"
            }
          </div>

          <div class="card-body">

            <span class="pill">
              ${escapeHtml(p.category || "Project")}
            </span>

            <h3 class="card-title">
              ${escapeHtml(p.title)}
            </h3>

            <p class="card-desc">
              ${escapeHtml(p.description || "")}
            </p>

            <div class="card-skills">
              ${(p.skills || [])
                .map(
                  skill =>
                    `<span class="tag">${escapeHtml(skill)}</span>`
                )
                .join("")}
            </div>

          </div>
        </div>
      `
    )
    .join("");

  el.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const p =
        PORTFOLIO.liveProjects[card.dataset.index];

      if (!p) return;

      openModal(`
        <span class="pill">
          ${escapeHtml(p.category || "Project")}
        </span>

        <h2 style="margin-top:.6rem;">
          ${escapeHtml(p.title)}
        </h2>

        <p
          class="card-desc"
          style="margin:.8rem 0;"
        >
          ${escapeHtml(p.description || "")}
        </p>

        <div
          class="card-skills"
          style="margin-bottom:1.2rem;"
        >
          ${(p.skills || [])
            .map(
              skill =>
                `<span class="tag">${escapeHtml(skill)}</span>`
            )
            .join("")}
        </div>

        ${
          p.url
            ? `
              <a
                class="btn"
                href="${p.url}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site →
              </a>
            `
            : ""
        }
      `);
    });
  });

  bindKeyboardActivation(el);
}

/* ============================================================
   ENGINEERING PROJECTS
   ============================================================ */

function renderEngineeringProjects() {
  const projects =
    PORTFOLIO.engineeringProjects || [];

  const environmentalProjects =
    projects.filter(
      p => p.discipline === "environmental"
    );

  const mechanicalProjects =
    projects.filter(
      p => p.discipline === "mechanical"
    );

  renderEngineeringGroup(
    "environmental-grid",
    environmentalProjects
  );

  renderEngineeringGroup(
    "mechanical-grid",
    mechanicalProjects
  );
}

/* ============================================================
   RENDER ENGINEERING GROUP

   IMPORTANT:
   The carousel clones cards with cloneNode(true).

   cloneNode copies the HTML but DOES NOT copy JavaScript
   click event listeners.

   Because of that we attach ONE click listener to the parent
   grid. This is called event delegation.

   Both real cards and cloned cards will now open the PDF.
   ============================================================ */

function renderEngineeringGroup(gridId, projects) {
  const el = document.getElementById(gridId);

  if (!el) return;

  el.innerHTML = projects
    .map(
      p => `
        <a
          class="card accent-amber"
          href="${encodeURI(p.file)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open ${escapeHtml(p.title)} PDF"
        >

          <div class="card-media">
            ${
              p.image
                ? `
                  <img
                    src="${p.image}"
                    alt="${escapeHtml(p.title)} preview"
                  >
                `
                : "PDF"
            }
          </div>

          <div class="card-body">

            <span class="pill">
              ${escapeHtml(
                p.category || "Engineering"
              )}
            </span>

            <h3 class="card-title">
              ${escapeHtml(p.title)}
            </h3>

            <p class="card-desc">
              ${escapeHtml(
                p.description || ""
              )}
            </p>

            <div class="card-skills">
              ${(p.skills || [])
                .map(
                  skill =>
                    `<span class="tag">${escapeHtml(skill)}</span>`
                )
                .join("")}
            </div>

            <div class="card-meta">

              <span>
                ${escapeHtml(p.date || "")}
              </span>

              <span>
                View project →
              </span>

            </div>

          </div>

        </a>
      `
    )
    .join("");
}

/* ============================================================
   ENGINEERING CAROUSEL
   ============================================================ */

function setupEngineeringCarousel(
  trackId,
  prevId,
  nextId
) {
  const track =
    document.getElementById(trackId);

  const prev =
    document.getElementById(prevId);

  const next =
    document.getElementById(nextId);

  if (!track || !prev || !next) {
    return;
  }

  const originalCards =
    Array.from(track.children);

  /* ------------------------------------------------------------
     No carousel needed for three or fewer projects
     ------------------------------------------------------------ */

  if (originalCards.length <= 3) {
    prev.style.display = "none";
    next.style.display = "none";

    return;
  }

  const visibleCards = 3;

  const AUTO_DELAY = 5000;

  const TRANSITION_TIME = 800;

  let currentIndex =
    visibleCards;

  let autoplayTimer =
    null;

  let isAnimating =
    false;

  /* ============================================================
     CREATE CLONES FOR INFINITE LOOP
     ============================================================ */

  const firstClones =
    originalCards
      .slice(0, visibleCards)
      .map(card =>
        card.cloneNode(true)
      );

  const lastClones =
    originalCards
      .slice(-visibleCards)
      .map(card =>
        card.cloneNode(true)
      );

  lastClones.forEach(card => {
    card.classList.add(
      "carousel-clone"
    );
  });

  firstClones.forEach(card => {
    card.classList.add(
      "carousel-clone"
    );
  });

  /*
     Insert the cloned last cards before
     the first real card.
  */

  for (
    let i = lastClones.length - 1;
    i >= 0;
    i--
  ) {
    track.insertBefore(
      lastClones[i],
      track.firstChild
    );
  }

  /*
     Insert cloned first cards after
     the final real card.
  */

  firstClones.forEach(card => {
    track.appendChild(card);
  });

  /* ============================================================
     CARD DISTANCE
     ============================================================ */

  function getCardDistance() {
    const card =
      track.querySelector(".card");

    if (!card) return 0;

    const styles =
      getComputedStyle(track);

    const gap =
      parseFloat(styles.gap) || 0;

    return (
      card.getBoundingClientRect().width +
      gap
    );
  }

  /* ============================================================
     MOVE CAROUSEL
     ============================================================ */

  function moveToIndex(
    animate = true
  ) {
    const distance =
      getCardDistance();

    if (!distance) return;

    track.style.transition =
      animate
        ? `transform ${TRANSITION_TIME}ms ease`
        : "none";

    track.style.transform =
      `translateX(-${
        currentIndex * distance
      }px)`;
  }

  /* ============================================================
     INITIAL POSITION
     ============================================================ */

  requestAnimationFrame(() => {
    moveToIndex(false);

    requestAnimationFrame(() => {
      track.style.transition =
        `transform ${TRANSITION_TIME}ms ease`;
    });
  });

  /* ============================================================
     NEXT SLIDE
     ============================================================ */

  function nextSlide() {
    if (isAnimating) return;

    isAnimating = true;

    currentIndex++;

    moveToIndex(true);
  }

  /* ============================================================
     PREVIOUS SLIDE
     ============================================================ */

  function previousSlide() {
    if (isAnimating) return;

    isAnimating = true;

    currentIndex--;

    moveToIndex(true);
  }

  /* ============================================================
     INFINITE LOOP RESET
     ============================================================ */

  track.addEventListener(
    "transitionend",
    () => {
      const totalOriginal =
        originalCards.length;

      /*
         Passed final real card and
         entered cloned first cards.
      */

      if (
        currentIndex >=
        totalOriginal + visibleCards
      ) {
        currentIndex =
          visibleCards;

        moveToIndex(false);
      }

      /*
         Passed backward into
         cloned last cards.
      */

      else if (
        currentIndex <
        visibleCards
      ) {
        currentIndex =
          totalOriginal +
          visibleCards -
          1;

        moveToIndex(false);
      }

      isAnimating = false;
    }
  );

  /* ============================================================
     AUTOPLAY
     ============================================================ */

  function startAutoplay() {
    stopAutoplay();

    autoplayTimer =
      setInterval(() => {
        nextSlide();
      }, AUTO_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(
        autoplayTimer
      );

      autoplayTimer =
        null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  /* ============================================================
     NEXT / PREVIOUS BUTTONS
     ============================================================ */

  next.addEventListener(
    "click",
    () => {
      nextSlide();

      restartAutoplay();
    }
  );

  prev.addEventListener(
    "click",
    () => {
      previousSlide();

      restartAutoplay();
    }
  );

  /* ============================================================
     PAUSE ON HOVER
     ============================================================ */

  const carousel =
    track.closest(
      ".engineering-carousel"
    );

  if (carousel) {
    carousel.addEventListener(
      "mouseenter",
      stopAutoplay
    );

    carousel.addEventListener(
      "mouseleave",
      startAutoplay
    );
  }

  /* ============================================================
     RESIZE
     ============================================================ */

  window.addEventListener(
    "resize",
    () => {
      moveToIndex(false);
    }
  );

  /* ============================================================
     START AUTOPLAY
     ============================================================ */

  startAutoplay();
}

/* ============================================================
   CODING PROJECTS — LIVE FROM GITHUB
   ============================================================ */

async function renderGithubProjects() {
  const el =
    document.getElementById(
      "code-grid"
    );

  const status =
    document.getElementById(
      "code-status"
    );

  if (!el || !status) return;

  const username =
    PORTFOLIO.githubUsername;

  if (
    !username ||
    username ===
      "your-github-username"
  ) {
    status.textContent =
      "Set githubUsername in js/config.js to pull in your repos.";

    return;
  }

  status.textContent =
    "Loading repositories from GitHub…";

  try {
    let repos;

    /* ----------------------------------------------------------
       PINNED REPOSITORIES
       ---------------------------------------------------------- */

    if (
      PORTFOLIO.githubPinnedRepos &&
      PORTFOLIO.githubPinnedRepos.length
    ) {
      const results =
        await Promise.all(
          PORTFOLIO.githubPinnedRepos.map(
            name =>
              fetch(
                `https://api.github.com/repos/${username}/${name}`
              ).then(response =>
                response.ok
                  ? response.json()
                  : null
              )
          )
        );

      repos =
        results.filter(Boolean);
    }

    /* ----------------------------------------------------------
       AUTOMATIC REPOSITORY LIST
       ---------------------------------------------------------- */

    else {
      const response =
        await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );

      if (!response.ok) {
        throw new Error(
          `GitHub API returned ${response.status}`
        );
      }

      let all =
        await response.json();

      if (
        PORTFOLIO.githubExcludeForks
      ) {
        all =
          all.filter(
            repo => !repo.fork
          );
      }

      repos =
        all.slice(
          0,
          PORTFOLIO.githubMaxRepos ||
            6
        );
    }

    if (!repos.length) {
      status.textContent =
        "No public repositories found.";

      return;
    }

    status.textContent = "";

    el.innerHTML =
      repos
        .map(
          (r, i) => `
            <div
              class="card accent-green"
              tabindex="0"
              data-modal="code"
              data-index="${i}"
            >

              <div class="card-media">
                &lt;/&gt;
              </div>

              <div class="card-body">

                <span class="pill">
                  ${escapeHtml(
                    r.language || "Code"
                  )}
                </span>

                <h3 class="card-title">
                  ${escapeHtml(
                    PORTFOLIO
                      .githubRepoTitles?.[
                        r.name
                      ] ||
                      r.name
                  )}
                </h3>

                <p class="card-desc">
                  ${escapeHtml(
                    r.description ||
                      "No description provided."
                  )}
                </p>

                <div class="card-meta">

                  <span>
                    ★ ${r.stargazers_count}
                  </span>

                  <span>·</span>

                  <span>
                    Updated ${
                      new Date(
                        r.updated_at
                      ).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short"
                        }
                      )
                    }
                  </span>

                </div>

              </div>
            </div>
          `
        )
        .join("");

    window.__repos = repos;

    el.querySelectorAll(
      ".card"
    ).forEach(card => {
      card.addEventListener(
        "click",
        () => {
          const r =
            window.__repos[
              card.dataset.index
            ];

          if (!r) return;

          openModal(`
            <span class="pill">
              ${escapeHtml(
                r.language || "Code"
              )}
            </span>

            <h2 style="margin-top:.6rem;">
              ${escapeHtml(r.name)}
            </h2>

            <p
              class="card-desc"
              style="margin:.8rem 0;"
            >
              ${escapeHtml(
                r.description ||
                  "No description provided."
              )}
            </p>

            <div
              class="card-meta"
              style="margin-bottom:1.2rem;"
            >

              <span>
                ★ ${r.stargazers_count}
              </span>

              <span>·</span>

              <span>
                ${r.forks_count} forks
              </span>

              <span>·</span>

              <span>
                Updated ${
                  new Date(
                    r.updated_at
                  ).toLocaleDateString()
                }
              </span>

            </div>

            <a
              class="btn"
              href="${r.html_url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          `);
        }
      );
    });

    bindKeyboardActivation(el);
  }

  catch (err) {
    status.textContent =
      "Couldn't load repositories right now — check githubUsername in config.js.";

    console.error(err);
  }
}

/* ============================================================
   MODAL
   ============================================================ */

function setupModal() {
  const overlay =
    document.getElementById(
      "modal-overlay"
    );

  const closeButton =
    document.getElementById(
      "modal-close"
    );

  if (!overlay || !closeButton) {
    return;
  }

  closeButton.addEventListener(
    "click",
    closeModal
  );

  overlay.addEventListener(
    "click",
    event => {
      if (
        event.target === overlay
      ) {
        closeModal();
      }
    }
  );

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape"
      ) {
        closeModal();
      }
    }
  );
}

function openModal(html) {
  const body =
    document.getElementById(
      "modal-body"
    );

  const overlay =
    document.getElementById(
      "modal-overlay"
    );

  if (!body || !overlay) {
    return;
  }

  body.innerHTML = html;

  overlay.classList.add(
    "open"
  );
}

function closeModal() {
  const body =
    document.getElementById(
      "modal-body"
    );

  const overlay =
    document.getElementById(
      "modal-overlay"
    );

  if (overlay) {
    overlay.classList.remove(
      "open"
    );
  }

  if (body) {
    body.innerHTML = "";
  }
}

/* ============================================================
   HELPERS
   ============================================================ */

function setText(id, text) {
  const el =
    document.getElementById(id);

  if (el) {
    el.textContent = text;
  }
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    character =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]
  );
}

function bindKeyboardActivation(
  container
) {
  container
    .querySelectorAll(".card")
    .forEach(card => {
      card.addEventListener(
        "keydown",
        event => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            card.click();
          }
        }
      );
    });
}