function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function addProjectClickListeners() {
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
      project.addEventListener('click', () => {
          project.style.backgroundColor = getRandomColor();
      });
  });
}


function updateContent(lang) {
  const data = languageData.languages[lang];

  document.getElementById('pageTitle').textContent = data.title;
  document.getElementById('headerName').textContent = data.header.name;
  document.getElementById('headerProfession').textContent = data.header.profession;

  const navList = document.getElementById('navList');
  navList.innerHTML = '';
  const navMapping = {
    'About': 'about',
    'Projects': 'projects',
    'Skills': 'skills',
    'Contact': 'contact',
    'Sobre': 'about',
    'Projetos': 'projects',
    'Habilidades': 'skills',
    'Contato': 'contact'
  };
  
  data.nav.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${navMapping[item] || item.toLowerCase()}`;
    a.textContent = item;
    li.appendChild(a);
    navList.appendChild(li);
  });

  document.getElementById('aboutTitle').textContent = data.about.title;
  document.getElementById('aboutContent').textContent = data.about.content;

  document.getElementById('projectsTitle').textContent = data.projects.title;
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';
  data.projects.list.forEach(project => {
      const div = document.createElement('div');
      div.className = 'project';
      div.innerHTML = `
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">${project.title}</a>
      `;
      projectsList.appendChild(div);
  });

  document.getElementById('skillsTitle').textContent = data.skills.title;
  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = '';
  data.skills.list.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill';
      div.textContent = skill;
      skillsList.appendChild(div);
  });

  document.getElementById('contactTitle').textContent = data.contact.title;
  const contactInfo = document.getElementById('contactInfo');
  contactInfo.innerHTML = '';
  ['email', 'linkedin', 'github'].forEach(item => {
    const div = document.createElement('div');
    div.className = 'contact-item';
    
    let linkHref, linkTarget;
    if (item === 'email') {
        linkHref = `mailto:${data.contact[item].value}`;
        linkTarget = '_self';
    } else {
        linkHref = data.contact[item].value;
        linkTarget = '_blank';
    }
    
    div.innerHTML = `
        <h3>${data.contact[item].title}</h3>
        <a href="${linkHref}" target="${linkTarget}">${data.contact[item].value}</a>
    `;
    
    contactInfo.appendChild(div);
  });

  addProjectClickListeners();

}

document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('languageSelector');
  languageSelector.addEventListener('change', (e) => {
      updateContent(e.target.value);
  });

  // Initial content update
  updateContent('en');


  addProjectClickListeners();

  // Project click event for random background color
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
      project.addEventListener('click', () => {
          project.style.backgroundColor = getRandomColor();
      });
  });
});