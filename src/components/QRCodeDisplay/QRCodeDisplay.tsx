import "./QRCodeDisplay.css";
import domtoimage from "dom-to-image-more";
import jsPDF from "jspdf";


interface QRCodeDisplayProps {
  title: string;
}

const QRCodeDisplay = ({ title }: QRCodeDisplayProps) => {
  function exportToPdf() {
    let QRCode = document.getElementById("qrcode") as HTMLCanvasElement;

    let doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const widthRatio = pageWidth / QRCode.width / 2;
    const heightRatio = pageHeight / QRCode.height / 2;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    const canvasWidth = QRCode.width * ratio;
    const canvasHeight = QRCode.height * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 4;

    doc.addImage(QRCode, marginX, marginY, canvasWidth, canvasHeight);
    doc.text("Scan this QR Code for the WiFi!", pageWidth / 2, marginY, {
      align: "center",
    });
    doc.save("myWifiQRCode.pdf");
  }

  function exportToImage() {
    let QRCanvas = document.querySelector("#qrcode");
    domtoimage.toJpeg(QRCanvas!, { quality: 0.95 }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "myWifiQRCode.jpeg";
      link.href = dataUrl;
      link.click();
    });
  }

  return (
    <div className="mx-auto flex flex-col justify-center items-center gap-4">
      <h3 className="text-3xl text-bold">{title}</h3>
      <div id="canvas" className="border border-black"></div>
      <span>Export to: </span>
      <div className="flex gap-4 justify-center items-center w-full">
        <button className="btn btn-secondary" onClick={exportToPdf}>
          PDF
        </button>
        <button className="btn btn-secondary" onClick={exportToImage}>
          Image
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
