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
  Breadcrumb,
} from "antd";
import {
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

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

  const [usuario, setUsuario] = useState<{ name: string }>({
    name: "Invitado",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }

    // Si el localStorage cambia (por ejemplo, tras login)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUsuario(JSON.parse(updatedUser));
      } else {
        setUsuario({ name: "Invitado" });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
    getItem(
      <Link to="/emprendedor/follows" className="colorTextoMenu">
        Empresas Seguidas
      </Link>,
      "/emprendedor/follows",
      <CheckOutlined className="colorTextoMenu" />
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
          {/* Bloque (usuario y hora) */}
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
                      {usuario.name}
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
          {/* === Breadcrumb dinámico === */}
          <div
            style={{
              marginBottom: 16,
              background: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Breadcrumb
              items={[
                {
                  href: "/emprendedor/home",
                  title: <HomeOutlined />,
                },
                ...(() => {
                  const path = location.pathname;

                  // === Publicar desafío ===
                  if (path.includes("/emprendedor/desafiosPublicados")) {
                    return [
                      {
                        href: "/empresa/desafiosPublicados",
                        title: (
                          <>
                            <PlusCircleOutlined />
                            <span style={{ marginLeft: 4 }}>Ver Desafíos</span>
                          </>
                        ),
                      },
                    ];
                  }

                  // === Mis desafíos ===
                  if (path.includes("/emprendedor/propuestas")) {
                    return [
                      {
                        href: "/emprendedor/propuestas",
                        title: (
                          <>
                            <FileTextOutlined />
                            <span style={{ marginLeft: 4 }}>
                              Mis Propuestas
                            </span>
                          </>
                        ),
                      },
                    ];
                  }

                  if (path.includes("/emprendedor/follows")) {
                    return [
                      {
                        href: "/emprendedor/follows",
                        title: (
                          <>
                            <CheckOutlined />
                            <span style={{ marginLeft: 4 }}>
                              Empresas Seguidas
                            </span>
                          </>
                        ),
                      },
                    ];
                  }

                  // === Por defecto ===
                  return [
                    {
                      title: (
                        <>
                          <UserOutlined />
                          <span style={{ marginLeft: 4 }}>
                            Panel Emprendedor
                          </span>
                        </>
                      ),
                    },
                  ];
                })(),
              ].flat()}
            />
          </div>
          {/* === Contenido principal === */}
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
