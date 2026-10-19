import { MahasiswaModel } from "../Models/model_db_mahasiswa";
import GenerateUUID from "../Util/GenerateUUID";

export class ControllerMahasiswa {
    static async GetAll() {
        try {
            const data = await MahasiswaModel.GetAll();

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
            const data = await MahasiswaModel.GetById(id);

            if (!data) {
                return {
                    status: 404,
                    message: "Mahasiswa not found"
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
        nim: string;
        nama: string;
        email: string;
        password: string;
        alamat?: string | null;
        noTelepon?: string | null;
        jenisKelamin?: string | null;
        tempatLahir?: string | null;
        tanggalLahir?: Date | null;
        prodi: string;
        fakultas: string;
        angkatan: string;
        status?: string;
    }) {
        try {
            if (
                !body.nim ||
                !body.nama ||
                !body.email ||
                !body.password ||
                !body.prodi ||
                !body.fakultas ||
                !body.angkatan
            ) {
                return {
                    status: 400,
                    message: "Required fields must be filled"
                };
            }

            const existingNim = await MahasiswaModel.GetByNim(body.nim);

            if (existingNim) {
                return {
                    status: 409,
                    message: "NIM already exists"
                };
            }

            const existingEmail = await MahasiswaModel.GetByEmail(body.email);

            if (existingEmail) {
                return {
                    status: 409,
                    message: "Email already exists"
                };
            }

            const data = await MahasiswaModel.Create({
                id: GenerateUUID.SetUnieqUUID(),
                nim: body.nim,
                nama: body.nama,
                email: body.email,
                password: body.password,
                alamat: body.alamat ?? null,
                noTelepon: body.noTelepon ?? null,
                jenisKelamin: body.jenisKelamin ?? null,
                tempatLahir: body.tempatLahir ?? null,
                tanggalLahir: body.tanggalLahir ?? null,
                prodi: body.prodi,
                fakultas: body.fakultas,
                angkatan: body.angkatan,
                status: body.status ?? "aktif"
            });

            return {
                status: 201,
                message: "Mahasiswa created successfully",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to create mahasiswa"
            };
        }
    }

    static async Update(
        id: string,
        body: Partial<{
            nim: string;
            nama: string;
            email: string;
            password: string;
            alamat: string | null;
            noTelepon: string | null;
            jenisKelamin: string | null;
            tempatLahir: string | null;
            tanggalLahir: Date | null;
            prodi: string;
            fakultas: string;
            angkatan: string;
            status: string;
        }>
    ) {
        try {
            const existing = await MahasiswaModel.GetById(id);

            if (!existing) {
                return {
                    status: 404,
                    message: "Mahasiswa not found"
                };
            }

            if (body.nim && body.nim !== existing.nim) {
                const existingNim = await MahasiswaModel.GetByNim(body.nim);

                if (existingNim) {
                    return {
                        status: 409,
                        message: "NIM already exists"
                    };
                }
            }

            if (body.email && body.email !== existing.email) {
                const existingEmail = await MahasiswaModel.GetByEmail(body.email);

                if (existingEmail) {
                    return {
                        status: 409,
                        message: "Email already exists"
                    };
                }
            }

            const data = await MahasiswaModel.Update(id, body);

            if (!data) {
                return {
                    status: 404,
                    message: "Mahasiswa not found"
                };
            }

            return {
                status: 200,
                message: "Mahasiswa updated successfully",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to update mahasiswa"
            };
        }
    }

    static async Delete(id: string) {
        try {
            const data = await MahasiswaModel.Delete(id);

            if (!data) {
                return {
                    status: 404,
                    message: "Mahasiswa not found"
                };
            }

            return {
                status: 200,
                message: "Mahasiswa deleted successfully",
                data
            };
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: "Failed to delete mahasiswa"
            };
        }
    }
}