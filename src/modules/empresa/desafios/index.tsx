import { Button, Table, Spin } from "antd";
import { Link } from "react-router-dom";
import { DesafioFormValues } from "../../../types/desafioFormValues";
import { useState, useEffect } from "react";
import { content } from "../../../utils/content";
import Desafios from "../../../data/desafios.json";

export const DesafiosEmpresa = () => {
  const [desafios, setDesafios] = useState<DesafioFormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatearDesafios: DesafioFormValues[] = Desafios.map((d) => ({
    ...d,
    fechaTope: new Date(d.fechaTope),
    archivo: [],
  }));

  useEffect(() => {
    console.log("Obteniendo desafíos publicados...");
    setIsLoading(true);

    // Simulo carga desde el JSON
    const timer = setTimeout(() => {
      setDesafios(formatearDesafios);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (desafio: DesafioFormValues) => {
    alert("Desafío seleccionado: " + desafio.id + " - " + desafio.nombre);
  };

  // _ es el valor de la celda (no lo usamos)
  // record es el objeto completo de la fila
  // Podés poner cualquier componente dentro del render, no solo botones

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Fecha Tope",
      dataIndex: "fechaTope",
      key: "fechaTope",
      render: (fecha: Date) => fecha.toLocaleDateString(),
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (_: unknown, record: DesafioFormValues) => (
        <Button type="primary" onClick={() => handleClick(record)}>
          Ver propuestas
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Listado de Desafíos</h2>

      {isLoading ? (
        <Spin tip="Cargando informacion de los desafíos..." size="large">
          {content}
        </Spin>
      ) : (
        <>
          <Table dataSource={desafios} columns={columns} rowKey="id" />
        </>
      )}

      <Link to="/empresa/home">
        <Button type="primary" style={{ marginTop: 16 }}>
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};
