import express from 'express';
import { GetMovie, PostMovieById, GetMovieById, DeleteMovieById, EditMovieById } from "../GetMovie.js";
const router = express.Router();

router.route('/')
.get(async (request,response)=>{
    console.log(request.query);
    const filter = request.query;
    
    if(filter.rating){
        filter.rating = +(filter.rating);
    }

    let fmovie = await GetMovie(filter); //cursor to array
      response.send(fmovie);
})
.post(async (request, response) => {
    const data = request.body;
    const result = await PostMovieById(data);
    response.send(result);
})




router.route('/:id')
.delete(async (request,response)=>{
    const {id} = request.params;
    const result = await DeleteMovieById(id);
    const movie = await GetMovieById(id);
    result.deletedCount > 0 ? response.send(result) : response.send("No matching movie found");
})
.put(async (request,response)=>{
    const {id} = request.params;
    const data = request.body;
    const result = await EditMovieById(id, data);
    const movie = await GetMovieById(id);
    response.send(movie);
})
.get(async (request,response)=>{
    const {id} = request.params;
    const movie = await GetMovieById(id);
    movie ? response.send(movie) : response.send("No matching movie found");
})

export const moviesRouter = router;