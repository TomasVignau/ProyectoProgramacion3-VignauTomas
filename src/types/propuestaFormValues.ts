import UserFormValues from "./userFormValues";
import { DesafioFormValues } from "./desafioFormValues";

export interface PropuestaFormValues {
  _id: string;
  title: string;
  description: string;
  idUser: UserFormValues;
  idCompany: UserFormValues;
  idChallenge: DesafioFormValues;
  category: string;
  publicationDate: Date;
  state: string;
  valoration?: number;
  feedback?: string;
  isActive: boolean;
}
