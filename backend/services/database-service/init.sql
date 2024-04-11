--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Postgres.app)
-- Dumped by pg_dump version 16.1

-- Started on 2024-04-08 14:53:09 IST

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

--
-- TOC entry 2 (class 3079 OID 16827)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16817)
-- Name: auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    created_at bigint DEFAULT EXTRACT(epoch FROM now()) NOT NULL
);


ALTER TABLE public.auth OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16838)
-- Name: todos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todos (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    due_date bigint NOT NULL,
    task text NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    starred boolean DEFAULT false NOT NULL,
    created_at bigint DEFAULT EXTRACT(epoch FROM now()) NOT NULL,
    user_uuid uuid NOT NULL
);


ALTER TABLE public.todos OWNER TO postgres;

--
-- TOC entry 3635 (class 0 OID 16817)
-- Dependencies: 216
-- Data for Name: auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth (uuid, username, password, created_at) FROM stdin;
\.


--
-- TOC entry 3636 (class 0 OID 16838)
-- Dependencies: 217
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todos (uuid, due_date, task, completed, starred, created_at, user_uuid) FROM stdin;
\.


--
-- TOC entry 3486 (class 2606 OID 16823)
-- Name: auth auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT auth_pkey PRIMARY KEY (uuid);


--
-- TOC entry 3490 (class 2606 OID 16848)
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (uuid);


--
-- TOC entry 3488 (class 2606 OID 16857)
-- Name: auth username_uq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth
    ADD CONSTRAINT username_uq UNIQUE (username);


--
-- TOC entry 3491 (class 2606 OID 16851)
-- Name: todos user_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT user_fk FOREIGN KEY (user_uuid) REFERENCES public.auth(uuid) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


-- Completed on 2024-04-08 14:53:09 IST

--
-- PostgreSQL database dump complete
--

