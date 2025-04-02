import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "invites" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" uuid NOT NULL,
  	"game_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cities" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "cities_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  DROP INDEX IF EXISTS "games_stripe_product_id_idx";
  DROP INDEX IF EXISTS "registrations_stripe_payment_intent_id_idx";
  ALTER TABLE "users" ADD COLUMN "city_id" uuid;
  ALTER TABLE "fields" ADD COLUMN "city_id" uuid NOT NULL;
  ALTER TABLE "games" ADD COLUMN "booking_fee" numeric DEFAULT 1 NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "invites_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "cities_id" uuid;
  DO $$ BEGIN
   ALTER TABLE "invites" ADD CONSTRAINT "invites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "invites" ADD CONSTRAINT "invites_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "cities_locales" ADD CONSTRAINT "cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "invites_user_idx" ON "invites" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "invites_game_idx" ON "invites" USING btree ("game_id");
  CREATE INDEX IF NOT EXISTS "invites_updated_at_idx" ON "invites" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "invites_created_at_idx" ON "invites" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "cities_locales_locale_parent_id_unique" ON "cities_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields" ADD CONSTRAINT "fields_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_invites_fk" FOREIGN KEY ("invites_id") REFERENCES "public"."invites"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_city_idx" ON "users" USING btree ("city_id");
  CREATE INDEX IF NOT EXISTS "fields_city_idx" ON "fields" USING btree ("city_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_invites_id_idx" ON "payload_locked_documents_rels" USING btree ("invites_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "city";
  ALTER TABLE "games" DROP COLUMN IF EXISTS "stripe_product_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "invites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cities_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "invites" CASCADE;
  DROP TABLE "cities" CASCADE;
  DROP TABLE "cities_locales" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_city_id_cities_id_fk";
  
  ALTER TABLE "fields" DROP CONSTRAINT "fields_city_id_cities_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_invites_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cities_fk";
  
  DROP INDEX IF EXISTS "users_city_idx";
  DROP INDEX IF EXISTS "fields_city_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_invites_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_cities_id_idx";
  ALTER TABLE "users" ADD COLUMN "city" varchar;
  ALTER TABLE "games" ADD COLUMN "stripe_product_id" varchar;
  CREATE UNIQUE INDEX IF NOT EXISTS "games_stripe_product_id_idx" ON "games" USING btree ("stripe_product_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "registrations_stripe_payment_intent_id_idx" ON "registrations" USING btree ("stripe_payment_intent_id");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "city_id";
  ALTER TABLE "fields" DROP COLUMN IF EXISTS "city_id";
  ALTER TABLE "games" DROP COLUMN IF EXISTS "booking_fee";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "invites_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "cities_id";`)
}
