import { Button, Table, Spin } from "antd";
import { Link } from "react-router-dom";
import { FormValues } from "../../types/FormValues";
import { useState, useEffect } from "react";
import { content } from "../../utils/content";
import Desafios from "../../data/desafios.json";

export const Desafio = () => {
  const [desafios, setDesafios] = useState<FormValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatearDesafios: FormValues[] = Desafios.map((d) => ({
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

  const handleClick = (desafio: FormValues) => {
    alert("Desafío seleccionado: " + desafio.nombre);
  };

  // _ es el valor de la celda (no lo usamos)
  // record es el objeto completo de la fila
  // Podés poner cualquier componente dentro del render, no solo botones

  const columns = [
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
      render: (_: unknown, record: FormValues) => (
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
          <Table dataSource={desafios} columns={columns} rowKey="nombre" />
        </>
      )}

      <Link to="/home">
        <Button type="primary" style={{ marginTop: 16 }}>
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};
