import moveRepository from '../repository/move.db';
import { Move } from '../model/move';
import { MoveType } from '../types';

const getAllMoves = async (): Promise<Move[]> => {
    return await moveRepository.getMoves();
};

const getMove = async (id: number): Promise<Move | null> => {
    const moves = await moveRepository.getMoves();
    const moveExists = moves.some((move) => move.id === id );

    if (!moveExists) {
        throw new Error(`Move with id ${id} does not exist`);
    }
    return await moveRepository.getMoveById(id);
};

const createMove = async ({ name, attack, magicAttack, manaPoints, aoe }: MoveType): Promise<Move> => {
    const move = new Move({ name, attack, magicAttack, manaPoints, aoe })
    return await moveRepository.createMove(move);
};

const updateMove = async (id: number, data: Partial<MoveType>): Promise<Move> => {
    const existingMove = await moveRepository.getMoveById(id);
    if (!existingMove) {
        throw new Error(`Move with id ${id} does not exist`);
    }

    return await moveRepository.updateMove(id, data);
};

const deleteMove = async (id: number): Promise<void> => {
    const existingMove = await moveRepository.getMoveById(id);
    if (!existingMove) {
        throw new Error(`Move with id ${id} does not exist`);
    }
    await moveRepository.deleteMove(id);
};

export {
    getAllMoves,
    getMove,
    createMove,
    updateMove,
    deleteMove,
};