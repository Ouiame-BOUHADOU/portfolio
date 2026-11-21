const projects = {
  soc: { kicker:'INTERNSHIP PROJECT · NOVEC · JUN–JUL 2026', title:'Open-Source SOC / SIEM / NDR Proof of Concept', summary:'A practical SOC proof of concept combining security monitoring, network detection and orchestration components.', points:['Designed and deployed a SOC PoC integrating SIEM, NDR and SOAR technologies.','Configured Wazuh, Suricata and Zeek, developed custom detection rules and validated simulated attack scenarios.','Automated security alert handling with Shuffle, MISP and TheHive, including Wazuh Active Response.'], tech:['Wazuh','Suricata','Zeek','Shuffle','MISP','TheHive'],note:'Internship project completed at NOVEC. The visual artwork is illustrative, not a screenshot of an actual SOC environment.'},
  risk: {kicker:'ACADEMIC PROJECT · FEB–MAY 2026',title:'Human Cybersecurity Risk Assessment Platform',summary:'A behavioral cybersecurity platform focused on evaluating human-related security risks.',points:['Developed a platform for assessing human-related cybersecurity risks.','Integrated phishing simulations and security modules involving Honeytokens, Shadow AI DLP and Zero-Knowledge Authentication.'],tech:['Human Risk','Phishing','Honeytokens','Shadow AI DLP'],note:'Academic project. Screens and graphics on this site are conceptual illustrations.'},
  identity: {kicker:'ACADEMIC PROJECT · IDENTITY & ACCESS',title:'OAuth 2.0 & OpenID Connect — Secure Web Application',summary:'Practical exploration of identity and access mechanisms across a React frontend, Spring Boot backend and Keycloak.',points:['Worked on integrating Keycloak into a React and Spring Boot application.','Explored OAuth 2.0, OpenID Connect, token-based authentication and access control.'],tech:['React','Spring Boot','Keycloak','OAuth 2.0','OpenID Connect'],note:'Only functionality supported by project information is described here.'},
  
secureincident: {
  kicker: 'CYBERSECURITY · SECURE WEB APPLICATION',
  title: 'SecureIncident — IT Incident Management Platform',
  summary: 'A full-stack platform for managing IT incidents with secure authentication, role-based authorization, and structured workflows.',
  points: [
    'Developed a React frontend and Spring Boot REST API with MySQL persistence.',
    'Implemented JWT authentication, BCrypt password hashing, and role-based access control for employees, technicians, and administrators.',
    'Built incident reporting, assignment, status management, comments, and action history.',
    'Enforced permissions and workflow transitions on the backend using Spring Security.'
  ],
  tech: [
    'Java',
    'Spring Boot',
    'Spring Security',
    'JWT',
    'BCrypt',
    'React',
    'MySQL',
    'REST APIs'
  ],
  note: 'Full-stack IT incident management project with an emphasis on application security and authorization.'
},

  biometric: {kicker:'ACADEMIC GROUP PROJECT · IN PROGRESS',title:'Secure Multimodal Biometric Authentication System',summary:'Planned secure REST backend for identity verification and identification using face, fingerprint and voice biometrics.',points:['Design a modular REST backend for enrollment, feature extraction, authentication (1:1) and identification (1:N).','Address encryption, access controls, secure communications, audit logging, data minimization and retention.','Plan evaluation of decision thresholds and FAR, FRR and EER where applicable.'],tech:['Biometrics','REST APIs','Privacy','Identity Management'],note:'In progress / planned scope: listed items are project objectives, not claimed completed implementations.'},
  audit: {kicker:'ACADEMIC GROUP PROJECT · IN PROGRESS',title:'Information Security Audit, Risk Management & Digital Law',summary:'Audit and ISMS methodology exercise for a fictional biotechnology company.',points:['Define audit scope and methodology and assess technical, organizational, human and legal risks.','Study ISMS, ISO/IEC 27001, Moroccan data protection requirements, GDPR and cybersecurity ethics.','Prepare a structured audit report covering risk analysis, findings and recommendations.'],tech:['GRC','ISMS','ISO/IEC 27001','Audit Planning','Risk Assessment'],note:'In progress / planned scope. The organization in the exercise is fictional.'},
  bash: {kicker:'SOFTWARE & AUTOMATION',title:'BashOrchestrator — Linux Script Automation Tool',summary:'A modular Linux command-line tool for centralizing Bash script operations.',points:['Developed a Bash CLI for managing and executing scripts in sequential and parallel modes.','Added scheduling with Cron, execution logging and modular script management.'],tech:['Bash','Linux','Cron','Git'],note:'Completed academic/development project.'},
  productivity: {kicker:'PYTHON & DATA APPLICATION',title:'Student Productivity & Focus Prediction',summary:'A Flask web application to track daily habits and estimate focus scores.',points:['Developed a web application for tracking study time and other productivity-related habits.','Implemented a linear regression model for focus-score estimation.','Added dashboards, visualizations and PDF report generation.'],tech:['Python','Flask','Pandas','NumPy','SQLite'],note:'The model is an academic exercise; no validated prediction accuracy is claimed.'},
  expenses: {kicker:'JAVA DESKTOP APPLICATION',title:'Personal Expense Management Application',summary:'Desktop application for organizing personal income and expenses.',points:['Built income and expense tracking, filtering, budget monitoring and data charts.','Added rule-based spending recommendations and CSV/PDF exports.'],tech:['Java','JavaFX','SQLite','Maven'],note:'Completed development project.'},

collaboration: {
  kicker: 'ACADEMIC GROUP PROJECT · FEB–MAY 2025',
  title: 'Collaborative Student Project Management Platform',
  summary: 'A collaborative web application supporting the organization and tracking of student projects.',
  points: [
    'Built a collaborative web application for project planning and coordination.',
    'Implemented document sharing and messaging features.',
    'Supported tracking of team member contributions.'
  ],
  tech: [
    'Web Development',
    'Project Planning',
    'Collaboration',
    'Document Sharing'
  ],
  note: 'Academic team project developed collaboratively. Source repository is hosted on a teammate’s GitHub account.'
}

};

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
const projectCount = document.getElementById('project-count');

projectCount.textContent = cards.length;
for (const button of filterButtons) {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filterButtons.forEach(item => {const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected));});
    cards.forEach(card => {card.hidden = value !== 'all' && !card.dataset.category.split(' ').includes(value);});
  });
}

const dialog = document.getElementById('project-dialog');
const dialogClose = document.getElementById('dialog-close');
let previousFocus = null;
for (const button of document.querySelectorAll('[data-open]')) {
  button.addEventListener('click', () => {
    const data = projects[button.dataset.open];
    if (!data) return;
    previousFocus = button;
    document.getElementById('dialog-kicker').textContent = data.kicker;
    document.getElementById('dialog-title').textContent = data.title;
    document.getElementById('dialog-summary').textContent = data.summary;
    const points = document.getElementById('dialog-points');
    points.replaceChildren(...data.points.map(item => { const element = document.createElement('li'); element.textContent = item; return element;}));
    const technologies = document.getElementById('dialog-tech');
    technologies.replaceChildren(...data.tech.map(item => {const element = document.createElement('span'); element.textContent = item; return element;}));
    document.getElementById('dialog-note').textContent = data.note;
    if (typeof dialog.showModal === 'function') {dialog.showModal(); document.body.classList.add('dialog-open');}
  });
}
dialogClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); previousFocus?.focus(); });

const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('main-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
  menu.classList.toggle('open', !expanded);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation menu');}));
const currentYear = document.getElementById('year');
currentYear.textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const links = [...menu.querySelectorAll('a')];
  const sections = [...document.querySelectorAll('section[id]')];
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => links.forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === '#' + entry.target.id)));
  },{rootMargin:'-25% 0px -60% 0px'});
  sections.forEach(section => observer.observe(section));
}
