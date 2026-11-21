import { EnrollmentService } from "../services/EnrollmentService";
import { Enrollment } from "../models/EnrollmentModel";
import { Body, Get, HttpCode, JsonController, Param, Post } from "routing-controllers";


@JsonController("/enrollments")
export class EnrollmentController {
    private readonly service: EnrollmentService;

    constructor() {
        this.service = new EnrollmentService();
    }

    @Post("/createenrollment")
    @HttpCode(200)
    async CreateEnrollment(@Body() data: Enrollment) {
        return this.service.CreateEnrollment(data);
    }

    @Get("/AllEnrollments")
    @HttpCode(200)
    async AllEnrollments() {
        return this.service.getAllEnrollments();
    }

    @Get("/user/:userId")
    @HttpCode(200)
    async EnrollmentsByUser(@Param("userId") userId: number) {
        return this.service.GetEnrollmentsBasedonUserId(userId);
    }

    @Get("/course/:courseId")
    @HttpCode(200)
    async EnrollmentsByCourse(@Param("courseId") courseId: number) {
        return this.service.GetEnrollmentsBasedonCourseId(courseId);
    }

    @Post("/checkenrollment")
    @HttpCode(200)
    async CheckEnrollment(@Body() data: Enrollment) {
        return this.service.checkErollment(data);
    }

    @Post("/deleteenrollment/:id")
    @HttpCode(200)
    async deleteEnrollment(@Param("id") id: number) {
        return this.service.deleteEnrollment(id);
    }
}
