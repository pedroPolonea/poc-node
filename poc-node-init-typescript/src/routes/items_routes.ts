import { Router } from "express";
import connection from "../database/connection";

const itemsRoutes = Router();

itemsRoutes.get('/', async (request, response) => {
    const items = await connection('items').select('*');
    const serializedItems = items.map(i => {
        return {
            id: i.id,
            title: i.title,
            image_url: `http://localhost:3333/uploads/${i.image}`
        }
    });

    return response.json(serializedItems);
 });


 export default itemsRoutes;
