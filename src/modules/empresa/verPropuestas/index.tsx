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
import { IUserRef } from "../../../types/propuestaFormValues";
//import PropuestasData from "../../../data/propuestas.json";

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
    fetch("http://localhost:4000/proposals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjEwMDg1OTcsImlzcyI6ImJhc2UtYXBpLWV4cHJlc3MtZ2VuZXJhdG9yIiwic3ViIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIn0.p4MOoTviDgqfnueyXNnBt-EByQ4wJ__Xz9L9SrsDaPU"}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const data = await res.json();
        console.log("📦 Datos recibidos desde API:", data);

        setPropuestas(data);
      })
      .catch((err) => {
        console.error("Error al obtener desafíos:", err);
      })
      .finally(() => setIsLoading(false));
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
      dataIndex: "_id",
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
      dataIndex: "title",
      key: "nombreDesafio",
      render: (nombre: string) => (
        <Text strong style={{ color: "#463F3A" }}>
          {nombre}
        </Text>
      ),
    },
    {
      title: "Emprendedor",
      dataIndex: "idUser",
      key: "nombreEmprendedor",
      responsive: ["md"],
      render: (user: string | IUserRef) => {
        const nombre =
          typeof user === "string" ? user : (user?.name ?? "Sin nombre");

        return (
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
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "state",
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
