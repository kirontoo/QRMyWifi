import { useState, useEffect } from "react";
import domtoimage from "dom-to-image-more";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./App.css";
import type { ChangeEvent } from "react";
import "jspdf/dist/polyfills.es.js";

// import components
import WifiForm from "./components/WifiForm/WifiForm";
import QRCodeDisplay from "./components/QRCodeDisplay/QRCodeDisplay";

interface WifiCredentials {
  network: string;
  password: string;
  encryption: string;
  hidden: boolean;
  title: string;
}

const App = () => {
  const [state, setState] = useState<WifiCredentials>({
    network: "sampleSSID",
    password: "samplePassword",
    encryption: "WPA",
    hidden: false,
    title: "This is a sample QR Code.",
  });

  useEffect(() => {
    generateQRCode();
  }, []);

  const onHandleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = () => {
    generateQRCode();
  };

  const generateQRCode = () => {
    let { network, password, encryption, hidden } = state;

    // if entries are not filled, don't generate
    if (!network && !password) {
      return;
    }

    let canvas = document.getElementById("canvas");

    // remove any existing canvases
    let existingCanvas = document.getElementsByTagName("canvas");
    if (existingCanvas.length > 0) {
      canvas!.removeChild(existingCanvas[0]);
    }

    // generate QR code
    let credentials = `WIFI:S:${network};T:${encryption};P:${password};`;
    credentials += hidden ? "H:true" : "H:false";

    QRCode.toCanvas(credentials, { scale: 10 }, function(err, qr) {
      if (err) {
        console.error(err);
        return;
      }

      canvas!.appendChild(qr);
    });

    if (network !== "sampleSSID") {
      setState((prev) => {
        return {
          ...prev,
          title: "Here's your QR Code!",
        };
      });
    }
  };

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
    <div className="App">
      <nav>
        <h1 className="black underline">QR My WIFI</h1>
      </nav>

      <div className="container">
        <WifiForm
          onHandleInputChange={onHandleInputChange}
          onSubmit={onSubmit}
        />
        <QRCodeDisplay
          title={state.title}
          exportToPdf={exportToPdf}
          exportToImage={exportToImage}
        />
      </div>
    </div>
  );
};

export default App;
