const express = require("express");
const cors = require("cors");
const projectsdb = require("./data/helpers/projectModel");
const actionsdb = require("./data/helpers/actionModel");
const port = 5000;

const server = express();
server.use(express.json());
server.use(cors({}));

//GET for Projects and Actions
server.get("/api/projects", (req, res) => {
  projectsdb
    .get()
    .then(projects => {
      if (projects.length === 0) {
        res.status(404).json({ message: "project not found" });
      } else {
        res.json(projects[0]);
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

server.get("/api/actions", (req, res) => {
  actionsdb
    .get()
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving actions" });
    });
});

// ***Retrieve the list of actions for a project.***
server.get("/api/projects/:id/actions", (req, res) => {
  const { id } = req.params;
  projectsdb
    .getProjectActions(id)
    .then(projectsActs => {
      res.status(200).json(projectsActs);
    })
    .catch(error => {
      res.status(500).json({
        error: `Internal Server Error:  Unable to reach database for project with provided id ${id}`
      });
    });
});

//POST for Projects and Actions
server.post("/api/projects", (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description ||!completed) {
    res.status(400).json({
      errorMessage: "Error: Name and Description of Project must be provided."
    });
  } else {
    projectsdb
      .insert({ name, description, completed })
      .then(projects => {
        res.status(200).json(projects);
      })

      .catch(error => {
        res
          .status(500)
          .json({ error: "The projects information could not be retrieved" });
      });
  }
});

server.post("/api/actions", (req, res) => {
  //actionsdb
  const { name, description, completed, notes } = req.body;
  if (!name || !description ||!completed ||!notes) {
    res
      .status(400)
      .json({ errorMessage: "No changes recorded for this project" });
  }
  actionsdb
    .insert({ name, description, completed, notes })
    .then(id => {
      res.status(201).send(id);
    })
    .catch(err => {
      console.log(err);
    });
});

//PUT for Projects and Actions

server.put("api/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Error: The projects information could not be retrieved."
    });
  } else {
    projectsdb
      .update(id, { name, description, completed })
      .then(project => {
        res.status(200).json({ project });
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: `Error: Internal Server Error.  Cannot retrieve project with id ${id}`
        });
      });
  }
});

server.put("api/actions/:id", (req, res) => {
  const { id } = req.params;
  const { description, notes, completed } = req.body;
  if (!description|| !notes) {
    res.status(400).json({errorMessage:"Error: The actions information could not be retrieved."});
  } else {
  actionsdb
    .update(id, { description, notes, completed })

    .then(count => {
      if (count !== 1) {
        res.status(400).json({ errorMessage: "Not Update" });
      } else {
        res.status(201).json({ id, changes });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Error: Internal Server Error." });
    });
  }
});

//DELETE for Projects and Actions

server.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  projectsdb
    .remove(id)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ errorMessage: "Project does not exist" });
      } else {
        res.status(201).json({ message: "Project Deleted!!!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: `Error: Cannot delete project with id ${id}` });
    });
});

server.delete("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  actionsdb
    .remove(id)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ errorMessage: "Actions Not FOUND" });
      } else {
        res.status(201).json({ message: "Actions Deleted!!!" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `Error: Cannot delete actions with id ${id}` });
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
