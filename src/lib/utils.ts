export const mxn = (n: number) =>
  n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });

export const uid = () => Math.random().toString(16).slice(2);