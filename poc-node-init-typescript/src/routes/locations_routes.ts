import { Router } from "express";
import connection from "../database/connection";
import multer from "multer";
import multerConfig from '../config/multer';
import { celebrate, Joi } from "celebrate";
import isAuthenticated from "../middlewares/authenticated";

const locationsRouter = Router();
const upload = multer(multerConfig);
locationsRouter.use(isAuthenticated);

locationsRouter.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        logitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.array().required()

    })
}, {abortEarly: false}),async (request, response) => {
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

    const items =  await connection('items').join('location_items', 'items.id', '=', 'location_items.itemId')
        .where('location_items.locationId', id)
        .select('items.title');

    return response.json({location, items});
 });

 locationsRouter.get('/',async (request, response) => {
    const { city, uf } = request.query;

    if ( typeof city !== "undefined" || typeof uf !== "undefined") {

        const location =  await connection('locations')
            .where('city', String(city))
            .orWhere('uf', String(uf))
            .select()
            .distinct();

        return response.json(location);
    }

    const location =  await connection('locations').select('*');

    return response.json(location);
 });

 locationsRouter.put('/:id', upload.single('image'),async (request, response) => {
    const { id } = request.params;
    const image = request.file?.filename;

    const location = await connection('locations').where('id', id)
        .first();

    if (!location) {
        return response.status(400)
                       .json({error: `Location id ${id} não encontrado.`});
    }

    const locationBase = {
        ...location, 
        image
    }

    await connection('locations').update(locationBase).where('id', id);

    response.json(locationBase);
 })


 export default locationsRouter;