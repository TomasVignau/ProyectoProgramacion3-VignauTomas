import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./modules/home";
import { Formulario } from "./modules/formulario";
import { NotFound } from "./modules/notFound";
import { Personas } from "./modules/personas";
import { LayoutCustom } from './modules/layout';
import { Login } from './modules/login';

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<LayoutCustom />}>
          <Route path="/home" element={<Home />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/personas" element={<Personas />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);
