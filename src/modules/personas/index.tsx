import { Button, Table, Spin } from "antd";
import { Link } from "react-router-dom";
import PersonasIniciales from "../../data/personas.json";
import { FormValues } from "../../types/FormValues";
import { useState, useEffect } from 'react';
import { content } from '../../utils/content'

export const Personas = () => {
  const personas = PersonasIniciales as FormValues[];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Buscando la informacion de las personas...')
    setIsLoading(true)
    const timer = setTimeout(() => {
      console.log('Ejecutado despues de 3 segundos!')
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [personas])

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Sexo",
      dataIndex: "sexo",
      key: "sexo",
    },
    {
      title: "Peso (kg)",
      dataIndex: "peso",
      key: "peso",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Listado de Personas</h2>

      {isLoading ? (
        <Spin tip="Cargando informacion las personas..." size="large">
          {content}
        </Spin>
      ) : ( <>
      <Table dataSource={personas} columns={columns} rowKey="dni" />
      </>)}

      <Link to="/">
        <Button type="primary" style={{ marginTop: 16 }}>
          Volver al Inicio
        </Button>
      </Link>
    </div>
  );
};

