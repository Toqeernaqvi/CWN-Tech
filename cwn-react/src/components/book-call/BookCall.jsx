import Button from "@components/button/button";

export default function BookCall() {
  return (
    <section className="section mb-24">
      <div className="flex flex-col items-center gap-4 rounded-[36px] bg-main-shade px-6 py-14 text-center sm:px-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-white font-poppins font-semibold tracking-tight leading-tight max-w-[950px]">
          Ready to Kickstart Your Project?
        </h2>
        <p className="text-center text-light leading-8 mb-4 text-lg max-w-[900px]">
          Share your goals and constraints, and our team will create a clear,
          actionable plan for a high-quality digital product. Book a free
          30-minute consultation.
        </p>
        <Button
          text="Book Free Consultation"
          styles="mb-4 border border-white/10 bg-main text-white hover:bg-main-tint focus:bg-main-tint"
          href={"https://calendly.com/malikhaziq153/30min"}
        />
        <p className="text-light text-center">
          Or, drop your details in the
          <a href="#contact" className="text-[#ffc16b] font-semibold">
            &nbsp;form&nbsp;
          </a>
          below to share your requirements.
        </p>
      </div>
    </section>
  );
}
