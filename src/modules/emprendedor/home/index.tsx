import "../../../styles/home.css";
import { Carousel, Badge, Dropdown, Card, Space, Typography } from "antd";
import {
  BellOutlined,
  RocketOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { NotificacionFormValues } from "../../../types/notificacionFormValues";

const { Title, Paragraph } = Typography;

export const HomeEmprendedor = () => {
  const [notificaciones, setNotificaciones] = useState<NotificacionFormValues[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const emprendedor = JSON.parse(localStorage.getItem("user") || "{}");
  const idEmprendedor: string | undefined = emprendedor?._id;

  useEffect(() => {
    if (!idEmprendedor) return;

    fetch(`http://localhost:4000/notification/${idEmprendedor}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al verificar notificaciones");
        const data = await res.json();
        setNotificaciones(data);
      })
      .catch((err) => {
        console.error("Error al verificar notificaciones:", err);
      });
  }, [idEmprendedor]);

  const handleSelectNotificacion = async (notif: NotificacionFormValues) => {
    try {
      // Actualiza estado local inmediatamente
      setNotificaciones((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, unview: true } : n))
      );

      // Llama al backend con fetch
      await fetch(`http://localhost:4000/notification/${notif._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({ unview: true }),
      });
    } catch (err) {
      console.error("Error al marcar notificación:", err);
    }

    // 3️⃣ Navegación SEGURA (siempre debe ejecutarse)
    if (notif.typeNotification === "desafio") {
      navigate(`/emprendedor/desafiosPublicados`);
      return;
    }

    if (notif.typeNotification === "propuestaEstado") {
      navigate(`/emprendedor/propuestas`);
      return;
    }
  };

  const menuItems: MenuProps["items"] = notificaciones.map((n, i) => ({
    key: i.toString(),
    label: (
      <div className="menu-item" onClick={() => handleSelectNotificacion(n)}>
        {/* Notificación por desafío */}
        {n.typeNotification === "desafio" && (
          <span>
            Nuevo desafío publicado por{" "}
            <strong>{n.idCompany?.name ?? "Una empresa"}</strong>
          </span>
        )}

        {/* Notificación por cambio de estado de propuesta */}
        {n.typeNotification === "propuestaEstado" && (
          <span>
            Tu propuesta{" "}
            <strong>{n.idProposal?.title ?? "(sin título)"}</strong> cambió de
            estado.
          </span>
        )}
      </div>
    ),
  }));

  return (
    <div className="home-container emprendedor">
      <div className="home-content">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Encabezado */}
          <div className="home-header">
            <Title level={2} className="home-title">
              Bienvenido, EMPRENDEDOR
            </Title>

            <div className="home-notifications">
              <Dropdown
                menu={{ items: menuItems }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Badge
                  count={notificaciones.filter((n) => !n.unview).length}
                  size="default"
                  offset={[0, 2]}
                >
                  <BellOutlined className="home-bell" />
                </Badge>
              </Dropdown>
            </div>
          </div>

          {/* Tarjeta con carrusel */}
          <Card bordered={false} className="home-card">
            <Paragraph className="home-description">
              Explora los desafíos propuestos por empresas, presenta tus ideas y
              haz crecer tu emprendimiento. Usa el menú lateral para navegar
              entre las secciones.
            </Paragraph>

            <Carousel autoplay autoplaySpeed={3500}>
              {[
                "https://wallpapers.com/images/hd/entrepreneur-skyscraper-5ze2orkv2zv9pbhl.jpg",
                "https://e1.pxfuel.com/desktop-wallpaper/990/550/desktop-wallpaper-entrepreneur-entrapreneur.jpg",
                "https://cdn.forbes.com.mx/2022/11/emprendimiento-emprendedores-empresa-contabilidad-credito.jpg",
              ].map((src, index) => (
                <div key={index} className="estiloCarousel">
                  <img src={src} alt={`slide-${index}`} />
                </div>
              ))}
            </Carousel>
          </Card>

          {/* Tarjetas inferiores */}
          <div className="home-grid">
            <Link to="/emprendedor/desafiosPublicados" className="home-link">
              <Card hoverable className="home-card-mini">
                <RocketOutlined className="home-icon" />
                <Title level={4} className="home-subtitle">
                  Explorar Desafíos
                </Title>
                <Paragraph type="secondary">
                  Encuentra proyectos donde aplicar tus ideas
                </Paragraph>
              </Card>
            </Link>

            <Link to="/emprendedor/propuestas" className="home-link">
              <Card hoverable className="home-card-mini">
                <FileTextOutlined className="home-icon" />
                <Title level={4} className="home-subtitle">
                  Mis Propuestas
                </Title>
                <Paragraph type="secondary">
                  Gestiona y revisa tus propuestas enviadas
                </Paragraph>
              </Card>
            </Link>
          </div>
        </Space>
      </div>
    </div>
  );
};
