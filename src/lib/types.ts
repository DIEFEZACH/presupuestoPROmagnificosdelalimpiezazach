export type Urgency = "Baja" | "Normal" | "Alta";
export type Soil = "Baja" | "Media" | "Alta";
export type Delicacy = "Delicada" | "Estándar" | "Muy delicada";
export type SizeTier = "Chico" | "Mediano" | "Grande";

export type ServiceCategory =
  | "Salas (tela/piel)"
  | "Colchones y accesorios"
  | "Sillas y sillones"
  | "Telas"
  | "Autos y camionetas (tela/piel)"
  | "Pisos y superficies especiales"
  | "Extras"
  | "Paquetes y alcances";

export type ServiceItem = {
  id: string;
  name: string;
  category: ServiceCategory;
  basePrice: number;
};

export type ExtraItem = { id: string; concept: string; qty: number; unit: number };

export type DocType = "Nota" | "Presupuesto" | "Orden de servicio";

export type FormState = {
  //Header
  docType: DocType;

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
  addressMapUrl: string;

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

  beforePhoto: string | null;
  afterPhoto: string | null;

  // Fin
  deposit: number;

  // UI
  logoDataUrl: string | null;
};