/*import "../../../styles/home.css";
import { Carousel, Badge, Dropdown, Menu } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { MenuProps } from "antd";

export const HomeEmpresa = () => {
  const [notificaciones] = useState<string[]>([
    "Notificación 1",
    "Notificación 2",
    "Notificación 3",
    "Notificación 4",
  ]);

  const menuItems: MenuProps["items"] = notificaciones.map((n, i) => ({
    key: i.toString(),
    label: n,
  }));

  const menuNotificaciones = <Menu items={menuItems} />;
  return (
    <div style={{ textAlign: "center", padding: "0 10px" }}>
      {/* Campana de notificaciones arriba a la derecha */ /*}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
          paddingRight: 10,
        }}
      >
        <Dropdown
          overlay={menuNotificaciones}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Badge count={notificaciones.length} size="small">
            <BellOutlined style={{ fontSize: 24, cursor: "pointer" }} />
          </Badge>
        </Dropdown>
      </div>

      <h1>Bienvenida EMPRESA a la página de inicio</h1>
      <p>Usa el menú lateral para navegar.</p>

      <Carousel
        autoplay
        autoplaySpeed={2500}
        style={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          border: "2px solid black",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <div>
          <div className="estiloCarousel">
            <img
              src="https://wallpapers.com/images/hd/business-success-strategy-9e3neoqjyveyskog.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://wallpapers.com/images/featured/negocios-jzw8ax93flqonkce.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://www.decisores.com/wp-content/uploads/2021/06/Empresa.jpg"
              alt="Empresa"
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};*/

import "../../../styles/home.css";
import { Carousel, Badge, Dropdown, Card, Space, Typography } from "antd";
import {
  BellOutlined,
  RocketOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export const HomeEmpresa = () => {
  const [notificaciones] = useState<string[]>([
    "Nueva propuesta recibida para 'Innovación en Energías Renovables'",
    "Fecha límite próxima: 'Automatización de Procesos' - 5 días",
    "3 emprendedores han visto tu desafío",
    "Actualización del sistema disponible",
  ]);

  const menuItems: MenuProps["items"] = notificaciones.map((n, i) => ({
    key: i.toString(),
    label: <div className="menu-item">{n}</div>,
  }));

  return (
    <div className="home-container">
      <div className="home-content">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Encabezado */}
          <div className="home-header">
            <Title level={2} className="home-title">
              Bienvenida, EMPRESA
            </Title>

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

          {/* Tarjeta con carrusel */}
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
