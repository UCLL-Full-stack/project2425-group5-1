import {User as IUser } from '../types/index';

export class User {
    private id?: number;
    private username: string;
    private email: string;
    private password: string;

    constructor(user: IUser) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }
    getUsername(): string {
        return this.username;
    }
    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }
    
    validate(user: IUser): void {

        if (!user.username.trim()) {
            throw new Error('Username is required');
        }
        if (!user.email.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password.trim()) {
            throw new Error('Password is required');
        }
    }
}
