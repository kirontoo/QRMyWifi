function Navbar() {
  return (
    <nav className="bg-secondary text-white flex flex-col md:flex-row gap-2 text-xl justify-center md:justify-between w-screen min-h-[6rem] items-center">
      <div className="w-full md:w-[20rem] h-[6rem] bg-primary text-4xl flex items-center justify-center md:justify-start md:pl-20">
        IMAGE QRMyWifi
      </div>
      <a className="md:pr-20 btn btn-secondary" href="#">
      QR Generator
      </a>
    </nav>
  );
}

export default Navbar;
