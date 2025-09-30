import '../../styles/layout.css'
import { FC, useState } from "react";
import { MenuProps, Layout, Menu, Typography, theme } from "antd";
import {
  MailOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
  getItem(<Link to="/home">Inicio</Link>, "/home", <HomeOutlined />),
  getItem(<Link to="/formulario">Formulario</Link>,"/formulario" , <MailOutlined />),
  getItem(<Link to="/personas">Personas</Link>,"/personas" , <UserOutlined />),
  getItem(<Link to="/" style={{color: "red"}}>Desloguear</Link>,"/" , <UserOutlined style={{color: "red"}}/>),
];

export const LayoutCustom: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // para saber en qué ruta estamos

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}  // se actualiza según la ruta
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout style={{ width: "100%"}}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={3} className='title'>
            PLATAFORMA DE INNOVACIÓN Y PROPUESTA EMPRESARIALES
          </Title>
        </Header>

        <Content style={{ margin: "20px 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Personas © {new Date().getFullYear()} 
        </Footer>
      </Layout>
    </Layout>
  );
};
