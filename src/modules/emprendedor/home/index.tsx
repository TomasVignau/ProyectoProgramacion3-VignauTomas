import "../../../styles/home.css";
import { useState, useEffect } from "react";
import { Carousel } from "antd";

export const HomeEmprendedor = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Bienvenido EMPRENDEDOR a la página de inicio</h1>
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
              src="https://wallpapers.com/images/hd/entrepreneur-skyscraper-5ze2orkv2zv9pbhl.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://e1.pxfuel.com/desktop-wallpaper/990/550/desktop-wallpaper-entrepreneur-entrapreneur.jpg"
              alt="Empresa"
            />
          </div>
        </div>

        <div>
          <div className="estiloCarousel">
            <img
              src="https://cdn.forbes.com.mx/2022/11/emprendimiento-emprendedores-empresa-contabilidad-credito.jpg"
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
