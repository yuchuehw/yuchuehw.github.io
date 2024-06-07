let config = {
  locateFile: () => "https://sql.js.org/dist/sql-wasm.wasm",
};
const sqlPromise = initSqlJs(config);
const dataPromise = fetch("./db/dummy_dataset.db").then(res => res.arrayBuffer());
const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
const db = new SQL.Database(new Uint8Array(buf));
export default db;
