
import { CourseTable } from "../models/Course";
import { PrismaClient } from "@prisma/client";

export class CourseRepository {

    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

   
    async CreateAndUpdateCourse(data: CourseTable) {

        if (data.id) {

            const checking_records = await this.prisma.course.findFirst({
                where: {
                    id: data.id,
                    isdeleted: false
                }
            });

            if (!checking_records) {
                return null;
            }

            const updatecourse = await this.prisma.course.update({
                where: {
                    id: data.id
                },
                data: {
                    title: data.title,
                    description: data.description,
                    thumbnail: data.thumbnail,
                    level: data.level
                }
            });

            return updatecourse;
        }

        const CreateCourse = await this.prisma.course.create({
            data: {
                thumbnail: data.thumbnail,
                title: data.title,
                description: data.description,
                level: data.level ?? "Beginner"
            }
        });

        return CreateCourse;
    }

  
    async AllCourses() {

        const courses = await this.prisma.course.findMany({
            where: {
                isdeleted: false
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return courses;
    }

    async DeleteCourse(id: number) {

        const checkcourse = await this.prisma.course.findFirst({
            where: {
                id: id,
                isdeleted: false
            }
        });

        if (!checkcourse) {
            return null;
        }

        const deletecourse = await this.prisma.course.update({
            where: {
                id: id
            },
            data: {
                isdeleted: true
            }
        });

        return deletecourse;
    }

  
    async PublishCourse(id: number) {

        const checkcourse = await this.prisma.course.findFirst({
            where: {
                id: id,
                isdeleted: false
            }
        });

        if (!checkcourse) {
            return null;
        }

        if (checkcourse.isPublished) {
            return checkcourse;
        }

        const publishcourse = await this.prisma.course.update({
            where: {
                id: id
            },
            data: {
                isPublished: true
            }
        });

        return publishcourse;
    }

}
