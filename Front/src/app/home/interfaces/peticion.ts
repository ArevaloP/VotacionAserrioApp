import { Candidato } from "src/app/panel-votar/interfaces/candidato";
import { Estudiante } from "./estudiante";
import { Usuario } from "./usuario";

export interface Peticion {
    ok: false;
    mensaje: string;
    estudiante?: Estudiante;
    token?: string;
    candidatos?: {
        personeros: Candidato[];
        contralores: Candidato[];
    };
    usuario?: Usuario;
    totalPersoneros?: number;
    totalContralores?: number;
    estudiantesVotantes?: number; 
    estudiantesVotaron?: number;
    estudiantesNoVotaron?: number;
}
