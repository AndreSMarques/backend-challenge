import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createTask (app: FastifyInstance) {
    app.post("/task", async (request, reply) => {


        const createTaskBody = z.object({
            title: z.string(),
            description: z.string(),
            status: z.string()
        })

        const {title, description, status} = createTaskBody.parse(request.body);

        const task = await prisma.task.create({
           data: {
                title, 
                description,
                status
           } 
        })
        return reply.status(201).send(task)
    })

}