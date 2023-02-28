function Footer() {
  return (
    <div className="w-full bg-secondary text-white py-4 text-center ">
      <div className="w-9/12 mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        <small className="text-center text-lg">&#169;2022 QRMyWifi</small>
        <a href="https://ko-fi.com/F1F2J3RV9" target="_blank">
          <img
            height="36"
            style={{ border: "0px", height: "36px" }}
            src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
