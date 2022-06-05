import { request, response, Router } from "express";
import connection from "../database/connection";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from "../config/auth";

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { email, password } =request.body;

    const user = await connection('users').where('email', email).first();

    if (!user) {
        return response.status(400).json('Usuário não encontrado');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        return response.status(400).json('Usuário ou senha incorreto');
    }

    const token = sign({}, authConfig.jwt.secret, {
        subject: String(user.id), 
        expiresIn: authConfig.jwt.expiresIn
    })

    return response.json({
        id: user.id,
        name: user.name,
        token
    });
});

 export default sessionsRouter;