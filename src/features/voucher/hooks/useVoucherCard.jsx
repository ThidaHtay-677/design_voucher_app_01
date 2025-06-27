import React from "react";
import html2pdf from "html2pdf.js";
import printJS from "print-js";

import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchVouchers } from "../../../services/voucher";
const useVoucherCard = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    import.meta.env.VITE_API_URL + "/vouchers/" + id,
    fetchVouchers
  );

  const handlePrint = () => {
    // window.print();
    printJS({
      printable: "printArea",
      type: "html",
      //   header: "INVOICE",
      scanStyles: true,
      css: [
        "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
      ],
    });
  };

  const handlePdf = () => {
    console.log("export pdf");
    const element = document.getElementById("printArea");

    // Options for PDF generation
    const opt = {
      margin: 0.1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a5", orientation: "portrait" },
    };

    // Convert the element to PDF
    html2pdf().from(element).set(opt).save();
  };
  return { data, handlePrint, handlePdf, isLoading };
};

export default useVoucherCard;
