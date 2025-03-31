import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" RENAME COLUMN "contact_us" TO "contact_us_content";
  ALTER TABLE "pages_locales" RENAME COLUMN "safety" TO "safety_content";
  ALTER TABLE "pages_locales" RENAME COLUMN "community_guidelines" TO "community_guidelines_content";
  ALTER TABLE "pages_locales" RENAME COLUMN "terms_of_service" TO "terms_of_service_content";
  ALTER TABLE "pages_locales" RENAME COLUMN "privacy_policy" TO "privacy_policy_content";
  ALTER TABLE "home_locales" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "home_locales" ADD COLUMN "seo_image_id" uuid;
  ALTER TABLE "home_locales" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "contact_us_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "contact_us_image_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "contact_us_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "safety_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "safety_image_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "safety_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "community_guidelines_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "community_guidelines_image_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "community_guidelines_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "terms_of_service_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "terms_of_service_image_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "terms_of_service_description" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "privacy_policy_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN "privacy_policy_image_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "privacy_policy_description" varchar;
  DO $$ BEGIN
   ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_contact_us_image_id_media_id_fk" FOREIGN KEY ("contact_us_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_safety_image_id_media_id_fk" FOREIGN KEY ("safety_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_community_guidelines_image_id_media_id_fk" FOREIGN KEY ("community_guidelines_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_terms_of_service_image_id_media_id_fk" FOREIGN KEY ("terms_of_service_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_privacy_policy_image_id_media_id_fk" FOREIGN KEY ("privacy_policy_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "home_seo_seo_image_idx" ON "home_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "quiz_questions_key_idx" ON "quiz_questions" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "pages_contact_us_contact_us_image_idx" ON "pages_locales" USING btree ("contact_us_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_safety_safety_image_idx" ON "pages_locales" USING btree ("safety_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_community_guidelines_community_guidelines_image_idx" ON "pages_locales" USING btree ("community_guidelines_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_terms_of_service_terms_of_service_image_idx" ON "pages_locales" USING btree ("terms_of_service_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "pages_privacy_policy_privacy_policy_image_idx" ON "pages_locales" USING btree ("privacy_policy_image_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_locales" RENAME COLUMN "contact_us_content" TO "contact_us";
  ALTER TABLE "pages_locales" RENAME COLUMN "safety_content" TO "safety";
  ALTER TABLE "pages_locales" RENAME COLUMN "community_guidelines_content" TO "community_guidelines";
  ALTER TABLE "pages_locales" RENAME COLUMN "terms_of_service_content" TO "terms_of_service";
  ALTER TABLE "pages_locales" RENAME COLUMN "privacy_policy_content" TO "privacy_policy";
  ALTER TABLE "home_locales" DROP CONSTRAINT "home_locales_seo_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_contact_us_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_safety_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_community_guidelines_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_terms_of_service_image_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_privacy_policy_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "home_seo_seo_image_idx";
  DROP INDEX IF EXISTS "quiz_questions_key_idx";
  DROP INDEX IF EXISTS "pages_contact_us_contact_us_image_idx";
  DROP INDEX IF EXISTS "pages_safety_safety_image_idx";
  DROP INDEX IF EXISTS "pages_community_guidelines_community_guidelines_image_idx";
  DROP INDEX IF EXISTS "pages_terms_of_service_terms_of_service_image_idx";
  DROP INDEX IF EXISTS "pages_privacy_policy_privacy_policy_image_idx";
  ALTER TABLE "home_locales" DROP COLUMN IF EXISTS "seo_title";
  ALTER TABLE "home_locales" DROP COLUMN IF EXISTS "seo_image_id";
  ALTER TABLE "home_locales" DROP COLUMN IF EXISTS "seo_description";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "contact_us_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "contact_us_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "contact_us_description";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "safety_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "safety_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "safety_description";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "community_guidelines_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "community_guidelines_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "community_guidelines_description";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "terms_of_service_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "terms_of_service_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "terms_of_service_description";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "privacy_policy_title";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "privacy_policy_image_id";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "privacy_policy_description";`)
}
