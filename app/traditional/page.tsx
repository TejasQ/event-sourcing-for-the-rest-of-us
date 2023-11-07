import { redirect } from "next/navigation";
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
            model="traditional"
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
          const newTodo = formData.get("newTodo");
          sql`INSERT INTO todos (title, completed) VALUES ('${newTodo}', false);`;
          return redirect("/traditional");
        }}
      >
        <input type="text" name="newTodo" />
        <button>Save</button>
      </form>
    </div>
  );
}
