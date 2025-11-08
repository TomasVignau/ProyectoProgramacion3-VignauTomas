interface GovernmentId {
  type?: "cuil" | "cuit" | "dni" | "lc" | "le" | "pas";
  number?: string;
}

export default GovernmentId;