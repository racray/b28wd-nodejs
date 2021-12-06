import express from 'express';
import { PostUsers,CheckUserName,genPassword} from "../Helper.js";
const router = express.Router();
import bcrypt from 'bcrypt';


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


router.route('/login')
.post(async (request, response)=>{
    const {username, password} = request.body;
    const userFromDB = await CheckUserName(username);
    if(!userFromDB){
        response.send({message:"Invalid credentials"})
        return;
    }
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password,storedPassword);
    if(isPasswordMatch){
        response.send({message:"Successfully logged in"})

    }else{
        response.send({message:"Invalid credentials"});
    }
})



export const usersRouter = router;