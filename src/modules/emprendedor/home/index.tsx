/*import "../../../styles/home.css";
import { Carousel } from "antd";

export const HomeEmprendedor = () => {
  return (
    <div style={{ textAlign: "center", padding: "0 10px" }}>
      <h1>Bienvenido EMPRENDEDOR a la página de inicio</h1>
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
              src="https://wallpapers.com/images/hd/entrepreneur-skyscraper-5ze2orkv2zv9pbhl.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://e1.pxfuel.com/desktop-wallpaper/990/550/desktop-wallpaper-entrepreneur-entrapreneur.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://cdn.forbes.com.mx/2022/11/emprendimiento-emprendedores-empresa-contabilidad-credito.jpg"
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

export const HomeEmprendedor = () => {
  const [notificaciones] = useState<string[]>([
    "Propuesta 2: Revisión completada",
    "Tu propuesta para Desafío 5 fue aceptada",
    "Nuevo desafío publicado: Desafío 8",
  ]);

  const menuItems: MenuProps["items"] = notificaciones.map((n, i) => ({
    key: i.toString(),
    label: <div className="menu-item">{n}</div>,
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
            <Link
              to="/emprendedor/desafiosPublicados"
              className="home-link"
            >
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

            <Link
              to="/emprendedor/propuestas"
              className="home-link"
            >
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
