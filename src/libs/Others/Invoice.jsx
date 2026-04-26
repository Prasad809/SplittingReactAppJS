import React, { useRef } from "react";
import PdfJs from "./Pdf"

function InvoicePage() {
  const contentRef = useRef();

  return (
    <div>
      <div ref={contentRef} style={{ background: "#fff", padding: 20 }}>
        <h1>Invoice</h1>
        <p>Customer: Jane Doe</p>
        <p>Total: $250</p>
      </div>

      <PdfJs name="invoice.pdf" innerRef={contentRef} />
    </div>
  );
}
export default InvoicePage;