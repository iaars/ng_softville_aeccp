import {Usuario} from 'db/src/usuario/usuario';

export interface UsuarioWrapper {
  id: string;
  user: Usuario;
}
