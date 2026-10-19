import { Elysia } from "elysia";
import { ControllerMahasiswa } from "../Controllers/controllers_db_mahasiswa";

export class RouteMahasiswa {
    static Router = new Elysia({ prefix: "/Mahasiswa" })
        .get("/", () => ControllerMahasiswa.GetAll())
        .get("/:id", ({ params }) =>
            ControllerMahasiswa.GetById(params.id)
        )
        .post("/", ({ body }) =>
            ControllerMahasiswa.Create(body as {
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
            })
        )

        .put("/:id", ({ params, body }) =>
            ControllerMahasiswa.Update(params.id, body as {
                nim?: string;
                nama?: string;
                email?: string;
                password?: string;
                alamat?: string | null;
                noTelepon?: string | null;
                jenisKelamin?: string | null;
                tempatLahir?: string | null;
                tanggalLahir?: Date | null;
                prodi?: string;
                fakultas?: string;
                angkatan?: string;
                status?: string;
            })
        )

        .delete("/:id", ({ params }) =>
            ControllerMahasiswa.Delete(params.id)
        );
}