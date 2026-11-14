import { CourseSectionRepository } from "../Repositories/CourseSectionsRepository";
import { CourseSection } from "../models/CourseSection";

export class CourseSectionService {

    private readonly SectionRepo: CourseSectionRepository;

    constructor() {
        this.SectionRepo = new CourseSectionRepository();
    }

    private validateId(id: number, name: string) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error(`The ${name} must be a valid positive integer`);
        }
    }

    async CreateandupdateSection(data: CourseSection) {

        this.validateId(data.courseId, "course ID");

        if (data.id !== undefined) {
            this.validateId(data.id, "section ID");
        }

        if (!data.title || data.title.trim().length === 0) {
            throw new Error("Section title is required");
        }

        if (!data.content || data.content.trim().length === 0) {
            throw new Error("Section content is required");
        }

        const result = await this.SectionRepo.CreateandupdateSection(data);

        if (result === "No Course is Found") {
            throw new Error(result);
        }

        return result;
    }

    async getallsections() {
        return await this.SectionRepo.getallsections();
    }

    async getallsectionsbasedoncourseid(courseId: number) {

        this.validateId(courseId, "course ID");

        const result = await this.SectionRepo.getallsectionsbasedoncourseid(courseId);

        if (result === "no course is found") {
            throw new Error("Course not found");
        }

        return result;
    }

    async GetSectionById(id: number) {

        this.validateId(id, "section ID");

        const result = await this.SectionRepo.GetSectionById(id);

        if (!result) {
            throw new Error("Section not found");
        }

        return result;
    }

    async deletesections(id: number) {

        this.validateId(id, "section ID");

        const result = await this.SectionRepo.deletesections(id);

        if (!result) {
            throw new Error("Section not found");
        }

        return result;
    }

    async ReorderSections(courseId: number, sectionIds: number[]) {

        this.validateId(courseId, "course ID");

        if (!Array.isArray(sectionIds) || sectionIds.length === 0) {
            throw new Error("Section IDs are required");
        }

        sectionIds.forEach(id => this.validateId(id, "section ID"));

        const result = await this.SectionRepo.ReorderSections(courseId, sectionIds);

        if (!result) {
            throw new Error("Course not found");
        }

        return result;
    }
}
