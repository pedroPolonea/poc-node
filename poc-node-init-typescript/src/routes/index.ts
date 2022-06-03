import { Router } from "express";
import itemsRoutes from "./items_routes";
import locationsRouter from "./locations_routes";
import sessionsRouter from "./sessions_routes";
import usersRouter from "./users_routes";

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({message: 'ola'});
 });

routes.use('/items', itemsRoutes);
routes.use('/locations', locationsRouter);
routes.use('/users', usersRouter);
routes.use('/authentication', sessionsRouter);

export default routes;