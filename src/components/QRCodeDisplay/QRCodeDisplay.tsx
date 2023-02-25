import "./QRCodeDisplay.css";
import domtoimage from "dom-to-image-more";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type ButtonFunction = () => void;

interface QRCodeDisplayProps {
  title: string;
}

const QRCodeDisplay = ({ title }: QRCodeDisplayProps) => {
  function exportToPdf() {
    // let pdf = new jsPDF();
    let qrCodeCanvas = document.querySelector("#canvas");

    // let margin = 20;
    // html2canvas(document.body).then((canvas) => {
    //   let pdf = new jsPDF("p", "mm", "a4");
    //   const imageData = canvas.toDataURL("image/png");
    //   pdf.addImage(`data:${imageData}`);
    //   pdf.text(
    //     "Scan this QR Code for the WIFI!",
    //     margin * 3,
    //     margin + canvas.width / 7
    //   );
    //   pdf.save("myWifiQRCode.pdf");
    // });
  }

  function exportToImage() {
    let qrCode = document.querySelector("#canvas");

    domtoimage.toJpeg(qrCode!, { quality: 0.95 }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "myWifiQRCode.jpeg";
      link.href = dataUrl;
      link.click();
    });
  }

  return (
    <div className="panel">
      <h3>{title}</h3>
      <div id="canvas"></div>
      <main>
        <p className="b">Export to: </p>
        <div className="buttonContainer">
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            onClick={exportToPdf}
          >
            PDF
          </button>
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            onClick={exportToImage}
          >
            Image
          </button>
        </div>
      </main>
    </div>
  );
};

export default QRCodeDisplay;
