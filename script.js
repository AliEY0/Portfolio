const copyButton = document.getElementById("copy-link");
const copyFeedback = document.getElementById("copy-feedback");
const projectsGrid = document.getElementById("projects-grid");

const projects = [
  {
    id: "01",
    type: "Project",
    title: "Portfolio site",
    description: "De plek voor je hoofdproject of de site waar je het meest trots op bent.",
    href: "#work",
    cta: "Later invullen",
    live: false,
  },
  {
    id: "02",
    type: "Project",
    title: "Webapp",
    description: "Voor een kleine webapp, dashboard of tool.",
    href: "#work",
    cta: "Binnenkort",
    live: false,
  },
  {
    id: "03",
    type: "Project",
    title: "Schoolopdracht",
    description: "Een goed vak voor een sterk project uit je opleiding.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "04",
    type: "Project",
    title: "Prototype",
    description: "Voor iets kleins dat goed laat zien hoe je werkt.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "05",
    type: "Project",
    title: "Landing page",
    description: "Een nette plek voor een visueel of commercieel project.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "06",
    type: "Project",
    title: "UI oefening",
    description: "Voor een interface-oefening of redesign van een bestaand idee.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "07",
    type: "Project",
    title: "Game concept",
    description: "Kan gebruikt worden voor een game, level of interactief experiment.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "08",
    type: "Project",
    title: "Case study",
    description: "Voor een project waar je ook je proces kort wil tonen.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "09",
    type: "Project",
    title: "Tool",
    description: "Een eenvoudige tool of utility past hier goed in.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "10",
    type: "Project",
    title: "Experiment",
    description: "Voor iets nieuws dat nog niet af is, maar wel interessant genoeg om te tonen.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "11",
    type: "Project",
    title: "Code project",
    description: "Een technische build of klein programmeerproject kan hier komen.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
  {
    id: "12",
    type: "Project",
    title: "Nog open",
    description: "Dit vak blijft vrij voor iets dat later nog toegevoegd wordt.",
    href: "#work",
    cta: "Vrij vak",
    live: false,
  },
];

function renderProjects() {
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-square" data-state="${project.live ? "live" : "slot"}">
          <div class="project-square-top">
            <span class="project-square-index">${project.id}</span>
            <span class="project-square-type">${project.type}</span>
          </div>
          <div class="project-square-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
          <a
            class="project-square-link${project.live ? " is-live" : ""}"
            href="${project.href}"
            ${project.live ? 'target="_blank" rel="noreferrer"' : ""}
          >
            ${project.cta}
          </a>
        </article>
      `
    )
    .join("");
}

function showContactPlaceholder() {
  copyFeedback.textContent = "Hier kan later e-mail, LinkedIn of telefoon komen.";
}

renderProjects();

if (copyButton) {
  copyButton.addEventListener("click", showContactPlaceholder);
}
