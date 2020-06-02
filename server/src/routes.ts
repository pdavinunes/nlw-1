import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({status: "running"})
})

export default routes;