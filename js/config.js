/* ============================================================
   EDIT THIS FILE — everything on the site is driven from here.
   You should not need to touch index.html, style.css, or main.js
   just to update your content.
   ============================================================ */

const PORTFOLIO = {

  // ---------- ABOUT ----------
  name: "Maaz Bin Naseer",
  role: "Environmental Engineer",
  bio:"<strong>Background:</strong> Environmental Engineer with experience in water resources, hydrologic and hydraulic modeling, stormwater management, flood risk assessment, and GIS. My background includes HEC-RAS and HEC-HMS modeling, watershed analysis, bridge and culvert inspections, and drainage-related projects." +
      "<br><br>" +
      "<strong>Objective:</strong> I’m currently seeking opportunities in Water Resources, Stormwater, Hydrology, and Environmental Engineering where I can contribute to resilient and sustainable infrastructure.",
  education: [
    {
      icon: "assets/images/purdue_icon.png",
      degree: "MSc in Environmental Engineering",
      school: "Purdue University",
      location: "West Lafayette, IN"
    },
    {
      icon: "assets/images/ADU_icon.png",
      degree: "BSc in Mechanical Engineering",
      school: "Abu Dhabi University",
      location: "Abu Dhabi, UAE"
    },
    {
      icon: "assets/images/42_icon.png",
      degree: "Diploma in Software Development",
      school: "42 Abu Dhabi",
      location: "Abu Dhabi, UAE"
    }
  ],
  // Shown as small text links under the bio, and again in the footer.
  // Leave the value empty ("") to hide a link.
  socials: {
    email: "maazbinnaseer@gmail.com",           // e.g. "you@example.com" (auto-prefixed with mailto:)
    github: "https://github.com/MaazBinNaseer",          // e.g. "https://github.com/yourusername"
    linkedin: "https://linkedin.com/in/maazbinnaseer",        // e.g. "https://linkedin.com/in/yourusername"
  },

  // ---------- GITHUB (Coding Projects section) ----------
  // Your public GitHub username. The site fetches your repos live
  // from the GitHub API — no need to list projects manually.
  githubUsername: "MaazBinNaseer",
  githubMaxRepos: 6,          // how many repo cards to show
  githubExcludeForks: true,   // hide forked repos
  // Optional: only show these repos, in this order (by exact repo name).
  // Leave as an empty array to auto-show your most recently updated repos instead.
  githubPinnedRepos: ["storm_flood_analysis", "42Cub3D ", "Minishell-42 ", "Fract-ols ", "ft_irc_42 ", "42Cub3D"],

  // ---------- SKILLS & TECH STACK ----------
  skills: [
    {
      category: "Modeling & Analysis",
      items: ["HEC-RAS", "HEC-HMS", "EPA SWMM", "WaterCAD / SewerCAD"]
    },
    {
      category: "GIS & Design",
      items: ["ArcGIS Pro", "QGIS", "AutoCAD Civil 3D", "DSAS", "MicroStation"]
    },
    {
      category: "Programming & Data",
      items: ["Python", "MATLAB", "VBA", "SQL", "Data Analysis", "Data Visualization"]
    }
  ],

  // ---------- LIVE WEBSITE RESULTS ----------
  // image is optional — leave "" to use a plain placeholder tile.
  // Put real screenshots in assets/images/ and reference them,
  // e.g. "assets/images/project1.png"
  liveProjects: [
    {
      title: "Shoreline Recession Lake Michigan",
      category: "GIS Web App",
      url: "https://shoreline-maazbinnaseers-projects.vercel.app/",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Lake_Michigan_Sleeping_Bear_Dunes.jpg/330px-Lake_Michigan_Sleeping_Bear_Dunes.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail",
      description: "An interactive map showing flood risk zones and gauge data for a regional watershed. Password is LakeMichigan123",
      skills: ["Leaflet", "ArcGIS Pro", "JavaScript", "Python"]
    },
    // {
    //   title: "Stormwater Sizing Tool",
    //   category: "Calculator",
    //   url: "https://example.com",
    //   image: "",
    //   description: "A browser-based tool that sizes detention basins from rainfall and site inputs.",
    //   skills: ["Python", "Flask", "Vercel"]
    // }
  ],

  // ---------- ENGINEERING PROJECT RESULTS ----------
  // Drop PDF files into assets/pdfs/ and point "file" at them.
  // Clicking a card opens the PDF inline in a modal.
  engineeringProjects: [
    {
      title: "100-Year Floodplain Delineation",
      category: "Hydraulics and Hydrology",
      date: "2025",
      image: "assets/images/West River_page-0001.jpg",
      description: "Floodplain mapping and hydraulic modeling for a river reach to support a FEMA map revision.",
      skills: ["HEC-RAS", "HEC-HMS", "ArcGIS Pro"],
      file: "assets/pdfs/West Nishanabontu River Flood Map.pdf"
    },
    {
      title: "Lake Michigan Delineation and Flood Risk Analysis",
      category: "Shoreline Recession",
      date: "2025",
      image: "assets/images/Lake Michigan NSM.png",
      description: "Lake Michigan shoreline analysis using Net Shoreline Movement.",
      skills: ["DSAS", "QGIS", "ArcGIS Pro"],
      file: "assets/pdfs/LakeMichigan_Delineation.pdf"
    },
    {
    title: "Coastal Flood Risk Assessment in Florida",
    category: "Data Analysis and Visualization",
    date: "2024",
    image: "assets/images/Data.png",
    description: "Flood Risk analysis for most severe weather events.",
    skills: ["Python", "Data Analysis", "Data Visualization", "Policy mitigation"],
    file: "assets/pdfs/Coastal Flood Risk.pdf"
    }
  ],

  // ---------- RÉSUMÉ ----------
  // Drop your résumé PDF into assets/resume/ and point this at it.
  resumeFile: "assets/resume/Maaz Naseer Resume-2.pdf"
};
