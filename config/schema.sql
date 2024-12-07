CREATE SCHEMA IF NOT EXISTS odrzanski_feeder;

USE odrzanski_feeder;

CREATE TABLE IF NOT EXISTS articles(
	id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    content TEXT,
    gallery_path VARCHAR(255),
    creation_date DATETIME,
    meta_keywords VARCHAR(255)
);

INSERT INTO articles(name, content, gallery_path, creation_date, meta_keywords)
VALUES
("Zawody z okazji dnia dziecka",
"W dniu 1 czerwca odbyły się zawody z okazji dnia dziecka. W zawodach wzięło udział 40 uczestników. Pierwsze miejsce zajął Jan Kowalski, drugie Adam Nowak i trzecie Marta Grosicka. Gratulujemy!",
"images/event_2024_08_24_072356",
"2024-08-24 07:23:56",
"fishing wędkarstwo okoń ryba zawody odra"),

("Puchar Odry 2024",
"W ubiegły weekend odbyły się zawody o puchar Odry 2024. W zawodach nikt nie wziął udziału i nikomu nie gratulujemy!",
"images/event_2024_10_15_225604",
"2024-10-15 22:56:04",
"puchar lato 2024 okoń ryba zawody odra");