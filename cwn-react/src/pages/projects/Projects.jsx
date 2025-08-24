/* eslint-disable react/prop-types */
import Header from "@components/header/Header";
import Contact from "@components/contact/contact";
import Footer from "@components/footer/Footer";
import Seo from "@components/seo/Seo";
import AnimatedSection from "@components/AnimatedSection/AnimatedSection";

import servicesImg from "@images/services/services.svg";
import storeImg from "@images/services/web-development.svg";
import dashboardImg from "@images/services/project-manger.svg";

// using same visuals for logos for demonstration purposes
const storeLogo = storeImg;
const dashboardLogo = dashboardImg;

export function Projects() {
  return (
    <main>
      <Seo
        title="Projects | CWN"
        description="Explore case studies of our modern Angular projects."
        keywords="projects, case studies, angular, CWN"
      />
      <Header
        heading="CWN Technologies Case Studies"
        text="Explore how we craft modern Angular 17 applications for real business needs."
        buttonText="Start a Project"
        buttonHref="#contact"
        img={servicesImg}
        imgAlt="projects illustration"
      />
      <section className="section mb-32">
        <h2 className="h2 text-center mb-12 center-orange-line">Case Studies</h2>
        <div className="flex flex-col gap-12">
          <ProjectCard
            image={storeImg}
            logo={storeLogo}
            company="CWN Store"
            alt="E-commerce store project"
            title="E-Commerce Store"
            description="A scalable online store built with Angular 17 and Tailwind CSS to deliver a seamless shopping experience."
            technologies={["Angular 17", "Tailwind CSS"]}
          />
          <ProjectCard
            image={dashboardImg}
            logo={dashboardLogo}
            company="CWN Dashboard"
            alt="Admin dashboard project"
            title="Admin Dashboard"
            description="A powerful dashboard to manage products, blogs, and contact data with intuitive controls."
            technologies={["Angular 17", "Tailwind CSS"]}
          />
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}

function ProjectCard({ image, logo, company, alt, title, description, technologies }) {
  return (
    <AnimatedSection
      as="article"
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
    >
      <div className="md:w-1/2 relative">
        <img
          loading="lazy"
          src={image}
          alt={alt}
          className="w-full h-56 md:h-full object-cover bg-light-gray"
        />
        {logo && (
          <img
            loading="lazy"
            src={logo}
            alt={`${company} logo`}
            className="absolute top-4 left-4 w-16 h-16 bg-white p-2 rounded-xl shadow-md"
          />
        )}
      </div>
      <div className="p-8 flex flex-col md:w-1/2">
        {company && (
          <h4 className="text-sm font-semibold text-main uppercase mb-2">{company}</h4>
        )}
        <h3 className="mb-3 text-2xl font-semibold text-sub-heading">{title}</h3>
        <p className="mb-6 text-para flex-1">{description}</p>
        {technologies && (
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-main-mint text-sub-heading rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <span className="inline-block mt-auto px-5 py-3 text-white text-lg font-semibold bg-main rounded-lg self-start group-hover:bg-main-shade transition-colors duration-300">
          Case Study Details
        </span>
      </div>
    </AnimatedSection>
  );
}

