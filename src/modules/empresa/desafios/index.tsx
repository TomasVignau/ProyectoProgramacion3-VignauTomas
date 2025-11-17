import { Button, Table, Spin, Card, Space, Typography, Tag } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { DesafioFormValues } from "../../../types/desafioFormValues";
import api from "../../../api.ts";

const { Title } = Typography;

//import Desafios from "../../../data/desafios.json";

export const DesafiosEmpresa = () => {
  const [desafios, setDesafios] = useState<DesafioFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const empresa = localStorage.getItem("user");
    const empresaId = empresa ? JSON.parse(empresa)._id : null;

    console.log("Empresa ID:", empresaId);
    console.log("Token:", token);

    setIsLoading(true);

    api
      .get(`/challenges/company/${empresaId}`)
      .then((res) => {
        setDesafios(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error obteniendo challenges:", err);
        setIsLoading(false);
      });
  }, []);

  const columns: ColumnsType<DesafioFormValues> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      width: 80,
      render: (id: number) => (
        <Tag color="blue" style={{ fontWeight: 600 }}>
          #{id}
        </Tag>
      ),
    },
    {
      title: "Nombre del Desafío",
      dataIndex: "title",
      key: "nombre",
      render: (nombre: string) => (
        <span style={{ fontWeight: 600, color: "#463F3A" }}>{nombre}</span>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "descripcion",
      responsive: ["md"],
    },
    {
      title: "Fecha Límite",
      dataIndex: "expirationDate",
      key: "fechaTope",
      render: (fecha: Date) => (
        <Space>
          <CalendarOutlined style={{ color: "#463F3A" }} />
          {fecha.toString().split("T")[0]}
        </Space>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      width: 180,
      render: (_, record) => (
        <Link
          to={`/empresa/verPropuestas/${record._id}`}
          onClick={() => localStorage.setItem("desafioId", record._id ?? "")}
        >
          <Button
            type="primary"
            icon={<EyeOutlined />}
            style={{ backgroundColor: "#463F3A", borderColor: "#463F3A" }}
          >
            Ver Propuestas
          </Button>
        </Link>
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
              Mis Desafíos Publicados
            </Title>
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Spin
                size="large"
                tip="Cargando información de los desafíos..."
              />
            </div>
          ) : (
            <Table
              dataSource={desafios}
              columns={columns}
              rowKey="id"
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total: ${total} desafíos`,
              }}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};
