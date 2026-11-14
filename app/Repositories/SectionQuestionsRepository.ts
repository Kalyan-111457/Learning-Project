import { SectionQuestion } from "../models/SectionQuestions";
import { PrismaClient } from "@prisma/client";


export class SectionQuestionRepository {
    private readonly prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }


    async Createandupdatequestion(data: SectionQuestion) {

        if (data.id) {
            const checkindatabase = await this.prisma.sectionQuestion.findFirst({
                where: {
                    id: data.id,
                    isdeleted: false
                }
            })


            if (!checkindatabase) {
                return null;
            }

            const update = await this.prisma.sectionQuestion.update({
                where: {
                    id: data.id
                },
                data: {
                    question: data.question,
                    answer: data.answer,
                    order: data.order
                }
            })

            return "Sucessfully Updated";
        }

        else {
            const checksection = await this.prisma.courseSection.findFirst({
                where: {
                    id: data.sectionId,
                    isdeleted: false
                }
            })

            if (!checksection) {
                return null;
            }


            const lastorder = await this.prisma.sectionQuestion.findFirst({
                where: {
                    sectionId: data.sectionId,
                    isdeleted: false
                },
                orderBy: {
                    order: "desc"
                }
            })


            const lastorders = lastorder?.order ?? 0;

            const nextorder = lastorders + 1;

            const create = await this.prisma.sectionQuestion.create({
                data: {
                    sectionId: data.sectionId,
                    answer: data.answer,
                    question: data.question,
                    order: nextorder
                }
            })


            return "Sucessfully Created";
        }

    }



    async GetAllQuestions() {
        const allquestions = await this.prisma.sectionQuestion.count({
            where: {
                isdeleted: false
            }
        });


        if (allquestions <= 0) {
            return "There is no questions";
        }

        const result = await this.prisma.sectionQuestion.findMany({
            where: {
                isdeleted: false
            },
            orderBy: [
                {
                    sectionId: "asc"
                },
                {
                    order: "asc"
                }
            ],
            include: {
                section: true
            }
        })

        return result;
    }



    async deletequestion(id: number) {
        const checkquestion = await this.prisma.sectionQuestion.findFirst({
            where: {
                id: id,
                isdeleted: false
            }
        })

        if (!checkquestion) {
            return null;
        }

        await this.prisma.sectionQuestion.update({
            where: {
                id: id
            },
            data: {
                isdeleted: true
            }
        })

        return "Deleted Sucessfully";

    }


    async GetQuestionsBySectionId(sectionid: number) {
        const sectioncheck = await this.prisma.courseSection.findFirst({
            where: {
                id: sectionid,
                isdeleted: false
            }
        })


        if (!sectioncheck) {
            return "no section is found"
        }

        const getresult = await this.prisma.sectionQuestion.findMany({
            where: {
                sectionId: sectionid, isdeleted: false
            },
            orderBy: {
                order: "asc"
            }
        });

        return getresult;
    }



    async GetQuestionById(id:number){
        return await this.prisma.sectionQuestion.findFirst({
            where:{
                id:id,
                isdeleted:false
            }
        });
    }




    async ReorderQuestions(sectionId: number, questionIds: number[]) {

    return await this.prisma.$transaction(async (tx) => {

        const checksection = await tx.courseSection.findFirst({
            where: {
                id: sectionId,
                isdeleted: false
            }
        });

        if (!checksection) {
            return null;
        }

        if (new Set(questionIds).size !== questionIds.length) {
            throw new Error("Duplicate question IDs");
        }

        const existingquestions = await tx.sectionQuestion.findMany({
            where: {
                sectionId: sectionId,
                isdeleted: false
            },
            select: {
                id: true,
                order: true
            }
        });

        const existingIds = existingquestions
            .map(q => q.id)
            .sort((a, b) => a - b);

        const requestedIds = [...questionIds]
            .sort((a, b) => a - b);

        if (
            existingIds.length !== requestedIds.length ||
            existingIds.some((id, index) => id !== requestedIds[index])
        ) {
            throw new Error("Invalid question IDs");
        }

        const maxOrder = existingquestions.reduce(
            (max, q) => Math.max(max, q.order ?? 0),
            0
        );

        const offset = maxOrder + existingquestions.length + 100;

        // Temporary order
        for (let i = 0; i < questionIds.length; i++) {
            await tx.sectionQuestion.update({
                where: {
                    id: questionIds[i]
                },
                data: {
                    order: offset + i + 1
                }
            });
        }

        // Final order
        for (let i = 0; i < questionIds.length; i++) {
            await tx.sectionQuestion.update({
                where: {
                    id: questionIds[i]
                },
                data: {
                    order: i + 1
                }
            });
        }

        return await tx.sectionQuestion.findMany({
            where: {
                sectionId: sectionId,
                isdeleted: false
            },
            orderBy: {
                order: "asc"
            }
        });

    });
}














}