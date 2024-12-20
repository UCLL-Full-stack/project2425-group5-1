import { Battle as BattlePrisma, Character as CharacterPrisma, Move as MovePrisma } from '@prisma/client';
import { Character } from './character';

export class Battle {
    readonly id?: number;
    readonly turn: number;
    readonly currentTurn: number;
    readonly state: string;
    readonly character?: Character;
    readonly characterId: number;

    constructor(battle: {
        id?: number;
        turn: number;
        currentTurn: number;
        state: string;
        character?: Character;
        characterId: number;
    }) {
        // this.validate(battle);

        this.id = battle.id;
        this.turn = battle.turn;
        this.currentTurn = battle.currentTurn;
        this.state = battle.state;
        this.character = battle.character;
        this.characterId = battle.characterId;
    }

    // validate(battle: { turn: number, currentTurn: number, state: string, character?: Character, characterId: number }) {
    //     if (!battle.turn) {
    //         throw new Error('Turn is required');
    //     }
    //     if (battle.turn <= 0) {
    //         throw new Error('Turn must be greather than 0');
    //     }
    //     if (!battle.currentTurn) {
    //         throw new Error('Current turn is required')
    //     }
    //     if (battle.currentTurn <= 0) {
    //         throw new Error('Current turn must be greather than 0');
    //     }
    //     if (!battle.state) {
    //         throw new Error('State is required');
    //     }
    //     if (typeof battle.state !== 'string' || battle.state.trim() === '') {
    //         throw new Error('State must be a non-empty string');
    //     }
    //     if (!battle.character) {
    //         throw new Error('Character Id is required');
    //     }
    //     if (battle.characterId <= 0) {
    //         throw new Error('Character Id must be greather than 0');
    //     }
    //     if (battle.character && !(battle.character instanceof Character)) {
    //         throw new Error('Character must be a valid instance of the Character class');
    //     }
    // }
    
    static from({
        id,
        turn,
        currentTurn,
        state,
        character,
        characterId,
    }: BattlePrisma & { character?: CharacterPrisma & { moves: MovePrisma[] } }): Battle {
        return new Battle({
            id,
            turn,
            currentTurn,
            state,
            character: character
                ? Character.from({
                      ...character,
                      moves: character.moves || [],
                  })
                : undefined,
            characterId: characterId || (character ? character.id : 0),
        });
    }
}
