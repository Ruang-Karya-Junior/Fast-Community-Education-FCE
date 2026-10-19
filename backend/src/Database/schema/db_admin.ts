import { text, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const db_admin = pgTable('db_admin', {
    id: uuid('id_admin').primaryKey(),
    name: text('name'),
    ussername: text('username'),
    password: text('password').unique(),
    level: text('level'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});