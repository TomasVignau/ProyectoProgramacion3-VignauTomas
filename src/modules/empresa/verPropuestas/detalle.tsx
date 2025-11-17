import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { PropuestaFormValues } from "../../../types/propuestaFormValues";
import api from "../../../api.ts";
import { PropuestaCard } from "../../../components/propuestaCard.tsx";

export const PropuestaDetalle = () => {
  const { idPropuesta } = useParams<{ idPropuesta: string }>();
  //const token = localStorage.getItem("token"); Lo agrega automáticamente el interceptor de api
  const [propuesta, setPropuesta] = useState<PropuestaFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("ID de la propuesta:", idPropuesta);

  // Obtiene las propuesta según el id
  useEffect(() => {
    setIsLoading(true);

    api
      .get(`/proposals/${idPropuesta}`)
      .then((res) => setPropuesta(res.data))
      .catch((err) => {
        console.error(err);
        message.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [idPropuesta]);

  if (isLoading || !propuesta) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Spin size="large" tip="Cargando detalle de la propuesta..." />
      </div>
    );
  }

  // Envía la propuesta a DETALLE PROPUESTA que se encarga de mostrarla
  return <PropuestaCard propuesta={propuesta} />;
};
