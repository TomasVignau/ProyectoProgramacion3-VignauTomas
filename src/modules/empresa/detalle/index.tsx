import { useParams } from "react-router-dom";
import { Card, Typography, Button, Space, Tag, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../styles/detalle.css";
import { useEffect, useState } from "react";
import UserFormValues from "../../../types/userFormValues";

const { Title, Paragraph } = Typography;

export default function EmpresaDetalle() {
  const navigate = useNavigate();
  const { idUser } = useParams<{ idUser: string }>();
  const token = localStorage.getItem("token");
  const emprendedor = JSON.parse(localStorage.getItem("user") || "{}");
  const idEmprendedor = emprendedor._id;

  const [empresa, setEmpresa] = useState<UserFormValues>();
  const [follow, setFollow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(`http://localhost:4000/proposals/users/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const data = await res.json();
        setEmpresa(data);
      })
      .catch((err) => {
        console.error("Error al obtener la empresa:", err);
      });
  }, [idUser]);

  useEffect(() => {
    if (!idUser || !idEmprendedor) return;

    fetch(`http://localhost:4000/follow/buscar/${idEmprendedor}/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al verificar follow");
        const data = await res.json();
        setFollow(data.isFollowing);
      })
      .catch((err) => {
        console.error("Error al verificar follow:", err);
      });
  }, [idEmprendedor, idUser]);

  //console.log("Empresa cargada:", emprendedor);

  async function handleFollow() {
    setLoading(true);

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
        const errorText = await res.text();
        message.error(errorText || "Error al seguir la empresa");
        return;
      }

      const data = await res.json();
      console.log("Follow creado:", data);
      setFollow(true);
      message.success("Ahora estás siguiendo a esta empresa");
    } catch (error) {
      console.error("Error al crear el follow:", error);
      message.error("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }

  if (!empresa) {
    return (
      <div className="empresaNotFound">
        <Title level={3} style={{ color: "#b23a48" }}>
          Empresa no encontrada
        </Title>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="empresaContainer">
      <div className="empresaHeader">
        <Title level={2} className="empresaTitulo">
          {empresa.name}
        </Title>
        <Tag color="#463F3A">{empresa.email}</Tag>
        <br />
        <br />

        <Button
          style={{
            backgroundColor: "#463F3A",
            border: "0px",
            color: "#fff",
          }}
          loading={loading}
          onClick={handleFollow}
          disabled={follow}
        >
          {follow ? "Siguiendo" : "+ Seguir"}
        </Button>
      </div>

      <Card bordered={false} className="empresaCard" hoverable>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph
            style={{ textAlign: "center" }}
            className="empresaDescripcion"
          >
            {empresa.description}
          </Paragraph>

          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="volverBtn"
          >
            Volver
          </Button>
        </Space>
      </Card>
    </div>
  );
}
