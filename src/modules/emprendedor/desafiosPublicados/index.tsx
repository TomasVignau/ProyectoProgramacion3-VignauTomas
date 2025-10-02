import "../../../styles/formulario.css";
import desafiosData from "../../../data/desafios.json";
import { Button, Card } from "antd";

import dayjs from "dayjs";

export const DesafiosPublicados = () => {
  return (
    <div className="divDesafios">
      {desafiosData.map((desafio) => (
        <Card
          key={desafio.nombre}
          title={desafio.nombre}
          variant="borderless"
          style={{ width: 300 }}
        >
          <p>{desafio.descripcion}</p>
          <p>Fecha límite: {dayjs(desafio.fechaTope).format("DD/MM/YYYY")}</p>
          <Button
            type="primary"
            htmlType="submit"
            block
            onClick={() => alert(`Lógica para Publicar Propuesta para: ${desafio.nombre}`)}
          >
            PUBLICAR PROPUESTA
          </Button>
        </Card>
      ))}
    </div>
  );
};
