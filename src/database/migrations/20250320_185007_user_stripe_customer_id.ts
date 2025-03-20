import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "stripe_customer_id" varchar;
  CREATE UNIQUE INDEX IF NOT EXISTS "users_stripe_customer_id_idx" ON "users" USING btree ("stripe_customer_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "users_stripe_customer_id_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "stripe_customer_id";`)
}
