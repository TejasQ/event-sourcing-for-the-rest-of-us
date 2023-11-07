import { sql } from "./db";
import { consumer } from "./kafka";

(async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "todo-events", fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ message }) => {
            const { type, payload } = JSON.parse(message.value.toString());
            console.log('Received', { type, payload });
            switch (type) {
                case "ADD_TODO":
                    await sql`INSERT INTO todos(title) VALUES('${payload}')`;
                    return;
                case "TOGGLE_TODO":
                    try {
                        await sql`UPDATE todos SET completed = '${(payload.completed)}' WHERE id = '${payload.id}';`;
                    } catch (e) {
                        console.error({ e })
                    }
                    return;
            }
        },
    })
})()