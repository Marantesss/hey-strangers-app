import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_fields_amenities" AS ENUM('parking', 'restrooms', 'changing_rooms', 'showers', 'equipment_rental', 'lockers', 'storage_space', 'water_fountain', 'vending_machines', 'cafe', 'seating_area', 'first_aid_station', 'wifi', 'lighting', 'scoreboard');
  CREATE TYPE "public"."enum_fields_type" AS ENUM('indoor', 'outdoor', 'hybrid', 'other');
  CREATE TYPE "public"."enum_fields_flooring" AS ENUM('natural_grass', 'artificial_turf', 'hybrid_turf', 'clay', 'hard_court', 'rubber', 'polyurethane', 'wood', 'sand', 'concrete', 'other');
  CREATE TYPE "public"."enum_fields_sport" AS ENUM('soccer', 'padel', 'tennis', 'basketball', 'volleyball', 'multi_purpose', 'other');
  CREATE TYPE "public"."enum_games_sport" AS ENUM('soccer', 'padel', 'tennis', 'basketball', 'volleyball');
  CREATE TYPE "public"."enum_home_footer_social_links_platform" AS ENUM('Facebook', 'YouTube', 'LinkedIn', 'Instagram');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"email" varchar,
  	"profile_picture_id" uuid,
  	"otp_code" varchar,
  	"otp_expiration" timestamp(3) with time zone,
  	"phone_number" varchar NOT NULL,
  	"is_verified" boolean DEFAULT false,
  	"name" varchar,
  	"city" varchar,
  	"deleted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "fields_amenities" (
  	"order" integer NOT NULL,
  	"parent_id" uuid NOT NULL,
  	"value" "enum_fields_amenities",
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "fields" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"type" "enum_fields_type" NOT NULL,
  	"flooring" "enum_fields_flooring" NOT NULL,
  	"sport" "enum_fields_sport" NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "games" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"ends_at" timestamp(3) with time zone NOT NULL,
  	"price" numeric NOT NULL,
  	"max_players" numeric NOT NULL,
  	"sport" "enum_games_sport" NOT NULL,
  	"field_id" uuid NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "registrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"game_id" uuid NOT NULL,
  	"user_id" uuid NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"users_id" uuid,
  	"fields_id" uuid,
  	"games_id" uuid,
  	"registrations_id" uuid,
  	"admins_id" uuid,
  	"media_id" uuid
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
  	"users_id" uuid,
  	"admins_id" uuid
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
  	"logo_id" uuid NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_next_games_sport_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"emoji" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" uuid NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_stats_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_testimonials_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"image_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_cta_sports" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"image_id" uuid NOT NULL,
  	"selected" boolean DEFAULT false NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_strangers_strangers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"age" numeric NOT NULL,
  	"bio" varchar NOT NULL,
  	"sport" varchar NOT NULL,
  	"image_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_when_and_where_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"emoji" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_numbers_numbers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_home_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"hero_subtitle" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"hero_button_label" varchar NOT NULL,
  	"next_games_title" varchar NOT NULL,
  	"how_it_works_title" varchar NOT NULL,
  	"how_it_works_subtitle" varchar NOT NULL,
  	"how_it_works_button_label" varchar NOT NULL,
  	"stats_title" varchar NOT NULL,
  	"stats_image_id" uuid NOT NULL,
  	"testimonials_title" varchar NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_subtitle" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"strangers_title" varchar NOT NULL,
  	"when_and_where_title" varchar NOT NULL,
  	"when_and_where_subtitle" varchar NOT NULL,
  	"when_and_where_button_label" varchar NOT NULL,
  	"when_and_where_image_id" uuid NOT NULL,
  	"numbers_title" varchar NOT NULL,
  	"faq_title" varchar NOT NULL,
  	"cta2_title" varchar NOT NULL,
  	"cta2_button_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_profile_picture_id_media_id_fk" FOREIGN KEY ("profile_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "fields_amenities" ADD CONSTRAINT "fields_amenities_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fields"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "games" ADD CONSTRAINT "games_field_id_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."fields"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "registrations" ADD CONSTRAINT "registrations_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "home_next_games_sport_categories" ADD CONSTRAINT "home_next_games_sport_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "home_stats_statistics" ADD CONSTRAINT "home_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
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
   ALTER TABLE "home_when_and_where_features" ADD CONSTRAINT "home_when_and_where_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_numbers_numbers" ADD CONSTRAINT "home_numbers_numbers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_faq_questions" ADD CONSTRAINT "home_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_footer_links" ADD CONSTRAINT "home_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_footer_social_links" ADD CONSTRAINT "home_footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
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
  
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "users_profile_picture_idx" ON "users" USING btree ("profile_picture_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_phone_number_idx" ON "users" USING btree ("phone_number");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "fields_amenities_order_idx" ON "fields_amenities" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "fields_amenities_parent_idx" ON "fields_amenities" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "fields_updated_at_idx" ON "fields" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "fields_created_at_idx" ON "fields" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "games_field_idx" ON "games" USING btree ("field_id");
  CREATE INDEX IF NOT EXISTS "games_updated_at_idx" ON "games" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "games_created_at_idx" ON "games" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "registrations_game_idx" ON "registrations" USING btree ("game_id");
  CREATE INDEX IF NOT EXISTS "registrations_user_idx" ON "registrations" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "registrations_updated_at_idx" ON "registrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "registrations_created_at_idx" ON "registrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "admins_updated_at_idx" ON "admins" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "admins_created_at_idx" ON "admins" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "admins_email_idx" ON "admins" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_fields_id_idx" ON "payload_locked_documents_rels" USING btree ("fields_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_games_id_idx" ON "payload_locked_documents_rels" USING btree ("games_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_registrations_id_idx" ON "payload_locked_documents_rels" USING btree ("registrations_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_admins_id_idx" ON "payload_locked_documents_rels" USING btree ("admins_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_admins_id_idx" ON "payload_preferences_rels" USING btree ("admins_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "home_hero_partners_order_idx" ON "home_hero_partners" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_hero_partners_parent_id_idx" ON "home_hero_partners" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_hero_partners_logo_idx" ON "home_hero_partners" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "home_next_games_sport_categories_order_idx" ON "home_next_games_sport_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_next_games_sport_categories_parent_id_idx" ON "home_next_games_sport_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_how_it_works_steps_order_idx" ON "home_how_it_works_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_how_it_works_steps_parent_id_idx" ON "home_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_how_it_works_steps_icon_idx" ON "home_how_it_works_steps" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "home_stats_statistics_order_idx" ON "home_stats_statistics" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_stats_statistics_parent_id_idx" ON "home_stats_statistics" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_testimonials_reviews_order_idx" ON "home_testimonials_reviews" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_testimonials_reviews_parent_id_idx" ON "home_testimonials_reviews" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_testimonials_reviews_image_idx" ON "home_testimonials_reviews" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "home_cta_sports_order_idx" ON "home_cta_sports" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_cta_sports_parent_id_idx" ON "home_cta_sports" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_cta_sports_image_idx" ON "home_cta_sports" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "home_strangers_strangers_order_idx" ON "home_strangers_strangers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_strangers_strangers_parent_id_idx" ON "home_strangers_strangers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_strangers_strangers_image_idx" ON "home_strangers_strangers" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "home_when_and_where_features_order_idx" ON "home_when_and_where_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_when_and_where_features_parent_id_idx" ON "home_when_and_where_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_numbers_numbers_order_idx" ON "home_numbers_numbers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_numbers_numbers_parent_id_idx" ON "home_numbers_numbers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_faq_questions_order_idx" ON "home_faq_questions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_faq_questions_parent_id_idx" ON "home_faq_questions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_footer_links_order_idx" ON "home_footer_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_footer_links_parent_id_idx" ON "home_footer_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_footer_social_links_order_idx" ON "home_footer_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_footer_social_links_parent_id_idx" ON "home_footer_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_stats_stats_image_idx" ON "home" USING btree ("stats_image_id");
  CREATE INDEX IF NOT EXISTS "home_when_and_where_when_and_where_image_idx" ON "home" USING btree ("when_and_where_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "fields_amenities" CASCADE;
  DROP TABLE "fields" CASCADE;
  DROP TABLE "games" CASCADE;
  DROP TABLE "registrations" CASCADE;
  DROP TABLE "admins" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_hero_partners" CASCADE;
  DROP TABLE "home_next_games_sport_categories" CASCADE;
  DROP TABLE "home_how_it_works_steps" CASCADE;
  DROP TABLE "home_stats_statistics" CASCADE;
  DROP TABLE "home_testimonials_reviews" CASCADE;
  DROP TABLE "home_cta_sports" CASCADE;
  DROP TABLE "home_strangers_strangers" CASCADE;
  DROP TABLE "home_when_and_where_features" CASCADE;
  DROP TABLE "home_numbers_numbers" CASCADE;
  DROP TABLE "home_faq_questions" CASCADE;
  DROP TABLE "home_footer_links" CASCADE;
  DROP TABLE "home_footer_social_links" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TYPE "public"."enum_fields_amenities";
  DROP TYPE "public"."enum_fields_type";
  DROP TYPE "public"."enum_fields_flooring";
  DROP TYPE "public"."enum_fields_sport";
  DROP TYPE "public"."enum_games_sport";
  DROP TYPE "public"."enum_home_footer_social_links_platform";`)
}
