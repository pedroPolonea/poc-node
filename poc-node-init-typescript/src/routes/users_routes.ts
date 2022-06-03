import { request, response, Router } from "express";
import connection from "../database/connection";
import { hash } from 'bcryptjs';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
    const user = await connection('users').select('*');
    return response.json(user);
});

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const passwordHash = await hash(password, 8);

    const newIds = await connection('users').insert({
        name,
        email,
        password: passwordHash
    });


    return response.json({
        id: newIds[0],
        name,
        email,
        password: passwordHash
    });
});

 export default usersRouter;