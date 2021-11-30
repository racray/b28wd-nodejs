import { client } from "./index.js";

export async function GetMovie(filter) {
    return await client.db("b28wd").collection("movies").find(filter).toArray();
}
export async function PostMovieById(data) {
    return await client.db("b28wd").collection("movies").insertMany(data);
}
export async function GetMovieById(id) {
    return await client.db("b28wd").collection("movies").findOne({ id: id });
}
export async function DeleteMovieById(id) {
    return await client.db("b28wd").collection("movies").deleteOne({ id: id });
}
export async function EditMovieById(id, data) {
    return await client.db("b28wd").collection("movies").updateOne({ id: id }, { $set: data });
}
