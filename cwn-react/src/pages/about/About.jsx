import WhoAeAre from "@components/who-we-are/WhoWeAre";
import Contact from "@components/contact/contact";
import Footer from "@components/footer/Footer";
import BookCall from "@components/book-call/BookCall";
import Services from "@components/services/Services";
import Button from "@components/button/button";

import ourStory from "@images/about/our-story.svg";
import toqeerPhoto from "@images/about/pp.png";
import Whatsapp from "../../components/Whatsapp_Logo/Whatsapp";
import Seo from "@components/seo/Seo";
import AnimatedSection from "@components/AnimatedSection/AnimatedSection";

const stats = [
  { value: "2018", label: "Building digital products since" },
  { value: "Global", label: "Client collaboration across markets" },
  { value: "Mentor", label: "Teaching practical coding workflows" },
];

const expertise = [
  {
    title: "Modern delivery",
    description: "React, Angular, PHP, and Ruby on Rails delivery",
  },
  {
    title: "Product thinking",
    description: "Custom product design and development for startups",
  },
  {
    title: "Practical teaching",
    description: "Hands-on coding education through project-based learning",
  },
  {
    title: "Developer growth",
    description: "Mentoring beginners into confident, job-ready developers",
  },
];

const audience = [
  {
    title: "Founders and startups",
    description:
      "We help early teams turn ideas into usable products with focused strategy, fast execution, and pragmatic engineering decisions.",
  },
  {
    title: "Non-IT enterprises",
    description:
      "We modernize workflows and customer experiences with software that improves operations, visibility, and service quality.",
  },
  {
    title: "Product companies",
    description:
      "We support teams that need reliable delivery capacity, sharper product thinking, and a faster route from roadmap to release.",
  },
];

const principles = [
  {
    title: "Clarity over complexity",
    description:
      "We keep communication direct, decisions visible, and engineering focused on what truly moves the product forward.",
  },
  {
    title: "Shipping with purpose",
    description:
      "Every sprint aims to create real momentum, whether that means launching features, reducing friction, or teaching better habits.",
  },
  {
    title: "Learning as leverage",
    description:
      "We do not just build solutions. We help teams and students understand the thinking behind them so growth compounds over time.",
  },
];

export function About() {
  return (
    <main>
      <Seo
        title="About Us | Code With Naqvi"
        description="Learn about CWN's mission and the team crafting innovative software solutions."
        keywords="About CWN, Code With Naqvi, software company"
      />

      <AnimatedSection className="relative isolate overflow-hidden pt-20 pb-24 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 bg-[#02070C]" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_70%_at_0%_25%,rgba(18,170,165,0.28)_0%,rgba(4,10,18,0.18)_48%,rgba(2,7,12,0.96)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_52%)]"
          aria-hidden="true"
        />

        <div className="section relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="text-white">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-main-tint">
              About CWN
            </span>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Building products, teaching developers, and making software feel
              more human.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
              Hi, I&apos;m Toqeer Naqvi, a software engineer and instructor from
              Lahore, Pakistan. Through CWN Technologies, I help founders ship
              modern web products while mentoring developers with practical,
              real-world workflows.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
              What began as freelancing grew into a studio and learning
              ecosystem shaped by one belief: thoughtful engineering and clear
              communication can unlock momentum for both businesses and people.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button text="Book a discovery call" href="#contact" />
              <Button
                href="https://www.youtube.com/@codewithnaqvi"
                target="_blank"
                rel="noopener noreferrer"
                styles="border border-white/15 bg-white/5 hover:bg-white/10 focus:bg-white/10"
              >
                Visit YouTube Channel
              </Button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm"
                >
                  <div className="text-2xl font-semibold text-white">
                    {item.value}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-xl">
            <span
              className="absolute -inset-8 -z-10 rounded-[48px] bg-gradient-to-br from-main/40 via-transparent to-main-tint/40 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_90px_-40px_rgba(20,191,187,0.45)]">
              <img
                loading="lazy"
                src={toqeerPhoto}
                alt="Toqeer Naqvi portrait"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#021018] via-[#021018]/70 to-transparent px-6 py-6 sm:px-8">
                <p className="text-sm uppercase tracking-[0.28em] text-main-tint">
                  Founder, Engineer, Mentor
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  Helping teams build with confidence and clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Whatsapp />

      <AnimatedSection className="section mb-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch mt-20">
        <div className="rounded-[28px] border border-main/10 bg-main-mint px-6 py-8 shadow-card sm:px-8 sm:py-10">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-main">
            What we do best
          </span>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-heading sm:text-4xl">
            Clean execution for products, teams, and learners.
          </h2>
          <p className="mt-4 text-sub-para text-lg leading-8">
            CWN sits at the intersection of product delivery and technical
            education. That mix helps us build software with empathy and teach
            with the context teams actually need.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {expertise.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-light-gray bg-white p-6 shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-main-mint text-main">
                <span className="h-2.5 w-2.5 rounded-full bg-main" />
              </div>
              <h3 className="text-xl font-semibold text-sub-heading">
                {item.title}
              </h3>
              <p className="mt-3 text-sub-para text-base leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section mb-20">
        <div className="mb-10 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-main">
            Who we serve
          </span>
          <h2 className="h2 mt-3">Built for ambitious teams at different stages.</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {audience.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-light-gray bg-white p-7 shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 h-12 w-12 rounded-2xl bg-main-mint/80" />
              <h3 className="text-2xl font-semibold text-sub-heading">
                {item.title}
              </h3>
              <p className="mt-4 text-sub-para leading-8">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section mb-20">
        <div className="grid items-center gap-10 rounded-[36px] border border-light-gray bg-white p-6 shadow-card lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="relative overflow-hidden rounded-[28px] bg-main-mint px-6 py-8">
            <div
              className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-main/10 blur-2xl"
              aria-hidden="true"
            />
            <img
              loading="lazy"
              src={ourStory}
              alt="Our story illustration"
              className="relative mx-auto w-full max-w-[380px]"
            />
          </div>

          <div className="text-lg md:text-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-main">
              Our story
            </span>
            <h2 className="h2 mt-3 mb-6">A studio shaped by shipping and teaching.</h2>
            <p className="text-sub-para mb-4 leading-8">
              CWN began at a single desk where Toqeer balanced freelancing work
              with late-night learning sprints. Small wins turned into repeat
              clients, collaborators became teammates, and a stronger operating
              rhythm took shape.
            </p>
            <p className="text-sub-para leading-8">
              Today we partner with founders, startups, and enterprises that
              want practical builders, not unnecessary complexity. The mindset
              is still the same: stay transparent, move with intent, and leave
              every product better than we found it.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <WhoAeAre />

      <AnimatedSection className="section mt-20 mb-20">
        <div className="mb-10 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-main">
            Principles
          </span>
          <h2 className="h2 mt-3">How we approach every build and learning experience.</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {principles.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-light-gray bg-white p-7 shadow-card"
            >
              <h3 className="text-2xl font-semibold text-sub-heading">
                {item.title}
              </h3>
              <p className="mt-4 text-sub-para leading-8">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="section mb-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[32px] border border-main/10 bg-main-mint px-6 py-8 sm:px-8 sm:py-10">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-main">
              Our vision
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
              Make software craftsmanship and mentorship more accessible.
            </h2>
            <p className="mt-5 text-sub-para text-lg leading-8">
              We imagine a community where learning to code and launching
              digital products feels collaborative, practical, and borderless.
              CWN exists to make real-world software building more approachable
              for people who are ready to create.
            </p>
          </div>

          <div className="rounded-[32px] border border-light-gray bg-white px-6 py-8 shadow-card sm:px-8 sm:py-10">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-main">
              Our mission
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
              Deliver resilient products while transferring knowledge.
            </h2>
            <p className="mt-5 text-sub-para text-lg leading-8">
              We work with ambitious founders, operators, and learners to build
              modern software, teach relevant skills, and share the thinking
              behind every decision. The goal is not just output, but lasting
              confidence and capability.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <Services />
      <BookCall />
      <Contact />
      <Footer />
    </main>
  );
}
