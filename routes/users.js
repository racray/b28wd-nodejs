import express from 'express';
import { PostUsers,CheckUserName,genPassword} from "../Helper.js";
const router = express.Router();

router.route('/signup')
.post(async (request, response) => {

    const {username,password} = request.body;


    const userNameDB = await CheckUserName(username)

    if(userNameDB){

        response.status(400).send({message:"Username already exists"})
        return;

    }

    if(password.length<8){
        response.status(400).send({message:"Enter longer password"})
        return;
    }

    const hashPassword = await genPassword(password);
    console.log(hashPassword);

    const result = await PostUsers({username, password: hashPassword});
    response.send(result);
})
.get(async (request, response) => {

    const {username,password} = request.body;


    const userNameDB = await CheckUserName(username)

    if(userNameDB){

        response.status(400).send({message:"Username already exists"})
        return;

    }

    if(password.length<8){
        response.status(400).send({message:"Enter longer password"})
        return;
    }

    const hashPassword = await genPassword(password);
    console.log(hashPassword);

    const result = await PostUsers({username, password: hashPassword});
    response.send(result);
})





export const usersRouter = router;