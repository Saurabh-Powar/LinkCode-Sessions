const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();
const Sql = require('./Sql.js');
const { error } = require('console');

app.use(express.json());
app.use(express.static('public'));

app.get('/hello', (req, res) => {
    res.status(200).json({ msg: 'Hello World' });
});


//add a task
app.post('/tasks', async (req, res, next) => {
    try {
        if (!req.body.newTask) {
            res.status(400).json({
                message: 'Please give task in newTask'
            });
            throw error;
        }

        await Sql`INSERT INTO tasks (TASK) VALUES (${req.body.newTask})`;
        const tasks = await Sql`SELECT * FROM tasks`;
        res.status(200).json({
            message: 'Task added successfully',
            tasks: tasks
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
        });
        next(error);
    }
});

//get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Sql`SELECT * FROM Tasks ORDER BY ID ASC`;
        res.status(200).json({Tasks: tasks});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.delete('/tasks', async (req, res, next) => {
    try {
        if (!req.body.tname) {
            res.status(400).json({
                message: `Please provide taskname in {"tname": "Taskname"} to delete`
            });
            return;
        }
        const tasks = await Sql`SELECT * FROM Tasks ORDER BY ID DESC`;
        await Sql`DELETE FROM Tasks WHERE TASK = ${req.body.tname}`;
        // Reset the auto-increment counter for the ID column
        await Sql`SELECT setval('Tasks_ID_seq', COALESCE(MAX("id"), 0) + 1, false) FROM Tasks`;
        res.status(200).json({
            message: `Task '${req.body.tname}' deleted successfully`,
            tasks: tasks
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
        next(error);
    }
});

    app.delete("/tasks/:idOrtName", async (req, res) => {
        const { idOrtName } = req.params;
        if (!idOrtName) {
            return res.status(400).json({ error: "Either Task ID or Task name is required" });
        }
        try {
            let result;
            if (!isNaN(idOrtName)) {
                result = await Sql`DELETE FROM tasks WHERE id = ${idOrtName}`;
            } else {
                result = await Sql`DELETE FROM tasks WHERE TASK = ${idOrtName}`;
            }

            if (result.count === 0) {
                return res.status(404).json({ error: "Task not found" });
            }

            // Reorder IDs after deletion
            await Sql`
                WITH reordered AS (
                    SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS new_id
                    FROM tasks
                )
                UPDATE tasks
                SET id = reordered.new_id
                FROM reordered
                WHERE tasks.id = reordered.id
            `;
            await Sql`SELECT setval('tasks_id_seq', COALESCE(MAX(id), 0) + 1, false) FROM tasks`;

            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error("Error in deleting task:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    app.delete('/taskBase', async (req, res, next) => {
        try {
            if (!req.body) {
                res.status(400).json({
                    message: 'Please check if Task table exists to clear all tasks'
                });
                return;
            }
            // DELETE FROM Users WHERE name = 'Saurabh' AND age = 21
            await Sql`TRUNCATE TABLE Tasks RESTART IDENTITY;`;
            res.status(200).json({
                message: 'All tasks deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message
            });
        }
    });

// Update a task
app.put('/tasks/:id', async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body.newTask;

        // Validate input
        if (!updatedTask) {
            res.status(400).json({
                message: 'Please provide the updated task in this format= {"newTask": "Updated Task"}'
            });
            return;
        }

        // Update the task in the database
        const result = await Sql`UPDATE Tasks SET TASK = ${updatedTask} WHERE id = ${taskId}`;

        // Check if the task was updated
        if (result.count === 0) {
            res.status(404).json({
                message: `Task with ID ${taskId} not found`
            });
            return;
        }

        res.status(200).json({
            message: `Task with ID ${taskId} updated successfully`,
            redirect: '/tasks'
        });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message
        });
        next(error);
    }
});

app.post('/users', async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.age) {
            res.status(400).json({
            message: 'Please provide name and age in Users'
            });
            return;
        }

        await Sql`INSERT INTO Users (NAME, AGE) VALUES (${req.body.name}, ${req.body.age})`;
        res.status(200).json({
            message: 'User added successfully'
        });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
    next();
});

// get all users
app.get('/users', async (req, res) => {
    try {
        const users = await Sql`SELECT * FROM Users`;
        res.setHeaders
        res.status(200).json({Users: users});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.delete('/users', async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(400).json({
            message:`Please provide username in {"name": "username"} to delete`
            });
            return;
        }
        // DELETE FROM Users WHERE name = 'Saurabh'
        await Sql`DELETE FROM Users WHERE name = ${req.body.name}`;
        // Reset the auto-increment counter for the ID column
        await Sql`SELECT setval('Users_ID_seq', COALESCE(MAX("id"), 0) + 1, false) FROM Users`;
        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
        next(error);
    }
});

app.delete('/userTable', async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(400).json({
            message: 'Please check if Users exists to clear all users'
            });
            return;
        }
        // DELETE FROM Users WHERE name = 'Saurabh' AND age = 21
        await Sql`TRUNCATE TABLE IF EXISTS Users RESTART IDENTITY;`;
        res.status(200).json({
            message: 'Userbase is destroyed successfully'
        });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
        next(error);
    }
});

module.exports = app;

app.listen(PORT, () => {
    console.log(`Express server started on http://localhost:${PORT}`);
});