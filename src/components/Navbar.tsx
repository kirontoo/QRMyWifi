function Navbar() {
  return (
    <nav className="bg-secondary text-white flex flex-col md:flex-row gap-2 text-xl justify-center md:justify-start min-h-[6rem] items-center">
      <div className="w-full md:w-[20rem] h-[6rem] bg-primary text-4xl flex items-center justify-center md:justify-start md:pl-20">
        IMAGE QRMyWifi
      </div>

      <a className="nav-link" href="#how-it-works">
        How It Works
      </a>

      <a className="nav-link" href="#qr-generator">
        QR Generator
      </a>
    </nav>
  );
}

export default Navbar;
