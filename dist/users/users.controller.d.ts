import { User, userInput } from './users.model';
import { UsersService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    insertUser(userObj: userInput): User;
    getAllUsers(): User[];
    getUserById(userId: string): User;
}
