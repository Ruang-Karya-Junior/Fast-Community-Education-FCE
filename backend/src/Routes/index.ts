
import { Elysia } from 'elysia';
import { RouteAdmin } from './route_db_admin_api';
import { RouteAuth } from './route_auth';
import { Middleware } from '../Middleware/middleware';
import { RouteMahasiswa } from './route_db_mahasiswa_api';

const Router = new Elysia({ prefix: '/api' })
    .use(RouteAuth.Router)
    .use(RouteMahasiswa.Router)
    .group('', app =>
        app
            .use(Middleware.getProtectedRoutes())
            .use(RouteAdmin.Router)
    );

export default Router;
