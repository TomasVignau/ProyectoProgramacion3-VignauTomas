import {
  Button,
  Table,
  Spin,
  Tag,
  Select,
  Card,
  Space,
  Typography,
  message,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import UserFormValues from "../../../types/userFormValues";
import { PropuestaFormValues } from "../../../types/propuestaFormValues";
//import PropuestasData from "../../../data/propuestas.json";

const { Title, Text } = Typography;

export const VerPropuestasEmprendedores = () => {
  const { idChallenge } = useParams<{ idChallenge: string }>();
  const token = localStorage.getItem("token");
  const [propuestas, setPropuestas] = useState<PropuestaFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:4000/proposals/challenge/${idChallenge}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
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
  }, [idChallenge]);

  const handleEstadoChange = async (
    nuevoEstado: string,
    record: PropuestaFormValues
  ) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/proposals/${record._id}/state`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ?? ""}`,
          },
          body: JSON.stringify({ state: nuevoEstado }),
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Error al actualizar el estado");
      }

      const propuestaActualizada = await response.json();

      message.success(
        `Propuesta "${propuestaActualizada.title}" actualizada a "${nuevoEstado}"`
      );

      await fetch("http://localhost:4000/notification/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
          idEmprendedor: record.idUser._id,
          idCompany: record.idCompany._id,
          typeNotification: "propuestaEstado",
          idProposal: record._id,
        }),
      });

      // Opcional: actualizar estado local si estás mostrando las propuestas en una tabla
      setPropuestas((prev) =>
        prev.map((p) =>
          p._id === propuestaActualizada._id ? { ...p, state: nuevoEstado } : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      message.error("No se pudo actualizar el estado");
    }
  };

  const columns: ColumnsType<PropuestaFormValues> = [
    {
      title: "ID Propuesta",
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
      title: "Nombre de la propuesta",
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
      render: (user: UserFormValues) => {
        const id = typeof user === "string" ? user : user?._id;

        return (
          <Link
            to={`/empresa/emprendedor/${id}`}
            style={{
              color: "#BC6C25",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <ApartmentOutlined style={{ marginRight: 6 }} /> {user.name}
          </Link>
        );
      },
    },
    {
      title: "Acciones",
      key: "acciones",
      align: "center",
      render: (_, record: PropuestaFormValues) => (
        <Link to={`/empresa/verPropuestas/detalle/${record._id}`}>
          <Button
            type="primary"
            style={{ backgroundColor: "#463F3A", border: "none" }}
          >
            Ver Detalle
          </Button>
        </Link>
      ),
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
              rowKey={(record) => `${record._id}-${record.idCompany.name}`}
              scroll={{ x: "max-content" }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total: ${total} propuestas`,
              }}
            />
          )}
        </Space>
      </Card>
    </div>
  );
};
