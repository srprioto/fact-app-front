import { RolDto } from "./RolesDto";

export interface UsuarioDto {
    id?:number;
    nombre:string;
    documento:string;
    direccion:string;
    telefono:string;
    edad:number;
    email:string;
    password?:string;
    created_at:string;
    updated_at:string;
    roles?:RolDto
}

export interface UsuarioEditDto {
    nombre: string,
    documento: string,
    direccion: string,
    edad: string,
    telefono: string,
    email: string,
    password: string,
    rolesId: string
}