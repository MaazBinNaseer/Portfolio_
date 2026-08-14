/* ============================================================
   EDIT THIS FILE — everything on the site is driven from here.
   You should not need to touch index.html, style.css, or main.js
   just to update your content.
   ============================================================ */

const PORTFOLIO = {

  // ---------- ABOUT ----------
  name: "Your Name",
  role: "Water Resources Engineer",
  bio: "Write 2–4 sentences about who you are, the kind of water resources work you do " +
       "(stormwater, floodplain, hydraulic modeling, watershed planning, etc.), and what " +
       "you're looking for right now. This shows up right under your name.",

  // Shown as small text links under the bio, and again in the footer.
  // Leave the value empty ("") to hide a link.
  socials: {
    email: "",           // e.g. "you@example.com" (auto-prefixed with mailto:)
    github: "",          // e.g. "https://github.com/yourusername"
    linkedin: "",        // e.g. "https://linkedin.com/in/yourusername"
    website: ""          // any other site you want linked
  },

  // ---------- GITHUB (Coding Projects section) ----------
  // Your public GitHub username. The site fetches your repos live
  // from the GitHub API — no need to list projects manually.
  githubUsername: "your-github-username",
  githubMaxRepos: 6,          // how many repo cards to show
  githubExcludeForks: true,   // hide forked repos
  // Optional: only show these repos, in this order (by exact repo name).
  // Leave as an empty array to auto-show your most recently updated repos instead.
  githubPinnedRepos: [],

  // ---------- SKILLS & TECH STACK ----------
  skills: [
    {
      category: "Modeling & Analysis",
      items: ["HEC-RAS", "HEC-HMS", "EPA SWMM", "WaterCAD / SewerCAD"]
    },
    {
      category: "GIS & Design",
      items: ["ArcGIS Pro", "QGIS", "AutoCAD Civil 3D"]
    },
    {
      category: "Programming & Data",
      items: ["Python", "MATLAB", "VBA", "SQL"]
    }
  ],

  // ---------- LIVE WEBSITE RESULTS ----------
  // image is optional — leave "" to use a plain placeholder tile.
  // Put real screenshots in assets/images/ and reference them,
  // e.g. "assets/images/project1.png"
  liveProjects: [
    {
      title: "Watershed Dashboard",
      category: "GIS Web App",
      url: "https://example.com",
      image: "",
      description: "An interactive map showing flood risk zones and gauge data for a regional watershed.",
      skills: ["Leaflet", "ArcGIS Online", "JavaScript"]
    },
    {
      title: "Stormwater Sizing Tool",
      category: "Calculator",
      url: "https://example.com",
      image: "",
      description: "A browser-based tool that sizes detention basins from rainfall and site inputs.",
      skills: ["Python", "Flask", "Vercel"]
    }
  ],

  // ---------- ENGINEERING PROJECT RESULTS ----------
  // Drop PDF files into assets/pdfs/ and point "file" at them.
  // Clicking a card opens the PDF inline in a modal.
  engineeringProjects: [
    {
      title: "100-Year Floodplain Delineation",
      category: "Hydraulics",
      date: "2025",
      description: "Floodplain mapping and hydraulic modeling for a river reach to support a FEMA map revision.",
      skills: ["HEC-RAS", "ArcGIS Pro"],
      file: "assets/pdfs/sample-report.pdf"
    },
    {
      title: "Regional Stormwater Master Plan",
      category: "Stormwater",
      date: "2024",
      description: "Watershed-scale drainage analysis and capital improvement recommendations for a growing municipality.",
      skills: ["EPA SWMM", "GIS"],
      file: "assets/pdfs/sample-report.pdf"
    }
  ],

  // ---------- RÉSUMÉ ----------
  // Drop your résumé PDF into assets/resume/ and point this at it.
  resumeFile: "assets/resume/resume.pdf"
};
