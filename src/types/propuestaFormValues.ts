export interface IUserRef {
  _id: string
  name: string
}

export interface PropuestaFormValues {
  _id: string
  title: string
  description: string
  idUser: string | IUserRef
  idCompany: string | IUserRef
  idChallenge: string
  category: string
  publicationDate: Date
  state: string
  valoration?: number
  feedback?: string
  isActive: boolean
}