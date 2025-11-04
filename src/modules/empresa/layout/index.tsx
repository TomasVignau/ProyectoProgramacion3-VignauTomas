/*import "../../../styles/layout.css";
import { FC, useEffect, useState } from "react";
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

const usuario = { nombre: "MathSolutions SA" }; // Simulación de usuario logueado

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

const menuUsuario = (
  <AntMenu>
    <AntMenu.Item key="logout">
      <Link to="/" style={{ color: "red" }}>
        Desloguear
      </Link>
    </AntMenu.Item>
  </AntMenu>
);

const items: MenuItem[] = [
  getItem(
    <Link to="/empresa/home" className="colorTextoMenu">
      Inicio
    </Link>,
    "/empresa/home",
    <HomeOutlined className="colorTextoMenu" />
  ),
  getItem(
    <Link to="/empresa/formulario" className="colorTextoMenu">
      Publicar Desafío
    </Link>,
    "/empresa/formulario",
    <MailOutlined className="colorTextoMenu" />
  ),
  getItem(
    <Link to="/empresa/desafios" className="colorTextoMenu">
      Desafíos
    </Link>,
    "/empresa/desafios",
    <UserOutlined className="colorTextoMenu" />
  ),
];

export const LayoutCustomEmpresa: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // para saber en qué ruta estamos

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
        style={{
          background: "#463F3A",
          display: "flex",
          flexDirection: "column",
        }}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md" // se colapsa automáticamente en pantallas < 768px
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]} // se actualiza según la ruta
          mode="inline"
          items={items}
          style={{
            background: "#463F3A",
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
import { FC, useEffect, useState } from "react";
import { Layout, Menu, Typography, Dropdown, Avatar, Space } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const usuario = { nombre: "MathSolutions SA" };

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

export const LayoutCustomEmpresa: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items: MenuItem[] = [
    getItem(
      <Link to="/empresa/home" className="colorTextoMenu">
        Inicio
      </Link>,
      "/empresa/home",
      <HomeOutlined className="colorTextoMenu" />
    ),
    getItem(
      <Link to="/empresa/formulario" className="colorTextoMenu">
        Publicar Desafío
      </Link>,
      "/empresa/formulario",
      <PlusCircleOutlined className="colorTextoMenu" />
    ),
    getItem(
      <Link to="/empresa/desafios" className="colorTextoMenu">
        Mis Desafíos
      </Link>,
      "/empresa/desafios",
      <FileTextOutlined className="colorTextoMenu" />
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
      <Sider
        collapsible
        collapsed={collapsed}
        style={{
          background: "#463F3A",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
        }}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        trigger={null} // 🔹 esto oculta el botón
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                EMPRESA
              </Title>
            )}
          </div>

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

      <Layout style={{ width: "100%" }}>
        <Header
          style={{
            padding: "0 24px",
            background: "linear-gradient(135deg, #BCB8B1 0%, #A8A39C 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            position: "relative", // 🔹 necesario para que left/top funcionen
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: 24,
              color: "#463F3A", // 🔹 cambiar a un color que contraste con el header
              zIndex: 10, // 🔹 asegurar que esté por encima del título
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
            }}
            className="title"
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
