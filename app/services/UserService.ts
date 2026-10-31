import { UserRepository } from "../Repositories/UsersRepository";
import { UserTable } from "../models/User";

export class UserService {
    private readonly Repository: UserRepository;

    constructor() {
        this.Repository = new UserRepository();
    }

    async CreateAndUpdateService(Userdetails: UserTable) {
        if (!Userdetails.Email.toLowerCase().endsWith('@gmail.com')) {
            throw new Error("Please enter a valid Gmail address");
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(Userdetails.password ?? "")) {
            throw new Error(
                "Password must contain 8 characters, uppercase, lowercase, number and special character"
            );
        }

        if (typeof Userdetails.IsAdmin !== "boolean") {
            throw new Error("IsAdmin must be true or false");
        }

        if (!Userdetails.Address || Userdetails.Address.trim().length < 5) {
            throw new Error("Address must contain at least 5 characters");
        }

        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(Userdetails.PhoneNo ?? "")) {
            throw new Error("Please enter a valid 10-digit Indian mobile number");
        }

        return await this.Repository.CreateAndUpdateUser(Userdetails);

    }


    async deleteservice(id: number) {
        if (id <= 0) {
            return "the id value is greater than zero"
        }

        return await this.Repository.DeleteUser(id);

    }

    async listofusersservice() {
        return await this.Repository.ListOfUsers();
    }

    async loginusers(id: number, email: string, password: string) {


        if (!email.toLowerCase().endsWith('@gmail.com')) {
            throw new Error("Please enter a valid Gmail address");
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password ?? "")) {
            throw new Error(
                "Password must contain 8 characters, uppercase, lowercase, number and special character"
            );
        }


        if (id <= 0) {
            return "The id must be less than Zero"
        }

        return await this.Repository.UserLogin(id, email, password);
    }


}