function HeroBanner() {
  return (
    <section className="py-12 sm:py-24 ">
      <div className="w-11/12 sm:w-2/3 gap-8 lg:flex justify-center items-center lg:items-start flex-col  mb-5 sm:mb-10">
        <h1 className="text-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800 font-black leading-7 md:leading-10 text-bold">
          Connect to WiFi in a snap with our QR code generator
        </h1>
        <a className="btn btn-primary text-2xl" href="#qr-generator">Get Started</a>
        <p className="lg:w-10/12 text-black() font-normal text-sm sm:text-lg">
          Simplify your life with our QR code generator. No more complicated
          passwords, just scan and go!
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
