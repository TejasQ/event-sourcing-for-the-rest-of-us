import { redirect } from "next/navigation";
import { producer } from "../../kafka";
import { sql } from "../../db";
import { ListItem } from "../ListItem";

export default async function Page() {
  const rows: any = await sql`SELECT * FROM todos;`;

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {rows.map((r) => (
          <ListItem
            model="event-sourced"
            id={r.id}
            completed={r.completed}
            key={r.id}
          >
            {r.title}
          </ListItem>
        ))}
      </ul>
      <form
        action={async (formData) => {
          "use server";

          await producer.connect();
          const type = "ADD_TODO";
          const payload = formData.get("newTodo").toString();

          await producer.send({
            topic: "todo-events",
            messages: [{ value: JSON.stringify({ type, payload }) }],
          });

          return redirect("/event-sourced");
        }}
      >
        <input type="text" name="newTodo" />
        <button>Save</button>
      </form>
    </div>
  );
}
