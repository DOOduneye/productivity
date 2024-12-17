CREATE TYPE "public"."priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('todo', 'active', 'completed');--> statement-breakpoint
CREATE TABLE "milestones" (
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(1000),
	"priority" "priority" DEFAULT 'medium' NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"status" "status" DEFAULT 'todo' NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"id" serial PRIMARY KEY NOT NULL,
	"milestone_id" integer,
	"title" varchar(100) NOT NULL,
	"description" varchar(1000),
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_milestone_id_milestones_id_fk" FOREIGN KEY ("milestone_id") REFERENCES "public"."milestones"("id") ON DELETE no action ON UPDATE no action;