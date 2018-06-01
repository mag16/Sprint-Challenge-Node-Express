const express = require('express');
const db = require('./data/helpers/actionModel.js');
const db1 = require('./data/helpers/mappers.js');
const db2 = require('./data/helpers/projectModel.js');


const projects = require('./data/helpers/projectModel.js');
const actions = require('./data/helpers/actionModel.js');


const port = 5000;
const server = express();
server.use(express.json());
server.use(log);
server.use(cors({ origin: 'http://localhost:3000' }));

const myLogger = (req, res, next) => {
    const ua = req.headers['user-agent'];
    const { path } = req;
    const timeStamp = Date.now();
    const log = { ua, path, timeStamp };
    const stringLog = JSON.stringify(log);

    console.log(stringLog);

    next();
}

server.use(myLogger);


//GET
server.get(`/api/projects`, (req, res) => {
    projects
        .findByid(id)
        .then(projects => {
            if (projects.length === 0) {
                res.status(404).json({ message: 'project not found' });
            } else {
                res.json(projects[0]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

});


//POST
server.post('/api/projects', (req, res) => {
    const { name, descriptions } = req.body;
    db
        .insert({ name, descriptions })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            sendUserError(500, 'The projects information could not be retrieved.', res);
            return;
        });
});

//PUT

server.put('api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    projects
        .update(id, { description });
        .then(response => {
        if (response === 0) {
            sendUserError(404, 'The project with the specified ID does not exist.', res);
            return;
        }
        db
            .findById(id)
            .then(foundProject => {
                project = { ...foundProject[0] };

                db.remove(id).then(response => {
                    res.status(200).json(project);
                });
            });
    })
        .cath(error => {
            sendUserError(500, 'Internal Server Error ', res);
            return;
        });
    



});


//DELETE

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(404).json({ errorMessage: 'Project does not exist' });
            } else {
                res.status(201).json({ message: 'Deleted!!!' });
            }

        })
        .catch(err => {
            console.log(err);
        })

})
















server.listen(port, () => console.log(`Server running on port ${port}`));
