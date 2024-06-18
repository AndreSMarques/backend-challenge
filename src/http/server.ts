import fastify from "fastify";
import { registerUser } from "./routes/register-user";
import { createTask } from "./routes/create-task";
import { getTask } from "./routes/get-task";
import { uptadeTask } from "./routes/update-task";
import { deleteTask } from "./routes/delete-task";

const app = fastify();

app.register(registerUser);
app.register(createTask);
app.register(getTask);
app.register(uptadeTask);
app.register(deleteTask);

app.listen({ port:3333 }).then(() => {
    console.log("HTTP server running");
})