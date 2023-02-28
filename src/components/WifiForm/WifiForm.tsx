import { useState, ChangeEvent, MouseEventHandler } from "react";
import QRCode from "qrcode";
import "./WifiForm.css";

interface WifiCredentials {
  network: string;
  password: string;
  encryption: string;
  hidden: boolean;
}

const WifiForm = () => {
  const [state, setState] = useState<WifiCredentials>({
    network: "",
    password: "",
    encryption: "",
    hidden: false,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleToggle = () => {
    setState((s) => ({ ...s, hidden: !s.hidden }));
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

    QRCode.toCanvas(credentials, { scale: 10 }, function (err, qr) {
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
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        generateQRCode();
      }}
    >
      <div>
        <label htmlFor="network-ssid" className="input-label">
          Network/SSID
        </label>
        <input
          type="text"
          id="network-ssid"
          className="input mb-2"
          placeholder="network"
          name="network"
          required
          value={state.network}
          onChange={handleInputChange}
        />
        <span className="input-helper">This is case-sensitive.</span>
      </div>
      <div>
        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          placeholder="network password"
          required
          value={state.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
          htmlFor="encryption-type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Encryption Type
        </label>
        <select
          id="encryption-type"
          name="encryption"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
          value={state.encryption}
          onChange={handleInputChange}
        >
          <option value="">no encryption</option>
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
        </select>
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="hidden"
            type="checkbox"
            name="hidden"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-secondary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-secondary dark:ring-offset-gray-800"
            onChange={handleToggle}
            value="hidden"
            checked={state.hidden}
          />
        </div>
        <label
          htmlFor="hidden"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          hidden
        </label>
      </div>
      <button className="btn btn-secondary" type="submit">
        Generate QR Code
      </button>
    </form>
  );
};

export default WifiForm;
