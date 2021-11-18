import {Cita} from 'db/src/cita/cita';
import {UsuarioWrapper} from './UsuarioWrapper';

export interface CitaWrapper {
  id: string;
  cita: Cita;
  paciente: UsuarioWrapper | undefined;
  profesional: UsuarioWrapper | undefined;
  secretaria: UsuarioWrapper | undefined;
  fechaHoraFormateada: string;
}
