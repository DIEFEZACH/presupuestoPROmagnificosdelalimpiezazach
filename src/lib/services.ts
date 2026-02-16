import type { ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  { id: "sala_l", name: "Sala en L (Esq.)", category: "Salas y sillones", basePrice: 950 },
  { id: "sala_321", name: "Sala 3-2-1", category: "Salas y sillones", basePrice: 850 },
  { id: "sala_2", name: "Sala 2 pzas", category: "Salas y sillones", basePrice: 690 },
  { id: "sofa_cama", name: "Sofá cama", category: "Salas y sillones", basePrice: 790 },
  { id: "sillon_ind", name: "Sillón individual", category: "Salas y sillones", basePrice: 350 },
  { id: "sillon_reposet", name: "Sillón reposet", category: "Salas y sillones", basePrice: 490 },
  { id: "cojines", name: "Cojines decor.", category: "Salas y sillones", basePrice: 180 },

  { id: "colchon_king", name: "Colchón King", category: "Colchones y dormitorio", basePrice: 990 },
  { id: "colchon_queen", name: "Colchón Queen", category: "Colchones y dormitorio", basePrice: 890 },
  { id: "colchon_mat", name: "Colchón Matrimonial", category: "Colchones y dormitorio", basePrice: 790 },
  { id: "colchon_ind", name: "Colchón Individual", category: "Colchones y dormitorio", basePrice: 650 },
  { id: "almohadas", name: "Almohadas", category: "Colchones y dormitorio", basePrice: 120 },

  { id: "silla_comedor", name: "Silla comedor", category: "Sillas, tapetes y alfombras", basePrice: 95 },
  { id: "silla_oficina", name: "Silla oficina", category: "Sillas, tapetes y alfombras", basePrice: 160 },
  { id: "tapete_chico", name: "Tapete chico", category: "Sillas, tapetes y alfombras", basePrice: 290 },
  { id: "tapete_grande", name: "Tapete grande", category: "Sillas, tapetes y alfombras", basePrice: 490 },
  { id: "alfombra_m2", name: "Alfombra (m2)", category: "Sillas, tapetes y alfombras", basePrice: 120 },

  { id: "teflon", name: "Teflón / Protector", category: "Tratamientos y adicionales", basePrice: 250 },
  { id: "vapor", name: "Desinfección vapor", category: "Tratamientos y adicionales", basePrice: 220 },
  { id: "olores", name: "Eliminación olores", category: "Tratamientos y adicionales", basePrice: 240 },
  { id: "secado", name: "Secado rápido", category: "Tratamientos y adicionales", basePrice: 180 },
  { id: "int_sedan", name: "Interior auto sedán", category: "Tratamientos y adicionales", basePrice: 650 },
  { id: "int_suv", name: "Interior auto SUV", category: "Tratamientos y adicionales", basePrice: 790 },
];