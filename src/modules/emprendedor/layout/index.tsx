/*import "../../../styles/layout.css";
import { FC, useState, useEffect } from "react";
import {
  MenuProps,
  Layout,
  Menu,
  Typography,
  Menu as AntMenu,
  Dropdown,
} from "antd";
import { MailOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const usuario = { nombre: "Juan Pérez" }; // Simulación de usuario logueado

const menuUsuario = (
  <AntMenu>
    <AntMenu.Item key="logout">
      <Link to="/" style={{ color: "red" }}>
        Desloguear
      </Link>
    </AntMenu.Item>
  </AntMenu>
);

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to="/emprendedor/home" className="colorTextoMenu">
      Inicio
    </Link>,
    "/emprendedor/home",
    <HomeOutlined className="colorTextoMenu" />
  ),
  getItem(
    <Link to="/emprendedor/desafiosPublicados" className="colorTextoMenu">
      Desafíos Publicados
    </Link>,
    "/emprendedor/desafiosPublicados",
    <MailOutlined className="colorTextoMenu" />
  ),
  getItem(
    <Link to="/emprendedor/propuestas" className="colorTextoMenu">
      Prop. Personales
    </Link>,
    "/emprendedor/propuestas",
    <UserOutlined className="colorTextoMenu" />
  ),
];

export const LayoutCustomEmprendedor: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        style={{
          height: "100vh",
          background: "#463F3A",
          position: "relative", // necesario para que el bloque absoluto se base en el Sider
        }}
      >
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          style={{
            background: "#463F3A",
            borderRight: "none",
          }}
        />

        <Dropdown
          overlay={menuUsuario}
          placement="topCenter"
          trigger={["click"]}
        >
          {/* Bloque del usuario fijo abajo */ /*}
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "10px 0",
              borderTop: "1px solid #5A524C",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#463F3A", // opcional para que no se vea transparente
            }}
          >
            <UserOutlined style={{ fontSize: 24, color: "#E0E0E0" }} />
            <span style={{ color: "#E0E0E0", fontWeight: "bold" }}>
              {usuario.nombre}
            </span>
            <h3 style={{ margin: "5px 0 0", fontSize: "14px" }}>Hora actual</h3>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
              {hora.toLocaleTimeString("es-AR", { hour12: false })}
            </p>
          </div>
        </Dropdown>
      </Sider>

      <Layout style={{ width: "100%" }}>
        <Header
          style={{
            padding: 0,
            background: "#BCB8B1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title
            level={2}
            style={{ fontWeight: "bold", color: "#463F3A" }}
            className="title"
          >
            PLATAFORMA DE INNOVACIÓN Y PROPUESTA EMPRESARIALES
          </Title>
        </Header>

        <Content style={{ margin: "20px 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#BCB8B1",
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Tomás Vignau - INSPT © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};*/

import "../../../styles/layout.css";
import { FC, useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Typography,
  Dropdown,
  Avatar,
  Space,
  type MenuProps,
} from "antd";
import {
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const usuario = { nombre: "Juan Pérez" }; // usuario simulado

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return { key, icon, label } as MenuItem;
}

export const LayoutCustomEmprendedor: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const items: MenuItem[] = [
    getItem(
      <Link to="/emprendedor/home" className="colorTextoMenu">
        Inicio
      </Link>,
      "/emprendedor/home",
      <HomeOutlined className="colorTextoMenu" />
    ),
    getItem(
      <Link to="/emprendedor/desafiosPublicados" className="colorTextoMenu">
        Desafíos Publicados
      </Link>,
      "/emprendedor/desafiosPublicados",
      <MailOutlined className="colorTextoMenu" />
    ),
    getItem(
      <Link to="/emprendedor/propuestas" className="colorTextoMenu">
        Prop. Personales
      </Link>,
      "/emprendedor/propuestas",
      <UserOutlined className="colorTextoMenu" />
    ),
  ];

  const menuUsuario: MenuProps = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: <Link to="/">Cerrar Sesión</Link>,
        danger: true,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ===== SIDEBAR ===== */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: "#463F3A",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
        }}
        breakpoint="md"
        trigger={null}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Encabezado del Sider */}
          <div
            style={{
              padding: "24px 16px",
              textAlign: "center",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {!collapsed && (
              <Title
                level={4}
                style={{ color: "#E0E0E0", margin: 0, fontWeight: 700 }}
              >
                EMPRENDEDOR
              </Title>
            )}
          </div>

          {/* Menú principal */}
          <Menu
            theme="dark"
            selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
            style={{
              background: "transparent",
              flex: 1,
              border: "none",
            }}
          />

          {/* Bloque inferior (usuario y hora) */}
          <Dropdown
            menu={menuUsuario}
            placement="topCenter"
            trigger={["click"]}
          >
            <div
              style={{
                cursor: "pointer",
                padding: "20px 16px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(0, 0, 0, 0.2)",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0, 0, 0, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(0, 0, 0, 0.2)")
              }
            >
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%", alignItems: "center" }}
              >
                <Avatar
                  size={collapsed ? 40 : 56}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "#6B6356",
                    border: "2px solid #E0E0E0",
                  }}
                />
                {!collapsed && (
                  <>
                    <Text
                      strong
                      style={{
                        color: "#E0E0E0",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      {usuario.nombre}
                    </Text>
                    <Space size="small" style={{ color: "#BCB8B1" }}>
                      <ClockCircleOutlined />
                      <Text style={{ color: "#BCB8B1", fontSize: 13 }}>
                        {hora.toLocaleTimeString("es-AR", { hour12: false })}
                      </Text>
                    </Space>
                  </>
                )}
              </Space>
            </div>
          </Dropdown>
        </div>
      </Sider>

      {/* ===== CONTENIDO ===== */}
      <Layout style={{ width: "100%" }}>
        <Header
          style={{
            padding: "0 24px",
            background: "linear-gradient(135deg, #BCB8B1 0%, #A8A39C 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          {/* Botón colapsar */}
          <div
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: 24,
              color: "#463F3A",
              zIndex: 10,
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <Title
            level={2}
            style={{
              fontWeight: 700,
              color: "#463F3A",
              margin: 0,
              textShadow: "1px 1px 2px rgba(255, 255, 255, 0.5)",
              textAlign: "center",
            }}
          >
            PLATAFORMA DE INNOVACIÓN Y PROPUESTA EMPRESARIALES
          </Title>
        </Header>

        <Content style={{ margin: "24px 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#f5f5f5",
              borderRadius: 12,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "#ffffff",
            borderTop: "1px solid #e8e8e8",
            fontWeight: 500,
          }}
        >
          <Text type="secondary">
            Tomás Vignau - INSPT © {new Date().getFullYear()}
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
};
