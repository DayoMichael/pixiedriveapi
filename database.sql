CREATE DATABASE pixiedrive;

--Create a table
CREATE TABLE collections (
    collections_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--create the trigger
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON collections
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- insert value
INSERT INTO collections (name) 
VALUES ('buy milk') RETURNING *;

--get all values
SELECT * FROM collections

--get a value
SELECT * FROM collections WHERE collections_id = $1 