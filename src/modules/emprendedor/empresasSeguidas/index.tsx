import "../../../styles/formulario.css";
import { Input, Empty, Spin, message } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import { useState, useMemo, useEffect } from "react";
import UserFormValues from "../../../types/userFormValues";
import EmpresaCard from "../../../components/empresasSeguidasCard";

export const EmpresasSeguidas = () => {
  const [busqueda, setBusqueda] = useState<string>("");
  const [empresasSeguidas, setEmpresasSeguidas] = useState<UserFormValues[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const emprendedor = JSON.parse(localStorage.getItem("user") || "{}");
  const idEmprendedor: string | undefined = emprendedor?._id;

  useEffect(() => {
    if (!idEmprendedor) {
      message.error("ID de emprendedor no disponible");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:4000/follow/${idEmprendedor}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Token inválido o sin autorización");
        const data: UserFormValues[] = await res.json(); // <-- tipado aquí
        setEmpresasSeguidas(data);
      })
      .catch((err) => {
        console.error("Error al obtener las empresas seguidas:", err);
        message.error("Error al cargar empresas seguidas");
      })
      .finally(() => setLoading(false));
  }, [idEmprendedor, token]);

  const empresasFiltradas: UserFormValues[] = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return empresasSeguidas;
    return empresasSeguidas.filter((e) => {
      const name = e.name?.toLowerCase() ?? "";
      const desc = e.description?.toLowerCase() ?? "";
      return name.includes(q) || desc.includes(q);
    });
  }, [busqueda, empresasSeguidas]);

  // --- 3) Unfollow (tipos claros)
  async function handleUnfollow(idCompany: string) {
    try {
      const confirm = window.confirm(
        "¿Seguro que deseas dejar de seguir esta empresa?"
      );
      if (!confirm) return;

      const res = await fetch(
        `http://localhost:4000/follow/${idEmprendedor}/${idCompany}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ?? ""}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error al dejar de seguir");
      }

      setEmpresasSeguidas((prev) =>
        prev.filter((empresa) => empresa._id !== idCompany)
      );

      message.success("Dejaste de seguir a la empresa");
    } catch (error) {
      console.error("Error al dejar de seguir:", error);
      message.error("No se pudo dejar de seguir la empresa");
    }
  }

  return (
    <div className="divDesafios" style={{ display: "grid", gap: 24 }}>
      <Input
        size="large"
        placeholder="Buscar empresa por nombre o descripción..."
        prefix={<SearchOutlined style={{ color: "#463F3A" }} />}
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          borderRadius: 10,
          border: "2px solid #cebdafff",
          marginBottom: 12,
          maxWidth: 500,
          backgroundColor: "#fff",
        }}
        allowClear
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Spin size="large" tip="Cargando empresas seguidas..." />
        </div>
      ) : empresasFiltradas.length > 0 ? (
        empresasFiltradas.map((empresa) => (
          <EmpresaCard empresa={empresa} onUnfollow={handleUnfollow} />
        ))
      ) : (
        <Empty
          description="No se encontraron empresas que coincidan con tu búsqueda"
          style={{ marginTop: 40 }}
        />
      )}
    </div>
  );
};
