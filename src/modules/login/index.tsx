import { Col, Row, Carousel } from "antd";
import SignIn from "./sig-in/SignIn";
import "../../styles/login.css";


export const Login = () => {
  return (
    <Row className="loginContainer">
      {/* Columna izquierda: introducción + carrusel */}
      <Col span={12} className="infoCol">
        <h1 className="tituloPlataforma">
          Plataforma de Innovación y Propuesta Empresariales
        </h1>

        <p className="descripcionPlataforma">
          La <b>Plataforma de Innovación y Propuesta Empresariales</b> surge
          como un espacio digital que conecta a empresas y emprendedores en un
          entorno colaborativo de innovación. Su propósito es fomentar la
          creación de soluciones creativas y eficientes ante los desafíos que
          enfrentan las organizaciones en su desarrollo y crecimiento.
          <br />
          <br />
          A través de la plataforma, las empresas pueden publicar sus
          problemáticas o retos específicos, mientras que los emprendedores —
          individuales o en equipo — proponen ideas, proyectos o prototipos que
          aportan valor y fortalecen la innovación abierta.
          <br />
          <br />
          Este espacio impulsa la comunicación, la evaluación de propuestas y la
          generación de oportunidades de colaboración que potencian la
          competitividad a través del talento emprendedor.
        </p>

        <div className="carouselWrapper">
          <Carousel autoplay autoplaySpeed={3000} className="myCarousel">
            <div className="slide">
              <img
                src="https://wallpapers.com/images/hd/business-success-strategy-9e3neoqjyveyskog.jpg"
                alt="Empresa"
                loading="lazy"
              />
            </div>
            <div className="slide">
              <img
                src="https://wallpapers.com/images/featured/negocios-jzw8ax93flqonkce.jpg"
                alt="Empresa"
                loading="lazy"
              />
            </div>
            <div className="slide">
              <img
                src="https://www.decisores.com/wp-content/uploads/2021/06/Empresa.jpg"
                alt="Empresa"
                loading="lazy"
              />
            </div>
          </Carousel>
        </div>
      </Col>

      {/* Columna derecha: Login */}
      <Col span={12} className="loginCol">
        <div className="signInWrapper">
          <SignIn />
        </div>
      </Col>
    </Row>
  );
};
