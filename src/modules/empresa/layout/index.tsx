import "../../../styles/layout.css";
import { FC, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Space,
  Breadcrumb,
} from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

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
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<{ name: string }>({
    name: "Invitado",
  });

  const [desafioId, setDesafioId] = useState<string | null>(null);

  useEffect(() => {
    // 1️⃣ Si la URL es /empresa/verPropuestas/:idDesafio → guardamos ese id
    const matchDesafio = location.pathname.match(
      /\/empresa\/verPropuestas\/([a-f0-9]{24})$/
    );
    if (matchDesafio) {
      const idDesafio = matchDesafio[1];
      setDesafioId(idDesafio);
      localStorage.setItem("desafioId", idDesafio);
    }

    // 2️⃣ Si estamos en /detalle/... → recuperamos el id del desafío desde localStorage
    if (location.pathname.includes("/detalle")) {
      const storedId = localStorage.getItem("desafioId");
      if (storedId) setDesafioId(storedId);
    }
  }, [location.pathname]);

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
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // 1. Borrar token y datos
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    // 2. Redirigir al login reemplazando historial
    navigate("/", { replace: true });

    // 3. Bloquear el botón "Atrás"
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

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
        trigger={null}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* === Avatar y datos del usuario === */}
          <div
            style={{
              cursor: "pointer",
              padding: "20px 16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(0, 0, 0, 0.2)",
              transition: "background 0.3s ease",
            }}
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

          {/* === Titulo Empresa === */}
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

          {/* === Menú === */}
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

          {/* === Botón Cerrar Sesión === */}
          <div
            onClick={handleLogout}
            style={{
              padding: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.25)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#E0E0E0",
              fontWeight: 600,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <LogoutOutlined style={{ fontSize: 18 }} />
            {!collapsed && <span>Cerrar Sesión</span>}
          </div>
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
                  href: "/empresa/home",
                  title: <HomeOutlined />,
                },
                ...(() => {
                  const path = location.pathname;

                  // === Publicar desafío ===
                  if (path.includes("/empresa/formulario")) {
                    return [
                      {
                        href: "/empresa/formulario",
                        title: (
                          <>
                            <PlusCircleOutlined />
                            <span style={{ marginLeft: 4 }}>
                              Publicar Desafío
                            </span>
                          </>
                        ),
                      },
                    ];
                  }

                  // === Mis desafíos ===
                  if (path.includes("/empresa/desafios")) {
                    return [
                      {
                        href: "/empresa/desafios",
                        title: (
                          <>
                            <FileTextOutlined />
                            <span style={{ marginLeft: 4 }}>Mis Desafíos</span>
                          </>
                        ),
                      },
                    ];
                  }

                  if (path.includes("/empresa/verPropuestas/detalle")) {
                    return [
                      {
                        href: "/empresa/desafios",
                        title: (
                          <>
                            <FileTextOutlined />
                            <span style={{ marginLeft: 4 }}>Mis Desafíos</span>
                          </>
                        ),
                      },
                      {
                        href: `/empresa/verPropuestas/${desafioId || ""}`,
                        title: (
                          <>
                            <EyeOutlined />
                            <span style={{ marginLeft: 4 }}>
                              Ver Propuestas
                            </span>
                          </>
                        ),
                      },
                      {
                        title: (
                          <>
                            <FileTextOutlined />
                            <span style={{ marginLeft: 4 }}>
                              Detalle de Propuesta
                            </span>
                          </>
                        ),
                      },
                    ];
                  }

                  if (path.includes("/empresa/verPropuestas")) {
                    return [
                      {
                        href: "/empresa/desafios",
                        title: (
                          <>
                            <FileTextOutlined />
                            <span style={{ marginLeft: 4 }}>Mis Desafíos</span>
                          </>
                        ),
                      },
                      {
                        title: (
                          <>
                            <EyeOutlined />
                            <span style={{ marginLeft: 4 }}>
                              Ver Propuestas
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
                          <span style={{ marginLeft: 4 }}>Panel Empresa</span>
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
