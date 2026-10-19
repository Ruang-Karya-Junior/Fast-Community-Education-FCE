import { eq } from "drizzle-orm";
import { Conn } from "../Database/database";
import { db_mahasiswa } from "../Database/schema/db_mahasiswa";

const db = Conn().get_database();

export class MahasiswaModel {
    static async GetAll() {
        return await db.select().from(db_mahasiswa);
    }

    static async GetByNim(nim: string) {
        const [mahasiswa] = await db
            .select()
            .from(db_mahasiswa)
            .where(eq(db_mahasiswa.nim, nim));

        return mahasiswa ?? null;
    }

    static async GetByEmail(email: string) {
        const [mahasiswa] = await db
            .select()
            .from(db_mahasiswa)
            .where(eq(db_mahasiswa.email, email));

        return mahasiswa ?? null;
    }

    static async GetById(id: string) {
        const [mahasiswa] = await db
            .select()
            .from(db_mahasiswa)
            .where(eq(db_mahasiswa.id, id));

        return mahasiswa ?? null;
    }

    static async Create(data: typeof db_mahasiswa.$inferInsert) {
        const [mahasiswa] = await db
            .insert(db_mahasiswa)
            .values(data)
            .returning();

        return mahasiswa;
    }

    static async Update(
        id: string,
        data: Partial<typeof db_mahasiswa.$inferInsert>
    ) {
        const [mahasiswa] = await db
            .update(db_mahasiswa)
            .set(data)
            .where(eq(db_mahasiswa.id, id))
            .returning();

        return mahasiswa ?? null;
    }

    static async Delete(id: string) {
        const [mahasiswa] = await db
            .delete(db_mahasiswa)
            .where(eq(db_mahasiswa.id, id))
            .returning({ id: db_mahasiswa.id });

        return mahasiswa ?? null;
    }
}