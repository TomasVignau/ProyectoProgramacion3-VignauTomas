import { useParams } from "react-router-dom";
import PerfilDetalle from "../../../components/perfilDetalle";
import { Button, message } from "antd";
import { useEffect, useState } from "react";

export default function EmpresaDetalle() {
  const { idUser } = useParams<{ idUser: string }>();
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const idEmprendedor = user?._id;

  const [follow, setFollow] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  useEffect(() => {
    if (!idUser || !idEmprendedor) return;

    fetch(`http://localhost:4000/follow/buscar/${idEmprendedor}/${idUser}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        setFollow(data.isFollowing);
      })
      .catch((err) => console.error("Error al verificar follow:", err));
  }, [idEmprendedor, idUser, token]);

  async function handleFollow() {
    if (!idUser || !idEmprendedor) return;

    setLoadingFollow(true);

    try {
      const res = await fetch("http://localhost:4000/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          idEmprendedor,
          idCompany: idUser,
        }),
      });

      if (!res.ok) {
        return message.error("No se pudo seguir la empresa");
      }

      setFollow(true);
      message.success("Ahora sigues a esta empresa");
    } catch (err) {
      message.error("Error al conectar con el servidor" + err);
    } finally {
      setLoadingFollow(false);
    }
  }

  return (
    <PerfilDetalle
      id={idUser}
      endpoint={`http://localhost:4000/proposals/users/${idUser}`}
      colorTag="#463F3A"
      emptyLabel="Empresa no encontrada"
      esEmpresa={true} 
      extra={
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
      }
    />
  );
}
