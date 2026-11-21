
import { PrismaClient } from "@prisma/client";
import { Enrollment } from "../models/EnrollmentModel";

export class EnrollmentRepository {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // 1. Create Enrollment
    async CreateEnrollment(data: Enrollment) {

        // Check user
        const usercheck = await this.prisma.user.findFirst({
            where: {
                id: data.userId,
                isdeleted: false
            }
        });

        if (!usercheck) {
            return null;
        }

        // Check course
        const coursecheck = await this.prisma.course.findFirst({
            where: {
                id: data.courseId,
                isdeleted: false,
                isPublished: true
            }
        });

        if (!coursecheck) {
            return null;
        }

        // Check existing enrollment
        const existingEnrollment = await this.prisma.enrollment.findFirst({
            where: {
                userId: data.userId,
                courseId: data.courseId,
                isdeleted: false
            }
        });

        if (existingEnrollment) {
            return null;
        }

        // Create enrollment
        const create = await this.prisma.enrollment.create({
            data: {
                userId: data.userId,
                courseId: data.courseId
            },
            include: {
                user: true,
                course: true
            }
        });

        return create;
    }


    async GetAllEnrollments() {

        const allenrollments = await this.prisma.enrollment.findMany({
            where: {
                isdeleted: false
            },
            include: {
                user: true,
                course: true
            },
            orderBy: {
                enrolledAt: "desc"
            }
        });

        return allenrollments;
    }


    async GetEnrollmentsByUserId(userId: number) {

        const checkuserexist = await this.prisma.user.findFirst({
            where: {
                id: userId,
                isdeleted: false
            }
        });

        if (!checkuserexist) {
            return null;
        }

        const getenrollmentsbyuserid =
            await this.prisma.enrollment.findMany({
                where: {
                    userId: userId,
                    isdeleted: false
                },
                include: {
                    course: true
                },
                orderBy: {
                    enrolledAt: "desc"
                }
            });

        return getenrollmentsbyuserid;
    }


    async GetEnrollmentsByCourseId(courseId: number) {

        const coursecheck = await this.prisma.course.findFirst({
            where: {
                id: courseId,
                isdeleted: false
            }
        });

        if (!coursecheck) {
            return null;
        }

        const allcourseenrollments =
            await this.prisma.enrollment.findMany({
                where: {
                    courseId: courseId,
                    isdeleted: false
                },
                include: {
                    user: true
                },
                orderBy: {
                    enrolledAt: "desc"
                }
            });

        return allcourseenrollments;
    }


    async checkenrollment(data: Enrollment) {

        const userexist = await this.prisma.user.findFirst({
            where: {
                id: data.userId,
                isdeleted: false
            }
        });

        const course = await this.prisma.course.findFirst({
            where: {
                id: data.courseId,
                isdeleted: false
            }
        });

        if (!userexist || !course) {
            return null;
        }

        const checkenrollment =
            await this.prisma.enrollment.findFirst({
                where: {
                    userId: data.userId,
                    courseId: data.courseId,
                    isdeleted: false
                }
            });

        return checkenrollment;
    }


    async deleteenrollment(id: number) {

        const checkidexist = await this.prisma.enrollment.findFirst({
            where: {
                id: id,
                isdeleted: false
            }
        });

        if (!checkidexist) {
            return null;
        }

        const update = await this.prisma.enrollment.update({
            where: {
                id: id
            },
            data: {
                isdeleted: true
            }
        });

        return update;
    }
}
