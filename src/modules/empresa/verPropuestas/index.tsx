/*import { Button, Table, Spin, Tag, Select } from "antd";
import { Link } from "react-router-dom";
import { PropuestaFormValues } from "../../../types/propuestaFormValues";
import { useState, useEffect } from "react";
import { content } from "../../../utils/content";
import PropuestasData from "../../../data/propuestas.json";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

export const VerPropuestasEmprendedores = () => {
  const [propuestas, setPropuestas] = useState<PropuestaFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Obteniendo propuestas publicadas...");
    setIsLoading(true);

    const timer = setTimeout(() => {
      setPropuestas(PropuestasData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const columns: ColumnsType<PropuestaFormValues> = [
  {
    title: "Id-Desafio",
    dataIndex: "idDesafio",
    key: "idDesafio",
    responsive: ["xs", "sm", "md", "lg", "xl"],
  },
  {
    title: "Nombre Desafío",
    dataIndex: "nombreDesafio",
    key: "nombreDesafio",
    responsive: ["xs", "sm", "md", "lg", "xl"],
  },
  {
    title: "Nombre Empresa",
    dataIndex: "nombreEmpresa",
    key: "nombreEmpresa",
    responsive: ["xs", "sm", "md", "lg", "xl"],
  },
  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
    render: () => (
      <Select
        defaultValue="--Seleccione un estado--"
        style={{ width: "100%", minWidth: 150 }}
        options={[
          {
            value: "aceptada",
            label: (
              <Tag icon={<CheckCircleOutlined />} color="green">
                Aceptada
              </Tag>
            ),
          },
          {
            value: "pendiente",
            label: (
              <Tag icon={<SyncOutlined spin />} color="blue">
                Pendiente
              </Tag>
            ),
          },
          {
            value: "rechazada",
            label: (
              <Tag icon={<CloseCircleOutlined />} color="red">
                Rechazada
              </Tag>
            ),
          },
        ]}
        onChange={() => {
          alert("Cambio de estado no implementado en este demo.");
        }}
      />
    ),
  },
];

  return (
    <div style={{ padding: 20, maxWidth: "100%", overflowX: "auto" }}>
      <h2>Listado de Propuestas</h2>

      {isLoading ? (
        <Spin tip="Cargando información de las propuestas..." size="large">
          {content}
        </Spin>
      ) : (
        <Table dataSource={propuestas} columns={columns} rowKey="idDesafio" scroll={{ x: "max-content" }}/>
      )}

      <Link to="/empresa/home">
        <Button type="primary" style={{ width: "100%", maxWidth: 200 }}>
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};*/

import {
  Button,
  Table,
  Spin,
  Tag,
  Select,
  Card,
  Space,
  Typography,
} from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import PropuestasData from "../../../data/propuestas.json";

const { Title, Text } = Typography;

interface PropuestaFormValues {
  idDesafio: number;
  nombreDesafio: string;
  nombreEmpresa: string;
  estado: string;
}

export const VerPropuestasEmprendedores = () => {
  const [propuestas, setPropuestas] = useState<PropuestaFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setPropuestas(PropuestasData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEstadoChange = (value: string, record: PropuestaFormValues) => {
    setPropuestas((prev) =>
      prev.map((p) =>
        p.idDesafio === record.idDesafio &&
        p.nombreEmpresa === record.nombreEmpresa
          ? { ...p, estado: value }
          : p
      )
    );
  };

  const columns: ColumnsType<PropuestaFormValues> = [
    {
      title: "ID Desafío",
      dataIndex: "idDesafio",
      key: "idDesafio",
      width: 120,
      render: (id: number) => (
        <Tag color="blue" style={{ fontWeight: 600 }}>
          #{id}
        </Tag>
      ),
    },
    {
      title: "Nombre del Desafío",
      dataIndex: "nombreDesafio",
      key: "nombreDesafio",
      render: (nombre: string) => (
        <Text strong style={{ color: "#463F3A" }}>
          {nombre}
        </Text>
      ),
    },
    {
      title: "Emprendedor",
      dataIndex: "nombreEmpresa",
      key: "nombreEmpresa",
      responsive: ["md"],
      render: (nombre: string) => (
        <Link
          to={`/empresa/emprendedor/${encodeURIComponent(nombre)}`}
          style={{
            color: "#BC6C25",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <ApartmentOutlined style={{ marginRight: 6 }} /> {nombre}
        </Link>
      ),
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      width: 200,
      render: (estado: string, record: PropuestaFormValues) => (
        <Select
          value={estado}
          style={{ width: "100%", minWidth: 150 }}
          onChange={(value) => handleEstadoChange(value, record)}
        >
          <Select.Option value="pendiente">
            <Tag icon={<SyncOutlined spin />} color="processing">
              Pendiente
            </Tag>
          </Select.Option>
          <Select.Option value="aceptada">
            <Tag icon={<CheckCircleOutlined />} color="success">
              Aceptada
            </Tag>
          </Select.Option>
          <Select.Option value="rechazada">
            <Tag icon={<CloseCircleOutlined />} color="error">
              Rechazada
            </Tag>
          </Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 10px" }}>
      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2} style={{ color: "#463F3A", marginBottom: 8 }}>
              Propuestas Recibidas
            </Title>
            <Text type="secondary">
              Revisa y gestiona las propuestas de los emprendedores
            </Text>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Spin
                size="large"
                tip="Cargando información de las propuestas..."
              />
            </div>
          ) : (
            <Table
              dataSource={propuestas}
              columns={columns}
              rowKey={(record) => `${record.idDesafio}-${record.nombreEmpresa}`}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total: ${total} propuestas`,
              }}
            />
          )}

          <Link to="/empresa/home">
            <Button
              type="default"
              icon={<HomeOutlined />}
              size="large"
              block
              style={{
                borderColor: "#463F3A",
                color: "#463F3A",
              }}
            >
              Volver al Inicio
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  );
};
