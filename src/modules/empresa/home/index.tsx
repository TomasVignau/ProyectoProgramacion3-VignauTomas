import "../../../styles/home.css";
import {
  Carousel,
  Badge,
  Dropdown,
  Card,
  Space,
  Typography,
  MenuProps,
  message,
} from "antd";
import {
  BellOutlined,
  RocketOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotificacionFormValues } from "../../../types/notificacionFormValues";
import api from "../../../api.ts";

const { Title, Paragraph } = Typography;

export const HomeEmpresa = () => {
  const [notificaciones, setNotificaciones] = useState<
    NotificacionFormValues[]
  >([]);
  //const token = localStorage.getItem("token"); Lo agrega automáticamente el interceptor de api
  const empresa = JSON.parse(localStorage.getItem("user") || "{}");
  const idEmpresa: string | undefined = empresa?._id;

  const navigate = useNavigate();

  //Obtiene las notificaciones NO vistas del usuario
  useEffect(() => {
    if (!idEmpresa) return;

    api
      .get(`/notification/empresa/${idEmpresa}`)
      .then((res) => setNotificaciones(res.data))
      .catch((err) => {
        console.error("Error al verificar notificaciones:", err);
        message.error("Error al verificar notificaciones:", err);
      });
  }, [idEmpresa]);

  const handleSelectNotificacion = async (notif: NotificacionFormValues) => {
    try {
      setNotificaciones((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, unview: true } : n))
      );

      await api.patch(`/notification/${notif._id}`, { unview: true });
    } catch (err) {
      console.error("Error al marcar notificación:", err);
    }

    // Navegación según el tipo de notificación
    if (notif.typeNotification === "propuestaRecibida") {
      navigate(`/empresa/desafios`);
    }
  };

  // Menú que muestra las notificaciones
  const menuItems: MenuProps["items"] = notificaciones.map((n, i) => ({
    key: i.toString(),
    label: (
      <div className="menu-item" onClick={() => handleSelectNotificacion(n)}>
        {/* Notificación por desafío */}
        {n.typeNotification === "propuestaRecibida" && (
          <span>
            Nueva propuesta publicada para el desafio{" "}
            <strong>
              {'"'} {n.idChallenge?.title ?? "-"} {'"'}
            </strong>
          </span>
        )}
      </div>
    ),
  }));

  return (
    <div className="home-container">
      <div className="home-content">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Título */}
          <div className="home-header">
            <Title level={2} className="home-title">
              Bienvenida, EMPRESA
            </Title>

            {/* Campanita de notificaciones */}
            <div className="home-notifications">
              <Dropdown
                menu={{ items: menuItems }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Badge
                  count={notificaciones.length}
                  size="default"
                  offset={[0, 2]}
                >
                  <BellOutlined className="home-bell" />
                </Badge>
              </Dropdown>
            </div>
          </div>

          {/* Carrusel */}
          <Card bordered={false} className="home-card">
            <Paragraph className="home-description">
              Gestiona tus desafíos empresariales y revisa las propuestas de
              emprendedores. Usa el menú lateral para navegar entre las
              diferentes secciones.
            </Paragraph>

            <Carousel autoplay autoplaySpeed={3500}>
              {[
                "https://wallpapers.com/images/hd/business-success-strategy-9e3neoqjyveyskog.jpg",
                "https://wallpapers.com/images/featured/negocios-jzw8ax93flqonkce.jpg",
                "https://www.decisores.com/wp-content/uploads/2021/06/Empresa.jpg",
              ].map((src, index) => (
                <div key={index} className="estiloCarousel">
                  <img src={src} alt={`slide-${index}`} />
                </div>
              ))}
            </Carousel>
          </Card>
          
          {/* Tarjetas inferiores */}
          <div className="home-grid">
            <Link to="/empresa/formulario" className="home-link">
              <Card hoverable className="home-card-mini">
                <RocketOutlined className="home-icon" />
                <Title level={4} className="home-subtitle">
                  Publicar Desafío
                </Title>
                <Paragraph type="secondary">
                  Crea nuevos desafíos para emprendedores
                </Paragraph>
              </Card>
            </Link>

            <Link to="/empresa/desafios" className="home-link">
              <Card hoverable className="home-card-mini">
                <FileTextOutlined className="home-icon" />
                <Title level={4} className="home-subtitle">
                  Mis Desafíos
                </Title>
                <Paragraph type="secondary">
                  Gestiona tus desafíos activos
                </Paragraph>
              </Card>
            </Link>
          </div>
        </Space>
      </div>
    </div>
  );
};
