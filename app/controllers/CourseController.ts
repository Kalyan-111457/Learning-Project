import { CourseService } from "../services/CourseService";

import { CourseTable } from "../models/Course";
import { Body, Get, HttpCode, JsonController, Param, Post, QueryParam } from "routing-controllers";


@JsonController("/courses")
export class CourseController{
    private readonly service:CourseService;

    constructor(){
        this.service=new CourseService();
    }



    @Post("/createandupdatecourse")
    @HttpCode(200)
    async Createandupdatecourse(@Body() data:CourseTable){

        return this.service.Createandupdatethecourse(data);
    }

    @Post("/deletecourse/:id")
    @HttpCode(200)

    async deletecourse(@Param("id") id:number){
        return this.service.deletecourse(id);
    }


    @Get("/AllCourses")
    @HttpCode(200)
    async AllCourses(){
        return this.service.AllCourses();
    }

    @Post("/publishcourses")
    @HttpCode(200)
    async publishcoursebyid(@QueryParam("id") id :number){
        return this.service.publishcourse(id);
    }


    
}