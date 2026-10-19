
import { eq } from "drizzle-orm";
import { Conn } from "../Database/database";
import { db_admin } from "../Database/schema/db_admin";

const db = Conn().get_database();

export class AdminModel {
    static async GetAll() {
        return await db.select().from(db_admin);
    }

    static async GetByUsername(username: string) {
        const [admin] = await db
            .select()
            .from(db_admin)
            .where(eq(db_admin.ussername, username));

        return admin ?? null;
    }


    static async GetById(id: string) {
        const [admin] = await db
            .select()
            .from(db_admin)
            .where(eq(db_admin.id, id));

        return admin ?? null;
    }

    static async Create(data: typeof db_admin.$inferInsert) {
        const [admin] = await db
            .insert(db_admin)
            .values(data)
            .returning();

        return admin;
    }

    static async Update(
        id: string,
        data: Partial<typeof db_admin.$inferInsert>
    ) {
        const [admin] = await db
            .update(db_admin)
            .set(data)
            .where(eq(db_admin.id, id))
            .returning();

        return admin ?? null;
    }

    static async Delete(id: string) {
        const [admin] = await db
            .delete(db_admin)
            .where(eq(db_admin.id, id))
            .returning({ id: db_admin.id });

        return admin ?? null;
    }
}
