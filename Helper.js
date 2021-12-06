import { client } from "./index.js";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';

export async function GetMovie(filter) {
    return await client.db("b28wd").collection("movies").find(filter).toArray();
}
export async function PostMovieById(data) {
    return await client.db("b28wd").collection("movies").insertOne(data);
}



export async function PostUsers(data) {
    return await client.db("b28wd").collection("users").insertOne(data);
}
export async function CheckUserName(username) {
    return await client.db("b28wd").collection("users").findOne({ username: username });
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

export async function genPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashPassword = await bcrypt.hash(password,salt);
    console.log(hashPassword);
    return hashPassword;
}

