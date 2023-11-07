"use server";

import { redirect } from "next/navigation";
import { producer } from "../kafka";
import { sql } from "../db";

export async function toggleEventSourcedCheckbox({ completed, id }) {
    await producer.connect();
    const type = "TOGGLE_TODO";
    const payload = { completed: !completed, id };
    await producer.send({
        topic: "todo-events",
        messages: [{ value: JSON.stringify({ type, payload }) }],
    });
    redirect("/event-sourced");
}

export async function toggleTraditionalCheckbox({ completed, id }) {
    await sql`UPDATE todos SET completed = '${!completed}' WHERE id = '${id}';`;
    redirect("/traditional");
}