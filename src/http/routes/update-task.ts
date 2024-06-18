import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";

export async function uptadeTask(app: FastifyInstance) {
    app.put("/task/:taskId", async (request, reply) => {
        const getTaskParam = z.object({
            taskId: string().uuid()
        })

        const getTaskbody = z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            status: z.string().optional()
        })

        const { taskId } = getTaskParam.parse(request.params);
        const { title, description, status } = getTaskbody.parse(request.body);

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })

        if (!task) {
            return reply.code(404).send("Task not found");
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                title: title,
                description: description,
                status: status
            }
        })
        return reply.status(200).send(updatedTask);
    })
}
