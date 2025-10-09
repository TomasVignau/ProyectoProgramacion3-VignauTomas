import { Button, Table, Spin, Tag } from "antd";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Obteniendo desafíos publicados...");
    setIsLoading(true);

    // Simulo carga desde el JSON
    const timer = setTimeout(() => {
      setPropuestas(PropuestasData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
    <div style={{ padding: 20 }}>
      <h2>Listado de Propuestas</h2>

      {isLoading ? (
        <Spin tip="Cargando informacion de las propuestas..." size="large">
          {content}
        </Spin>
      ) : (
        <>
          <Table dataSource={propuestas} columns={columns} rowKey="id" />
        </>
      )}

      <Link to="/emprendedor/home">
        <Button type="primary" style={{ marginTop: 16 }}>
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};
