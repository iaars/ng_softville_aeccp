export type TipoUsuario = 'Secretaria' | 'Profesional' | 'Paciente';

export interface Usuario {
  identificacion: string;
  nombre: string;
  apellidos: string;
  tipo: TipoUsuario;
  telefono: string;
  correo: string;
}
