import { Role } from './role.model';

export interface AuthUser {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  username: string;
  rol: Role;
}

