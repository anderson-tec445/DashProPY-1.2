const projectList = document.getElementById('project-list');
const projectFrame = document.getElementById('project-frame');
const projectDescription = document.getElementById('project-description');

async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
    }
}

function displayProjects(projects) {
    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.name;

        listItem.addEventListener('click', () => displayProjectDetails(project));
        projectList.appendChild(listItem);
    });
}

function displayProjectDetails(project) {
    const homepage = project.homepage;
    if (homepage) {
        projectFrame.src = homepage;
        projectDescription.textContent = project.description || 'Sem descrição disponível.';
    } else {
        projectFrame.src = '';
        projectDescription.textContent = 'Este projeto não possui uma página pública configurada.';
    }
}

fetchProjects();
