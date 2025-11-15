import { DesafioFormValues } from "./desafioFormValues";
import { PropuestaFormValues } from "./propuestaFormValues";
import UserFormValues from "./userFormValues";

export interface NotificacionFormValues {
  _id: string;
  idEmprendedor: UserFormValues; // populate
  idCompany: UserFormValues; // populate
  typeNotification: string;
  idChallenge?: DesafioFormValues; // populate
  idProposal?: PropuestaFormValues; // o el tipo que tengas
  unview: boolean;
}