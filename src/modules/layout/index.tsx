import "../../styles/layout.css";
import { FC, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Space,
  Breadcrumb,
  type MenuProps,
} from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  CheckOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import UserFormValues from "../../types/userFormValues";

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

export const LayoutCustom: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [hora, setHora] = useState(new Date());
  const [desafioId, setDesafioId] = useState<string | null>(null);

  // Tipo de usuario y nombre
  const [usuario, setUsuario] = useState<UserFormValues | null>(null);

  // Obtener Usuario del Local Storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: UserFormValues = JSON.parse(storedUser);
      setUsuario(parsedUser);
    }

    // Pregunta si es Empresa o Emprendedor
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        const parsedUser: UserFormValues = JSON.parse(updatedUser);
        setUsuario(parsedUser);
      } else {
        setUsuario(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Actualización de la hora
  useEffect(() => {
    const interval = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Manejar ID de desafío
  useEffect(() => {
    // Empresa o emprendedor según path
    const matchDesafioEmpresa = location.pathname.match(
      /\/empresa\/verPropuestas\/([a-f0-9]{24})$/
    );
    const matchDesafioEmprendedor = location.pathname.match(
      /\/emprendedor\/publicarPropuesta\/([a-f0-9]{24})$/
    );

    if (matchDesafioEmpresa) {
      const idDesafio = matchDesafioEmpresa[1];
      setDesafioId(idDesafio);
      localStorage.setItem("desafioId", idDesafio);
    } else if (matchDesafioEmprendedor) {
      const idDesafio = matchDesafioEmprendedor[1];
      setDesafioId(idDesafio);
      localStorage.setItem("desafioId", idDesafio);
    }

    if (location.pathname.includes("/detalle")) {
      const storedId = localStorage.getItem("desafioId");
      if (storedId) setDesafioId(storedId);
    }
  }, [location.pathname]);

  // Cuando cierro sesión borra el local storage (para no navegar y entrar)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("desafioId");
    navigate("/", { replace: true });
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => window.history.go(1);
  };

  // Menú según el tipo de usuario
  const items: MenuItem[] =
    usuario?.role === "empresa"
      ? [
          getItem(
            <Link to="/empresa/home">Inicio</Link>,
            "/empresa/home",
            <HomeOutlined />
          ),
          getItem(
            <Link to="/empresa/formulario">Publicar Desafío</Link>,
            "/empresa/formulario",
            <PlusCircleOutlined />
          ),
          getItem(
            <Link to="/empresa/desafios">Mis Desafíos</Link>,
            "/empresa/desafios",
            <FileTextOutlined />
          ),
        ]
      : usuario?.role === "emprendedor"
        ? [
            getItem(
              <Link to="/emprendedor/home">Inicio</Link>,
              "/emprendedor/home",
              <HomeOutlined />
            ),
            getItem(
              <Link to="/emprendedor/desafiosPublicados">
                Desafíos Publicados
              </Link>,
              "/emprendedor/desafiosPublicados",
              <MailOutlined />
            ),
            getItem(
              <Link to="/emprendedor/propuestas">Prop. Personales</Link>,
              "/emprendedor/propuestas",
              <UserOutlined />
            ),
            getItem(
              <Link to="/emprendedor/follows">Empresas Seguidas</Link>,
              "/emprendedor/follows",
              <CheckOutlined />
            ),
          ]
        : [];

  // Breadcrumb según el tipo de usuario
  const breadcrumbItems = () => {
    const path = location.pathname;
    if (usuario?.role === "empresa") {
      if (path.includes("/empresa/formulario"))
        return [{ href: "/empresa/formulario", title: "Publicar Desafío" }];
      if (path.includes("/empresa/desafios"))
        return [{ href: "/empresa/desafios", title: "Mis Desafíos" }];
      if (path.includes("/empresa/verPropuestas"))
        return [
          { href: "/empresa/desafios", title: "Mis Desafíos" },
          {
            href: `/empresa/verPropuestas/${desafioId || ""}`,
            title: "Ver Propuestas",
          },
          ...(path.includes("/detalle")
            ? [{ title: "Detalle de Propuesta" }]
            : []),
        ];
    } else if (usuario?.role === "emprendedor") {
      if (path.includes("/emprendedor/desafiosPublicados"))
        return [
          { href: "/emprendedor/desafiosPublicados", title: "Ver Desafíos" },
        ];
      if (path.includes("/emprendedor/publicarPropuesta"))
        return [
          { href: "/emprendedor/desafiosPublicados", title: "Ver Desafíos" },
          {
            href: `/emprendedor/publicarPropuesta/${desafioId || ""}`,
            title: "Publicar Propuesta",
          },
        ];
      if (path.includes("/emprendedor/propuestas"))
        return [{ href: "/emprendedor/propuestas", title: "Mis Propuestas" }];
      if (path.includes("/emprendedor/follows"))
        return [{ href: "/emprendedor/follows", title: "Empresas Seguidas" }];
    }
    return [
      {
        title:
          "Panel " + (usuario?.role === "empresa" ? "Empresa" : "Emprendedor"),
      },
    ];
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
        trigger={null}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/*DATOS DEL USUARIO*/}
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
            <Link to = {usuario?.role === "emprendedor" ? `emprendedor/miinfo/${usuario._id}` : `empresa/miinfo/${usuario?._id}`} state={{ from: location.pathname }}>
              <Avatar
                size={collapsed ? 40 : 56}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#6B6356",
                  border: "2px solid #E0E0E0",
                }}
              />
            </Link>
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
                    {usuario?.name}
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
                {usuario?.role === "empresa" ? "EMPRESA" : "EMPRENDEDOR"}
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

      <Layout>
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

        <Content style={{ margin: 16 }}>
          <Breadcrumb
            items={[
              {
                href:
                  usuario?.role === "empresa"
                    ? "/empresa/home"
                    : "/emprendedor/home",
                title: <HomeOutlined />,
              },
              ...breadcrumbItems(),
            ]}
          />
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
            Tomi Vignau - INSPT © {new Date().getFullYear()}
          </Text>
        </Footer>
      </Layout>
    </Layout>
  );
};
