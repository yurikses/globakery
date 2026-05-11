CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'on_repair');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'director', 'employee');--> statement-breakpoint
CREATE TABLE "factory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"status" "status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(30) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" text NOT NULL,
	"role" "role" NOT NULL,
	"factory_id" integer,
	"contacts_info" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_factory_id_factory_id_fk" FOREIGN KEY ("factory_id") REFERENCES "public"."factory"("id") ON DELETE no action ON UPDATE no action;