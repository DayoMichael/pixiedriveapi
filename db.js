//const Pool = require("pg").Pool
import pg from 'pg'
const Pool =pg.Pool;
export const pool = new Pool({
    user: "postgres",
    password: "nifemi",
    database: "pixiedrive",
    host: "localhost",
    port: 5432
})

//module.exports = pool;