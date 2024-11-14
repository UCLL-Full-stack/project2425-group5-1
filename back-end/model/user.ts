import Character from './character';
import {
    User as UserPrisma,
    Character as CharacterPrisma,
} from '@prisma/client';

export default class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private character?: Character;

    constructor(user: { id?: number; name: string; email: string; password: string, character?: Character }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.character = user.character;
    }
    
    static from({
        id,
        name,
        email,
        password,
        character,
    }: UserPrisma & { character?: CharacterPrisma | null }) {
        const userInstance = new User({ id, name, email, password });
        if (character) {
            userInstance.character = new Character({
                ...character,
                user: userInstance,
            });
        }
        return userInstance;
    }
    
    getId(): number | undefined {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getEmail(): string {
        return this.email;
    }
    getPassword(): string {
        return this.password;
    }

    getCharacter(): Character | undefined {
        return this.character;
    }

    validate(user: { id?: number; name: string; email: string; password: string }) {
        if (!user.name.trim()) {
            throw new Error('Name is required');
        }
        if (!user.email.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password.trim()) {
            throw new Error('Password is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.character === user.getCharacter()
        );
    }
}