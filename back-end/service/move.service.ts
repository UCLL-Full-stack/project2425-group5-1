import { MoveType } from '../types';
import moveRepository from '../repository/move.db';


// Get all moves
const getAllMoves = async (): Promise<MoveType[]> => {
    return await moveRepository.getMoves();
};

// Get a specific move by ID
const getMove = async (id: number): Promise<MoveType | null> => {
    return await moveRepository.getMoveById(id);
};

// Create a new move
const createMove = async (data: MoveType): Promise<MoveType> => {
    return await moveRepository.createMove(data);
};

// Update a move by ID
const updateMove = async (id: number, data: Partial<MoveType>): Promise<MoveType> => {
    return await moveRepository.updateMove(id, data);
};

// Delete a move by ID
const deleteMove = async (id: number): Promise<void> => {
    await moveRepository.deleteMove(id);
};

export {
    getAllMoves,
    getMove,
    createMove,
    updateMove,
    deleteMove,
};