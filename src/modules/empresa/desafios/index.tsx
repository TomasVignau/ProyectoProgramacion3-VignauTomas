import { Button, Table, Spin, Card, Space, Typography, Tag } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  EyeOutlined,
  CalendarOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { DesafioFormValues } from "../../../types/desafioFormValues";

const { Title } = Typography;

//import Desafios from "../../../data/desafios.json";

export const DesafiosEmpresa = () => {
  const [desafios, setDesafios] = useState<DesafioFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    //const token = localStorage.getItem("token") // 👈 o donde lo tengas guardado
    setIsLoading(true);
    fetch("http://localhost:4000/challenges", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjEwMDg1OTcsImlzcyI6ImJhc2UtYXBpLWV4cHJlc3MtZ2VuZXJhdG9yIiwic3ViIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0.p4MOoTviDgqfnueyXNnBt-EByQ4wJ__Xz9L9SrsDaPU'}`, // 👈 así se envía el token
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización")
        const data = await res.json()
        console.log("📦 Datos recibidos desde API:", data);
        setDesafios(data)
        setIsLoading(false);
      })
      .catch((err) => {
        //setError(err.message || "Error al conectar con la API");
        console.error("Error fetching challenges:", err);
        setIsLoading(false);
      })
  }, [])

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
      render: () => (
        <Link to="/empresa/verPropuestas">
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

