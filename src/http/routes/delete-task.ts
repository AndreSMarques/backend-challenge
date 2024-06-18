import { FastifyInstance} from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma"

export async function deleteTask(app: FastifyInstance){
    app.delete("/task/:taskId", async (request, reply) => {

        const getTaskParam = z.object ({
            taskId: z.string().uuid()
        })

        const { taskId } = getTaskParam.parse(request.params);

        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        })

        if (!task) {
            return reply.code(404).send("Task not found");
        }

        await prisma.task.delete ({
            where: {
                id: taskId
            }
        })
        reply.code(200).send({ message: "Tarefa deletada com sucesso" });
    })
}