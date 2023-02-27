function HeroBanner() {
  return (
    <section className="py-12 sm:py-24">
      <div className="w-full lg:w-11/12 sm:w-2/3 gap-6 lg:gap-8 flex justify-center items-center lg:items-start flex-col mb-5 sm:mb-10 px-4 lg:px-0">
        <h1 className="text-secondary text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-7 md:leading-10 text-bold text-center lg:text-left">
          Connect to WiFi in a snap with our QR code generator
        </h1>
        <a
          className="btn btn-primary text-lg sm:text-xl() lg:text-2xl"
          href="#qr-generator"
        >
          Get Started
        </a>
        <p className="lg:w-10/12 text-black() font-normal text-md sm:text-lg text-center lg:text-left">
          Simplify your life with our QR code generator. No more complicated
          passwords, just scan and go!
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
