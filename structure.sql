--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.23
-- Dumped by pg_dump version 9.6.23

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
-- Name: projekt; Type: SCHEMA; Schema: -; Owner: u0haidukevich
--

CREATE SCHEMA projekt;


ALTER SCHEMA projekt OWNER TO u0haidukevich;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: albumy; Type: TABLE; Schema: projekt; Owner: u0haidukevich
--

CREATE TABLE projekt.albumy (
    id integer NOT NULL,
    autor_id integer,
    nazwa character varying(30),
    year integer,
    utworzono timestamp without time zone,
    zaktualizowano timestamp without time zone
);


ALTER TABLE projekt.albumy OWNER TO u0haidukevich;

--
-- Name: autorzy; Type: TABLE; Schema: projekt; Owner: u0haidukevich
--

CREATE TABLE projekt.autorzy (
    id integer NOT NULL,
    kraj_id integer NOT NULL,
    imie character varying(30) NOT NULL,
    bio character varying(50),
    utworzono timestamp without time zone,
    zaktualizowano timestamp without time zone
);


ALTER TABLE projekt.autorzy OWNER TO u0haidukevich;

--
-- Name: gatunki; Type: TABLE; Schema: projekt; Owner: u0haidukevich
--

CREATE TABLE projekt.gatunki (
    id integer NOT NULL,
    nazwa character varying(30),
    utworzono timestamp without time zone,
    zaktualizowano timestamp without time zone
);


ALTER TABLE projekt.gatunki OWNER TO u0haidukevich;

--
-- Name: kraje; Type: TABLE; Schema: projekt; Owner: u0haidukevich
--

CREATE TABLE projekt.kraje (
    id integer NOT NULL,
    nazwa character varying(30) NOT NULL,
    utworzono timestamp without time zone,
    zaktualizowano timestamp without time zone
);


ALTER TABLE projekt.kraje OWNER TO u0haidukevich;

--
-- Name: piesni; Type: TABLE; Schema: projekt; Owner: u0haidukevich
--

CREATE TABLE projekt.piesni (
    id integer NOT NULL,
    album_id integer,
    nazwa character varying(30),
    ranking integer,
    utworzono timestamp without time zone,
    zaktualizowano timestamp without time zone
);


ALTER TABLE projekt.piesni OWNER TO u0haidukevich;

--
-- Name: liczba_piesni_widok; Type: VIEW; Schema: projekt; Owner: u0haidukevich
--

CREATE VIEW projekt.liczba_piesni_widok AS
 SELECT albumy.autor_id,
    count(*) AS count
   FROM (projekt.piesni
     JOIN projekt.albumy ON ((albumy.id = piesni.album_id)))
  GROUP BY albumy.autor_id;


ALTER TABLE projekt.liczba_piesni_widok OWNER TO u0haidukevich;

--
-- Name: piesni_gatunki; Type: TABLE; Schema: projekt; Owner: u0haidukevich
--

CREATE TABLE projekt.piesni_gatunki (
    id integer,
    piesn_id integer,
    gatunek_id integer
);


ALTER TABLE projekt.piesni_gatunki OWNER TO u0haidukevich;

--
-- Name: uzytkownicy; Type: TABLE; Schema: projekt; Owner: u0haidukevich
--

CREATE TABLE projekt.uzytkownicy (
    id integer NOT NULL,
    kraj_id integer NOT NULL,
    imie character varying(30) NOT NULL,
    utworzono timestamp without time zone,
    zaktualizowano timestamp without time zone
);


ALTER TABLE projekt.uzytkownicy OWNER TO u0haidukevich;

--
-- Data for Name: albumy; Type: TABLE DATA; Schema: projekt; Owner: u0haidukevich
--

COPY projekt.albumy (id, autor_id, nazwa, year, utworzono, zaktualizowano) FROM stdin;
1	2	Fire in you	2023	2023-01-20 20:32:18.597444	\N
2	2	Reunion	2009	2023-01-20 20:34:00.840998	\N
3	2	A friend of humanity	2018	2023-01-20 20:37:34.185207	\N
4	1	Demons	2011	2023-01-20 20:43:19.803775	\N
5	4	Football Africa	2008	2023-01-20 20:51:45.611926	\N
6	4	Supernatural	2005	2023-01-20 21:45:16.963296	\N
7	1	lost	2023	2023-01-21 00:06:41.111377	\N
8	2	Singing in the rain	1999	2023-01-21 00:29:31.457854	\N
9	5	albomNr5	1879	2023-01-21 02:49:18.093012	\N
10	1	hello there	2023	2023-01-21 02:51:40.084036	\N
11	1	eghrsy5gh	2023	2023-01-21 17:02:09.157053	\N
\.


--
-- Data for Name: autorzy; Type: TABLE DATA; Schema: projekt; Owner: u0haidukevich
--

COPY projekt.autorzy (id, kraj_id, imie, bio, utworzono, zaktualizowano) FROM stdin;
1	158	Imagine Dragons	very good music	2023-01-20 18:17:37.351204	\N
2	74	Aimer		2023-01-20 18:18:19.239695	\N
3	187	Maneskin	the winner of eurovision 2020	2023-01-20 19:52:56.787142	\N
4	63	Shakira	waka waka	2023-01-20 20:51:09.223	\N
5	140	Rahmaninov	horosho	2023-01-21 02:48:01.998835	\N
\.


--
-- Data for Name: gatunki; Type: TABLE DATA; Schema: projekt; Owner: u0haidukevich
--

COPY projekt.gatunki (id, nazwa, utworzono, zaktualizowano) FROM stdin;
1	Blues	2023-01-20 18:30:09.521824	\N
2	Country	2023-01-20 18:30:09.521824	\N
3	Dance	2023-01-20 18:30:09.521824	\N
4	Drum and bass	2023-01-20 18:30:09.521824	\N
5	Electronica	2023-01-20 18:30:09.521824	\N
6	Folk	2023-01-20 18:30:09.521824	\N
7	Funk	2023-01-20 18:30:09.521824	\N
8	Heavy Metal 	2023-01-20 18:30:09.521824	\N
9	Hip Hop	2023-01-20 18:30:09.521824	\N
10	Rap	2023-01-20 18:30:09.521824	\N
11	Muzyka klasyczna	2023-01-20 18:30:09.521824	\N
12	Pop	2023-01-20 18:30:09.521824	\N
13	Rave	2023-01-20 18:30:09.521824	\N
14	R&B	2023-01-20 18:30:09.521824	\N
15	Reggae	2023-01-20 18:30:09.521824	\N
16	Rock	2023-01-20 18:30:09.521824	\N
17	Rock and roll	2023-01-20 18:30:09.521824	\N
18	Soul	2023-01-20 18:30:09.521824	\N
19	Techno	2023-01-20 18:30:09.521824	\N
20	Trance	2023-01-20 18:30:09.521824	\N
21	K-pop	2023-01-20 18:30:09.521824	\N
22	J-pop	2023-01-20 18:48:08.349931	\N
23	Anime openings	2023-01-20 18:48:43.023254	\N
24	Indie	2023-01-20 20:44:55.321286	\N
25	Jam	2023-01-20 20:46:54.928486	\N
26	Burlesque	2023-01-20 20:47:13.950255	\N
27	G.Skrutghaeo;Grn	2023-01-20 20:47:20.256461	\N
28	K-Pop	2023-01-20 20:47:30.221948	\N
29	Co Kolwie	2023-01-20 20:50:12.383103	\N
30	Asd	2023-01-20 23:52:07.738957	\N
31	Dbfdfjhdyj	2023-01-21 00:17:04.505398	\N
32	Hytrhtgf	2023-01-21 00:29:02.775871	\N
33	Uvlugaerli	2023-01-21 02:48:37.988883	\N
\.


--
-- Data for Name: kraje; Type: TABLE DATA; Schema: projekt; Owner: u0haidukevich
--

COPY projekt.kraje (id, nazwa, utworzono, zaktualizowano) FROM stdin;
1	Afganistan	2023-01-20 16:05:48.16912	\N
2	Albania	2023-01-20 16:05:48.16912	\N
3	Algieria	2023-01-20 16:05:48.16912	\N
4	Andora	2023-01-20 16:05:48.16912	\N
5	Angola	2023-01-20 16:05:48.16912	\N
6	Antigua i Barbuda	2023-01-20 16:05:48.16912	\N
7	Arabia Saudyjska	2023-01-20 16:05:48.16912	\N
8	Argentyna	2023-01-20 16:05:48.16912	\N
9	Armenia	2023-01-20 16:05:48.16912	\N
10	Australia	2023-01-20 16:05:48.16912	\N
11	Austria	2023-01-20 16:05:48.16912	\N
12	Azerbejdżan	2023-01-20 16:05:48.16912	\N
13	Bahamy	2023-01-20 16:05:48.16912	\N
14	Bahrajn	2023-01-20 16:05:48.16912	\N
15	Bangladesz	2023-01-20 16:05:48.16912	\N
16	Barbados	2023-01-20 16:05:48.16912	\N
17	Belgia	2023-01-20 16:05:48.16912	\N
18	Belize	2023-01-20 16:05:48.16912	\N
19	Benin	2023-01-20 16:05:48.16912	\N
21	Bhutan	2023-01-20 16:05:48.16912	\N
22	Białoruś	2023-01-20 16:05:48.16912	\N
23	Boliwia	2023-01-20 16:05:48.16912	\N
24	Bośnia i Hercegowina	2023-01-20 16:05:48.16912	\N
25	Botswana	2023-01-20 16:05:48.16912	\N
26	Brunei	2023-01-20 16:05:48.16912	\N
27	Bułgaria	2023-01-20 16:05:48.16912	\N
28	Burkina Faso	2023-01-20 16:05:48.16912	\N
29	Burundi	2023-01-20 16:05:48.16912	\N
30	Chile	2023-01-20 16:05:48.16912	\N
31	Chiny	2023-01-20 16:05:48.16912	\N
32	Chorwacja	2023-01-20 16:05:48.16912	\N
33	Cypr	2023-01-20 16:05:48.16912	\N
34	Czad	2023-01-20 16:05:48.16912	\N
35	Czarnogóra	2023-01-20 16:05:48.16912	\N
36	Czechy	2023-01-20 16:05:48.16912	\N
37	Dania	2023-01-20 16:05:48.16912	\N
38	Demokratyczna Republika Konga	2023-01-20 16:05:48.16912	\N
39	Dominika	2023-01-20 16:05:48.16912	\N
40	Dominikana	2023-01-20 16:05:48.16912	\N
41	Dżibuti	2023-01-20 16:05:48.16912	\N
42	Egipt	2023-01-20 16:05:48.16912	\N
43	Ekwador	2023-01-20 16:05:48.16912	\N
44	Erytrea	2023-01-20 16:05:48.16912	\N
45	Estonia	2023-01-20 16:05:48.16912	\N
46	Etiopia	2023-01-20 16:05:48.16912	\N
47	Fidżi	2023-01-20 16:05:48.16912	\N
48	Filipiny	2023-01-20 16:05:48.16912	\N
49	Finlandia	2023-01-20 16:05:48.16912	\N
50	Francja	2023-01-20 16:05:48.16912	\N
51	Gabon	2023-01-20 16:05:48.16912	\N
52	Gambia	2023-01-20 16:05:48.16912	\N
53	Ghana	2023-01-20 16:05:48.16912	\N
54	Grecja	2023-01-20 16:05:48.16912	\N
55	Grenada	2023-01-20 16:05:48.16912	\N
56	Gruzja	2023-01-20 16:05:48.16912	\N
57	Gujana	2023-01-20 16:05:48.16912	\N
58	Gwatemala	2023-01-20 16:05:48.16912	\N
59	Gwinea	2023-01-20 16:05:48.16912	\N
60	Gwinea Bissau	2023-01-20 16:05:48.16912	\N
61	Gwinea Równikowa	2023-01-20 16:05:48.16912	\N
62	Haiti	2023-01-20 16:05:48.16912	\N
63	Hiszpania	2023-01-20 16:05:48.16912	\N
64	Holandia	2023-01-20 16:05:48.16912	\N
65	Honduras	2023-01-20 16:05:48.16912	\N
66	Indie	2023-01-20 16:05:48.16912	\N
67	Indonezja	2023-01-20 16:05:48.16912	\N
68	Irak	2023-01-20 16:05:48.16912	\N
69	Iran	2023-01-20 16:05:48.16912	\N
70	Irlandia	2023-01-20 16:05:48.16912	\N
71	Islandia	2023-01-20 16:05:48.16912	\N
72	Izrael	2023-01-20 16:05:48.16912	\N
73	Jamajka	2023-01-20 16:05:48.16912	\N
74	Japonia	2023-01-20 16:05:48.16912	\N
75	Jemen	2023-01-20 16:05:48.16912	\N
76	Jordania	2023-01-20 16:05:48.16912	\N
77	Kambodża	2023-01-20 16:05:48.16912	\N
78	Kamerun	2023-01-20 16:05:48.16912	\N
79	Kanada	2023-01-20 16:05:48.16912	\N
80	Katar	2023-01-20 16:05:48.16912	\N
81	Kazachstan	2023-01-20 16:05:48.16912	\N
82	Kenia	2023-01-20 16:05:48.16912	\N
83	Kirgistan	2023-01-20 16:05:48.16912	\N
84	Kiribati	2023-01-20 16:05:48.16912	\N
85	Kolumbia	2023-01-20 16:05:48.16912	\N
86	Komory	2023-01-20 16:05:48.16912	\N
87	Kongo	2023-01-20 16:05:48.16912	\N
88	Korea Południowa	2023-01-20 16:05:48.16912	\N
89	Korea Północna	2023-01-20 16:05:48.16912	\N
90	Kostaryka	2023-01-20 16:05:48.16912	\N
91	Kuba	2023-01-20 16:05:48.16912	\N
92	Kuwejt	2023-01-20 16:05:48.16912	\N
93	Laos	2023-01-20 16:05:48.16912	\N
94	Lesotho	2023-01-20 16:05:48.16912	\N
95	Liban	2023-01-20 16:05:48.16912	\N
96	Liberia	2023-01-20 16:05:48.16912	\N
97	Libia	2023-01-20 16:05:48.16912	\N
98	Liechtenstein	2023-01-20 16:05:48.16912	\N
99	Litwa	2023-01-20 16:05:48.16912	\N
100	Luksemburg	2023-01-20 16:05:48.16912	\N
101	Łotwa	2023-01-20 16:05:48.16912	\N
102	Macedonia	2023-01-20 16:05:48.16912	\N
103	Madagaskar	2023-01-20 16:05:48.16912	\N
104	Malawi	2023-01-20 16:05:48.16912	\N
105	Malediwy	2023-01-20 16:05:48.16912	\N
106	Malezja	2023-01-20 16:05:48.16912	\N
107	Mali	2023-01-20 16:05:48.16912	\N
108	Malta	2023-01-20 16:05:48.16912	\N
109	Maroko	2023-01-20 16:05:48.16912	\N
110	Mauretania	2023-01-20 16:05:48.16912	\N
111	Mauritius	2023-01-20 16:05:48.16912	\N
112	Meksyk	2023-01-20 16:05:48.16912	\N
113	Mikronezja	2023-01-20 16:05:48.16912	\N
114	Mjanma	2023-01-20 16:05:48.16912	\N
115	Mołdawia	2023-01-20 16:05:48.16912	\N
116	Monako	2023-01-20 16:05:48.16912	\N
117	Mongolia	2023-01-20 16:05:48.16912	\N
118	Mozambik	2023-01-20 16:05:48.16912	\N
119	Namibia	2023-01-20 16:05:48.16912	\N
120	Nauru	2023-01-20 16:05:48.16912	\N
121	Nepal	2023-01-20 16:05:48.16912	\N
122	Niemcy	2023-01-20 16:05:48.16912	\N
123	Niger	2023-01-20 16:05:48.16912	\N
124	Nigeria	2023-01-20 16:05:48.16912	\N
125	Nikaragua	2023-01-20 16:05:48.16912	\N
126	Norwegia	2023-01-20 16:05:48.16912	\N
127	Nowa Zelandia	2023-01-20 16:05:48.16912	\N
128	Oman	2023-01-20 16:05:48.16912	\N
129	Pakistan	2023-01-20 16:05:48.16912	\N
130	Palau	2023-01-20 16:05:48.16912	\N
131	Panama	2023-01-20 16:05:48.16912	\N
132	Papua-Nowa Gwinea	2023-01-20 16:05:48.16912	\N
133	Paragwaj	2023-01-20 16:05:48.16912	\N
134	Peru	2023-01-20 16:05:48.16912	\N
135	Polska	2023-01-20 16:05:48.16912	\N
136	Portugalia	2023-01-20 16:05:48.16912	\N
137	Południowa Afryka	2023-01-20 16:05:48.16912	\N
138	Republika Środkowoafrykańska	2023-01-20 16:05:48.16912	\N
139	Republika Zielonego Przylądka	2023-01-20 16:05:48.16912	\N
140	Rosja	2023-01-20 16:05:48.16912	\N
141	Rumunia	2023-01-20 16:05:48.16912	\N
142	Rwanda	2023-01-20 16:05:48.16912	\N
143	Saint Kitts i Nevis	2023-01-20 16:05:48.16912	\N
144	Saint Lucia	2023-01-20 16:05:48.16912	\N
145	Saint Vincent i Grenadyny	2023-01-20 16:05:48.16912	\N
146	Salwador	2023-01-20 16:05:48.16912	\N
147	Samoa	2023-01-20 16:05:48.16912	\N
148	San Marino	2023-01-20 16:05:48.16912	\N
149	Senegal	2023-01-20 16:05:48.16912	\N
150	Serbia	2023-01-20 16:05:48.16912	\N
151	Seszele	2023-01-20 16:05:48.16912	\N
152	Sierra Leone	2023-01-20 16:05:48.16912	\N
153	Singapur	2023-01-20 16:05:48.16912	\N
154	Słowacja	2023-01-20 16:05:48.16912	\N
155	Słowenia	2023-01-20 16:05:48.16912	\N
156	Somalia	2023-01-20 16:05:48.16912	\N
157	Sri Lanka	2023-01-20 16:05:48.16912	\N
158	Stany Zjednoczone	2023-01-20 16:05:48.16912	\N
159	Suazi	2023-01-20 16:05:48.16912	\N
160	Sudan	2023-01-20 16:05:48.16912	\N
161	Sudan Południowy	2023-01-20 16:05:48.16912	\N
162	Surinam	2023-01-20 16:05:48.16912	\N
163	Syria	2023-01-20 16:05:48.16912	\N
164	Szwajcaria	2023-01-20 16:05:48.16912	\N
165	Szwecja	2023-01-20 16:05:48.16912	\N
166	Tadżykistan	2023-01-20 16:05:48.16912	\N
167	Tajlandia	2023-01-20 16:05:48.16912	\N
168	Tanzania	2023-01-20 16:05:48.16912	\N
169	Timor Wschodni	2023-01-20 16:05:48.16912	\N
170	Togo	2023-01-20 16:05:48.16912	\N
171	Tonga	2023-01-20 16:05:48.16912	\N
172	Trynidad i Tobago	2023-01-20 16:05:48.16912	\N
173	Tunezja	2023-01-20 16:05:48.16912	\N
174	Turcja	2023-01-20 16:05:48.16912	\N
175	Turkmenistan	2023-01-20 16:05:48.16912	\N
176	Tuvalu	2023-01-20 16:05:48.16912	\N
177	Uganda	2023-01-20 16:05:48.16912	\N
178	Ukraina	2023-01-20 16:05:48.16912	\N
179	Urugwaj	2023-01-20 16:05:48.16912	\N
180	Uzbekistan	2023-01-20 16:05:48.16912	\N
181	Vanuatu	2023-01-20 16:05:48.16912	\N
182	Watykan	2023-01-20 16:05:48.16912	\N
183	Wenezuela	2023-01-20 16:05:48.16912	\N
184	Węgry	2023-01-20 16:05:48.16912	\N
185	Wielka Brytania	2023-01-20 16:05:48.16912	\N
186	Wietnam	2023-01-20 16:05:48.16912	\N
187	Włochy	2023-01-20 16:05:48.16912	\N
188	Wybrzeże Kości Słoniowej	2023-01-20 16:05:48.16912	\N
189	Wyspy Marshalla	2023-01-20 16:05:48.16912	\N
190	Wyspy Salomona	2023-01-20 16:05:48.16912	\N
191	Wyspy Św Tomasza i Książęca	2023-01-20 16:05:48.16912	\N
192	Zambia	2023-01-20 16:05:48.16912	\N
193	Zimbabwe	2023-01-20 16:05:48.16912	\N
194	Zjednoczone Emiraty	2023-01-20 16:05:48.16912	\N
\.


--
-- Data for Name: piesni; Type: TABLE DATA; Schema: projekt; Owner: u0haidukevich
--

COPY projekt.piesni (id, album_id, nazwa, ranking, utworzono, zaktualizowano) FROM stdin;
1	5	Never Gonna Give You Up	0	2023-01-20 23:59:59.293785	\N
2	5	Elegy for Dunkirk	0	2023-01-21 00:00:57.451622	\N
3	5	Lost in paradise	0	2023-01-21 00:04:56.517128	\N
4	7	in	0	2023-01-21 00:06:54.902502	\N
5	7	paradice	0	2023-01-21 00:07:51.350976	\N
6	7	ala	0	2023-01-21 00:07:58.55987	\N
7	7	ma	0	2023-01-21 00:08:03.36216	\N
8	7	kota	0	2023-01-21 00:08:08.598755	\N
9	8	singing	0	2023-01-21 00:29:57.500905	\N
10	8	in	0	2023-01-21 00:30:00.08185	\N
11	8	the	0	2023-01-21 00:30:02.478183	\N
12	8	rain	0	2023-01-21 00:30:09.220218	\N
13	4	sls	0	2023-01-21 01:40:40.45963	\N
14	9	j	0	2023-01-21 02:50:53.541878	\N
15	4	ala	0	2023-01-21 02:51:54.343855	\N
16	10	jryjgvfj	0	2023-01-21 17:01:57.697457	\N
\.


--
-- Data for Name: piesni_gatunki; Type: TABLE DATA; Schema: projekt; Owner: u0haidukevich
--

COPY projekt.piesni_gatunki (id, piesn_id, gatunek_id) FROM stdin;
\.


--
-- Data for Name: uzytkownicy; Type: TABLE DATA; Schema: projekt; Owner: u0haidukevich
--

COPY projekt.uzytkownicy (id, kraj_id, imie, utworzono, zaktualizowano) FROM stdin;
1	158	Sam Winchester	\N	\N
2	158	Sam Winchester	2023-01-20 16:47:14.926899	\N
3	12	Dean Winchester	2023-01-20 18:10:48.668522	\N
4	12	Ala Makota	2023-01-20 18:16:30.956345	\N
5	1	dima	2023-01-22 19:06:38.925961	\N
\.


--
-- Name: albumy albumy_pkey; Type: CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.albumy
    ADD CONSTRAINT albumy_pkey PRIMARY KEY (id);


--
-- Name: autorzy autorzy_pkey; Type: CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.autorzy
    ADD CONSTRAINT autorzy_pkey PRIMARY KEY (id);


--
-- Name: gatunki gatunki_pkey; Type: CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.gatunki
    ADD CONSTRAINT gatunki_pkey PRIMARY KEY (id);


--
-- Name: kraje kraje_pkey; Type: CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.kraje
    ADD CONSTRAINT kraje_pkey PRIMARY KEY (id);


--
-- Name: piesni piesni_pkey; Type: CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.piesni
    ADD CONSTRAINT piesni_pkey PRIMARY KEY (id);


--
-- Name: uzytkownicy uzytkownicy_pkey; Type: CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.uzytkownicy
    ADD CONSTRAINT uzytkownicy_pkey PRIMARY KEY (id);


--
-- Name: albumy albumy_autor_id_fkey; Type: FK CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.albumy
    ADD CONSTRAINT albumy_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES projekt.autorzy(id);


--
-- Name: autorzy autorzy_kraj_id_fkey; Type: FK CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.autorzy
    ADD CONSTRAINT autorzy_kraj_id_fkey FOREIGN KEY (kraj_id) REFERENCES projekt.kraje(id);


--
-- Name: piesni piesni_album_id_fkey; Type: FK CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.piesni
    ADD CONSTRAINT piesni_album_id_fkey FOREIGN KEY (album_id) REFERENCES projekt.albumy(id);


--
-- Name: piesni_gatunki piesni_gatunki_gatunek_id_fkey; Type: FK CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.piesni_gatunki
    ADD CONSTRAINT piesni_gatunki_gatunek_id_fkey FOREIGN KEY (gatunek_id) REFERENCES projekt.gatunki(id);


--
-- Name: piesni_gatunki piesni_gatunki_piesn_id_fkey; Type: FK CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.piesni_gatunki
    ADD CONSTRAINT piesni_gatunki_piesn_id_fkey FOREIGN KEY (piesn_id) REFERENCES projekt.piesni(id);


--
-- Name: uzytkownicy uzytkownicy_kraj_id_fkey; Type: FK CONSTRAINT; Schema: projekt; Owner: u0haidukevich
--

ALTER TABLE ONLY projekt.uzytkownicy
    ADD CONSTRAINT uzytkownicy_kraj_id_fkey FOREIGN KEY (kraj_id) REFERENCES projekt.kraje(id);


--
-- PostgreSQL database dump complete
--

