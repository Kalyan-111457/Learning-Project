import { SectionQuestionService } from "../services/SectionQuestionService";
import { SectionQuestion } from "../models/SectionQuestions";
import { Body, Get, HttpCode, JsonController, Param, Post } from "routing-controllers";


@JsonController("/questions")
export class SectionQuestionController {
    private readonly service: SectionQuestionService;

    constructor() {
        this.service = new SectionQuestionService();
    }

    @Post("/createandupdatequestion")
    @HttpCode(200)
    async Createandupdatequestion(@Body() data: SectionQuestion) {
        return this.service.Createandupdatequestion(data);
    }

    @Get("/AllQuestions")
    @HttpCode(200)
    async AllQuestions() {
        return this.service.GetAllQuestions();
    }

    @Get("/section/:sectionId")
    @HttpCode(200)
    async QuestionsBySection(@Param("sectionId") sectionId: number) {
        return this.service.GetQuestionsBySectionId(sectionId);
    }

    @Get("/:id")
    @HttpCode(200)
    async QuestionById(@Param("id") id: number) {
        return this.service.GetQuestionById(id);
    }

    @Post("/deletequestion/:id")
    @HttpCode(200)
    async deletequestion(@Param("id") id: number) {
        return this.service.deletequestion(id);
    }

    @Post("/reorder/:sectionId")
    @HttpCode(200)
    async reorder(@Param("sectionId") sectionId: number, @Body() body: { questionIds: number[] }) {
        return this.service.ReorderQuestions(sectionId, body.questionIds);
    }
}
