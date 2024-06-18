import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

interface QueryParams {
    page?: string;
    limit?: string;
}


export async function getTask(app: FastifyInstance){

    app.get<{ Querystring: QueryParams }>("/task", async (request, reply) => {
        const page: number = parseInt(request.query.page ?? '1', 10);
        const limit: number = parseInt(request.query.limit ?? '10', 10);
        const skip: number = (page - 1) * limit;

        // Buscar tarefas com paginação
        const tasks = await prisma.task.findMany({
            skip,
            take: limit
        });

        // Contar o número total de tarefas
        const totalTasks = await prisma.task.count();
        const totalPages = Math.ceil(totalTasks / limit);

        // Formatar a resposta
        const response = {
            tasks,
            pagination: {
                page,
                limit,
                totalPages,
                totalTasks
            }
        };

        return reply.status(200).send(response);
    });

    app.get("/task/:TaskId", async (request, reply) => {
        const getTaskParam = z.object ({
            TaskId: z.string().uuid()
        })

        const { TaskId } = getTaskParam.parse(request.params);

        const task = await prisma.task.findUnique({
            where: {
                id: TaskId
            }
        })
        return reply.status(200).send(task)
    })
}