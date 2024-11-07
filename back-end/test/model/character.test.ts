import Character from '../../model/character';
import User from '../../model/user';

let mockUser: User;
let validCharacter: Character;

beforeEach(() => {
    mockUser = new User({
        id: 1,
        username: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
    });

    validCharacter = new Character({
        id: 1,
        name: 'John',
        level: 1,
        xp: 0,
        strength: 10,
        speed: 5,
        magic: 8,
        dexterity: 6,
        healthPoints: 100,
        manaPoints: 50,
        luck: 3,
        defense: 2,
        magicDefense: 1,
        progress: 'starting',
        user: mockUser,
    });
});

test('given: valid values for character, when: character is created, then: character is created with does values.', () => {
    // Given
    const validCharacterData = {
        id: 1,
        name: 'John',
        level: 1,
        xp: 0,
        strength: 10,
        speed: 5,
        magic: 8,
        dexterity: 6,
        healthPoints: 100,
        manaPoints: 50,
        luck: 3,
        defense: 2,
        magicDefense: 1,
        progress: 'starting',
        user: mockUser,
    };

    // When
    const character = new Character(validCharacterData);

    // Then
    expect(character.getId()).toEqual(1);
    expect(character.getName()).toEqual('John');
    expect(character.getLevel()).toEqual(1);
    expect(character.getXp()).toEqual(0);
    expect(character.getStrength()).toEqual(10);
    expect(character.getSpeed()).toEqual(5);
    expect(character.getMagic()).toEqual(8);
    expect(character.getDexterity()).toEqual(6);
    expect(character.getHealthPoints()).toEqual(100);
    expect(character.getManaPoints()).toEqual(50);
    expect(character.getLuck()).toEqual(3);
    expect(character.getDefense()).toEqual(2);
    expect(character.getMagicDefense()).toEqual(1);
    expect(character.getProgress()).toEqual('starting');
    expect(character.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setName is called with a new name, then: valid character has a new name.', () => {
    // Given
    // validCharacter

    // When
    validCharacter.setName('new name');

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('new name');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setName is called with an empty string, then: an error is throw.', () => {
    // Given
    // valid Character

    // When & Then
    expect(() => validCharacter.setName('')).toThrow('Name cannot be empty');
});

test('given: valid character, when: setLevel is called with a new level, then: valid character has a new level.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setLevel(2);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(2);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setLevel is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setLevel(-1)).toThrow('Level must be at least 0');
});

test('given: valid character, when: setXp is called with a new Xp value, then: valid character has a new Xp value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setXp(100);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(100);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setXp is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setXp(-100)).toThrow('Xp cannot be negative');
});

test('given: valid character, when: setStrength is called with a new strength value, then: valid character has a new strength value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setStrength(50);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(50);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setStrength is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setStrength(-100)).toThrow('Strength cannot be negative');
});

test('given: valid character, when: setSpeed is called with a new speed value, then: valid character has a new speed value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setSpeed(50);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(50);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setSpeed is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setSpeed(-100)).toThrow('Speed cannot be negative');
});

test('given: valid character, when: setMagic is called with a new magic value, then: valid character has a new magic value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setMagic(50);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(50);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setMagic is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setMagic(-100)).toThrow('Magic cannot be negative');
});

test('given: valid character, when: setDexterity is called with a new dexterity value, then: valid character has a new dexterity value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setDexterity(50);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(50);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setDexterity is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setDexterity(-100)).toThrow('Dexterity cannot be negative');
});

test('given: valid character, when: setHealthPoints is called with a new healthPoints value, then: valid character has a new healthPoints value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setHealthPoints(500);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(500);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setHealthPoints is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setHealthPoints(-100)).toThrow('Health points cannot be negative');
});

test('given: valid character, when: setManaPoints is called with a new manaPoints value, then: valid character has a new manaPoints value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setManaPoints(500);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(500);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setManaPoints is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setManaPoints(-100)).toThrow('Mana points cannot be negative');
});

test('given: valid character, when: setLuck is called with a new luck value, then: valid character has a new luck value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setLuck(50);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(50);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setLuck is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setLuck(-100)).toThrow('Luck cannot be negative');
});

test('given: valid character, when: setDefense is called with a new defense value, then: valid character has a new defense value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setDefense(50);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(50);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setDefense is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setDefense(-100)).toThrow('Defense cannot be negative');
});

test('given: valid character, when: setMagicDefense is called with a new magicDefense value, then: valid character has a new magicDefense value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setMagicDefense(50);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(50);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setMagicDefense is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setMagicDefense(-100)).toThrow('Magic defense cannot be negative');
});

test('given: valid character, when: setProgress is called with a new progress value, then: valid character has a new progress value.', () => {
    // Given
    //  validCharacter

    // When
    validCharacter.setProgress('1-1');

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('1-1');
    expect(validCharacter.getUser()).toEqual(mockUser);
});

test('given: valid character, when: setProgress is called with a negative value, then: an error is throw.', () => {
    // Given
    // valid character

    // When & Then
    expect(() => validCharacter.setProgress('')).toThrow('Progress cannot be empty');
});

test('given: valid character, when: setUser is called with a new user value, then: valid character has a new user value.', () => {
    // Given
    const newUser: User = new User({
        id: 2,
        username: 'Alex Johnson',
        email: 'AlexJohnson@example.com',
        password: 'password123',
    });

    // When
    validCharacter.setUser(newUser);

    // Then
    expect(validCharacter.getId()).toEqual(1);
    expect(validCharacter.getName()).toEqual('John');
    expect(validCharacter.getLevel()).toEqual(1);
    expect(validCharacter.getXp()).toEqual(0);
    expect(validCharacter.getStrength()).toEqual(10);
    expect(validCharacter.getSpeed()).toEqual(5);
    expect(validCharacter.getMagic()).toEqual(8);
    expect(validCharacter.getDexterity()).toEqual(6);
    expect(validCharacter.getHealthPoints()).toEqual(100);
    expect(validCharacter.getManaPoints()).toEqual(50);
    expect(validCharacter.getLuck()).toEqual(3);
    expect(validCharacter.getDefense()).toEqual(2);
    expect(validCharacter.getMagicDefense()).toEqual(1);
    expect(validCharacter.getProgress()).toEqual('starting');
    expect(validCharacter.getUser()).toEqual(newUser);
});
