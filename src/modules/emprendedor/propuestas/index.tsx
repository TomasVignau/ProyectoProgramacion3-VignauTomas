import { Button, Table, Spin, Tag, Select, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import { PropuestaFormValues } from "../../../types/propuestaFormValues";
import { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import api from "../../../api.ts";

const { Title, Text } = Typography;

export const PropuestasEmprendedor = () => {
  const [propuestas, setPropuestas] = useState<PropuestaFormValues[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //const token = localStorage.getItem("token"); Lo pone automáticamente el interceptor de api
    const emprendedor = localStorage.getItem("user");
    const emprendedorId = emprendedor ? JSON.parse(emprendedor)._id : null;

    setIsLoading(true);

    api
      .get(`/proposals/emprendedor/${emprendedorId}`)
      .then((res) => {
        setPropuestas(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching proposals:", err);
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = (value: string | undefined) => {
    setFiltroEstado(value ?? null);
  };

  const propuestasFiltradas = filtroEstado
    ? propuestas.filter((p) => p.state === filtroEstado)
    : propuestas;

  const propuestasAdaptadas = propuestasFiltradas.map((p) => ({
    key: p._id,
    nombreDesafio: p.idChallenge?.title ?? "—",
    descripcion: p.description ?? "Sin descripción",
    categoria: p.category ?? "Sin categoría",
    empresaDesafio: p.idCompany?.name ?? "—",
    fecha: p.publicationDate
      ? new Date(p.publicationDate).toLocaleDateString("es-AR")
      : "—",
    estado: p.state ?? "—",
  }));

  const columns = [
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (text: string) => (
        <Text ellipsis={{ tooltip: text }} style={{ maxWidth: 280 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Categoría",
      dataIndex: "categoria",
      key: "categoria",
      align: "center" as const,
    },
    {
      title: "Desafío Asociado",
      dataIndex: "nombreDesafio",
      key: "nombreDesafio",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Empresa Desafío",
      dataIndex: "empresaDesafio",
      key: "empresaDesafio",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Fecha de Envío",
      dataIndex: "fecha",
      key: "fecha",
      align: "center" as const,
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
          Mis Propuestas
        </Title>
      </Space>

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
          tip="Cargando tus propuestas..."
          size="large"
          style={{ width: "100%", marginTop: 40 }}
        />
      ) : (
        <Table
          dataSource={propuestasAdaptadas}
          columns={columns}
          rowKey="key"
          bordered
          scroll={{ x: "max-content" }}
          pagination={{
            pageSize: 8,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total} propuestas`,
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
