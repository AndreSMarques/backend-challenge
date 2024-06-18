import { FastifyInstance, fastify } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function registerUser(app: FastifyInstance) {
    app.post("/register", async (request, reply) => {
        //username
        //password

        // validando pra ver se está de acordo com o que vai ser salvo no banco 
        const registerUserBody = z.object({
            username: z.string(),
            password: z.string()
        })

        const {username, password} = registerUserBody.parse(request.body);

        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        })
        return reply.status(201).send({ message: "Usuário registrado com sucesso"});
    })
}