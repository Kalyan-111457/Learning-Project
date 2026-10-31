import { UserTable } from "../models/User";
import { PrismaClient } from "@prisma/client";

export class UserRepository {
    private readonly Prisma: PrismaClient;

    constructor() {
        this.Prisma = new PrismaClient();
    }

    async CreateAndUpdateUser(UserDetails: UserTable) {

        if (UserDetails.id) {

            //Updation doing

            const check = await this.Prisma.user.findFirst({
                where: {
                    id: UserDetails.id,
                    isdeleted: true
                }
            }
            )

            if (!check) {
                return "No User if Found"
            }

            const checkemailandphone = await this.Prisma.user.findFirst({
                where: {
                    AND: [
                        {
                            OR:
                                [
                                    {
                                        Email: UserDetails.Email,

                                    },

                                    {
                                        PhoneNo: UserDetails.PhoneNo
                                    }
                                ]

                        },
                        {
                            NOT: {
                                id: UserDetails.id
                            }
                        }
                    ]
                }
            })


            if (!checkemailandphone) {
                return "Please Try another email id and phone no .because same email id and phone no is already present"
            }

            const updatedata = await this.Prisma.user.update({
                where: {
                    id: UserDetails.id
                },
                data: {
                    fullname: UserDetails.fullname,
                    Email: UserDetails.Email,
                    password: UserDetails.password,
                    Address: UserDetails.Address,
                    PhoneNo: UserDetails.PhoneNo
                }
            })

            return "data has been updated Successfully"

        }

        const CreateNewUseremailandphonenocheck = await this.Prisma.user.findFirst({
            where: {
                Email: UserDetails.Email,
                PhoneNo: UserDetails.PhoneNo
            },
        })

        if (!CreateNewUseremailandphonenocheck) {
            return "Please try another email or phone no please check "
        }

        const createuser = await this.Prisma.user.create({
            data: {
                fullname: UserDetails.fullname,
                Email: UserDetails.Email,
                password: UserDetails.password,
                Address: UserDetails.Address,
                PhoneNo: UserDetails.PhoneNo,
                isdeleted: false
            }
        })

        return "User has been Created  SuccessFully"

    }

    async DeleteUser(id: number) {
        const checkuserexist = await this.Prisma.user.findFirst({
            where: {
                id: id
            }
        })


        if (!checkuserexist) {
            return "No User Has Been Found"
        }

        const deleteuser = await this.Prisma.user.update({
            where: {
                id: id
            },
            data: {
                isdeleted: true
            }
        })

        return "User has Been Deleted"
    }


    async ListOfUsers(): Promise<number | UserTable[] | string> {
        const UsersCount = await this.Prisma.user.count();

        if (UsersCount <= 0) {
            return "No Users Has Been Found"
        }

        const allusers = await this.Prisma.user.findMany();

        return allusers;
    }


    async UserLogin(id: number, Email: string, password: string) {

        const checkuserexist = await this.Prisma.user.findFirst({
            where: {
                AND: [
                    {
                        id: id,

                    },
                    {
                        Email: Email,
                    },
                    {
                        password: password
                    },
                    {
                        isdeleted: false
                    }

                ]
            }
        })

        if (!checkuserexist) {
            return "User Was Not Found"
        }

        return "User has Been SuccessFull Login"

    }
}