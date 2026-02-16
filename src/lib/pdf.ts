import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type PdfOptions = {
  filename?: string;
  marginPt?: number;     // margen en puntos (pt). 24-36 se ve bien
  scale?: number;        // calidad de captura
  background?: string;   // fondo
};

export async function exportNodeToPdf(
  node: HTMLElement,
  filename = "Presupuesto_cliente.pdf",
  opts: PdfOptions = {}
) {
  const marginPt = opts.marginPt ?? 28;
  const scale = opts.scale ?? 2;
  const background = opts.background ?? "#ffffff";

  // Asegura que el nodo tenga tamaño real (no colapsado)
  const canvas = await html2canvas(node, {
    scale,
    backgroundColor: background,
    useCORS: true,
    allowTaint: true,
    logging: false,
    // Importante para que no “recorte” raro:
    windowWidth: node.scrollWidth,
    windowHeight: node.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 en puntos
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const maxW = pageW - marginPt * 2;
  const maxH = pageH - marginPt * 2;

  // Escala para que quepa completo en 1 página
  let imgW = maxW;
  let imgH = (canvas.height * imgW) / canvas.width;

  if (imgH > maxH) {
    const factor = maxH / imgH;
    imgW = imgW * factor;
    imgH = imgH * factor;
  }

  const x = (pageW - imgW) / 2;
  const y = (pageH - imgH) / 2;

  pdf.addImage(imgData, "PNG", x, y, imgW, imgH, undefined, "FAST");
  pdf.save(filename);
}