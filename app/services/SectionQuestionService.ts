import { SectionQuestionRepository } from "../Repositories/SectionQuestionsRepository";
import { SectionQuestion } from "../models/SectionQuestions";

export class SectionQuestionService {

    private readonly QuestionRepo: SectionQuestionRepository;

    constructor() {
        this.QuestionRepo = new SectionQuestionRepository();
    }

    private validateId(id: number, name: string) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error(`The ${name} must be a valid positive integer`);
        }
    }

    async Createandupdatequestion(data: SectionQuestion) {

        this.validateId(data.sectionId, "section ID");

        if (data.id !== undefined) {
            this.validateId(data.id, "question ID");
        }

        if (!data.question || data.question.trim().length === 0) {
            throw new Error("Question is required");
        }

        if (!data.answer || data.answer.trim().length === 0) {
            throw new Error("Answer is required");
        }

        const result = await this.QuestionRepo.Createandupdatequestion(data);

        if (!result) {
            throw new Error(data.id ? "Question not found" : "Section not found");
        }

        return result;
    }

    async GetAllQuestions() {
        return await this.QuestionRepo.GetAllQuestions();
    }

    async GetQuestionsBySectionId(sectionId: number) {

        this.validateId(sectionId, "section ID");

        const result = await this.QuestionRepo.GetQuestionsBySectionId(sectionId);

        if (result === "no section is found") {
            throw new Error("Section not found");
        }

        return result;
    }

    async GetQuestionById(id: number) {

        this.validateId(id, "question ID");

        const result = await this.QuestionRepo.GetQuestionById(id);

        if (!result) {
            throw new Error("Question not found");
        }

        return result;
    }

    async deletequestion(id: number) {

        this.validateId(id, "question ID");

        const result = await this.QuestionRepo.deletequestion(id);

        if (!result) {
            throw new Error("Question not found");
        }

        return result;
    }

    async ReorderQuestions(sectionId: number, questionIds: number[]) {

        this.validateId(sectionId, "section ID");

        if (!Array.isArray(questionIds) || questionIds.length === 0) {
            throw new Error("Question IDs are required");
        }

        questionIds.forEach(id => this.validateId(id, "question ID"));

        const result = await this.QuestionRepo.ReorderQuestions(sectionId, questionIds);

        if (!result) {
            throw new Error("Section not found");
        }

        return result;
    }
}
