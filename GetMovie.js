import { client } from "./index.js";
import { ObjectId } from "mongodb";

export async function GetMovie(filter) {
    return await client.db("b28wd").collection("movies").find(filter).toArray();
}
export async function PostMovieById(data) {
    return await client.db("b28wd").collection("movies").insertOne(data);
}
export async function GetMovieById(id) {
    return await client.db("b28wd").collection("movies").findOne({ _id: ObjectId(id) });
}
export async function DeleteMovieById(id) {
    return await client.db("b28wd").collection("movies").deleteOne({ _id: ObjectId(id) });
}
export async function EditMovieById(id, data) {
    return await client.db("b28wd").collection("movies").updateOne({ _id: ObjectId(id) }, { $set: data });
}
