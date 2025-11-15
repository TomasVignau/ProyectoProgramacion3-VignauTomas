import { Col, Row, Carousel } from "antd"
import SignIn from "./sig-in/SignIn"
import "../../styles/inicio.css"

export const Login = () => {
  return (
    <div className="loginContainer">
      {/* Carrusel de fondo */}
      <Carousel autoplay autoplaySpeed={3000} className="backgroundCarousel">
        <div className="slide">
          <img
            src="https://fotos.perfil.com/2025/02/12/trim/987/555/tecnicos-1966270.jpg"
            alt="Empresa"
            loading="lazy"
          />
        </div>
        <div className="slide">
          <img
            src="https://www.elepoch.com/_next/image?url=https%3A%2F%2Fimages.elepoch.com%2Fassets%2Fuploads%2F2025%2F09%2Fid31202-shutterstock_2068912751-1080x720-1.webp&w=1920&q=75"
            alt="Empresa"
            loading="lazy"
          />
        </div>
        <div className="slide">
          <img
            src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/02/lenguaje-programacion-1859691.jpg?tf=3840x"
            alt="Empresa"
            loading="lazy"
          />
        </div>
      </Carousel>

      {/* Contenido encima */}
      <Row style={{ width: "100%" }}>
        <Col xs={24} sm={24} md={12} className="infoCol">
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
            individuales o en equipo — proponen ideas, proyectos o prototipos
            que aportan valor y fortalecen la innovación abierta.
            <br />
            <br />
            Este espacio impulsa la comunicación, la evaluación de propuestas y
            la generación de oportunidades de colaboración que potencian la
            competitividad a través del talento emprendedor.
          </p>
        </Col>

        <Col xs={24} sm={24} md={12} className="loginCol">
          <div className="signInWrapper">
            <SignIn />
          </div>
        </Col>
      </Row>
    </div>
  )
}
