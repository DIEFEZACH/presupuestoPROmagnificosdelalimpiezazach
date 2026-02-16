export type Urgency = "Baja" | "Normal" | "Alta";
export type Soil = "Baja" | "Media" | "Alta";
export type Delicacy = "Delicada" | "Estándar" | "Muy delicada";
export type SizeTier = "Chico" | "Mediano" | "Grande";

export type ServiceCategory =
  | "Salas y sillones"
  | "Colchones y dormitorio"
  | "Sillas, tapetes y alfombras"
  | "Tratamientos y adicionales";

export type ServiceItem = {
  id: string;
  name: string;
  category: ServiceCategory;
  basePrice: number;
};

export type ExtraItem = { id: string; concept: string; qty: number; unit: number };

export type FormState = {
  // Profesionales
  company: string;
  tech: string;
  phone: string;
  coverage: string;

  // Cliente
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  address: string;

  // Mueble / Área
  mainType: string;
  material: string;
  color: string;
  room: string;
  urgency: Urgency;

  // Diagnóstico
  soil: Soil;
  delicacy: Delicacy;
  sizeTier: SizeTier;

  // Contexto / condiciones
  context: string[];
  conditions: string[];

  // Servicios + extras
selectedServices: Record<string, number>; // id -> cantidad
servicesTotal: number; // total manual de servicios
extras: ExtraItem[];

  // Horario/logística
  date: string;
  time: string;
  duration: number;
  drying: string;
  notes: string;

  // Fin
  deposit: number;

  // UI
  logoDataUrl: string | null;
};