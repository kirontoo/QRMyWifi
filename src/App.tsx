import { useState, useEffect } from "react";
import QRCode from "qrcode";
import "./App.css";
import type { ChangeEvent } from "react";
import { generateQRCode, sampleWifiCred } from "./lib/util";

// import components
import WifiForm from "./components/WifiForm/WifiForm";
import QRCodeDisplay from "./components/QRCodeDisplay/QRCodeDisplay";
import { Navbar, Footer, HeroBanner } from "./components";

const App = () => {
  useEffect(() => {
    generateQRCode(sampleWifiCred);
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="lg:w-9/12 mx-auto">
        <HeroBanner />
        <section className="my-6 mb-20">
          <h2
            id="how-it-works"
            className="text-secondary text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-bold text-center mb-12"
          >
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
        <WifiForm />
        <QRCodeDisplay title="hi" />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
