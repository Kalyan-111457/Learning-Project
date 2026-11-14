
import { CourseRepository } from "../Repositories/CourseRepository";
import { CourseTable } from "../models/Course";

export class CourseService {

    private readonly CourseRepo: CourseRepository;

    constructor() {
        this.CourseRepo = new CourseRepository();
    }

  
    async AllCourses() {
        return await this.CourseRepo.AllCourses();
    }


    async deletecourse(id: number) {

        if (id <= 0 || !Number.isInteger(id)) {
            throw new Error("The ID must be a valid positive integer");
        }

        const result = await this.CourseRepo.DeleteCourse(id);

        if (!result) {
            throw new Error("Course not found");
        }

        return result;
    }

  
    async publishcourse(id: number) {

        if (id <= 0 || !Number.isInteger(id)) {
            throw new Error("The ID must be a valid positive integer");
        }

        const result = await this.CourseRepo.PublishCourse(id);

        if (!result) {
            throw new Error("Course not found");
        }

        return result;
    }

  
    async Createandupdatethecourse(data: CourseTable) {

        if (!data.title || data.title.trim().length === 0) {
            throw new Error("Course title is required");
        }

        if (!data.description || data.description.trim().length === 0) {
            throw new Error("Course description is required");
        }

        if (data.id !== undefined && 
            (!Number.isInteger(data.id) || data.id <= 0)) {
            throw new Error("Invalid course ID");
        }

        const result = await this.CourseRepo.CreateAndUpdateCourse(data);

        if (!result) {
            throw new Error("Course not found");
        }

        return result;
    }

}
