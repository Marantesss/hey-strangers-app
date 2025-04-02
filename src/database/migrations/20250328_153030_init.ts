import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'pt');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'youtube', 'linkedin', 'instagram');
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar,
  	"prefix" varchar DEFAULT 'media',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "admins" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"email" varchar,
  	"stripe_customer_id" varchar,
  	"profile_picture_id" uuid,
  	"otp_code" varchar,
  	"otp_expiration" timestamp(3) with time zone,
  	"phone_number" varchar NOT NULL,
  	"is_verified" boolean DEFAULT false,
  	"name" varchar,
  	"city" varchar,
  	"quiz_answers" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sports" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"emoji" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sports_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "field_types" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "field_types_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "field_floorings" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "field_floorings_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "field_amenities" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "field_amenities_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "fields" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"address" varchar NOT NULL,
  	"type_id" uuid NOT NULL,
  	"flooring_id" uuid NOT NULL,
  	"sport_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "fields_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "fields_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"field_amenities_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "games" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"ends_at" timestamp(3) with time zone NOT NULL,
  	"price" numeric NOT NULL,
  	"max_players" numeric NOT NULL,
  	"stripe_product_id" varchar,
  	"sport_id" uuid NOT NULL,
  	"field_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "games_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "games_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"registrations_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "registrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"stripe_payment_intent_id" varchar NOT NULL,
  	"is_main_registration" boolean DEFAULT true,
  	"user_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" uuid,
  	"admins_id" uuid,
  	"users_id" uuid,
  	"sports_id" uuid,
  	"field_types_id" uuid,
  	"field_floorings_id" uuid,
  	"field_amenities_id" uuid,
  	"fields_id" uuid,
  	"games_id" uuid,
  	"registrations_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" uuid,
  	"users_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_hero_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_hero_partners_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_next_games_games" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"emoji" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"image_id" uuid NOT NULL,
  	"time" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_next_games_games_locales" (
  	"sport" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_how_it_works_steps_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_stats_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_stats_statistics_locales" (
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_testimonials_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_testimonials_reviews_locales" (
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_cta_sports" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid NOT NULL,
  	"selected" boolean DEFAULT false NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_cta_sports_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_strangers_strangers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"age" numeric NOT NULL,
  	"image_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_strangers_strangers_locales" (
  	"bio" varchar NOT NULL,
  	"sport" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_when_and_where_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"emoji" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_when_and_where_features_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_numbers_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_numbers_numbers_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_faq_questions_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"stats_image_id" uuid NOT NULL,
  	"when_and_where_image_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "home_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"hero_button_label" varchar NOT NULL,
  	"next_games_title" varchar NOT NULL,
  	"how_it_works_title" varchar NOT NULL,
  	"how_it_works_subtitle" varchar NOT NULL,
  	"how_it_works_button_label" varchar NOT NULL,
  	"stats_title" varchar NOT NULL,
  	"testimonials_title" varchar NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_subtitle" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"strangers_title" varchar NOT NULL,
  	"when_and_where_title" varchar NOT NULL,
  	"when_and_where_subtitle" varchar NOT NULL,
  	"when_and_where_button_label" varchar NOT NULL,
  	"numbers_title" varchar NOT NULL,
  	"faq_title" varchar NOT NULL,
  	"cta2_title" varchar NOT NULL,
  	"cta2_button_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_sports" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_sports_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_questions_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_questions_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_questions_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_dummy_game_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"ends_at" timestamp(3) with time zone NOT NULL,
  	"price" numeric NOT NULL,
  	"max_players" numeric NOT NULL,
  	"sport_id" uuid NOT NULL,
  	"field_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz_dummy_game_results_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "quiz" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "pages_locales" (
  	"contact_us" jsonb NOT NULL,
  	"safety" jsonb NOT NULL,
  	"community_guidelines" jsonb NOT NULL,
  	"terms_of_service" jsonb NOT NULL,
  	"privacy_policy" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_profile_picture_id_media_id_fk" FOREIGN KEY ("profile_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "sports_locales" ADD CONSTRAINT "sports_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sports"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "field_types_locales" ADD CONSTRAINT "field_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."field_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "field_floorings_locales" ADD CONSTRAINT "field_floorings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."field_floorings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "field_amenities_locales" ADD CONSTRAINT "field_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."field_amenities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields" ADD CONSTRAINT "fields_type_id_field_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."field_types"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields" ADD CONSTRAINT "fields_flooring_id_field_floorings_id_fk" FOREIGN KEY ("flooring_id") REFERENCES "public"."field_floorings"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields" ADD CONSTRAINT "fields_sport_id_sports_id_fk" FOREIGN KEY ("sport_id") REFERENCES "public"."sports"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields_locales" ADD CONSTRAINT "fields_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fields"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields_rels" ADD CONSTRAINT "fields_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fields"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields_rels" ADD CONSTRAINT "fields_rels_field_amenities_fk" FOREIGN KEY ("field_amenities_id") REFERENCES "public"."field_amenities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "games" ADD CONSTRAINT "games_sport_id_sports_id_fk" FOREIGN KEY ("sport_id") REFERENCES "public"."sports"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "games" ADD CONSTRAINT "games_field_id_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."fields"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "games_locales" ADD CONSTRAINT "games_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "games_rels" ADD CONSTRAINT "games_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "games_rels" ADD CONSTRAINT "games_rels_registrations_fk" FOREIGN KEY ("registrations_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "registrations" ADD CONSTRAINT "registrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sports_fk" FOREIGN KEY ("sports_id") REFERENCES "public"."sports"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_field_types_fk" FOREIGN KEY ("field_types_id") REFERENCES "public"."field_types"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_field_floorings_fk" FOREIGN KEY ("field_floorings_id") REFERENCES "public"."field_floorings"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_field_amenities_fk" FOREIGN KEY ("field_amenities_id") REFERENCES "public"."field_amenities"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fields_fk" FOREIGN KEY ("fields_id") REFERENCES "public"."fields"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_games_fk" FOREIGN KEY ("games_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_registrations_fk" FOREIGN KEY ("registrations_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_hero_partners" ADD CONSTRAINT "home_hero_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_hero_partners" ADD CONSTRAINT "home_hero_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_hero_partners_locales" ADD CONSTRAINT "home_hero_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_hero_partners"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_next_games_games" ADD CONSTRAINT "home_next_games_games_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_next_games_games" ADD CONSTRAINT "home_next_games_games_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_next_games_games_locales" ADD CONSTRAINT "home_next_games_games_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_next_games_games"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_how_it_works_steps" ADD CONSTRAINT "home_how_it_works_steps_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_how_it_works_steps" ADD CONSTRAINT "home_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_how_it_works_steps_locales" ADD CONSTRAINT "home_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_stats_statistics" ADD CONSTRAINT "home_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_stats_statistics_locales" ADD CONSTRAINT "home_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_testimonials_reviews" ADD CONSTRAINT "home_testimonials_reviews_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_testimonials_reviews" ADD CONSTRAINT "home_testimonials_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_testimonials_reviews_locales" ADD CONSTRAINT "home_testimonials_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_testimonials_reviews"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_cta_sports" ADD CONSTRAINT "home_cta_sports_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_cta_sports" ADD CONSTRAINT "home_cta_sports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_cta_sports_locales" ADD CONSTRAINT "home_cta_sports_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_cta_sports"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_strangers_strangers" ADD CONSTRAINT "home_strangers_strangers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_strangers_strangers" ADD CONSTRAINT "home_strangers_strangers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_strangers_strangers_locales" ADD CONSTRAINT "home_strangers_strangers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_strangers_strangers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_when_and_where_features" ADD CONSTRAINT "home_when_and_where_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_when_and_where_features_locales" ADD CONSTRAINT "home_when_and_where_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_when_and_where_features"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_numbers_numbers" ADD CONSTRAINT "home_numbers_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_numbers_numbers_locales" ADD CONSTRAINT "home_numbers_numbers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_numbers_numbers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_faq_questions" ADD CONSTRAINT "home_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_faq_questions_locales" ADD CONSTRAINT "home_faq_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_faq_questions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home" ADD CONSTRAINT "home_stats_image_id_media_id_fk" FOREIGN KEY ("stats_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home" ADD CONSTRAINT "home_when_and_where_image_id_media_id_fk" FOREIGN KEY ("when_and_where_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_locales" ADD CONSTRAINT "home_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_links_locales" ADD CONSTRAINT "footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_sports" ADD CONSTRAINT "quiz_sports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_sports_locales" ADD CONSTRAINT "quiz_sports_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_sports"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_questions_options" ADD CONSTRAINT "quiz_questions_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_questions_options_locales" ADD CONSTRAINT "quiz_questions_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_questions_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_questions_locales" ADD CONSTRAINT "quiz_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_questions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_dummy_game_results" ADD CONSTRAINT "quiz_dummy_game_results_sport_id_sports_id_fk" FOREIGN KEY ("sport_id") REFERENCES "public"."sports"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_dummy_game_results" ADD CONSTRAINT "quiz_dummy_game_results_field_id_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."fields"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_dummy_game_results" ADD CONSTRAINT "quiz_dummy_game_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "quiz_dummy_game_results_locales" ADD CONSTRAINT "quiz_dummy_game_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quiz_dummy_game_results"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "admins_updated_at_idx" ON "admins" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "admins_created_at_idx" ON "admins" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "admins_email_idx" ON "admins" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_stripe_customer_id_idx" ON "users" USING btree ("stripe_customer_id");
  CREATE INDEX IF NOT EXISTS "users_profile_picture_idx" ON "users" USING btree ("profile_picture_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_phone_number_idx" ON "users" USING btree ("phone_number");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "sports_updated_at_idx" ON "sports" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "sports_created_at_idx" ON "sports" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "sports_locales_locale_parent_id_unique" ON "sports_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "field_types_updated_at_idx" ON "field_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "field_types_created_at_idx" ON "field_types" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "field_types_locales_locale_parent_id_unique" ON "field_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "field_floorings_updated_at_idx" ON "field_floorings" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "field_floorings_created_at_idx" ON "field_floorings" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "field_floorings_locales_locale_parent_id_unique" ON "field_floorings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "field_amenities_updated_at_idx" ON "field_amenities" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "field_amenities_created_at_idx" ON "field_amenities" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "field_amenities_locales_locale_parent_id_unique" ON "field_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "fields_type_idx" ON "fields" USING btree ("type_id");
  CREATE INDEX IF NOT EXISTS "fields_flooring_idx" ON "fields" USING btree ("flooring_id");
  CREATE INDEX IF NOT EXISTS "fields_sport_idx" ON "fields" USING btree ("sport_id");
  CREATE INDEX IF NOT EXISTS "fields_updated_at_idx" ON "fields" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "fields_created_at_idx" ON "fields" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "fields_locales_locale_parent_id_unique" ON "fields_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "fields_rels_order_idx" ON "fields_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "fields_rels_parent_idx" ON "fields_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "fields_rels_path_idx" ON "fields_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "fields_rels_field_amenities_id_idx" ON "fields_rels" USING btree ("field_amenities_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "games_stripe_product_id_idx" ON "games" USING btree ("stripe_product_id");
  CREATE INDEX IF NOT EXISTS "games_sport_idx" ON "games" USING btree ("sport_id");
  CREATE INDEX IF NOT EXISTS "games_field_idx" ON "games" USING btree ("field_id");
  CREATE INDEX IF NOT EXISTS "games_updated_at_idx" ON "games" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "games_created_at_idx" ON "games" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "games_locales_locale_parent_id_unique" ON "games_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "games_rels_order_idx" ON "games_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "games_rels_parent_idx" ON "games_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "games_rels_path_idx" ON "games_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "games_rels_registrations_id_idx" ON "games_rels" USING btree ("registrations_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "registrations_stripe_payment_intent_id_idx" ON "registrations" USING btree ("stripe_payment_intent_id");
  CREATE INDEX IF NOT EXISTS "registrations_user_idx" ON "registrations" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "registrations_updated_at_idx" ON "registrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "registrations_created_at_idx" ON "registrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_admins_id_idx" ON "payload_locked_documents_rels" USING btree ("admins_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_sports_id_idx" ON "payload_locked_documents_rels" USING btree ("sports_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_field_types_id_idx" ON "payload_locked_documents_rels" USING btree ("field_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_field_floorings_id_idx" ON "payload_locked_documents_rels" USING btree ("field_floorings_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_field_amenities_id_idx" ON "payload_locked_documents_rels" USING btree ("field_amenities_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_fields_id_idx" ON "payload_locked_documents_rels" USING btree ("fields_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_games_id_idx" ON "payload_locked_documents_rels" USING btree ("games_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("registrations_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_admins_id_idx" ON "payload_preferences_rels" USING btree ("admins_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "home_hero_partners_order_idx" ON "home_hero_partners" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_hero_partners_parent_id_idx" ON "home_hero_partners" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_hero_partners_logo_idx" ON "home_hero_partners" USING btree ("logo_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_hero_partners_locales_locale_parent_id_unique" ON "home_hero_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_next_games_games_order_idx" ON "home_next_games_games" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_next_games_games_parent_id_idx" ON "home_next_games_games" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_next_games_games_image_idx" ON "home_next_games_games" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_next_games_games_locales_locale_parent_id_unique" ON "home_next_games_games_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_how_it_works_steps_order_idx" ON "home_how_it_works_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_how_it_works_steps_parent_id_idx" ON "home_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_how_it_works_steps_icon_idx" ON "home_how_it_works_steps" USING btree ("icon_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_how_it_works_steps_locales_locale_parent_id_unique" ON "home_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_stats_statistics_order_idx" ON "home_stats_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_stats_statistics_parent_id_idx" ON "home_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_stats_statistics_locales_locale_parent_id_unique" ON "home_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_testimonials_reviews_order_idx" ON "home_testimonials_reviews" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_testimonials_reviews_parent_id_idx" ON "home_testimonials_reviews" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_testimonials_reviews_image_idx" ON "home_testimonials_reviews" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_testimonials_reviews_locales_locale_parent_id_unique" ON "home_testimonials_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_cta_sports_order_idx" ON "home_cta_sports" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_cta_sports_parent_id_idx" ON "home_cta_sports" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_cta_sports_image_idx" ON "home_cta_sports" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_cta_sports_locales_locale_parent_id_unique" ON "home_cta_sports_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_strangers_strangers_order_idx" ON "home_strangers_strangers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_strangers_strangers_parent_id_idx" ON "home_strangers_strangers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_strangers_strangers_image_idx" ON "home_strangers_strangers" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_strangers_strangers_locales_locale_parent_id_unique" ON "home_strangers_strangers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_when_and_where_features_order_idx" ON "home_when_and_where_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_when_and_where_features_parent_id_idx" ON "home_when_and_where_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_when_and_where_features_locales_locale_parent_id_unique" ON "home_when_and_where_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_numbers_numbers_order_idx" ON "home_numbers_numbers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_numbers_numbers_parent_id_idx" ON "home_numbers_numbers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_numbers_numbers_locales_locale_parent_id_unique" ON "home_numbers_numbers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_faq_questions_order_idx" ON "home_faq_questions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_faq_questions_parent_id_idx" ON "home_faq_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_faq_questions_locales_locale_parent_id_unique" ON "home_faq_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "home_stats_stats_image_idx" ON "home" USING btree ("stats_image_id");
  CREATE INDEX IF NOT EXISTS "home_when_and_where_when_and_where_image_idx" ON "home" USING btree ("when_and_where_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "home_locales_locale_parent_id_unique" ON "home_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "footer_links_locales_locale_parent_id_unique" ON "footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "quiz_sports_order_idx" ON "quiz_sports" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "quiz_sports_parent_id_idx" ON "quiz_sports" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "quiz_sports_locales_locale_parent_id_unique" ON "quiz_sports_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "quiz_questions_options_order_idx" ON "quiz_questions_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "quiz_questions_options_parent_id_idx" ON "quiz_questions_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "quiz_questions_options_locales_locale_parent_id_unique" ON "quiz_questions_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "quiz_questions_order_idx" ON "quiz_questions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "quiz_questions_parent_id_idx" ON "quiz_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "quiz_questions_locales_locale_parent_id_unique" ON "quiz_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "quiz_dummy_game_results_order_idx" ON "quiz_dummy_game_results" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "quiz_dummy_game_results_parent_id_idx" ON "quiz_dummy_game_results" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "quiz_dummy_game_results_sport_idx" ON "quiz_dummy_game_results" USING btree ("sport_id");
  CREATE INDEX IF NOT EXISTS "quiz_dummy_game_results_field_idx" ON "quiz_dummy_game_results" USING btree ("field_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "quiz_dummy_game_results_locales_locale_parent_id_unique" ON "quiz_dummy_game_results_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "media" CASCADE;
  DROP TABLE IF EXISTS "admins" CASCADE;
  DROP TABLE IF EXISTS "users" CASCADE;
  DROP TABLE IF EXISTS "sports" CASCADE;
  DROP TABLE IF EXISTS "sports_locales" CASCADE;
  DROP TABLE IF EXISTS "field_types" CASCADE;
  DROP TABLE IF EXISTS "field_types_locales" CASCADE;
  DROP TABLE IF EXISTS "field_floorings" CASCADE;
  DROP TABLE IF EXISTS "field_floorings_locales" CASCADE;
  DROP TABLE IF EXISTS "field_amenities" CASCADE;
  DROP TABLE IF EXISTS "field_amenities_locales" CASCADE;
  DROP TABLE IF EXISTS "fields" CASCADE;
  DROP TABLE IF EXISTS "fields_locales" CASCADE;
  DROP TABLE IF EXISTS "fields_rels" CASCADE;
  DROP TABLE IF EXISTS "games" CASCADE;
  DROP TABLE IF EXISTS "games_locales" CASCADE;
  DROP TABLE IF EXISTS "games_rels" CASCADE;
  DROP TABLE IF EXISTS "registrations" CASCADE;
  -- DROP TABLE IF EXISTS "payload_locked_documents" CASCADE;
  -- DROP TABLE IF EXISTS "payload_locked_documents_rels" CASCADE;
  -- DROP TABLE IF EXISTS "payload_preferences" CASCADE;
  -- DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;
  -- DROP TABLE IF EXISTS "payload_migrations" CASCADE;
  DROP TABLE IF EXISTS "home_hero_partners" CASCADE;
  DROP TABLE IF EXISTS "home_hero_partners_locales" CASCADE;
  DROP TABLE IF EXISTS "home_next_games_games" CASCADE;
  DROP TABLE IF EXISTS "home_next_games_games_locales" CASCADE;
  DROP TABLE IF EXISTS "home_how_it_works_steps" CASCADE;
  DROP TABLE IF EXISTS "home_how_it_works_steps_locales" CASCADE;
  DROP TABLE IF EXISTS "home_stats_statistics" CASCADE;
  DROP TABLE IF EXISTS "home_stats_statistics_locales" CASCADE;
  DROP TABLE IF EXISTS "home_testimonials_reviews" CASCADE;
  DROP TABLE IF EXISTS "home_testimonials_reviews_locales" CASCADE;
  DROP TABLE IF EXISTS "home_cta_sports" CASCADE;
  DROP TABLE IF EXISTS "home_cta_sports_locales" CASCADE;
  DROP TABLE IF EXISTS "home_strangers_strangers" CASCADE;
  DROP TABLE IF EXISTS "home_strangers_strangers_locales" CASCADE;
  DROP TABLE IF EXISTS "home_when_and_where_features" CASCADE;
  DROP TABLE IF EXISTS "home_when_and_where_features_locales" CASCADE;
  DROP TABLE IF EXISTS "home_numbers_numbers" CASCADE;
  DROP TABLE IF EXISTS "home_numbers_numbers_locales" CASCADE;
  DROP TABLE IF EXISTS "home_faq_questions" CASCADE;
  DROP TABLE IF EXISTS "home_faq_questions_locales" CASCADE;
  DROP TABLE IF EXISTS "home" CASCADE;
  DROP TABLE IF EXISTS "home_locales" CASCADE;
  DROP TABLE IF EXISTS "footer_links" CASCADE;
  DROP TABLE IF EXISTS "footer_links_locales" CASCADE;
  DROP TABLE IF EXISTS "footer_social_links" CASCADE;
  DROP TABLE IF EXISTS "footer" CASCADE;
  DROP TABLE IF EXISTS "quiz_sports" CASCADE;
  DROP TABLE IF EXISTS "quiz_sports_locales" CASCADE;
  DROP TABLE IF EXISTS "quiz_questions_options" CASCADE;
  DROP TABLE IF EXISTS "quiz_questions_options_locales" CASCADE;
  DROP TABLE IF EXISTS "quiz_questions" CASCADE;
  DROP TABLE IF EXISTS "quiz_questions_locales" CASCADE;
  DROP TABLE IF EXISTS "quiz_dummy_game_results" CASCADE;
  DROP TABLE IF EXISTS "quiz_dummy_game_results_locales" CASCADE;
  DROP TABLE IF EXISTS "quiz" CASCADE;
  DROP TABLE IF EXISTS "pages" CASCADE;
  DROP TABLE IF EXISTS "pages_locales" CASCADE;
  DROP TYPE IF EXISTS "public"."_locales" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_footer_social_links_platform" CASCADE;`)
}
