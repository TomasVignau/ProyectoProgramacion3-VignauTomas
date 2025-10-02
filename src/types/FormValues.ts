import type { UploadFile } from "antd/es/upload/interface";

export interface FormValues {
  nombre: string;
  descripcion: string;
  fechaTope: Date;
  archivo: UploadFile[];
}