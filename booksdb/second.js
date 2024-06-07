import db from "./script.js";
const contents = db.exec("SELECT * FROM books");
console.log(contents);
