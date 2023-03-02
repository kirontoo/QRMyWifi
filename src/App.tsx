import { useEffect } from "react";
import "./App.css";
import { generateQRCode, sampleWifiCred } from "./lib/util";
import EnterCredentials from "./images/enter_credentials.png";
import ExportQRCodePNG from "./images/export_qr_code.png";
import GenerateQRCodePNG from "./images/generate_qr_code.png";
import SelectEncryptionTypePNG from "./images/select_encryption_type.png";

import WifiForm from "./components/WifiForm/WifiForm";
import QRCodeDisplay from "./components/QRCodeDisplay/QRCodeDisplay";
import { Navbar, Footer, HeroBanner } from "./components";

interface CardProps {
  head: string;
  content: string;
}
const HowItWorks: Array<CardProps> = [
  {
    head: EnterCredentials,
    content: "Enter your network name and password",
  },
  {
    head: SelectEncryptionTypePNG,
    content: "Select the encryption type",
  },
  {
    head: GenerateQRCodePNG,
    content: "Generate your code",
  },
  {
    head: ExportQRCodePNG,
    content: "Export and save!",
  },
];

const App = () => {
  useEffect(() => {
    generateQRCode(sampleWifiCred);
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="lg:w-9/12 mx-auto mb-20">
        <HeroBanner />
        <section className="my-6 mb-20 bg-gray-100 p-10">
          <h2
            id="how-it-works"
            className="text-secondary text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-bold text-center"
          >
            How It Works
          </h2>
          <hr className="border-gray-500 mt-2 mb-10 w-1/2 mx-auto" />

          <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-4">
            {HowItWorks.map((c, i) => {
              return (
                <div className="card" key={`steps-${i}`}>
                  <header className="card-header">
                    <span className="text-2xl p-1 bg-primary text-white font-bold rounded shadow">
                      Step {i + 1}
                    </span>
                    <div className="card-image">
                      <img className="w-full h-fit" src={c.head} />
                    </div>
                  </header>
                  <main>
                    <p className="text-center">{c.content}</p>
                  </main>
                </div>
              );
            })}
          </div>
        </section>
        <section className="flex gap-4 py-20">
          <div className="mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-4 lg:w-3/4 ">
            <div className="p-4 bg-gray-100 shadow-lg flex flex-col justify-center items-center gap-8">
              <h2 className="text-3xl text-bold">WiFi Credentials</h2>
              <WifiForm />
            </div>
            <div className="p-4 bg-gray-100 shadow-lg" id="qr-generator">
              <QRCodeDisplay title="Your Wifi QR Code" />
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
