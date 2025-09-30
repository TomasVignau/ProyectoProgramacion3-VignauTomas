import "../../styles/home.css";
import { useState, useEffect } from "react";

export const Home = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bienvenido a la página de inicio</h1>
      <p>Usa el menú lateral para navegar.</p>
      <div className="estiloHora">
        <h2>Hora actual</h2>
        <p>{hora.toLocaleString()}</p>
      </div>
    </div>
  );
};
