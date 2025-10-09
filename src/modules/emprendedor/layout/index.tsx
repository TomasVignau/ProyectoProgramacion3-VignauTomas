import "../../../styles/layout.css";
import { FC, useState } from "react";
import { MenuProps, Layout, Menu, Typography } from "antd";
import { MailOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

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
      Desafios Publicados
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
    <Link to="/" style={{ color: "red" }}>
      Desloguear
    </Link>,
    "/",
    <UserOutlined style={{ color: "red" }} />
  ),
];

export const LayoutCustomEmprendedor: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // para saber en qué ruta estamos

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        style={{ background: "#463F3A" }}
        onCollapse={(value) => setCollapsed(value)}
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
          <Title level={2} style={{fontWeight: "bold", color: "#463F3A"}} className='title'>
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
};
