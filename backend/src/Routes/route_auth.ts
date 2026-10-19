import Elysia from "elysia";
import { ControllerAuth } from "../Controllers/Auth/controllers_auth";
import jwt from "@elysia/jwt";
import { Middleware } from "../Middleware/middleware";


export class RouteAuth {
    static Router = new Elysia({ prefix: '/auth' })
        .use(Middleware.jwtMiddleware)
        .post('/login', ({ body, jwt, set }) => ControllerAuth.AuthLogin(body as {
            username: string;
            password: string;
        }, jwt, set))
        .post('/register', ({ body }) => ControllerAuth.AuthRegister(body as {
            name: string;
            username: string;
            password: string;
        }))
}