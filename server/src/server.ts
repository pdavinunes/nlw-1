import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    response.json({"status": "running!"})
});

app.listen(3333);