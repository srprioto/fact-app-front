export interface RolDto {
    id:number;
    descripcion?:string;
    rol:string;
    created_at?:string;
    updated_at?:string;
}

export enum Roles {
    ADMIN = 'admin',
    SUPERVISOR = 'supervisor',
    SALLER = 'seller',
    CONTABLE = 'contable',
    
    
    OUT = "out"
    // ...
}