import { Router } from "express";
import connection from "../database/connection";

const locationsRouter = Router();

locationsRouter.post('/', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        logitude,
        city,
        uf,
        items
    } = request.body;

    const location = {
        image: "fake-image.jpg",
        name,
        email,
        whatsapp,
        latitude,
        logitude,
        city,
        uf
    }

    const transaction = await connection.transaction();

    const newId = await transaction('locations').insert(location);

    const locationItems = items.map(async (itemId: number) => {
        const itemBase = await transaction('items').where('id', itemId)
                                                   .first();

        if (!itemBase) {
            return response.status(400)
                           .json({error: `Item id ${itemId} não encontrado.`});
        }
        
        return {
            itemId,
            locationId: newId[0]
        }
    })

    await transaction('location_items').insert(locationItems);

    await transaction.commit();
    return response.json({
        id: newId[0],
        ... location
    });
 });

 locationsRouter.get('/:id',async (request, response) => {
    const { id } = request.params;

    const location =  await connection('locations').where('id', id)
                                                  .first();
    if (!location) {
        return response.status(400)
        .json({error: `Location id ${id} não encontrado.`});
    }

    return response.json(location);
 })


 export default locationsRouter;