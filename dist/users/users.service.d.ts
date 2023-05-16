import { User, userInput } from './users.model';
export declare class UsersService {
    private users;
    insertUser({ age, email, surname, name }: userInput): User;
    getAllUsers(): User[];
    getUserById(userId: string): User;
}
