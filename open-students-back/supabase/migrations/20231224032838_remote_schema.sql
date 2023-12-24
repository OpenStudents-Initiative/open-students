alter table "public"."university" add column "nickname" character varying;

alter table "public"."university" alter column "created_at" drop default;

alter table "public"."university" alter column "created_at" drop not null;


