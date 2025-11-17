import { useParams } from "react-router-dom";
import PerfilDetalle from "../../../components/perfilDetalle";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import api from "../../../api.ts";

export default function EmpresaDetalle() {
  const { idUser } = useParams<{ idUser: string }>();
  //const token = localStorage.getItem("token"); Lo trae automáticamente el interceptor de api
  const apiUrl = import.meta.env.VITE_API_URL;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const idEmprendedor = user?._id;

  const [follow, setFollow] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  useEffect(() => {
    if (!idUser || !idEmprendedor) return;

    api
      .get(`/follow/buscar/${idEmprendedor}/${idUser}`)
      .then((res) => {
        setFollow(res.data.isFollowing); // Axios devuelve JSON en res.data
      })
      .catch((err) => {
        console.error("Error al verificar follow:", err);
      });
  }, [idEmprendedor, idUser]);

  async function handleFollow() {
    if (!idUser || !idEmprendedor) return;

    setLoadingFollow(true);

    try {
      await api.post(`/follow`, {
        idEmprendedor,
        idCompany: idUser,
      });

      setFollow(true);
      message.success("Ahora sigues a esta empresa");
    } catch (err) {
      console.error("Error al seguir la empresa:", err);
      message.error("No se pudo seguir la empresa");
    } finally {
      setLoadingFollow(false);
    }
  }

  return (
    <PerfilDetalle
      id={idUser}
      endpoint={`${apiUrl}/proposals/users/${idUser}`}
      colorTag="#463F3A"
      emptyLabel="Empresa no encontrada"
      extra={
        idEmprendedor !== idUser ? (
          <Button
            style={{
              backgroundColor: "#463F3A",
              border: "0px",
              color: "#fff",
            }}
            loading={loadingFollow}
            onClick={handleFollow}
            disabled={follow}
          >
            {follow ? "Siguiendo" : "+ Seguir"}
          </Button>
        ) : null
      }
    />
  );
}
