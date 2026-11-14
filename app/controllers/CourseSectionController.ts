import { CourseSectionService } from "../services/CourseSectionService";
import { CourseSection } from "../models/CourseSection";
import { Body, Get, HttpCode, JsonController, Param, Post } from "routing-controllers";


@JsonController("/sections")
export class CourseSectionController {
    private readonly service: CourseSectionService;

    constructor() {
        this.service = new CourseSectionService();
    }

    @Post("/createandupdatesection")
    @HttpCode(200)
    async Createandupdatesection(@Body() data: CourseSection) {
        return this.service.CreateandupdateSection(data);
    }

    @Get("/AllSections")
    @HttpCode(200)
    async AllSections() {
        return this.service.getallsections();
    }

    @Get("/course/:courseId")
    @HttpCode(200)
    async SectionsByCourse(@Param("courseId") courseId: number) {
        return this.service.getallsectionsbasedoncourseid(courseId);
    }

    @Get("/:id")
    @HttpCode(200)
    async SectionById(@Param("id") id: number) {
        return this.service.GetSectionById(id);
    }

    @Post("/deletesection/:id")
    @HttpCode(200)
    async deletesection(@Param("id") id: number) {
        return this.service.deletesections(id);
    }

    @Post("/reorder/:courseId")
    @HttpCode(200)
    async reorder(@Param("courseId") courseId: number, @Body() body: { sectionIds: number[] }) {
        return this.service.ReorderSections(courseId, body.sectionIds);
    }
}
