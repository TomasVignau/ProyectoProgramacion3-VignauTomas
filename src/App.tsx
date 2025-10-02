import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./modules/login";
import { NotFound } from "./modules/notFound";

{/* EMPRESA */}
import { HomeEmpresa } from "./modules/empresa/home";
import { FormularioEmpresa } from "./modules/empresa/formulario";
import { DesafiosEmpresa } from "./modules/empresa/desafios";
import { LayoutCustomEmpresa } from "./modules/empresa/layout";

{/* EMPRENDEDOR */}
import { HomeEmprendedor } from "./modules/emprendedor/home"
import { PropuestasEmprendedor } from "./modules/emprendedor/propuestas"
import { LayoutCustomEmprendedor } from "./modules/emprendedor/layout";
import { DesafiosPublicados } from "./modules/emprendedor/desafiosPublicados";



export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas Empresa */}
        <Route path="empresa" element={<LayoutCustomEmpresa />}>
          <Route path="home" element={<HomeEmpresa />} />
          <Route path="formulario" element={<FormularioEmpresa />} />
          <Route path="desafios" element={<DesafiosEmpresa />} />
        </Route>

        {/* Rutas Emprendedor */}
        <Route path="emprendedor" element={<LayoutCustomEmprendedor />}>
          <Route path="home" element={<HomeEmprendedor />} />
          <Route path="desafiosPublicados" element={<DesafiosPublicados />} />
          <Route path="propuestas" element={<PropuestasEmprendedor />} />
        </Route>

        {/* Not Found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);
