export const colquery = {
    post: "INSERT INTO collections (name) VALUES ($1) RETURNING *",
    getall:"SELECT * FROM collections",
    getone: "SELECT * FROM collections WHERE collections_id = $1" ,
    put: "UPDATE collections SET name = $1 WHERE collections_id = $2",
    delete: "DELETE FROM collections WHERE collections_id = $1"  
}

export const imgquery = {
    post:"INSERT INTO images (name, path, set_id ) VALUES ($1, $2, $3) RETURNING * ",
    getall: "SELECT * FROM images WHERE set_id = $1",
    getone: "SELECT * FROM images WHERE image_id = $1",
    put: "UPDATE images SET name = $1 , path = $2 WHERE image_id = $3",
    delete: "DELETE FROM images WHERE image_id = $1 "
}

export const setquery = {
    post: "INSERT INTO collectionsets (name, collections_id) VALUES ($1, $2) RETURNING * ",
    getall: "SELECT * FROM collectionsets",
    getone: "SELECT * FROM collectionsets WHERE set_id = $1",
    put: "UPDATE collectionsets SET name = $1 WHERE collections_id = $2 AND set_id = $3 RETURNING * ",
    delete: "DELETE FROM collectionsets WHERE set_id = $1"
}