import "../../../styles/home.css";
import { useState, useEffect } from "react";
import { Carousel } from "antd";

export const HomeEmpresa = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bienvenida EMPRESA a la página de inicio</h1>
      <p>Usa el menú lateral para navegar.</p>

      <Carousel
        autoplay
        autoplaySpeed={2500}
        style={{
          width: '1000px',
          margin: '0 auto',
          border: '2px solid black',
          borderRadius: '15px',
          overflow: 'hidden',
        }}
      >
        <div>
          <div className="estiloCarousel">
            <img
              src="https://wallpapers.com/images/hd/business-success-strategy-9e3neoqjyveyskog.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://wallpapers.com/images/featured/negocios-jzw8ax93flqonkce.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://www.decisores.com/wp-content/uploads/2021/06/Empresa.jpg"
              alt="Empresa"
            />
          </div>
        </div>
      </Carousel>

      <div className="estiloHora">
        <h2>Hora actual</h2>
        <p>{hora.toLocaleString()}</p>
      </div>
    </div>
  );
};
