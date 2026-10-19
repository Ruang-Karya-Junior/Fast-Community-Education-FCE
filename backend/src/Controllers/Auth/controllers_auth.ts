import { password } from "bun";
import { AdminModel } from "../../Models/model_db_admin";
import { ControllerAdmin } from "../controllers_db_admin";


export class ControllerAuth {
    static async AuthRegister(body: {
        name: string;
        username: string;
        password: string;
    }) {
        try {
            const resultAuth = await ControllerAdmin.Create({
                name: body.name,
                ussername: body.username,
                password: body.password,
                level: "admin",
            });
            return {
                status: 201,
                success: true,
                message: "Admin registered successfully",
                data: resultAuth,
            };
        } catch (error) {
            console.error("Error during registration:", error);
            return {
                status: 500,
                success: false,
                message: "Internal server error during registration",
            };
        }
    }

    static async AuthLogin(body: { username: string; password: string; },
        jwt: { sign: (payload: Record<string, any>) => Promise<string> },
        set: any ) {
        try {
            const resultAuth = await AdminModel.GetByUsername(body.username);

            if (!resultAuth) {
                return {
                    status: 401,
                    success: false,
                    message: "Invalid username or password"
                };
            }

            if (resultAuth.password !== body.password) {
                return {
                    status: 401,
                    success: false,
                    message: "Invalid username or password"
                };
            }

            const token = await jwt.sign({
                username: resultAuth.ussername,
                name: resultAuth.name,
            });

            set.headers['Authorization'] = `Bearer ${token}`;
            set.status = 200;

            return {
                status: 200,
                success: true,
                message: "Login successfully",
                token: token,
            };

        } catch (error) {
            console.error("Error Login:", error);
            return {
                status: 500,
                success: false,
                message: "Internal server error during registration",
            };
        }
    }
}