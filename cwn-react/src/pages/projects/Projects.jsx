import Header from "@components/header/Header";
import Contact from "@components/contact/contact";
import Footer from "@components/footer/Footer";
import Seo from "@components/seo/Seo";
import AnimatedSection from "@components/AnimatedSection/AnimatedSection";

import servicesImg from "@images/services/services.svg";
import storeImg from "@images/services/web-development.svg";
import dashboardImg from "@images/services/project-manger.svg";

export function Projects() {
  return (
    <main>
      <Seo
        title="Projects | CWN"
        description="Explore case studies of our modern Angular projects."
        keywords="projects, case studies, angular, CWN"
      />
      <Header
        heading="Our Projects"
        text="Discover how we build modern web experiences with Angular 17."
        buttonText="Start a Project"
        buttonHref="#contact"
        img={servicesImg}
        imgAlt="projects illustration"
      />
      <section className="section mb-32">
        <h2 className="h2 text-center mb-12 center-orange-line">Case Studies</h2>
        <div className="grid gap-12 md:grid-cols-2">
          <ProjectCard
            image={storeImg}
            alt="Store project"
            title="E-Commerce Store"
            description="A scalable online store built with Angular 17 and Tailwind CSS to deliver a seamless shopping experience."
          />
          <ProjectCard
            image={dashboardImg}
            alt="Admin dashboard project"
            title="Admin Dashboard"
            description="A powerful dashboard to manage products, blogs, and contact data with intuitive controls."
          />
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}

function ProjectCard({ image, alt, title, description }) {
  return (
    <AnimatedSection
      as="article"
      className="group bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col"
    >
      <img
        loading="lazy"
        src={image}
        alt={alt}
        className="w-full h-60 object-cover bg-light-gray transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-6 flex flex-col flex-1">
        <h3 className="mb-3 text-2xl font-semibold text-sub-heading">{title}</h3>
        <p className="mb-6 text-para flex-1">{description}</p>
        <span className="inline-block mt-auto px-5 py-3 text-white text-lg font-semibold bg-main rounded-lg self-start group-hover:bg-main-shade transition-colors duration-300">
          View Details
        </span>
      </div>
    </AnimatedSection>
  );
}

