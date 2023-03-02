import QRCode from "qrcode";

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

  const QRCanvas = document.getElementById("canvas");

  // remove any existing canvases
  let existingCanvas = document.getElementsByTagName("canvas");
  if (existingCanvas.length > 0) {
    QRCanvas!.removeChild(existingCanvas[0]);
  }

  // generate QR code
  let credentials = `WIFI:S:${network};T:${encryption};P:${password};`;
  credentials += hidden ? "H:true" : "H:false";

  QRCode.toCanvas(credentials, { scale: 4, width: 300 }, function (err, qr) {
    if (err) {
      console.error(err);
      return;
    }

    qr.id = "qrcode";
    QRCanvas!.appendChild(qr);
  });
};
