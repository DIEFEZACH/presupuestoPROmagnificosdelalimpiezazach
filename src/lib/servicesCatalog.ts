export type ServiceItem = {
  id: string;
  label: string;
  price: number; // precio base
  tag?: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  items: ServiceItem[];
};

export const SERVICE_CATALOG: ServiceCategory[] = [
  {
    id: "salas",
    title: "Salas y sillones",
    items: [
      { id: "sala_l", label: "Sala en L (Esq.)", price: 1499 },
      { id: "sala_321", label: "Sala 3-2-1", price: 1399 },
      { id: "sala_2p", label: "Sala 2 pzas", price: 1199 },
      { id: "sofa_cama", label: "Sofá cama", price: 1299 },
      { id: "sillon_reposet", label: "Sillón reposet", price: 499 },
      { id: "sillon_ind", label: "Sillón individual", price: 349 },
      { id: "sofa_grande", label: "Sofá grande 4+", price: 1599 },
      { id: "cojines", label: "Cojines decor.", price: 79, tag: "c/u" },
      { id: "otro_sala", label: "Otro (especificar)", price: 0 },
    ],
  },
  {
    id: "colchones",
    title: "Colchones y dormitorio",
    items: [
      { id: "colchon_king", label: "Colchón King Size", price: 999 },
      { id: "colchon_queen", label: "Colchón Queen", price: 899 },
      { id: "colchon_matr", label: "Colchón Matrimonial", price: 799 },
      { id: "colchon_ind", label: "Colchón Individual", price: 699 },
      { id: "colchon_cuna", label: "Colchón cuna", price: 399 },
      { id: "cabecera", label: "Cabecera cama", price: 399 },
      { id: "base_cama", label: "Base de cama", price: 499 },
      { id: "almohadas", label: "Almohadas", price: 69, tag: "c/u" },
      { id: "otro_colchon", label: "Otro (especificar)", price: 0 },
    ],
  },
  {
    id: "tapetes",
    title: "Sillas, tapetes y alfombras",
    items: [
      { id: "silla_comedor", label: "Silla comedor", price: 99, tag: "c/u" },
      { id: "silla_oficina", label: "Silla oficina", price: 129, tag: "c/u" },
      { id: "tapete_chico", label: "Tapete chico", price: 249 },
      { id: "tapete_grande", label: "Tapete grande", price: 399 },
      { id: "alfombra_m2", label: "Alfombra (m2)", price: 89, tag: "m²" },
      { id: "cortinas", label: "Cortinas", price: 149, tag: "m²" },
      { id: "puff", label: "Puff / otomana", price: 199 },
      { id: "otro_tapete", label: "Otro (especificar)", price: 0 },
    ],
  },
  {
    id: "adicionales",
    title: "Tratamientos y adicionales",
    items: [
      { id: "teflon", label: "Teflón / Protector", price: 199 },
      { id: "desinfeccion_vapor", label: "Desinfección vapor", price: 249 },
      { id: "eliminacion_olores", label: "Eliminación olores", price: 249 },
      { id: "hidratacion_piel", label: "Hidratación piel", price: 299 },
      { id: "secado_rapido", label: "Secado rápido", price: 199 },
      { id: "int_sedan", label: "Int. auto sedán", price: 899 },
      { id: "int_suv", label: "Int. auto SUV", price: 999 },
      { id: "otro_add", label: "Otro (especificar)", price: 0 },
    ],
  },
];