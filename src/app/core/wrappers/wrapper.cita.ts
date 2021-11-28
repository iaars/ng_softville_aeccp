import {Cita} from 'db/src/cita/cita';
import {UsuarioWrapper} from './wrapper.usuario';

export interface CitaWrapper {
  id: string;
  cita: Cita;
  paciente: UsuarioWrapper | undefined;
  profesional: UsuarioWrapper | undefined;
  secretaria: UsuarioWrapper | undefined;
  fechaHoraFormateada: string;
}
