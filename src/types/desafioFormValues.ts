import type { UploadFile } from "antd/es/upload/interface";

export interface DesafioFormValues {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaTope: Date;
  archivo: UploadFile[];
}