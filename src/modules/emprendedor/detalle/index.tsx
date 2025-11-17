import { useParams } from "react-router-dom";
import PerfilDetalle from "../../../components/perfilDetalle";

export default function EmprendedorDetalle() {
  const { idUser } = useParams<{ idUser: string }>();
  const apiUrl = import.meta.env.VITE_API_URL;

  //Llama a PERFIL DETALLE pasandole el id
  return (
    <PerfilDetalle
      id={idUser}
      endpoint={`${apiUrl}/proposals/users/${idUser}`}
      colorTag="#463F3A"
      emptyLabel="Emprendedor no encontrado"
    />
  );
}
