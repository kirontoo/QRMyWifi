import { useState, useEffect } from "react";
import QRCode from "qrcode";
import "./App.css";
import type { ChangeEvent } from "react";

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
        <QRCodeDisplay title={state.title} />
      </div>
    </div>
  );
};

export default App;
