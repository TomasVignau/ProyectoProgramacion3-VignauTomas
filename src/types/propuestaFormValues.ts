import UserFormValues from "./userFormValues"

export interface PropuestaFormValues {
  _id: string
  title: string
  description: string
  idUser: UserFormValues
  idCompany: UserFormValues
  idChallenge: string
  category: string
  publicationDate: Date
  state: string
  valoration?: number
  feedback?: string
  isActive: boolean
}