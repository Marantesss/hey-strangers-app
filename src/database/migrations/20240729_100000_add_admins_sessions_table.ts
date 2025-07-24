import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  console.log('🔧 Criando tabela admins_sessions...')

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "admins_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" uuid NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now(),
      "expires_at" timestamp(3) with time zone NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "admins_sessions_order_idx" ON "admins_sessions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "admins_sessions_parent_id_idx" ON "admins_sessions" USING btree ("_parent_id");

    DO $$ BEGIN
      ALTER TABLE "admins_sessions" ADD CONSTRAINT "admins_sessions_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."admins"("id")
      ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)

  console.log('✅ Tabela admins_sessions criada com sucesso!')
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  console.log('🗑️ Removendo tabela admins_sessions...')

  await db.execute(sql`
    DROP TABLE IF EXISTS "admins_sessions" CASCADE;
  `)

  console.log('✅ Tabela admins_sessions removida!')
}
