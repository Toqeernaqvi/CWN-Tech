import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Layers, 
  FileCode2, 
  Trophy, 
  Calendar, 
  ArrowRight, 
  Star, 
  Users, 
  Zap,
  Globe,
  Database,
  Rocket,
  ShieldCheck,
  Mail,
  X,
  Link as LinkIcon,
  Phone
} from 'lucide-react';
import Footer from "@components/footer/Footer";
import Button from "@components/button/button";
import AnimatedSection from "@components/AnimatedSection/AnimatedSection";
import Seo from "@components/seo/Seo";
import Whatsapp from "@components/Whatsapp_Logo/Whatsapp";
import shortLogo from "@icons/short-logo.svg";

const Bootcamp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    goals: ''
  });
  const [enrolled, setEnrolled] = useState(false);
  const [openCurriculum, setOpenCurriculum] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const handleEnroll = (e) => {
    e.preventDefault();
    if (formData.email) {
      setEnrolled(true);
      setTimeout(() => setEnrolled(false), 5000);
      setFormData({ name: '', email: '', phone: '', experience: '', goals: '' });
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const curriculum = [
    {
      month: 'Month 1',
      title: 'HTML, CSS & Responsive Design',
      description: 'Master the building blocks of the web. Learn modern CSS techniques, Flexbox, Grid, and mobile-first design patterns.',
      icon: <Layers className="w-6 h-6 text-main" />,
    },
    {
      month: 'Month 2',
      title: 'JavaScript & DOM Mastery',
      description: 'Deep dive into vanilla JS, ES6+, async programming, and DOM manipulation to create interactive web experiences.',
      icon: <Code2 className="w-6 h-6 text-main" />,
    },
    {
      month: 'Month 3',
      title: 'React.js Development',
      description: 'Learn the most popular frontend library. Hooks, Context API, state management, and building complex SPAs component by component.',
      icon: <Zap className="w-6 h-6 text-main" />,
    },
    {
      month: 'Month 4',
      title: 'Backend Mastery (Node + Express + API)',
      description: 'Build robust server-side applications. Database design, RESTful APIs, authentication, and cloud deployment.',
      icon: <Database className="w-6 h-6 text-main" />,
    },
    {
      month: 'Month 5',
      title: 'AI Integration in Web Apps',
      description: 'Harness the power of AI. Implement OpenAI APIs, vector databases, and build AI-driven features like chatbots and content generators.',
      icon: <Cpu className="w-6 h-6 text-main" />,
    },
    {
      month: 'Month 6',
      title: 'Final Project & Portfolio',
      description: 'Build a production-level AI application. Polish your portfolio, learn freelancing strategies, and prepare for interviews.',
      icon: <Rocket className="w-6 h-6 text-main" />,
    },
  ];

  const highlights = [
    {
      title: 'Build Real-World Projects',
      description: 'Apply your skills by building 10+ professional-grade applications including AI SaaS platforms.',
      icon: <FileCode2 className="w-8 h-8 text-main" />
    },
    {
      title: 'AI-First Approach',
      description: 'Learn not just web dev, but how to integrate LLMs and AI tools to build the software of the future.',
      icon: <Cpu className="w-8 h-8 text-main" />
    },
    {
      title: 'Career Readiness',
      description: 'Comprehensive sessions on freelancing, resume building, and mock interviews with industry experts.',
      icon: <Trophy className="w-8 h-8 text-main" />
    },
  ];

  const curriculumTracks = [
    {
      title: 'Frontend',
      topics: 'HTML, CSS, JavaScript, React',
      details: 'Build strong frontend foundations by learning page structure, styling, interactivity, and component-based development.',
      icon: <Code2 className="w-8 h-8 text-main" />
    },
    {
      title: 'Backend',
      topics: 'PHP, Laravel',
      details: 'Learn how to create dynamic applications, handle business logic, work with servers, and build scalable backend systems.',
      icon: <Database className="w-8 h-8 text-main" />
    },
    {
      title: 'Projects',
      topics: 'Hands-on portfolio projects and real-world practice',
      details: 'Apply everything through practical projects that strengthen your portfolio and prepare you for real client or job work.',
      icon: <Rocket className="w-8 h-8 text-main" />
    }
  ];

  const testimonials = [
    {
      name: 'Ayesha Khan',
      role: 'Frontend Developer @ TechFlow',
      content: 'This bootcamp completely changed my career path. The AI integration module was the game-changer that helped me land my current role.',
      avatar: 'AK'
    },
    {
      name: 'Hamza Ali',
      role: 'Freelance Web Developer',
      content: 'Building real SaaS projects gave me the confidence to start my own agency. The curriculum is incredibly practical and up-to-date.',
      avatar: 'HA'
    },
    {
      name: 'Fatima Ahmed',
      role: 'Junior Fullstack Engineer',
      content: 'The mentors are amazing. They don\'t just teach code; they teach you how to think like an engineer and solve complex problems.',
      avatar: 'FA'
    }
  ];

  const faqs = [
    {
      question: 'Is this bootcamp beginner-friendly?',
      answer: 'Yes. The program starts from HTML, CSS, and JavaScript fundamentals before moving into React, backend development, and AI integration, so complete beginners can follow along.'
    },
    {
      question: 'How are the classes delivered?',
      answer: 'You will learn through guided modules, hands-on assignments, project building, and mentorship support designed to help you apply each concept in practical work.'
    },
    {
      question: 'What will I build during the bootcamp?',
      answer: 'You will create multiple portfolio-ready web applications, including fullstack projects and AI-powered products that demonstrate real-world frontend, backend, and integration skills.'
    },
    {
      question: 'Will I get help with jobs or freelancing?',
      answer: 'Yes. The bootcamp includes career readiness support such as portfolio polishing, interview preparation, and freelancing guidance so you can turn your skills into opportunities.'
    },
    {
      question: 'Do I get lifetime access after enrolling?',
      answer: 'Yes. Students on the full course plan get lifetime access to the training material and future updates so you can revisit lessons anytime.'
    }
  ];

  const certificationPoints = [
    {
      title: 'Start today',
      description: 'You are just months away from building the skills needed to start your tech career with confidence.'
    },
    {
      title: 'Believe in yourself',
      description: 'Coding becomes easier with the right roadmap, practical support, and consistent hands-on learning throughout the bootcamp.'
    }
  ];

  return (
    <main className="min-h-screen bg-white font-poppins selection:bg-main selection:text-white overflow-x-hidden">
      <Seo 
        title="AI Web Development Bootcamp - Code With Naqvi"
        description="Master Fullstack Web Development with AI integration in our 6-month intensive bootcamp."
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .shadow-card { box-shadow: 0px 4px 60px 0px rgba(213, 213, 213, 0.40); }
        .bg-main-mint { background-color: #f0f9fa; }
        .text-main { color: #125F60; }
        .bg-main { background-color: #125F60; }
        .border-main { border-color: #125F60; }
        .orange-line::after {
          content: "";
          display: block;
          width: 56px;
          height: 4px;
          position: absolute;
          bottom: -16px;
          background-color: #ED8B00;
          border-radius: 8px;
        }
        .center-orange-line::after {
          left: 50%;
          transform: translateX(-50%);
        }
        @media (max-width: 768px) {
          .section { padding: 0 16px !important; }
        }
      `}} />

      <AnimatedSection 
        as="header"
        className="section relative overflow-hidden pt-12 pb-20 lg:pt-32 lg:pb-32 bg-main-mint"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(10deg, rgba(59, 130, 246, 0.00) 12.42%, rgba(62, 183, 187, 0.10) 63.32%)",
          }}
        />
        <div className="relative z-10">
          <span className="bg-main text-[10px] sm:text-xs lg:text-sm rounded-lg py-1.5 px-3 text-white mb-6 inline-block font-bold uppercase tracking-widest shadow-lg shadow-main/10">
            6 MONTHS MASTER PROGRAM
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-normal mb-8 max-w-4xl leading-[1.2] sm:leading-[1.15] lg:leading-[1.1] text-heading">
            Master <span className="text-main">AI Integration</span> & <br />
            Modern <span className="text-main">Web Development</span> <br />
            From <span className="text-main">Scratch</span>.
          </h1>
          <p className="text-sub-para text-base sm:text-lg lg:text-xl max-w-3xl mb-12 leading-relaxed">
            Become a job-ready fullstack engineer in 180 days. Master React, Node, and the AI features that define the future of software.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <button 
              onClick={() => document.getElementById('pricing').scrollIntoView({behavior: 'smooth'})}
              className="w-full sm:w-auto bg-main px-8 sm:px-12 py-5 lg:py-6 font-bold text-white text-base sm:text-lg lg:text-xl rounded-xl duration-500 hover:bg-main-tint hover:shadow-[0_10px_25px_rgba(18,95,96,0.2)] active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              Enroll Now <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('curriculum').scrollIntoView({behavior: 'smooth'})}
              className="w-full sm:w-auto bg-white border-2 border-main/10 px-8 sm:px-12 py-5 lg:py-6 font-bold text-heading text-base sm:text-lg lg:text-xl rounded-xl duration-500 hover:bg-main-mint active:scale-95 flex items-center justify-center"
            >
              Learn More
            </button>
          </div>

        </div>
      </AnimatedSection>

      {/* Highlights Section */}
      <section className="py-20 md:py-32 section bg-light-gray/20" id="about">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-card group border border-transparent hover:border-main/10 transition-all duration-300 cursor-pointer"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-heading">{item.title}</h3>
                <p className="text-sub-para leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 md:py-32 section" id="curriculum">
        <div className="container mx-auto">
          <div className="text-center mb-16 md:mb-20 relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-heading center-orange-line relative">
              Structured Mastery <span className="text-main">Timeline</span>
            </h2>
            <p className="text-sub-para max-w-2xl mx-auto mt-12 text-sm md:text-base">From basics to professional development, we cover everything you need to build AI-powered web applications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {curriculum.map((module, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-main-mint p-8 rounded-2xl group relative overflow-hidden border border-main/5 hover:bg-white hover:shadow-card transition-all cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-4 font-mono text-main/10 text-3xl md:text-4xl font-bold">{idx + 1}</div>
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 rounded-full bg-main text-white text-[10px] font-bold uppercase tracking-wider">
                    {module.month}
                  </div>
                </div>
                <div className="mb-4">
                  {module.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-heading group-hover:text-main transition-colors">{module.title}</h3>
                <p className="text-para text-sm leading-relaxed">
                  {module.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 section bg-main-mint/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-heading center-orange-line relative">
              Know Your <span className="text-main">Curriculum</span>
            </h2>
            <p className="text-sub-para max-w-2xl mx-auto mt-12 text-sm md:text-base leading-relaxed">
              A simple overview of the core skills you will learn during the bootcamp.
            </p>
          </div>

          <div className="space-y-5 max-w-4xl mx-auto">
            {curriculumTracks.map((track, idx) => {
              const isOpen = openCurriculum === idx;

              return (
                <motion.div
                  key={track.title}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl border border-main/10 bg-white shadow-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenCurriculum(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-main-mint flex items-center justify-center shrink-0">
                        {track.icon}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-2xl font-bold text-heading">
                          {track.title}
                        </h3>
                        <p className="text-sub-para text-sm md:text-base">
                          {track.topics}
                        </p>
                      </div>
                    </div>
                    <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-main-mint text-main text-2xl font-medium transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-7 pt-1 text-sm md:text-base text-para leading-relaxed">
                          {track.details}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 section bg-white mt-5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading mb-10 text-center lg:text-left">
                Get <span className="text-main">Certified.</span>
              </h2>

              <div className="space-y-8 max-w-2xl">
                {certificationPoints.map((point, idx) => (
                  <motion.div
                    key={point.title}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-main-mint flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-main" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-heading mb-2">{point.title}</h3>
                      <p className="text-para text-sm md:text-base leading-relaxed">{point.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}
                className="mt-10 bg-tertiary px-8 py-4 rounded-xl text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                Enroll Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              {...fadeInUp}
              className="relative"
            >
              <p className="text-heading font-bold text-lg md:text-xl text-center mb-6 uppercase tracking-wide">
                Start Your Placement Journey Today.
              </p>

              <div className="relative bg-white border border-main/10 rounded-[32px] shadow-card p-8 md:p-10 overflow-hidden">
                <div className="absolute bottom-8 right-6 w-28 h-28 rounded-full border border-main/20 opacity-40" />

                <div className="relative z-10 border-2 border-[#d8c28d] rounded-[24px] px-6 py-10 md:px-10 md:py-12 text-center bg-gradient-to-br from-white to-[#fffaf0]">
                  <div className="flex justify-end mb-6">
                    <img
                      src={shortLogo}
                      alt="CWN logo"
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold tracking-[0.25em] text-main uppercase mb-4">
                    Certificate
                  </p>
                  <h3 className="text-3xl md:text-5xl font-serif text-heading mb-3">
                    Of Completion
                  </h3>
                  <p className="text-sub-para text-sm md:text-base mb-8">
                    Awarded for successfully completing the AI Web Development Bootcamp.
                  </p>

                  <div className="w-full h-px bg-[#d8c28d] mb-6" />

                  <p className="text-2xl md:text-4xl font-semibold text-main mb-3">
                    Your Name Here
                  </p>
                  <p className="text-para text-sm md:text-base mb-8">
                    Mastering frontend, backend, and project development with practical industry-focused training.
                  </p>

                  <div className="flex items-center justify-between gap-4 pt-4">
                    <div className="text-left">
                      <div className="w-24 h-px bg-heading/30 mb-2" />
                      <p className="text-xs md:text-sm text-para">Instructor Signature</p>
                    </div>
                    <div className="text-right">
                      <div className="w-24 h-px bg-heading/30 mb-2 ml-auto" />
                      <p className="text-xs md:text-sm text-para">Code With Naqvi</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 section bg-main-mint/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-heading center-orange-line relative">
              Real Results from <span className="text-main">Real Students</span>
            </h2>
            <div className="flex justify-center gap-1 mt-12 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-main text-main" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-card relative cursor-pointer group hover:scale-[1.02] transition-transform"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-main flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {t.avatar}
                </div>
                <p className="text-para italic mb-8 pt-4 leading-relaxed text-sm md:text-base">"{t.content}"</p>
                <div>
                  <h4 className="font-bold text-lg text-heading">{t.name}</h4>
                  <p className="text-main font-semibold text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-32 section bg-white" id="faqs">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-heading center-orange-line relative">
              Frequently Asked <span className="text-main">Questions</span>
            </h2>
            <p className="text-sub-para max-w-2xl mx-auto mt-12 text-sm md:text-base leading-relaxed">
              Everything you should know before joining the bootcamp.
            </p>
          </div>

          <div className="space-y-5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <motion.div
                  key={faq.question}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl border border-main/10 bg-main-mint/40 shadow-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-xl font-bold text-heading">
                      {faq.question}
                    </span>
                    <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white text-main text-2xl font-medium transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-7 pt-1 text-sm md:text-base text-para leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 section" id="pricing">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-heading center-orange-line relative">
              Invest in Your <span className="text-main">Future</span>
            </h2>
            <p className="text-sub-para max-w-2xl mx-auto mt-12 text-sm md:text-base">
              Total course fee is Rs. 50,000. The regular monthly fee is Rs. 10,000, but first batch students can join at a discounted monthly fee of Rs. 5,000 or unlock full access for Rs. 30,000.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
            {/* Free Tier */}
            <motion.div {...fadeInUp} className="bg-main-mint p-8 md:p-10 rounded-3xl border border-main/10 shadow-sm cursor-pointer hover:shadow-card transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-heading">Monthly Plan</h3>
              <p className="text-sub-para text-sm mb-6">Regular monthly fee is Rs. 10,000, with a first batch discounted fee of Rs. 5,000 per month.</p>
              <div className="text-4xl font-bold mb-8 text-heading">Rs. 5,000 <span className="text-lg text-sub-para font-normal">/ month</span></div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm text-para font-medium"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Regular fee: Rs. 10,000 per month</li>
                <li className="flex items-center gap-3 text-sm text-para font-medium"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> First batch discounted fee: Rs. 5,000 per month</li>
                <li className="flex items-center gap-3 text-sm text-para font-medium"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Learn with full curriculum access by monthly payment</li>
                <li className="flex items-center gap-3 text-sm text-para font-medium"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Ideal for budget-friendly enrollment</li>
              </ul>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})} 
                className="w-full py-4 rounded-xl border-2 border-main text-main hover:bg-main hover:text-white transition-all font-bold"
              >
                Choose Monthly Plan
              </button>
            </motion.div>

            {/* Pro Tier */}
            <motion.div {...fadeInUp} className="bg-white p-8 md:p-10 rounded-3xl border-2 border-main relative overflow-hidden shadow-card cursor-pointer group">
              <div className="absolute top-6 right-6 bg-tertiary text-white text-[10px] font-black px-2 py-1 rounded transform rotate-12 z-20">MOST POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-main">Mastery Pass</h3>
              <p className="text-sub-para text-sm mb-6">Best value for students who want complete access at a reduced total price.</p>
              <div className="text-4xl font-bold mb-8 text-heading">Rs. 30,000 <span className="text-lg text-sub-para font-normal">/ Full Access</span></div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-sm text-para font-bold"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Full course value: Rs. 50,000</li>
                <li className="flex items-center gap-3 text-sm text-para font-bold"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Get full access for only Rs. 30,000</li>
                <li className="flex items-center gap-3 text-sm text-para font-bold"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Save Rs. 20,000 on the complete bootcamp</li>
                <li className="flex items-center gap-3 text-sm text-para font-bold"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Includes all 6 modules, assignments, and mentorship</li>
                <li className="flex items-center gap-3 text-sm text-para font-bold"><CheckCircle2 className="w-5 h-5 text-main shrink-0" /> Lifetime access & future updates</li>
              </ul>
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})} 
                className="w-full py-4 rounded-xl bg-main text-white font-black hover:bg-main-tint active:scale-95 transition-all shadow-lg shadow-main/20"
              >
                Get Full Access
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="py-20 md:py-32 section bg-light-gray/20" id="contact">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 lg:p-20 rounded-[40px] shadow-card border border-main/5 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 p-6 rounded-full bg-white shadow-card border border-main/10">
              <Rocket className="w-10 h-10 text-main" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-heading">Ready to Build the <br className="hidden md:block" /> <span className="text-main">Next Big Thing?</span></h2>
            <p className="text-sub-para mb-12 text-base md:text-lg">Limited seats available for the next cohort starting in 15 days.</p>
            
            <AnimatePresence mode="wait">
              {!enrolled ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleEnroll} 
                  className="flex flex-col gap-5 max-w-xl mx-auto text-left"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-main uppercase tracking-wider ml-2">Full Name</label>
                       <input 
                        type="text" 
                        placeholder="John Doe" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-light-gray/50 border border-para/10 outline-none focus:border-main focus:bg-white transition-all text-heading font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-main uppercase tracking-wider ml-2">Email Address</label>
                        <input 
                        type="email" 
                        placeholder="john@example.com" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-light-gray/50 border border-para/10 outline-none focus:border-main focus:bg-white transition-all text-heading font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-main uppercase tracking-wider ml-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+92 300 1234567" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-6 py-4 rounded-xl bg-light-gray/50 border border-para/10 outline-none focus:border-main focus:bg-white transition-all text-heading font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-main uppercase tracking-wider ml-2">Experience Level</label>
                      <select 
                        required
                        className="w-full px-6 py-4 rounded-xl bg-light-gray/50 border border-para/10 outline-none focus:border-main focus:bg-white transition-all text-heading font-medium appearance-none"
                        value={formData.experience || ''}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      >
                        <option value="" disabled>Select Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-main uppercase tracking-wider ml-2">Learning Goals</label>
                    <textarea 
                      placeholder="What do you want to achieve?" 
                      rows="3"
                      className="w-full px-6 py-4 rounded-xl bg-light-gray/50 border border-para/10 outline-none focus:border-main focus:bg-white transition-all text-heading font-medium resize-none"
                      value={formData.goals || ''}
                      onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 rounded-xl bg-main text-white font-black text-lg hover:bg-main-tint hover:shadow-[0_10px_25px_rgba(18,95,96,0.3)] active:scale-95 transition-all shadow-lg mt-4"
                  >
                    Complete Your Enrollment
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-main-mint p-10 rounded-3xl border border-main/10"
                >
                  <div className="w-20 h-20 rounded-full bg-main flex items-center justify-center mx-auto mb-6 shadow-lg shadow-main/20">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-main mb-2">Welcome Aboard!</h3>
                  <p className="text-sub-para">We've sent the curriculum details to your email. Get ready for an epic journey!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Whatsapp />
      <Footer />
    </main>
  );
};

export default Bootcamp;
