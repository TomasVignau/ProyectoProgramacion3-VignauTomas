/*import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./modules/login";
import { Registrar } from "./modules/registrar";
import { NotFound } from "./modules/notFound";


import { HomeEmpresa } from "./modules/empresa/home";
import { FormularioEmpresa } from "./modules/empresa/formulario";
import { DesafiosEmpresa } from "./modules/empresa/desafios";
import { LayoutCustomEmpresa } from "./modules/empresa/layout";
import EmpresaDetalle from "./modules/empresa/detalle";
import { PropuestaDetalle } from "./modules/empresa/verPropuestas/detalle";


import { HomeEmprendedor } from "./modules/emprendedor/home";
import { PropuestasEmprendedor } from "./modules/emprendedor/propuestas";
import { LayoutCustomEmprendedor } from "./modules/emprendedor/layout";
import { DesafiosPublicados } from "./modules/emprendedor/desafiosPublicados";
import { PublicarPropuesta } from "./modules/emprendedor/publicarPropuestas";
import { VerPropuestasEmprendedores } from "./modules/empresa/verPropuestas";
import EmprendedorDetalle from "./modules/emprendedor/detalle";
import { EmpresasSeguidas } from "./modules/emprendedor/empresasSeguidas";

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>

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


        <Route path="empresa" element={<LayoutCustomEmpresa />}>
          <Route path="home" element={<HomeEmpresa />} />
          <Route path="formulario" element={<FormularioEmpresa />} />
          <Route path="desafios" element={<DesafiosEmpresa />} />


          <Route
            path="verPropuestas/detalle/:idPropuesta"
            element={<PropuestaDetalle />}
          />

          /*<Route
            path="verPropuestas/:idChallenge"
            element={<VerPropuestasEmprendedores />}
          />

          <Route path="emprendedor/:idUser" element={<EmprendedorDetalle />} />
        </Route>


        <Route path="emprendedor" element={<LayoutCustomEmprendedor />}>
          <Route path="home" element={<HomeEmprendedor />} />
          <Route path="desafiosPublicados" element={<DesafiosPublicados />} />
          <Route path="propuestas" element={<PropuestasEmprendedor />} />
          <Route
            path="publicarPropuesta/:_id"
            element={<PublicarPropuesta />}
          />
          <Route path="follows" element={<EmpresasSeguidas />} />
          <Route
            path="/emprendedor/empresa/:idUser"
            element={<EmpresaDetalle />}
          />
        </Route>


        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);*/


/*import { Routes, Route } from "react-router-dom";
import { Login } from "./modules/login";
import { Registrar } from "./modules/registrar";
import { NotFound } from "./modules/notFound";

import { LayoutCustom } from "./modules/layout/index"

import { HomeEmpresa } from "./modules/empresa/home";
import { FormularioEmpresa } from "./modules/empresa/formulario";
import { DesafiosEmpresa } from "./modules/empresa/desafios";
import { LayoutCustomEmpresa } from "./modules/empresa/layout";
import EmpresaDetalle from "./modules/empresa/detalle";
import { PropuestaDetalle } from "./modules/empresa/verPropuestas/detalle";
import { VerPropuestasEmprendedores } from "./modules/empresa/verPropuestas";


import { HomeEmprendedor } from "./modules/emprendedor/home";
import { PropuestasEmprendedor } from "./modules/emprendedor/propuestas";
import { LayoutCustomEmprendedor } from "./modules/emprendedor/layout";
import { DesafiosPublicados } from "./modules/emprendedor/desafiosPublicados";
import { PublicarPropuesta } from "./modules/emprendedor/publicarPropuestas";
import EmprendedorDetalle from "./modules/emprendedor/detalle";
import { EmpresasSeguidas } from "./modules/emprendedor/empresasSeguidas";

export const App = () => {

  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Login />} />
        <Route
          path="/registrar"
          element={
            <Registrar
              onSubmit={(values) => {
                console.log("Formulario enviado", values);
              }}
            />
          }
        />


        <Route path="empresa" element={<LayoutCustomEmpresa />}>
          <Route path="home" element={<HomeEmpresa />} />
          <Route path="formulario" element={<FormularioEmpresa />} />
          <Route path="desafios" element={<DesafiosEmpresa />} />

   
          <Route
            path="verPropuestas/detalle/:idPropuesta"
            element={<PropuestaDetalle />}
          />

          <Route
            path="verPropuestas/:idChallenge"
            element={<VerPropuestasEmprendedores />}
          />

          <Route path="emprendedor/:idUser" element={<EmprendedorDetalle />} />
        </Route>


        <Route path="emprendedor" element={<LayoutCustomEmprendedor />}>
          <Route path="home" element={<HomeEmprendedor />} />
          <Route path="desafiosPublicados" element={<DesafiosPublicados />} />
          <Route path="propuestas" element={<PropuestasEmprendedor />} />
          <Route
            path="publicarPropuesta/:_id"
            element={<PublicarPropuesta />}
          />
          <Route path="follows" element={<EmpresasSeguidas />} />


          <Route
            path="empresa/:idUser"
            element={<EmpresaDetalle />}
          />
        </Route>


        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};*/

import { Routes, Route } from "react-router-dom";
import { Login } from "./modules/login";
import { Registrar } from "./modules/registrar";
import { NotFound } from "./modules/notFound";

import { LayoutCustom } from "./modules/layout/index";

import { HomeEmpresa } from "./modules/empresa/home";
import { FormularioEmpresa } from "./modules/empresa/formulario";
import { DesafiosEmpresa } from "./modules/empresa/desafios";
import EmpresaDetalle from "./modules/empresa/detalle";
import { PropuestaDetalle } from "./modules/empresa/verPropuestas/detalle";
import { VerPropuestasEmprendedores } from "./modules/empresa/verPropuestas";

import { HomeEmprendedor } from "./modules/emprendedor/home";
import { PropuestasEmprendedor } from "./modules/emprendedor/propuestas";
import { DesafiosPublicados } from "./modules/emprendedor/desafiosPublicados";
import { PublicarPropuesta } from "./modules/emprendedor/publicarPropuestas";
import EmprendedorDetalle from "./modules/emprendedor/detalle";
import { EmpresasSeguidas } from "./modules/emprendedor/empresasSeguidas";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Login y registro */}
        <Route path="/" element={<Login />} />
        <Route
          path="/registrar"
          element={<Registrar onSubmit={(values) => console.log("Formulario enviado", values)} />}
        />

        {/* Layout genérico */}
        <Route path="/" element={<LayoutCustom />}>
          {/* Rutas Empresa */}
          <Route path="empresa/home" element={<HomeEmpresa />} />
          <Route path="empresa/formulario" element={<FormularioEmpresa />} />
          <Route path="empresa/desafios" element={<DesafiosEmpresa />} />
          <Route path="empresa/verPropuestas/detalle/:idPropuesta" element={<PropuestaDetalle />} />
          <Route path="empresa/verPropuestas/:idChallenge" element={<VerPropuestasEmprendedores />} />
          <Route path="empresa/emprendedor/:idUser" element={<EmprendedorDetalle />} />
          <Route path="empresa/miinfo/:idUser" element={<EmpresaDetalle />} />

          {/* Rutas Emprendedor */}
          <Route path="emprendedor/home" element={<HomeEmprendedor />} />
          <Route path="emprendedor/desafiosPublicados" element={<DesafiosPublicados />} />
          <Route path="emprendedor/propuestas" element={<PropuestasEmprendedor />} />
          <Route path="emprendedor/publicarPropuesta/:_id" element={<PublicarPropuesta />} />
          <Route path="emprendedor/follows" element={<EmpresasSeguidas />} />
          <Route path="emprendedor/empresa/:idUser" element={<EmpresaDetalle />} />
          <Route path="emprendedor/miinfo/:idUser" element={<EmprendedorDetalle />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};


