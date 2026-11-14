import { CourseTable } from "../models/Course";
import { CourseSection } from "../models/CourseSection";
import { PrismaClient } from "@prisma/client";

export class CourseSectionRepository {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }


    async CreateandupdateSection(data: CourseSection) {

        if (data.id) {
            const checkcourse = await this.prisma.course.findFirst({
                where: {
                    id: data.courseId,
                    isdeleted: false
                }
            });

            if (!checkcourse) {
                return "No Course is Found";
            }


            const updatesection = await this.prisma.courseSection.update({
                where: {
                    id: data.id,
                    isdeleted: false
                },
                data: {
                    title: data.title,
                    description: data.description,
                    videoUrl: data.videoUrl,
                    content: data.content
                }
            });

            return "Course section has been Updated";
        }
        else {
            const createsection = await this.prisma.courseSection.findFirst({
                where: {
                    courseId: data.courseId,
                    isdeleted: false
                },
                orderBy: {
                    order: "desc"
                }
            });

            const lastorder = (createsection?.order ?? 0) + 1;

            const section = await this.prisma.courseSection.create({
                data: {
                    courseId: data.courseId,
                    title: data.title,
                    description: data.description,
                    content: data.content,
                    videoUrl: data.videoUrl,
                    order: lastorder

                }
            })

            return "Course section has been Created";

        }


    }


    async getallsections() {
        const allsections = await this.prisma.courseSection.count({
            where: {
                isdeleted: false
            }
        });

        if (allsections <= 0) {
            return "the count must br greater than zero";
        }

        return await this.prisma.courseSection.findMany();

    }


    async getallsectionsbasedoncourseid(id: number) {
        const coursecheck = await this.prisma.course.findFirst({
            where: {
                id: id,
                isdeleted: false
            }
        });

        if (!coursecheck) {
            return "no course is found";
        }

        const courseallsections = await this.prisma.courseSection.findMany({
            where: {
                courseId: id,
                isdeleted: false
            },
            orderBy: {
                order: "asc"
            },
            include: {
                questions: true
            }
        })

        return courseallsections;
    }

    async GetSectionById(id:number){

        const checksectionid=await this.prisma.courseSection.findFirst({
            where:{
                id:id
            }
        })


        if(!checksectionid){
            return null;
        }



        const sections=await this.prisma.courseSection.findMany({
            where:{
                id:id,
                isdeleted:false
            },
            include:{
                course:true,
                questions:{
                    orderBy:{
                        order:"asc"
                    }
                }
            }
        })


        return sections;

    }


    async deletesections(id:number){

        const checksections=await this.prisma.courseSection.findFirst({
            where:{
                id:id,
                isdeleted:false
            }
        })

        if(!checksections){
            return null;
        }

        const deleteection=await this.prisma.courseSection.update({
            where:{
                id:id
            },
            data:{
                isdeleted:true
            }
        });

        return "Successfully deleted the section";

    }




    async ReorderSections(courseId: number, sectionIds: number[]) {

    return await this.prisma.$transaction(async (tx) => {

  
        const checkcourse = await tx.course.findFirst({
            where: {
                id: courseId,
                isdeleted: false
            }
        });

        if (!checkcourse) {
            return null;
        }

        // Check duplicate section IDs
        if (new Set(sectionIds).size !== sectionIds.length) {
            throw new Error("Duplicate section IDs are not allowed");
        }

        // Get all active sections
        const existingsections = await tx.courseSection.findMany({
            where: {
                courseId: courseId,
                isdeleted: false
            },
            select: {
                id: true,
                order: true
            }
        });

        // Validate that all active section IDs are provided
        const existingIds = existingsections
            .map(section => section.id)
            .sort((a, b) => a - b);

        const requestedIds = [...sectionIds]
            .sort((a, b) => a - b);

        if (
            existingIds.length !== requestedIds.length ||
            existingIds.some((id, index) => id !== requestedIds[index])
        ) {
            throw new Error("Invalid section IDs");
        }

        // Calculate temporary order values
        const maxOrder = existingsections.reduce(
            (max, section) => Math.max(max, section.order ?? 0),
            0
        );

        const offset = maxOrder + existingsections.length + 100;

        // Step 1: Assign temporary unique orders
        for (let i = 0; i < sectionIds.length; i++) {

            await tx.courseSection.update({
                where: {
                    id: sectionIds[i]
                },
                data: {
                    order: offset + i + 1
                }
            });
        }

        // Step 2: Assign final orders
        for (let i = 0; i < sectionIds.length; i++) {

            await tx.courseSection.update({
                where: {
                    id: sectionIds[i]
                },
                data: {
                    order: i + 1
                }
            });
        }

        // Return updated sections
        return await tx.courseSection.findMany({
            where: {
                courseId: courseId,
                isdeleted: false
            },
            orderBy: {
                order: "asc"
            }
        });

    });
}



}