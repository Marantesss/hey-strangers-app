import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "games" ADD COLUMN "stripe_product_id" varchar;
  ALTER TABLE "registrations" ADD COLUMN "stripe_payment_intent_id" varchar NOT NULL;
  CREATE UNIQUE INDEX IF NOT EXISTS "games_stripe_product_id_idx" ON "games" USING btree ("stripe_product_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "registrations_stripe_payment_intent_id_idx" ON "registrations" USING btree ("stripe_payment_intent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "games_stripe_product_id_idx";
  DROP INDEX IF EXISTS "registrations_stripe_payment_intent_id_idx";
  ALTER TABLE "games" DROP COLUMN IF EXISTS "stripe_product_id";
  ALTER TABLE "registrations" DROP COLUMN IF EXISTS "stripe_payment_intent_id";`)
}
