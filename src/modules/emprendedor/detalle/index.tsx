import { useParams } from "react-router-dom";
import PerfilDetalle from "../../../components/perfilDetalle";

export default function EmprendedorDetalle() {
  const { idUser } = useParams<{ idUser: string }>();

  return (
    <PerfilDetalle
      id={idUser}
      endpoint={`http://localhost:4000/proposals/users/${idUser}`}
      colorTag="#463F3A"
      emptyLabel="Emprendedor no encontrado"
    />
  );
}
