import team from "@images/team.svg";

export default function WhoWeAre() {
  return (
    <section className="section mb-20">
      <div className="grid items-center gap-10 rounded-[36px] border border-light-gray bg-white p-6 shadow-card lg:grid-cols-[1fr_0.85fr] lg:p-10">
        <div className="text-lg md:text-xl">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-main">
            Who we are
          </span>
          <h2 className="h2 mt-3 mb-6">
            A software partner focused on practical progress.
          </h2>
          <p className="text-sub-para mb-4 leading-8">
            CWN Technologies is a software development company that solves
            specific business problems with thoughtful, modern technology
            solutions.
          </p>
          <p className="text-sub-para leading-8">
            Since 2018, we have been helping startups and SMBs move faster,
            improve delivery, and build digital products that support real
            growth.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-main-mint px-6 py-8">
          <div
            className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-main/10 blur-2xl"
            aria-hidden="true"
          />
          <img
            loading="lazy"
            src={team}
            alt="CWN team collaboration"
            className="relative mx-auto w-full max-w-[360px]"
          />
        </div>
      </div>
    </section>
  );
}
