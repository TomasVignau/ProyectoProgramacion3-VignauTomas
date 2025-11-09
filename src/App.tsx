import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./modules/login";
import { Registrar } from "./modules/registrar";
import { NotFound } from "./modules/notFound";

{
  /* EMPRESA */
}
import { HomeEmpresa } from "./modules/empresa/home";
import { FormularioEmpresa } from "./modules/empresa/formulario";
import { DesafiosEmpresa } from "./modules/empresa/desafios";
import { LayoutCustomEmpresa } from "./modules/empresa/layout";
import EmpresaDetalle from "./modules/empresa/detalle";

{
  /* EMPRENDEDOR */
}
import { HomeEmprendedor } from "./modules/emprendedor/home";
import { PropuestasEmprendedor } from "./modules/emprendedor/propuestas";
import { LayoutCustomEmprendedor } from "./modules/emprendedor/layout";
import { DesafiosPublicados } from "./modules/emprendedor/desafiosPublicados";
import { PublicarPropuesta } from "./modules/emprendedor/publicarPropuestas";
import { VerPropuestasEmprendedores } from "./modules/empresa/verPropuestas";
import EmprendedorDetalle from "./modules/emprendedor/detalle";

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route
          path="/registrar"
          element={
            <Registrar
              onSubmit={(values) => {
                console.log("Formulario enviado", values);
                // Acá podrías llamar a tu API para guardar el usuario
              }}
            />
          }
        />

        {/* Rutas Empresa */}
        <Route path="empresa" element={<LayoutCustomEmpresa />}>
          <Route path="home" element={<HomeEmpresa />} />
          <Route path="formulario" element={<FormularioEmpresa />} />
          <Route path="desafios" element={<DesafiosEmpresa />} />
          <Route path="verPropuestas/:idChallenge" element={<VerPropuestasEmprendedores />} />

          <Route
            path="emprendedor/:idUser"
            element={<EmprendedorDetalle />}
          />
        </Route>

        {/* Rutas Emprendedor */}
        <Route path="emprendedor" element={<LayoutCustomEmprendedor />}>
          <Route path="home" element={<HomeEmprendedor />} />
          <Route path="desafiosPublicados" element={<DesafiosPublicados />} />
          <Route path="propuestas" element={<PropuestasEmprendedor />} />
          <Route path="publicarPropuesta" element={<PublicarPropuesta />} />
          <Route path="empresa/:nombreEmpresa" element={<EmpresaDetalle />} />
        </Route>

        {/* Not Found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);
