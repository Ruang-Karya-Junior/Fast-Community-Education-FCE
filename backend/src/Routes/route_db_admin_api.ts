
import { Elysia } from 'elysia';
import { ControllerAdmin } from '../Controllers/controllers_db_admin';
import { Middleware } from '../Middleware/middleware';


export class RouteAdmin {
    static Router = new Elysia({ prefix: '/admin' })
        .get('/', () => ControllerAdmin.GetAll())
        .get('/:id', ({ params }) => ControllerAdmin.GetById(params.id))
        .post('/', ({ body }) => ControllerAdmin.Create(body as {
            name: string;
            ussername: string;
            password: string;
            level: string;
        }))
        .put('/:id', ({ params, body }) =>
            ControllerAdmin.Update(params.id, body as {
                name?: string;
                ussername?: string;
                password?: string;
                level?: string;
            })
        )
        .delete('/:id', ({ params }) => ControllerAdmin.Delete(params.id));
}
