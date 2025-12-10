/* eslint-disable react/prop-types */
import Contact from "@components/contact/contact";
import Footer from "@components/footer/Footer";
import Whatsapp from "../../components/Whatsapp_Logo/Whatsapp";
import Header from "../../components/header/Header";
import Seo from "@components/seo/Seo";
import AnimatedSection from "@components/AnimatedSection/AnimatedSection";
import courseHeaderImg from "../../assets/images/courses/sir.jpeg";

export function Courses() {
  return (
    <main>
      <Seo
        title="Courses | Code With Naqvi - YouTube"
        description="Enhance your skills with CodeWithNaqvi's YouTube programming courses and resources."
        keywords="courses, programming, Code With Naqvi, YouTube, codewithnaqvi"
      />
      <Header
        heading="Become a skilled, industry-ready developer"
        text="I teach web development in a way that helps beginners grow into high-level developers ready to excel in the industry."
        buttonText="Become Developer"
        buttonHref="#contact"
        img={courseHeaderImg}
        imgAlt="Course Header Image of Professor Toqeer Abbas"
      />

      <section className="section relative mb-2 overflow-hidden rounded-3xl bg-gradient-to-r from-main-dark via-main-shade to-main text-white shadow-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(62,183,187,0.18),transparent_45%),radial-gradient(circle_at_85%_30%,rgba(237,139,0,0.18),transparent_40%)]" />
        <div className="relative flex flex-col gap-6 items-center py-16 px-4 text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-main-tint-1/90 font-semibold">
            Community
          </p>
          <h2 className="text-white text-3xl sm:text-4xl font-semibold font-poppins">
            Pakistan&apos;s Most Loved Coding Community
          </h2>
          <p className="max-w-3xl text-white/80 text-lg leading-relaxed">
            A focused learning space for developers who want a guided path,
            real-world projects, and mentorship that keeps you accountable.
          </p>
          <div className="grid xm:grid-cols-3 gap-10 xm:gap-16 leading-7">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p className="text-lg text-white/80 font-semibold">Happy Learners</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p className="text-lg text-white/80 font-semibold">Monthly Views</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">1,000+</h3>
              <p className="text-lg text-white/80 font-semibold">Monthly Subscribers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden rounded-3xl bg-main-mint">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(18,95,96,0.08),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(237,139,0,0.08),transparent_40%)]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 bottom-10 w-52 h-52 bg-main-tint/30 blur-3xl rounded-full" />
          <div className="absolute right-10 -top-12 w-60 h-60 bg-tertiary/25 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-main-shade font-semibold">
              YouTube Tracks
            </p>
            <h2 className="h2 text-center center-orange-line">
              Level up your web development skills with CodeWithNaqvi on YouTube
            </h2>
            <p className="text-lg text-sub-para max-w-3xl mx-auto">
              Curated playlists that take you from fundamentals to polished builds.
              Pick a track, follow along, and keep shipping projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <PlaylistCard
              title="Python Crash Course"
              tag="Roadmap"
              description="A structured python course to complete basics."
              listId="PL9WbyKqkuCAYbBQ1-E5tuxIWaQwEwc4zd"
            />
            <PlaylistCard
              title="Creative HTML 5 Course"
              tag="Foundations"
              description="Semantic layouts, responsive patterns, and best practices."
              listId="PL9WbyKqkuCAY9qhsoZpdqq62ZrjY2y-2P"
            />
            <PlaylistCard
              title="Creative CSS Course"
              tag="Styling"
              description="Modern layouts, gradients, and animations to level up UI."
              listId="PL9WbyKqkuCAaxrlsDs3y87Ckp0L6qQdIE"
            />
            <PlaylistCard
              title="Creative JavaScript Course"
              tag="Interaction"
              description="From vanilla JS fundamentals to practical UI behaviors."
              listId="PL9WbyKqkuCAajVIrT9lFBQduvh9P7tGSb"
            />
            <PlaylistCard
              title="Creative Ruby Course"
              tag="Backend"
              description="Ruby essentials to build reliable, readable backends."
              listId="PL9WbyKqkuCAaRg4Z2_T-TSm7k2MZlCBKZ"
            />
            <PlaylistCard
              title="Creative Rails Course"
              tag="Framework"
              description="Rails patterns, authentication, and production-ready setups."
              listId="PL9WbyKqkuCAYT-IPvo5PxR_hijMuR1RCB"
            />
            <PlaylistCard
              title="Creative C++ Course"
              tag="Systems"
              description="Core C++ concepts with examples you can build on."
              listId="PL9WbyKqkuCAbuaSfkGOVxaKfWQe3OkFcm"
            />
          </div>
        </div>
      </section>

      <Whatsapp />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

function CourseCard({ thumbnail, thumbnailAlt, title, description, link }) {
  return (
    <AnimatedSection
      as="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group block h-full rounded-xl overflow-hidden bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:scale-105 cursor-pointer flex flex-col"
    >
      <img
        loading="lazy"
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        src={thumbnail}
        alt={thumbnailAlt}
      />
      <div className="p-6">
        <h3 className="mb-3 text-2xl font-semibold text-sub-heading">{title}</h3>
        <p className="mb-6 text-para">{description}</p>
        <span className="inline-block px-5 py-3 text-white text-lg font-semibold bg-main rounded-lg group-hover:bg-main-shade transition-colors duration-300">
          View Playlist
        </span>
      </div>
    </AnimatedSection>
  );
}

function PlaylistCard({ listId, title, tag, description }) {
  return (
    <AnimatedSection className="h-full">
      <div
        className="group relative h-full rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md shadow-3xl border border-light-gray
                    transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-main via-main-tint to-tertiary" />

        <div className="p-6 pb-5 flex flex-col items-center gap-3 text-center">
          {tag && (
            <span className="inline-flex items-center px-3 py-1 text-[11px] font-semibold tracking-[0.14em] uppercase text-main-shade bg-main-mint rounded-full border border-main-tint/60">
              {tag}
            </span>
          )}
          {title && (
            <h3 className="text-xl font-semibold text-heading">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-sub-para leading-6">
              {description}
            </p>
          )}
        </div>

        <div className="w-full">
          <iframe
            className="w-full h-[250px] md:h-[280px] rounded-b-3xl border-t border-light-gray/80"
            src={`https://www.youtube.com/embed/videoseries?list=${listId}`}
            title={`${title} playlist`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </AnimatedSection>
  );
}
