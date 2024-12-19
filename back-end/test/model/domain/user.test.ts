import { Character } from "../../../model/character";
import { User } from "../../../model/user";

test('given: valid values for user, when: user is created, then: user is created with those values.', () => {
    // Given
    const id: number = 1;
    const username: string = 'John Doe';
    const email: string = 'john.doe@example.com';
    const password: string = 'password123';
    const character = new Character({
        name: 'Warrior John',
        level: 10,
        xp: 1000,
        strength: 15,
        speed: 10,
        magic: 5,
        dexterity: 12,
        healthPoints: 150,
        manaPoints: 30,
        luck: 8,
        defense: 12,
        magicDefense: 6,
        progress: 'In Progress',
        class: "Warrior",     
      });
    // When
    const user: User = new User({
        id: id,
        name: username,
        email: email,
        password: password,
        character: character,
    });

    // Then
    expect(user.id).toEqual(id);
    expect(user.name).toEqual(username);
    expect(user.email).toEqual(email);
    expect(user.password).toEqual(password);
    expect(user.character).toEqual(character);
});






 
//test('given: empty name, when: user is created, then: throws error', () => {
//    // Given
//    const username: string = '';
//    const email: string = 'john.doe@example.com';
//    const password: string = 'password123';
//
//    // When / Then
//    expect(() => new User({ name: username, email: email, password: password })).toThrow('Name is required');
//});
//
//test('given: empty email, when: user is created, then: throws error', () => {
//    // Given
//    const username: string = 'John Doe';
//    const email: string = '';
//    const password: string = 'password123';
//
//    // When / Then
//    expect(() => new User({ name: username, email: email, password: password })).toThrow('Email is required');
//});
//
//test('given: empty password, when: user is created, then: throws error', () => {
//    // Given
//    const username: string = 'John Doe';
//    const email: string = 'john.doe@example.com';
//    const password: string = '';
//
//    // When / Then
//    expect(() => new User({ name: username, email: email, password: password })).toThrow('Password is required');
//});
//
//
//
//
//test('given: undefined id, when: user is created, then: id is set to undefined.', () => {
//    // Given
//    const username: string = 'John Doe';
//    const email: string = 'john.doe@example.com';
//    const password: string = 'password123';
//    
//    // When
//    const user: User = new User({
//        name: username,
//        email: email,
//        password: password,
//    });
//
//    // Then
//    expect(user.getId()).toBeUndefined();
//    expect(user.getName()).toEqual(username);
//    expect(user.getEmail()).toEqual(email);
//    expect(user.getPassword()).toEqual(password);
//});
//
//
//test('given: valid user and character data, when: user is created, then: user has a character', () => {
//    // Given
//    const username: string = 'Jane Doe';
//    const email: string = 'jane.doe@example.com';
//    const password: string = 'password123';
//    const character = new Character({
//        name: 'Warrior',
//        level: 1,
//        xp: 100,
//        strength: 10,
//        speed: 5,
//        magic: 3,
//        dexterity: 8,
//        healthPoints: 100,
//        manaPoints: 50,
//        luck: 5,
//        defense: 7,
//        magicDefense: 5,
//        progress: 'In Progress',
//    });
//
//    // When
//    const user: User = new User({
//        name: username,
//        email: email,
//        password: password,
//        character: character,
//    });
//
//    // Then
//    expect(user.getCharacter()).toBeDefined();
//    expect(user.getCharacter()?.getName()).toEqual('Warrior');
//});
//