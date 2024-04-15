import { connectToDatabase } from '../database.js';

export const getHeroesFromDatabase = async () => {
    const db = await connectToDatabase();
    const [result] = await db.execute(`SELECT * from heroes;`);
    return result;
}

export const getHeroByIdFromDatabase = async (id) => {
    const db = await connectToDatabase();
    const [result] = await db.execute(`SELECT * from heroes WHERE id = ?`,[id]);
    return result;
}

export const createHeroInDatabase = async (insertData) => {
    const db = await connectToDatabase();
    const {name, industry, description, image_data} = insertData;
    const [result] = await db.execute(
        `INSERT INTO heroes(name, industry, description, image_data) VALUES (?, ?, ?, ?)`,
        [name, industry, description, image_data])
    return result;
}

export const updateHeroByIdInDatabase = async (id, updateData) => {
    const db = await connectToDatabase();
    const { name, industry, description, image_data } = updateData;
    const [result] = await db.execute(
        `UPDATE heroes SET name=?, industry=?, description=?, image_data=? WHERE id=?`,
        [name, industry, description, image_data, id]
    );
    return result;
};

export const deleteHeroByIdFromDatabase = async (id) => {
    const db = await connectToDatabase();
    const [result] = await db.execute(`DELETE from heroes WHERE id = ?`,[id]);
    return result;
}

export const deleteHeroesFromDatabase = async (id) => {
    const db = await connectToDatabase();
    const [result] = await db.execute(`DELETE from heroes`);
    return result;
}