import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./local.db");
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY,
            title TEXT,
            completed BOOLEAN
        );
    `);
})

export const sql = (strings: TemplateStringsArray, ...values: any[]) => new Promise((resolve, reject) => {
    const db = new sqlite3.Database("./local.db");
    let str = '';
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });

    if (str.startsWith('SELECT')) {
        db.all(str, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
        return;
    }

    db.serialize(() => {
        db.run(str, err => {
            if (err) { reject(err); return; }
            resolve(true)
        })
    })

})
