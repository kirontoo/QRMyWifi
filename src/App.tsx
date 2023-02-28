import { useState, useEffect } from "react";
import QRCode from "qrcode";
import "./App.css";
import type { ChangeEvent } from "react";

// import components
import WifiForm from "./components/WifiForm/WifiForm";
import QRCodeDisplay from "./components/QRCodeDisplay/QRCodeDisplay";
import { Navbar, Footer, HeroBanner } from "./components";

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
    <>
      <header>
        <Navbar />
      </header>

      <main className="lg:w-9/12 mx-auto">
        <HeroBanner />
        <section className="my-6">
          <h2 id="how-it-works" className="text-secondary text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-bold text-center mb-12">
            How It Works
          </h2>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4 px-4">
            {new Array(4).fill(undefined).map(() => {
              return (
                <div className="card">
                  <header className="card-header">
                    <img src="https://via.placeholder.com/250" />
                  </header>
                  <main className="card-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                  </main>
                  <footer className="card-footer">
                    <a className="btn btn-pill btn-secondary" href="">
                      some button
                    </a>
                  </footer>
                </div>
              );
            })}
          </div>
        </section>
        {/*
        <WifiForm
          onHandleInputChange={onHandleInputChange}
          onSubmit={onSubmit}
        />
        <QRCodeDisplay title={state.title} />
        */}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
