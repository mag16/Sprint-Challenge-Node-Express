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
server.get('/api/projects', (req, res) => {
    db    
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

server.get('/api/actions', (req, res) => {
    db2
        .find()
        .then(actions => {
            res.json({ actions });
        })
        .catch(error => {
            res.json({ error });
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

server.post('/api/actions', (req, res) => {
    db2
    const { changes } = req.body;
    if (!changes) {
        res.status(400).json({ errorMessage: 'No changes brother/sister' });

    }
    actions
        .insert({ changes })
        .then(id => {
            res.status(201).send(id)
        })
        .catch(err => {
            console.log(err)
        })

})


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

server.put('api/actions/:id', (req, res) => {
    const { id } = req.params;
    const { changes } = req.body;
    users
        .update(id, { changes });
    
        .then(count => {
        if (count !== 1) {
            res.status(400).json({ errorMessage: 'Not Update' });
        } else {
            res.status(201).json({ id, changes });
        }

    });
        .cath(error => {
        console.log(error);
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

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
        .remove(id)
        .then(count => {
            if (count === 0) {
                res.status(404).json({ errorMessage: 'Not FOUND' });
            } else {
                res.status(201).json({ message: 'Deleted' });
            }

        })
        .catch(err => {
            console.log(err);
        })

})


server.listen(port, () => console.log(`Server running on port ${port}`));
