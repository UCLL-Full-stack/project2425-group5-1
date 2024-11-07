import User from '../../model/user';

test('given: valid values for user, when: user is created, then user is created with those values.', () => {
    // Given
    const id: number = 1;
    const username: string = 'John Doe';
    const email: string = 'john.doe@example.com';
    const password: string = 'password123';

    // When
    const user: User = new User({
        id: id,
        username: username,
        email: email,
        password: password,
    });

    // Then
    expect(user.getId()).toEqual(id);
    expect(user.getUsername()).toEqual(username);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
});

test('given: undefined id, when: user is created, then: id is set to undefined.', () => {
    // Given
    const username: string = 'John Doe';
    const email: string = 'john.doe@example.com';
    const password: string = 'password123';

    // When
    const user: User = new User({
        username: username,
        email: email,
        password: password,
    });

    // Then
    expect(user.getId()).toBeUndefined();
    expect(user.getUsername()).toEqual(username);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
});

test('given: empty username, when: user is created, then: it throws "Username is required" error.', () => {
    // Given
    const id: number = 1;
    const username: string = '';
    const email: string = 'john.doe@example.com';
    const password: string = 'password123';

    // When & Then
    expect(() => new User({ id, username, email, password })).toThrow('Username is required');
});

test('given: empty email, when: user is created, then: it throws "Email is required" error.', () => {
    // Given
    const id: number = 1;
    const username: string = 'John Doe';
    const email: string = '';
    const password: string = 'password123';

    // When & Then
    expect(() => new User({ id, username, email, password })).toThrow('Email is required');
});

test('given: empty password, when: user is created, then: it throws "Password is required" error.', () => {
    // Given
    const id: number = 1;
    const username: string = 'John Doe';
    const email: string = 'john.doe@example.com';
    const password: string = '';

    // When & Then
    expect(() => new User({ id, username, email, password })).toThrow('Password is required');
});
