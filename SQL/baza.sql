SELECT name, collation_name FROM sys.databases;

GO
ALTER DATABASE db_a98acf_tjakopec
SET
    SINGLE_USER
WITH
ROLLBACK IMMEDIATE;

GO ALTER DATABASE db_a98acf_tjakopec COLLATE Croatian_CI_AS;

GO ALTER DATABASE db_a98acf_tjakopec SET MULTI_USER;

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
        godinaIzdanja
    )
VALUES (
        'The Witcher 3',
        39.99,
        5,
        2015
    ),
    (
        'Cyberpunk 2077',
        59.99,
        5,
        2020
    ),
    (
        'Assassins Creed Valhalla',
        49.99,
        4,
        2020
    ),
    ('FIFA 23', 69.99, 3, 2022),
    ('Overwatch 2', 39.99, 6, 2022),
    ('Crysis 3', 29.99, 7, 2013),
    ('God of War', 59.99, 2, 2018),
    (
        'The Legend of Zelda: Breath of the Wild',
        59.99,
        1,
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