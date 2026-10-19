

import { AdminModel } from "../Models/model_db_admin";
import GenerateUUID from "../Util/GenerateUUID";


export class ControllerAdmin {
    static async GetAll() {
        try {
            const data = await AdminModel.GetAll();

            return {
                status: 200,
                message: "Success",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Internal Server Error"
            };
        }
    }

    static async GetById(id: string) {
        try {
            const data = await AdminModel.GetById(id);

            if (!data) {
                return {
                    status: 404,
                    message: "Admin not found"
                };
            }

            return {
                status: 200,
                message: "Success",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Internal Server Error"
            };
        }
    }

    static async Create(body: {
        name: string;
        ussername: string;
        password: string;
        level: string;
    }) {
        try {
            if (
                !body.name ||
                !body.ussername ||
                !body.password ||
                !body.level
            ) {
                return {
                    status: 400,
                    message: "All fields are required"
                };
            }

            const data = await AdminModel.Create({
                id: GenerateUUID.SetUnieqUUID(),
                name: body.name,
                ussername: body.ussername,
                password: body.password,
                level: body.level
            });

            return {
                status: 201,
                message: "Admin created successfully",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to create admin"
            };
        }
    }

    static async Update(
        id: string,
        body: Partial<{
            name: string;
            ussername: string;
            password: string;
            level: string;
        }>
    ) {
        try {
            const data = await AdminModel.Update(id, body);

            if (!data) {
                return {
                    status: 404,
                    message: "Admin not found"
                };
            }

            return {
                status: 200,
                message: "Admin updated successfully",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to update admin"
            };
        }
    }

    static async Delete(id: string) {
        try {
            const data = await AdminModel.Delete(id);

            if (!data) {
                return {
                    status: 404,
                    message: "Admin not found"
                };
            }

            return {
                status: 200,
                message: "Admin deleted successfully",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to delete admin"
            };
        }
    }
}
