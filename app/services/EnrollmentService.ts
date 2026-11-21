import { Enrollment } from "../models/EnrollmentModel";
import { EnrollmentRepository } from "../Repositories/EnrollmentRepository";

export class EnrollmentService {
    private readonly enrollmentrepository: EnrollmentRepository;

    constructor() {
        this.enrollmentrepository = new EnrollmentRepository();
    }



    async CreateEnrollment(data: Enrollment) {
        if (data.userId <= 0 || !Number.isInteger(data.userId)) {
            throw new Error("the user id must be number");
        }

        if (data.courseId <= 0 || !Number.isInteger(data.courseId)) {
            throw new Error("the course id must be greater than zero");
        }

        await this.enrollmentrepository.CreateEnrollment(data);
    }



    async getAllEnrollments() {
        return await this.enrollmentrepository.GetAllEnrollments();
    }


    async GetEnrollmentsBasedonUserId(userId: number) {
        if (userId <= 0 || !Number.isInteger(userId)) {
            throw new Error("the user id must be greater than zero");
        }

        return this.enrollmentrepository.GetEnrollmentsByUserId(userId);
    }



    async GetEnrollmentsBasedonCourseId(courseId: number) {
        if (courseId <= 0 || !Number.isInteger(courseId)) {
            throw new Error("the course id must be greater than zero");
        }

        return this.enrollmentrepository.GetEnrollmentsByCourseId(courseId);
    }


    async checkErollment(data: Enrollment) {
        if (data.userId <= 0 || !Number.isInteger(data.userId)) {
            throw new Error("the user id must be number");
        }

        if (data.courseId <= 0 || !Number.isInteger(data.courseId)) {
            throw new Error("the course id must be greater than zero");
        }

        return await this.enrollmentrepository.checkenrollment(data);

    }


    async deleteEnrollment(id:number){
        if(id<=0 || !Number.isInteger(id)){
            throw new Error("the id must be greater than zero");
        }

        await this.enrollmentrepository.deleteenrollment(id);
    }

}