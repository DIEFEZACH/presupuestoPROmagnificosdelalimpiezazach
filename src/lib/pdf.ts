import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type PdfOptions = {
  filename?: string;
  marginPt?: number; // margen en puntos (pt)
  scale?: number; // calidad de captura
  background?: string; // fondo
};

type LinkMap = Record<string, string>; // { map: "https://..." }

export async function exportNodeToPdf(
  node: HTMLElement,
  filename = "Presupuesto_cliente.pdf",
  opts: PdfOptions = {},
  linkMap: LinkMap = {}
) {
  const marginPt = opts.marginPt ?? 28;
  const scale = opts.scale ?? 2;
  const background = opts.background ?? "#ffffff";

  // 1) Captura en canvas
   const canvas = await html2canvas(node, {
  scale,
  backgroundColor: background,
  useCORS: true,
  allowTaint: true,
  logging: false,
  windowWidth: node.scrollWidth,
  windowHeight: node.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  // 2) Crea PDF A4
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const maxW = pageW - marginPt * 2;
  const maxH = pageH - marginPt * 2;

  // Escala para que quepa en 1 página
  let imgW = maxW;
  let imgH = (canvas.height * imgW) / canvas.width;

  if (imgH > maxH) {
    const factor = maxH / imgH;
    imgW = imgW * factor;
    imgH = imgH * factor;
  }

  const x = (pageW - imgW) / 2;
  const y = (pageH - imgH) / 2;

  // 3) Inserta la imagen
  pdf.addImage(imgData, "PNG", x, y, imgW, imgH, undefined, "FAST");

  // 4) Links clickeables encima (anotaciones)
  //    Convertimos rects del DOM a coords del PDF.
  const nodeRect = node.getBoundingClientRect();

  // Relación: px (DOM) -> pt (PDF) usando el tamaño final de la imagen en PDF
  const scaleX = imgW / nodeRect.width;
  const scaleY = imgH / nodeRect.height;

  const linkEls = Array.from(node.querySelectorAll<HTMLElement>("[data-pdf-link]"));

  for (const el of linkEls) {
    const key = el.dataset.pdfLink;
    if (!key) continue;

    const url = (linkMap[key] ?? "").trim();
    if (!url) continue;

    const r = el.getBoundingClientRect();

    // Rect relativo al nodo
    const leftPx = r.left - nodeRect.left;
    const topPx = r.top - nodeRect.top;

    const wPx = r.width;
    const hPx = r.height;

    // A coords PDF
    const linkX = x + leftPx * scaleX;
    const linkY = y + topPx * scaleY;
    const linkW = wPx * scaleX;
    const linkH = hPx * scaleY;

    // Nota: pdf.link crea la anotación clickeable
    pdf.link(linkX, linkY, linkW, linkH, { url });
  }

  pdf.save(filename);
}