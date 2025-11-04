import { useParams } from "react-router-dom";
import { Card, Typography, Button, Space, Tag } from "antd";
import { EnvironmentOutlined, GlobalOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../styles/empresaDetalle.css";

const { Title, Text, Paragraph } = Typography;

const emprendedores: Record<
  string,
  { descripcion: string; ubicacion: string; link: string; area: string }
> = {
  "Sofía Ramírez": {
    descripcion: "Ingeniera de software especializada en desarrollo web con React y Node.js. Apasionada por proyectos de código abierto.",
    ubicacion: "Buenos Aires, Argentina",
    link: "https://github.com/sofiaramirez",
    area: "Desarrollo Web",
  },
  "Martín López": {
    descripcion: "Data Scientist con experiencia en análisis predictivo, machine learning y visualización de datos. Mentor en comunidades de IA.",
    ubicacion: "Córdoba, Argentina",
    link: "https://www.linkedin.com/in/martinlopezds/",
    area: "Ciencia de Datos",
  },
  "Lucía Fernández": {
    descripcion: "Diseñadora UX/UI que crea experiencias digitales intuitivas y atractivas, trabajando con startups y emprendimientos.",
    ubicacion: "Mendoza, Argentina",
    link: "https://www.linkedin.com/in/luciafernandezux/",
    area: "Diseño UX/UI",
  },
  "Tomás Vignau": {
    descripcion: "Full Stack Developer especializado en Flutter y aplicaciones móviles. Creador de proyectos educativos y herramientas de productividad.",
    ubicacion: "Rosario, Argentina",
    link: "https://github.com/tomasvignau",
    area: "Desarrollo Móvil",
  },
  "Valentina Gómez": {
    descripcion: "Investigadora en Inteligencia Artificial y Machine Learning, con foco en NLP y modelos generativos aplicados a la educación.",
    ubicacion: "La Plata, Argentina",
    link: "https://www.linkedin.com/in/valentinagomezai/",
    area: "Investigación en IA",
  },
};


export default function EmprendedorDetalle() {
  const { nombreEmprendedor } = useParams<{ nombreEmprendedor?: string }>();
  const emprendedor = nombreEmprendedor ? emprendedores[nombreEmprendedor] : undefined;
  const navigate = useNavigate();

  if (!emprendedor) {
    return (
      <div className="empresaNotFound">
        <Title level={3} style={{ color: "#b23a48" }}>
          Emprendedor no encontrado
        </Title>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="empresaContainer">
      <div className="empresaHeader">
        <Title level={2} className="empresaTitulo">
          {nombreEmprendedor}
        </Title>
        <Tag color="#463F3A">{emprendedor.area}</Tag>
      </div>

      <Card bordered={false} className="empresaCard" hoverable>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph className="empresaDescripcion">
            {emprendedor.descripcion}
          </Paragraph>

          <Space align="center">
            <EnvironmentOutlined style={{ color: "#463F3A" }} />
            <Text strong>{emprendedor.ubicacion}</Text>
          </Space>

          <Button
            type="primary"
            icon={<GlobalOutlined />}
            href={emprendedor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="empresaBoton"
          >
            Visitar sitio web
          </Button>

          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/empresa/verPropuestas")}
            className="volverBtn"
          >
            Volver
          </Button>
        </Space>
      </Card>
    </div>
  );
}
