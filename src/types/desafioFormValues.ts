export interface DesafioFormValues {
  _id?: string;
  title: string;
  description: string;
  idCompany: { _id: number; name: string };
  category: string;
  publicationDate: Date;
  expirationDate: Date;
  isActive: boolean;
}
