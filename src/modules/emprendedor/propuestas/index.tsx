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

export const PropuestasEmprendedor = () => {
  const [propuestas, setPropuestas] = useState<PropuestaFormValues[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Obteniendo desafíos publicados...");
    setIsLoading(true);

    const timer = setTimeout(() => {
      setPropuestas(PropuestasData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (value: string | undefined) => {
    setFiltroEstado(value ?? null);
  };

  const propuestasFiltradas = filtroEstado
    ? propuestas.filter((p) => p.estado === filtroEstado)
    : propuestas;

  const columns = [
    {
      title: "Id-Desafio",
      dataIndex: "idDesafio",
      key: "idDesafio",
    },
    {
      title: "Nombre Desafío",
      dataIndex: "nombreDesafio",
      key: "nombreDesafio",
    },
    {
      title: "Nombre Empresa",
      dataIndex: "nombreEmpresa",
      key: "nombreEmpresa",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado: string) => {
        switch (estado) {
          case "aceptada":
            return (
              <Tag icon={<CheckCircleOutlined />} color="green">
                Aceptada
              </Tag>
            );
          case "rechazada":
            return (
              <Tag icon={<CloseCircleOutlined />} color="red">
                Rechazada
              </Tag>
            );
          case "pendiente":
            return (
              <Tag icon={<SyncOutlined spin />} color="blue">
                Pendiente
              </Tag>
            );
          default:
            return <Tag color="default">{estado}</Tag>;
        }
      },
    },
  ];

  return (
    <div style={{ padding: "20px 10px" }}>
      <h2>Listado de Propuestas</h2>

      <Select
        showSearch
        placeholder="Filtrar por Estado"
        allowClear
        style={{ width: "100%", maxWidth: 250, marginBottom: 16 }}
        optionFilterProp="label"
        onChange={handleFilterChange}
        options={[
          { value: "aceptada", label: "Aceptada" },
          { value: "pendiente", label: "Pendiente" },
          { value: "rechazada", label: "Rechazada" },
        ]}
      />

      {isLoading ? (
        <Spin
          style={{ color: "#463F3A" }}
          tip="Cargando información de las propuestas..."
          size="large"
        >
          {content}
        </Spin>
      ) : (
        <Table
          dataSource={propuestasFiltradas}
          columns={columns}
          rowKey="idDesafio"
          scroll={{ x: "max-content" }}
        />
      )}

      <Link to="/emprendedor/home">
        <Button
          type="primary"
          style={{ marginTop: 16, width: "100%", backgroundColor: "#463F3A" }}
        >
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};*/

import { Button, Table, Spin, Tag, Select, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import { PropuestaFormValues } from "../../../types/propuestaFormValues";
import { useState, useEffect } from "react";
import { content } from "../../../utils/content";
import PropuestasData from "../../../data/propuestas.json";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

export const PropuestasEmprendedor = () => {
  const [propuestas, setPropuestas] = useState<PropuestaFormValues[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setPropuestas(PropuestasData);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (value: string | undefined) => {
    setFiltroEstado(value ?? null);
  };

  const propuestasFiltradas = filtroEstado
    ? propuestas.filter((p) => p.estado === filtroEstado)
    : propuestas;

  const columns = [
    {
      title: "ID Desafío",
      dataIndex: "idDesafio",
      key: "idDesafio",
      align: "center" as const,
    },
    {
      title: "Nombre del Desafío",
      dataIndex: "nombreDesafio",
      key: "nombreDesafio",
    },
    {
      title: "Empresa",
      dataIndex: "nombreEmpresa",
      key: "nombreEmpresa",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      align: "center" as const,
      render: (estado: string) => {
        switch (estado) {
          case "aceptada":
            return (
              <Tag icon={<CheckCircleOutlined />} color="green">
                Aceptada
              </Tag>
            );
          case "rechazada":
            return (
              <Tag icon={<CloseCircleOutlined />} color="red">
                Rechazada
              </Tag>
            );
          case "pendiente":
            return (
              <Tag icon={<SyncOutlined spin />} color="blue">
                Pendiente
              </Tag>
            );
          default:
            return <Tag color="default">{estado}</Tag>;
        }
      },
    },
  ];

  return (
    <div
      style={{
        padding: "24px 16px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Space align="center" style={{ marginBottom: 16 }}>
        <FileTextOutlined style={{ fontSize: 24, color: "#463F3A" }} />
        <Title level={3} style={{ margin: 0, color: "#463F3A" }}>
          Listado de Propuestas 
        </Title>
      </Space>
      <br></br>
      <br></br>
      <Select
        showSearch
        placeholder="Filtrar por Estado"
        allowClear
        style={{
          width: "100%",
          maxWidth: 250,
          marginBottom: 20,
        }}
        optionFilterProp="label"
        onChange={handleFilterChange}
        options={[
          { value: "aceptada", label: "Aceptada" },
          { value: "pendiente", label: "Pendiente" },
          { value: "rechazada", label: "Rechazada" },
        ]}
      />

      {isLoading ? (
        <Spin
          style={{ color: "#463F3A" }}
          tip="Cargando información de las propuestas..."
          size="large"
        >
          {content}
        </Spin>
      ) : (
        <Table
          dataSource={propuestasFiltradas}
          columns={columns}
          rowKey="idDesafio"
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total} desafíos`,
          }}
        />
      )}

      <Link to="/emprendedor/home">
        <Button
          type="primary"
          block
          size="large"
          style={{
            marginTop: 24,
            backgroundColor: "#463F3A",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};
