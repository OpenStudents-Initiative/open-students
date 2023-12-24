
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."academic_period" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "start_date" "date",
    "end_date" "date"
);

ALTER TABLE "public"."academic_period" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."academic_period_course" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fk_academic_period" "uuid" NOT NULL,
    "fk_course" "uuid" NOT NULL
);

ALTER TABLE "public"."academic_period_course" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."course" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "course_code" character varying
);

ALTER TABLE "public"."course" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."dependency" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL,
    "fk_university" "uuid" NOT NULL
);

ALTER TABLE "public"."dependency" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."professor" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying NOT NULL
);

ALTER TABLE "public"."professor" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."professor_dependency" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fk_professor" "uuid" NOT NULL,
    "fk_dependency" "uuid" NOT NULL
);

ALTER TABLE "public"."professor_dependency" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."review" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "review" character varying NOT NULL,
    "general_rating" numeric NOT NULL,
    "difficulty_level" numeric,
    "course_grade" numeric NOT NULL,
    "would_enroll_again" boolean NOT NULL,
    "fk_professor" "uuid" NOT NULL,
    "fk_course" "uuid" NOT NULL,
    "fk_academic_period" "uuid" NOT NULL,
    "creator" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."review" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."university" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nickname" character varying,
    "name" character varying NOT NULL,
    "created_at" timestamp with time zone
);

ALTER TABLE "public"."university" OWNER TO "postgres";

ALTER TABLE ONLY "public"."academic_period_course"
    ADD CONSTRAINT "academic_period_course_pkey" PRIMARY KEY ("fk_academic_period", "fk_course");

ALTER TABLE ONLY "public"."academic_period"
    ADD CONSTRAINT "academic_period_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."course"
    ADD CONSTRAINT "course_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."dependency"
    ADD CONSTRAINT "dependency_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."professor_dependency"
    ADD CONSTRAINT "professor_dependency_pkey" PRIMARY KEY ("fk_professor", "fk_dependency");

ALTER TABLE ONLY "public"."professor"
    ADD CONSTRAINT "professor_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."university"
    ADD CONSTRAINT "university_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."university"
    ADD CONSTRAINT "university_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."academic_period_course"
    ADD CONSTRAINT "academic_period_course_fk_academic_period_fkey" FOREIGN KEY ("fk_academic_period") REFERENCES "public"."academic_period"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."academic_period_course"
    ADD CONSTRAINT "academic_period_course_fk_course_fkey" FOREIGN KEY ("fk_course") REFERENCES "public"."course"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."dependency"
    ADD CONSTRAINT "dependency_fk_university_fkey" FOREIGN KEY ("fk_university") REFERENCES "public"."university"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."professor_dependency"
    ADD CONSTRAINT "professor_dependency_fk_dependency_fkey" FOREIGN KEY ("fk_dependency") REFERENCES "public"."dependency"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."professor_dependency"
    ADD CONSTRAINT "professor_dependency_fk_professor_fkey" FOREIGN KEY ("fk_professor") REFERENCES "public"."professor"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_fk_academic_period_fkey" FOREIGN KEY ("fk_academic_period") REFERENCES "public"."academic_period"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_fk_course_fkey" FOREIGN KEY ("fk_course") REFERENCES "public"."course"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."review"
    ADD CONSTRAINT "review_fk_professor_fkey" FOREIGN KEY ("fk_professor") REFERENCES "public"."professor"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."academic_period" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."academic_period_course" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."course" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."dependency" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."professor" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."professor_dependency" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."review" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."university" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."academic_period" TO "anon";
GRANT ALL ON TABLE "public"."academic_period" TO "authenticated";
GRANT ALL ON TABLE "public"."academic_period" TO "service_role";

GRANT ALL ON TABLE "public"."academic_period_course" TO "anon";
GRANT ALL ON TABLE "public"."academic_period_course" TO "authenticated";
GRANT ALL ON TABLE "public"."academic_period_course" TO "service_role";

GRANT ALL ON TABLE "public"."course" TO "anon";
GRANT ALL ON TABLE "public"."course" TO "authenticated";
GRANT ALL ON TABLE "public"."course" TO "service_role";

GRANT ALL ON TABLE "public"."dependency" TO "anon";
GRANT ALL ON TABLE "public"."dependency" TO "authenticated";
GRANT ALL ON TABLE "public"."dependency" TO "service_role";

GRANT ALL ON TABLE "public"."professor" TO "anon";
GRANT ALL ON TABLE "public"."professor" TO "authenticated";
GRANT ALL ON TABLE "public"."professor" TO "service_role";

GRANT ALL ON TABLE "public"."professor_dependency" TO "anon";
GRANT ALL ON TABLE "public"."professor_dependency" TO "authenticated";
GRANT ALL ON TABLE "public"."professor_dependency" TO "service_role";

GRANT ALL ON TABLE "public"."review" TO "anon";
GRANT ALL ON TABLE "public"."review" TO "authenticated";
GRANT ALL ON TABLE "public"."review" TO "service_role";

GRANT ALL ON TABLE "public"."university" TO "anon";
GRANT ALL ON TABLE "public"."university" TO "authenticated";
GRANT ALL ON TABLE "public"."university" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
