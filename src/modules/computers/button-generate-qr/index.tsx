import { SalasDB } from "@/types/types";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import QRCode from "qrcode";
import { useState } from "react";

interface ButtonGenerateQRProps {
  sala: SalasDB;
  numeroPc: number;
}

const ButtonGenerateQR = ({ sala, numeroPc }: ButtonGenerateQRProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Route: /form-report/[salaId]/[pcId]
  const url = window.location.origin;
  const qrCodeUrl = `${url}/form-report/${sala}/${numeroPc}`;

  const generateAndDownloadQR = async () => {
    try {
      setIsGenerating(true);

      // Generar el código QR como Data URL
      const qrDataURL = await QRCode.toDataURL(qrCodeUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#1f2937", // Color oscuro del QR
          light: "#ffffff", // Color de fondo
        },
      });

      // Crear un elemento <a> para descargar
      const downloadLink = document.createElement("a");
      downloadLink.href = qrDataURL;
      downloadLink.download = `QR_Sala_${sala}_PC_${numeroPc}.png`;

      // Agregar el enlace al DOM, hacer clic y removerlo
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error generando el código QR:", error);
      alert("Error al generar el código QR. Por favor intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button onClick={generateAndDownloadQR} disabled={isGenerating}>
      {isGenerating ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Generando...
        </div>
      ) : (
        <div className="flex items-center gap-1 text-dark-blue transition-all duration-300 ease-in-out">
          <p>Descargar QR</p>
          <ArrowDownTrayIcon className="h-3 w-3 inline-block" />
        </div>
      )}
    </button>
  );
};

export { ButtonGenerateQR };
