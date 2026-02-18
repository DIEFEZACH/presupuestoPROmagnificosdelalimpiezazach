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

export const SERVICE_CATALOG = [
  {
    id: "salas",
    title: "Salas (tela / piel)",
    items: [
      { id: "sala_321_sc", label: "Sala 3-2-1 S/C", tag: "servicio" },
      { id: "sala_321_c6coj", label: "Sala 3-2-1 c/6 coj.", tag: "servicio" },
      { id: "plaza_extra", label: "Plaza extra", tag: "plaza" },
      { id: "taburete", label: "Taburete", tag: "pieza" },
      { id: "futon", label: "Futón", tag: "pieza" },
      { id: "sofa_individual", label: "Sofá individual", tag: "pieza" },
      { id: "love_seat", label: "Love seat", tag: "pieza" },
      { id: "sofa_3p", label: "Sofá 3 personas", tag: "pieza" },
      { id: "sofa_4p", label: "Sofá 4 personas", tag: "pieza" },
      { id: "sofa_divan", label: "Sofá diván", tag: "pieza" },

      { id: "cojin_deco", label: "Cojín deco", tag: "pieza" },
      { id: "cojin_mediano", label: "Cojín mediano", tag: "pieza" },
      { id: "cojin_grande", label: "Cojín grande (asiento/respaldo)", tag: "pieza" },
      { id: "cojin_gigante", label: "Cojín gigante", tag: "pieza" },

      { id: "sofa_cama_ind", label: "Sofá cama individual", tag: "pieza" },
      { id: "sofa_cama_mat", label: "Sofá cama matrimonial", tag: "pieza" },
      { id: "sofa_cama_queen", label: "Sofá cama Queen Size", tag: "pieza" },
      { id: "sofa_cama_king", label: "Sofá cama King Size", tag: "pieza" },
      { id: "sofa_cama_colchoneta", label: "Sofá cama c/colchoneta", tag: "pieza" },

      { id: "cabecera_ind", label: "Cabecera individual", tag: "pieza" },
      { id: "cabecera_mat", label: "Cabecera matrimonial", tag: "pieza" },
      { id: "cabecera_queen", label: "Cabecera Queen Size", tag: "pieza" },
      { id: "cabecera_king", label: "Cabecera King Size", tag: "pieza" },
    ],
  },
  {
    id: "colchones",
    title: "Colchones y accesorios",
    items: [
      { id: "colchon_cuna", label: "Colchón cuna", tag: "pieza" },
      { id: "colchon_ind", label: "Colchón individual", tag: "pieza" },
      { id: "colchon_mat", label: "Colchón matrimonial", tag: "pieza" },
      { id: "colchon_queen", label: "Colchón Queen Size", tag: "pieza" },
      { id: "colchon_king", label: "Colchón King Size", tag: "pieza" },
      { id: "box_ind", label: "Box spring individual", tag: "pieza" },
      { id: "box_mat", label: "Box spring matrimonial", tag: "pieza" },
      { id: "box_qk", label: "Box spring Queen/King", tag: "pieza" },
      { id: "carriola_chica", label: "Carriola chica tijera", tag: "pieza" },
      { id: "carriola_mediana", label: "Carriola mediana", tag: "pieza" },
      { id: "carriola_grande", label: "Carriola grande", tag: "pieza" },
      { id: "portabebe_auto", label: "Portabebé p/auto", tag: "pieza" },
      { id: "portabebe", label: "Portabebé", tag: "pieza" },
    ],
  },
  {
    id: "sillas",
    title: "Sillas y sillones",
    items: [
      { id: "silla_asiento", label: "Sillas (solo asiento)", tag: "pieza" },
      { id: "silla_asiento_respaldo", label: "Sillas asiento y respaldo", tag: "pieza" },
      { id: "sillas_forradas", label: "Sillas forradas", tag: "pieza" },
      { id: "silla_secretarial", label: "Silla secretarial", tag: "pieza" },
      { id: "silla_bergere", label: "Silla Bergère", tag: "pieza" },
      { id: "reposet_sencillo", label: "Reposet sencillo", tag: "pieza" },
      { id: "reposet_electrico", label: "Reposet eléctrico", tag: "pieza" },
      { id: "sillon_ejecutivo", label: "Sillón ejecutivo", tag: "pieza" },
    ],
  },
  {
    id: "telas",
    title: "Telas",
    items: [
      { id: "cortinas_hoja", label: "Cortinas por hoja", tag: "hoja" },
      { id: "tela_muro", label: "Tela en muro", tag: "m²" },
      { id: "mampara", label: "Mampara", tag: "pieza" },
      { id: "tapete_pelo_corto", label: "Tapete pelo corto sintético", tag: "pieza" },
      { id: "tapete_pelo_largo", label: "Tapete pelo largo sintético", tag: "pieza" },
      { id: "tapete_pelo_natural", label: "Tapete pelo natural", tag: "pieza" },
    ],
  },
  {
    id: "autos",
    title: "Autos y camionetas (tela / piel)",
    items: [
      { id: "auto_asientos", label: "Solo asientos (auto)", tag: "servicio" },
      { id: "auto_asientos_alfombra", label: "Asientos y alfombra (auto)", tag: "servicio" },
      { id: "auto_completo", label: "Auto completo", tag: "servicio" },
      { id: "camioneta7_asientos", label: "Camioneta 7p – solo asientos", tag: "servicio" },
      { id: "camioneta7_asientos_alfombra", label: "Camioneta 7p – asientos y alfombra", tag: "servicio" },
      { id: "camioneta7_completa", label: "Camioneta 7p – completa", tag: "servicio" },
      { id: "camioneta_grande", label: "Camioneta grande", tag: "servicio" },
    ],
  },
  {
    id: "pisos",
    title: "Pisos y superficies especiales",
    items: [
      { id: "alfombra_rudo_100", label: "Alfombra uso rudo (≤100 m²)", tag: "m²" },
      { id: "alfombra_rudo_100m", label: "Alfombra uso rudo (>100 m²)", tag: "m²" },
      { id: "alfombra_res_100", label: "Alfombra residencial (≤100 m²)", tag: "m²" },
      { id: "alfombra_res_100m", label: "Alfombra residencial (>100 m²)", tag: "m²" },
      { id: "pulido_marmol_cubierta", label: "Pulido de cubierta de mármol", tag: "servicio" },
      { id: "pulido_mosaico_vitro", label: "Pulido de mosaico / vitropiso", tag: "m²" },
      { id: "solo_sello", label: "Sólo aplicación de sello", tag: "m²" },
      { id: "pulido_sello_mosaico", label: "Pulido y sello de mosaico", tag: "m²" },
      { id: "pulido_encerado_mosaico", label: "Pulido y encerado de mosaico", tag: "m²" },
      { id: "pulido_marmol_100", label: "Pulido mármol/terrazo/granito (≤100 m²)", tag: "m²" },
      { id: "pulido_marmol_100m", label: "Pulido mármol/terrazo/granito (>100 m²)", tag: "m²" },
      { id: "lavado_cemento_100", label: "Lavado de cemento (≤100 m²)", tag: "m²" },
      { id: "oxidado_cemento_100", label: "Oxidado de cemento (≤100 m²)", tag: "m²" },
    ],
  },
  {
    id: "extras",
    title: "Extras",
    items: [
      { id: "sanitizacion_nebulizacion_100", label: "Sanitización con nebulización (≤100 m²)", tag: "servicio" },
      { id: "renta_cuadrilla_8h", label: "Renta de cuadrilla (8 h, 2 elementos, jarcería, químicos y maquinaria)", tag: "paquete" },
      { id: "hora_adicional_cuadrilla", label: "Hora adicional de cuadrilla", tag: "hora" },
    ],
  },
  {
    id: "paquetes",
    title: "Paquetes y alcances",
    items: [
      { id: "paquete_basico", label: "PAQUETE BÁSICO", tag: "paquete" },
      { id: "paquete_golden", label: "PAQUETE GOLDEN", tag: "paquete" },
      { id: "paquete_golden_premium", label: "PAQUETE GOLDEN PREMIUM", tag: "paquete" },
      { id: "limpieza_piel", label: "LIMPIEZA PIEL", tag: "paquete" },
      { id: "limpieza_hidratacion_piel", label: "LIMPIEZA E HIDRATACIÓN PIEL", tag: "paquete" },
    ],
  },
] as const;