import { Elysia } from "elysia";
import { jwt } from '@elysia/jwt';

export class Middleware {

    static jwtMiddleware = new Elysia().use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET ?? 'Fischl von Luftschloss Narfidort',
            exp: '2d'
        })
    );

    static getProtectedRoutes() {
        return Middleware.jwtMiddleware
            .onBeforeHandle({ as: 'scoped' }, async ({ headers, jwt, set }) => {
                const authHeader = headers['authorization'];
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    set.status = 401;
                    return {
                        success: false,
                        message: "Akses ditolak. Token tidak ditemukan atau format salah."
                    };
                }

                const token = authHeader.split(' ')[1];
                const payload = await jwt.verify(token);
                if (!payload) {
                    set.status = 403;
                    return {
                        success: false,
                        message: "Token tidak valid atau sudah kedaluwarsa."
                    };
                }
            });
    }
}