export declare class User {
    id: string;
    name: string;
    age: number;
    surname: string;
    email: string;
    constructor(id: string, name: string, age: number, surname: string, email: string);
}
export type userInput = Omit<User, 'id'>;
