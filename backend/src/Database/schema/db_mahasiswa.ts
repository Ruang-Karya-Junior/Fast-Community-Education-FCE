import { text, pgTable, timestamp,uuid } from 'drizzle-orm/pg-core';

export const db_mahasiswa = pgTable('db_mahasiswa', {
    id: uuid('id_mahasiswa').primaryKey(),
    nim: text('nim').notNull().unique(),
    nama: text('nama').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),

    alamat: text('alamat'),
    noTelepon: text('no_telepon'),
    jenisKelamin: text('jenis_kelamin'),
    tempatLahir: text('tempat_lahir'),
    tanggalLahir: timestamp('tanggal_lahir', { mode: 'date' }),

    prodi: text('prodi').notNull(),
    fakultas: text('fakultas').notNull(),
    angkatan: text('angkatan').notNull(),

    status: text('status').notNull().default('aktif'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});