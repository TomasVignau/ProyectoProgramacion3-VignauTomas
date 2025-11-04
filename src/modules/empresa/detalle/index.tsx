import { useParams } from "react-router-dom";
import { Card, Typography, Button, Space, Tag } from "antd";
import { EnvironmentOutlined, GlobalOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../styles/empresaDetalle.css";

const { Title, Text, Paragraph } = Typography;

const empresas: Record<
  string,
  { descripcion: string; ubicacion: string; sitioWeb: string; categoria: string }
> = {
  "MathSolutions SA": {
    descripcion: "Empresa especializada en soluciones matemáticas y análisis de datos. Ofrecemos consultoría en estadística aplicada, IA y modelado predictivo.",
    ubicacion: "Buenos Aires, Argentina",
    sitioWeb: "https://mathsolutions.com.ar",
    categoria: "Ciencia de Datos",
  },
  "ReactDev Company": {
    descripcion: "Consultora dedicada al desarrollo web moderno con React, TypeScript y herramientas de diseño de experiencia de usuario.",
    ubicacion: "Córdoba, Argentina",
    sitioWeb: "https://reactdev.io",
    categoria: "Desarrollo Web",
  },
  "DataDesign Ltd": {
    descripcion: "Empresa enfocada en diseño y modelado de bases de datos empresariales, integrando soluciones escalables y seguras.",
    ubicacion: "Mendoza, Argentina",
    sitioWeb: "https://datadesign.com.ar",
    categoria: "Base de Datos",
  },
  "SoftDesign Corp": {
    descripcion: "Desarrolladora de soluciones de software a medida para entornos comerciales. Creamos herramientas flexibles y eficientes.",
    ubicacion: "Rosario, Argentina",
    sitioWeb: "https://softdesigncorp.com",
    categoria: "Software Empresarial",
  },
  "MathLab SA": {
    descripcion: "Compañía dedicada a la investigación y desarrollo en matemáticas aplicadas y estadísticas, colaborando con instituciones científicas.",
    ubicacion: "La Plata, Argentina",
    sitioWeb: "https://mathlabsa.com",
    categoria: "Investigación",
  },
};

export default function EmpresaDetalle() {
  const { nombreEmpresa } = useParams<{ nombreEmpresa?: string }>();
  const empresa = nombreEmpresa ? empresas[nombreEmpresa] : undefined;
  const navigate = useNavigate();

  if (!empresa) {
    return (
      <div className="empresaNotFound">
        <Title level={3} style={{ color: "#b23a48" }}>
          Empresa no encontrada
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
          {nombreEmpresa}
        </Title>
        <Tag color="#463F3A">{empresa.categoria}</Tag>
      </div>

      <Card bordered={false} className="empresaCard" hoverable>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph className="empresaDescripcion">
            {empresa.descripcion}
          </Paragraph>

          <Space align="center">
            <EnvironmentOutlined style={{ color: "#463F3A" }} />
            <Text strong>{empresa.ubicacion}</Text>
          </Space>

          <Button
            type="primary"
            icon={<GlobalOutlined />}
            href={empresa.sitioWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="empresaBoton"
          >
            Visitar sitio web
          </Button>

          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/emprendedor/desafiosPublicados")}
            className="volverBtn"
          >
            Volver
          </Button>
        </Space>
      </Card>
    </div>
  );
}
