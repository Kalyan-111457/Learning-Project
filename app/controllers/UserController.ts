import { UserService } from "../services/UserService";
import { UserTable } from "../models/User";
import { Body, HttpCode, JsonController, Param, Post, QueryParam } from "routing-controllers";


@JsonController("/Users")

export class UserController {

    private readonly UserService: UserService


    constructor() {
        this.UserService = new UserService();

    }


    @HttpCode(200)
    @Post("/CreateAndUpdate")
    async CreateAndUpdateUser(@Body() User:UserTable){
        return this.UserService.CreateAndUpdateService(User);
    }


    @HttpCode(200)
    @Post("/DeleteUser/:id")
    async DeleteUser(@Param("id") id:number){
        return this.UserService.deleteservice(id)
    }


    @HttpCode(200)
    @Post("/ListOfUsers")
    async ListOfUsers(){
        return this.UserService.listofusersservice();
    }


    @HttpCode(200)
    @Post("/Login")
    async LoginUser(@QueryParam("id") id:number,@QueryParam("email") email:string,@QueryParam("password") password:string){
        return this.UserService.loginusers(id,email,password);
    }


}