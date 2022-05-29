const express = require('express');
const { uuid } = require('uuidv4');

const app = express();
app.use(express.json());

const projects = [];

function logRoutes(request, response, next) {
    const { method, url } = request;
    const route = `[${method}] ${url}`;
    console.info(route)

    return next();
};

//app.use(logRoutes);

app.get('/projects', logRoutes,(request, response) => {
    const { title, owner } = request.query;
    const results = title ? projects.filter(p => p.title.includes(title)) : projects;
   return response.json(results);
});

app.get('/projects/:id', (request, response) => {
    const { id } = request.params;
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex < 0) {
        return response.status(404).json({error: 'Project not found.'});

    }

    projects[projectIndex]

    return response.json(projects[projectIndex]);
});


app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const id = uuid();
    const project = {
        id,
        title,
        owner
    };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex < 0) {
        return response.status(404).json({error: 'Project not found.'});

    }

    projects[projectIndex] = {id, title, owner}

    return response.json();
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex < 0) {
        return response.status(404).json({error: 'Project not found.'});

    }

    projects.splice(projectIndex, 1);

    return response.json({});
});

app.listen(3333, () => {
    console.log('App init :)');
});
