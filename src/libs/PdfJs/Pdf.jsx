import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PdfJs({ name = "document.pdf", innerRef, handlePrint, buttonLabel = "Download PDF" }) {
  
  const downloadPdf = async () => {
    if (!innerRef?.current) {
      console.warn("No content ref provided for PDF export.");
      return;
    }

    try {
      const canvas = await html2canvas(innerRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(name);

      if (handlePrint) handlePrint();
    } catch (error) {
      console.error("PDF download failed:", error);
    }
  };

  return (
    <Button onClick={downloadPdf} variant="outlined">
      {buttonLabel}
    </Button>
  );
}

export default PdfJs;
