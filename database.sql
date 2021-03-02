CREATE DATABASE pixiedrive;

--Create a table
CREATE TABLE collections (
    collections_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE collectionsets (
    name VARCHAR (255),
    collections_id SMALLINT, 
    set_id SERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE images (
    name VARCHAR (255),
    path VARCHAR (255),
    set_id SMALLINT,
    image_id SERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--create the trigger
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON collections
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON collectionsets
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON images
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- insert value
INSERT INTO images (name) 
VALUES ('buy milk') RETURNING *;

--get all values
SELECT * FROM collections

--get a value
SELECT * FROM collections WHERE collections_id = $1 

--drop a table
DROP Table [IF EXISTS] images
[CASCADE | RESTRICT];

DROP Table images;

