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
"puchar lato 2024 okoń ryba zawody odra"),

("Mistrzostwa Wędkarzy 2024",
"Mistrzostwa wędkarzy 2024 odbyły się w lipcu nad rzeką Odra. Zwycięzcą został Michał Nowak, który złowił największego suma w historii.",
"images/event_2024_07_05_143212",
"2024-07-05 14:32:12",
"wędkarstwo mistrzostwa Odra suma ryba zawody"),

("Wędkowanie w październiku",
"W październiku wędkarze znów wracają nad Odrę, aby łowić w chłodniejszych wodach. Mimo zimnej pogody, złowiono wiele pięknych ryb.",
"images/event_2024_10_10_122050",
"2024-10-10 12:20:50",
"październik wędkarstwo Odra ryby jesień"),

("Zawody o Złotego Karpia",
"W tym roku odbyły się zawody o Złotego Karpia. Zwycięzca, Andrzej Kowalski, złowił rekordowego karpia ważącego ponad 10 kg!",
"images/event_2024_09_11_161210",
"2024-09-11 16:12:10",
"karp zawody wędkarstwo Odra 2024"),

("Wędkarze na wakacjach",
"Podczas letnich wakacji wędkarze wyruszyli na różne akweny wodne w poszukiwaniu najlepszych ryb. Pamiętajcie, aby zachować ostrożność podczas wypraw.",
"images/event_2024_08_10_110034",
"2024-08-10 11:00:34",
"wakacje wędkarstwo ryby jezioro podróże"),

("Rekordowa wędka w Odrze",
"Nowy rekord wędkarza, który złowił największą rybę na wędkę! Wędkarz używał specjalistycznego sprzętu, który pozwolił mu wyciągnąć 25-kilogramowego suma.",
"images/event_2024_05_23_204530",
"2024-05-23 20:45:30",
"rekord wędkarstwo Odra suma sprzęt"),

("Wędkarstwo na zimę",
"Chociaż zima jest tuż za rogiem, wielu wędkarzy nie rezygnuje z wypraw. Łowienie ryb w zimnych wodach to prawdziwe wyzwanie, ale dające satysfakcję.",
"images/event_2024_12_01_080059",
"2024-12-01 08:00:59",
"zima wędkarstwo ryby Odra"),

("Sezon na pstrągi",
"Sezon na pstrągi rozpoczął się z początkiem wiosny. Wędkarze uwielbiają ten okres, ponieważ pstrągi są szczególnie aktywne w chłodniejszych wodach.",
"images/event_2024_03_15_103220",
"2024-03-15 10:32:20",
"pstrąg wędkarstwo sezon wiosna"),

("Wędkowanie w górach",
"Nowy trend w wędkarstwie to wyprawy górskie. Wędkarze łowią w czystych strumieniach, gdzie można spotkać prawdziwe okazy.",
"images/event_2024_06_30_153410",
"2024-06-30 15:34:10",
"góry wędkarstwo ryby strumień"),

("Wędkarstwo na rzece Warta",
"Warta to kolejna rzeka, która przyciąga wędkarzy. W tym roku udało się złowić kilka rekordowych okazów ryb, w tym 15-kilogramowego karpia.",
"images/event_2024_09_25_190450",
"2024-09-25 19:04:50",
"Warta rzeka wędkarstwo karp ryby"),

("Mistrzostwa Młodych Wędkarzy",
"Zawody dla młodszych wędkarzy to już tradycja. W tym roku na mistrzostwach pojawiła się rekordowa liczba uczestników.",
"images/event_2024_07_14_130100",
"2024-07-14 13:01:00",
"młodsze wędkarstwo mistrzostwa młodzież Odra"),

("Zawody na jeziorze",
"W październiku odbyły się zawody wędkarskie na jeziorze Łaskotka. Uczestnicy walczyli o tytuł mistrza jeziora, a pierwsze miejsce zdobył Michał Nowak.",
"images/event_2024_10_20_182410",
"2024-10-20 18:24:10",
"jezioro zawody wędkarstwo woda")
;