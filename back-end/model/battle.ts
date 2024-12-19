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
        this.id = battle.id;
        this.turn = battle.turn;
        this.currentTurn = battle.currentTurn;
        this.state = battle.state;
        this.character = battle.character;
        this.characterId = battle.characterId;
    }

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
