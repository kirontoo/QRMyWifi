import QRCode from "qrcode";

export const QRCanvas = document.getElementById("canvas");

export interface WifiCredentials {
  network: string;
  password: string;
  encryption: string;
  hidden: boolean;
}

export const sampleWifiCred: WifiCredentials = {
  network: "sampleSSID",
  password: "samplePassword",
  encryption: "WPA",
  hidden: false,
};

export const clearQRCanvas = () => {
  let existingCanvas = document.getElementsByTagName("canvas");
  if (existingCanvas.length > 0) {
    QRCanvas!.removeChild(existingCanvas[0]);
  }
};

export const generateQRCode = ({
  network,
  password,
  encryption,
  hidden,
}: WifiCredentials) => {
  // if entries are not filled, don't generate
  if (network === "" && password === "") {
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

  QRCode.toCanvas(credentials, { scale: 10 }, function (err, qr) {
    if (err) {
      console.error(err);
      return;
    }

    canvas!.appendChild(qr);
  });
};
