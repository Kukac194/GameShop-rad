SELECT name, collation_name FROM sys.databases;

GO
ALTER DATABASE db_aae4b9_kukac194
SET
    SINGLE_USER
WITH
ROLLBACK IMMEDIATE;

GO ALTER DATABASE db_aae4b9_kukac194 COLLATE Croatian_CI_AS;

GO ALTER DATABASE db_aae4b9_kukac194 SET MULTI_USER;

GO SELECT name, collation_name FROM sys.databases;

GO

CREATE TABLE drzava (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    naziv VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE proizvodac (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    ime VARCHAR(255) NOT NULL UNIQUE,
    drzavaId INT NOT NULL,
    FOREIGN KEY (drzavaId) REFERENCES drzava (id) ON DELETE CASCADE
);

CREATE TABLE igrica (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    naslov VARCHAR(255) NOT NULL UNIQUE,
    cijena DECIMAL(10, 2) NOT NULL,
    proizvodacId INT NOT NULL,
    slika VARCHAR(255) NOT NULL,
    godinaIzdanja INT NOT NULL,
    FOREIGN KEY (proizvodacId) REFERENCES proizvodac (id) ON DELETE CASCADE
);

CREATE TABLE recenzija (
    id INT NOT NULL PRIMARY KEY IDENTITY (1, 1),
    recenzija VARCHAR(255) NOT NULL UNIQUE,
    igricaId INT NOT NULL,
    FOREIGN KEY (igricaId) REFERENCES igrica (id) ON DELETE CASCADE
);

INSERT INTO
    drzava (naziv)
VALUES ('Hrvatska'),
    ('Sjedinjene Američke Države'),
    ('Japan'),
    ('Njemačka'),
    ('Francuska');

INSERT INTO
    proizvodac (ime, drzavaId)
VALUES ('Nintendo', 3),
    ('Sony', 3),
    ('Electronic Arts', 2),
    ('Ubisoft', 5),
    ('CD Projekt', 1),
    ('Blizzard', 2),
    ('Crytek', 4);

INSERT INTO
    igrica (
        naslov,
        cijena,
        proizvodacId,
        slika,
        godinaIzdanja
    )
VALUES (
        'The Witcher 3',
        39.99,
        5,
        'https://pbs.twimg.com/media/E531CN9WQAMmK-h.jpg',
        2015
    ),
    (
        'Cyberpunk 2077',
        59.99,
        5,
        'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2e28c8106320809.5f8d9ca886d3a.jpg',
        2020
    ),
    (
        'Assassins Creed Valhalla',
        49.99,
        4,
        'https://mir-s3-cdn-cf.behance.net/project_modules/1400/3dc99197430171.5ec4f32669f2f.jpg',
        2020
    ),
    (
        'FIFA 23',
        69.99,
        3,
        'https://assetsio.gnwcdn.com/fifa-main-2.png',
        2022
    ),
    (
        'Overwatch 2',
        39.99,
        6,
        'https://sahsponyexpress.com/wp-content/uploads/2022/10/overwatch-2-button-fin-1656022954568.jpg',
        2022
    ),
    (
        'Crysis 3',
        29.99,
        7,
        'https://assets-prd.ignimgs.com/2021/12/30/crysis-3-button-1640896543145.jpg',
        2013
    ),
    (
        'God of War',
        59.99,
        2,
        'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/05/God-of-War-Ragnarok.jpeg',
        2018
    ),
    (
        'The Legend of Zelda: Breath of the Wild',
        59.99,
        1,
        'https://cdn.mobygames.com/covers/8437192-the-legend-of-zelda-breath-of-the-wild-nintendo-switch-front-cov.jpg',
        2017
    );

INSERT INTO
    recenzija (recenzija, igricaId)
VALUES (
        'Remek-djelo sa zadivljujućom pričom i vizualima.',
        1
    ),
    (
        'Ambiciozna igra s tehničkim nedostacima.',
        2
    ),
    (
        'Zanimljiva igra s bogatim povijesnim detaljima.',
        3
    ),
    (
        'Najbolja nogometna simulacija ikad!',
        4
    ),
    (
        'Brza i izrazito natjecateljska timska pucačina.',
        5
    ),
    (
        'Vizualno impresivna, ali nedostaje joj dubine.',
        6
    ),
    (
        'Kinematografsko remek-djelo s izvrsnim borbenim sustavom.',
        7
    ),
    (
        'Jedna od najboljih igara otvorenog svijeta ikad stvorena.',
        8
    );