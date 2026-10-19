
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';

export default class Database {
    private db;

    constructor(url: string) {
        this.db = drizzle(url);
    }

    async check(){
        try {
            await this.db.execute(sql`SELECT 1`);
            console.log("succses")
        } catch {
            console.log("error")
        }
    }

    get_database() {
        return this.db;
    }
}

export function Conn(): Database { return new Database(process.env.DATABASE_URL!);}