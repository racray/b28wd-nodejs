import express from 'express';
import { PostUsers,CheckUserName,genPassword} from "../Helper.js";
const router = express.Router();
import bcrypt from 'bcrypt';


router.route('/signup')
.post(async (request, response) => {

    const {username,password,firstName,lastName} = request.body;


    const userNameDB = await CheckUserName(username)

    if(userNameDB){

        response.status(400).send({message:"Username already exists"})
        return;

    }

    const hashPassword = await genPassword(password);
    console.log(hashPassword);

    const result = await PostUsers({username, password: hashPassword,firstName,lastName});
    response.send(result);
})


router.route('/login')
.post(async (request, response)=>{
    const {username, password} = request.body;
    const userFromDB = await CheckUserName(username);
    if(!userFromDB){
        response.status(400).send({message:"Invalid credentials"})
        return;
    }
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password,storedPassword);
    if(isPasswordMatch){
        response.send({message:"Successfully logged in"})

    }else{
        response.status(400).send({message:"Invalid credentials"});
    }
})

router.route('/forgotpass')
.post(async (request, response)=>{
    const {username} = request.body;
    const userFromDB = await CheckUserName(username);
    if(!userFromDB){
        response.status(400).send({message:"Invalid Username"})
        return;
    }else{
        response.send({message:"Proceeding to login"})
 
    }




})




export const usersRouter = router;