import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { toast } from 'sonner';

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend,
  FiArrowRight,
} from "react-icons/fi";

import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Navbar from "./Navbar";

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


 const contactCards = [
  {
    title: "Call Us",
    subtitle: "+91 86196 27463",
    icon: <FiPhone />,
    color: "from-cyan-500 to-blue-600",
    link: "tel:+918619627463",
  },
  {
    title: "Email",
    subtitle: "hello@digitalpintu.com",
    icon: <FiMail />,
    color: "from-indigo-500 to-purple-600",
    link: "mailto:hello@digitalpintu.com",
  },
  {
    title: "Office",
    subtitle: "Mansarovar ,Jaipur, Rajasthan",
    icon: <FiMapPin />,
    color: "from-orange-500 to-pink-500",
   link: "https://maps.google.com/?q=Mansarovar,Jaipur,Rajasthan"
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat | 9 AM - 8 PM",
    icon: <FiClock />,
    color: "from-green-500 to-emerald-600",
    link: "#",
  },
];

  const submitHandler = async (e) => {
  e.preventDefault();

 
  // const apiCall = axios.post("http://localhost:5000/api/contact", form);
  const apiCall = axios.post(`${API_BASE_URL}/api/contact`, form);

  
  toast.promise(apiCall, {
    loading: "Sending your message...",
    success: (res) => {
     
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
     
      return res.data?.message || "Message sent successfully!";
    },
    error: (err) => {
    
      return err.response?.data?.message || "Something went wrong";
    },
  });
};
  

  return (
    <>
    <Navbar/>
    <section id="contact"> 
      <Toaster position="top-right" reverseOrder={false} />

<div className="relative overflow-hidden bg-[#07111d] text-white">


{/* Animated Background */}

<motion.div

animate={{
scale:[1,1.3,1],
rotate:[0,180,360]
}}

transition={{
duration:18,
repeat:Infinity,
ease:"linear"
}}

className="absolute -top-60 -left-60 w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[120px]"
/>

<motion.div

animate={{
scale:[1.2,1,1.2],
rotate:[360,180,0]
}}

transition={{
duration:22,
repeat:Infinity,
ease:"linear"
}}

className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[140px]"
/>


{/* HERO */}


<section className="relative z-10 pt-36 pb-28">

<div className="max-w-7xl mx-auto px-6">

<div className="grid lg:grid-cols-2 gap-16 items-center">

{/* LEFT */}

<motion.div

initial={{
opacity:0,
x:-80
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:.8
}}

viewport={{
once:true
}}

>

<div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2">

<div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"/>

<span className="text-cyan-300 text-sm">

Let's Build Something Amazing

</span>

</div>

<h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight">

Contact

<span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">

Digital Pintu

</span>

</h1>

<p className="mt-8 text-lg text-gray-400 leading-8 max-w-xl">

We create stunning websites, mobile apps,
SEO strategies and digital experiences that
help your business grow faster.

Let's connect and build your next project.

</p>

<div className="flex flex-wrap gap-5 mt-10">

<motion.a

whileHover={{
scale:1.05
}}

whileTap={{
scale:.95
}}

href="#contact-form"

className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 flex items-center gap-3 font-semibold"

>

Start Project

<FiArrowRight/>

</motion.a>

<motion.a

whileHover={{
scale:1.05
}}

href="tel:+918619627463"

className="px-8 py-4 rounded-full border border-cyan-400 text-cyan-300"

>

Call Now

</motion.a>

</div>

<div className="flex gap-5 mt-12 text-3xl">

<motion.a
whileHover={{y:-8}}
href="#"
className="text-cyan-400"
>

<FaFacebook/>

</motion.a>

<motion.a
whileHover={{y:-8}}
href="#"
className="text-pink-400"
>

<FaInstagram/>

</motion.a>

<motion.a
  whileHover={{ y: -8 }}
  href="https://wa.me/918619627463?text=Hello%20Digital%20Pintu,%20I%20want%20to%20know%20about%20your%20services."
  target="_blank"
  rel="noopener noreferrer"
  className="text-green-400"
>
  <FaWhatsapp />
</motion.a>

<motion.a
whileHover={{y:-8}}
href="#"
className="text-blue-400"
>

<FaLinkedin/>

</motion.a>

</div>

</motion.div>

{/* RIGHT */}

<motion.div

initial={{
opacity:0,
x:80
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:.9
}}

viewport={{
once:true
}}

className="relative"

>

<motion.div

animate={{
y:[0,-25,0]
}}

transition={{
repeat:Infinity,
duration:6
}}

className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl p-10"

>

<h2 className="text-3xl font-bold">

Why Contact Us?

</h2>

<p className="mt-5 text-gray-400">

Our team helps startups,
brands and enterprises
build modern digital products.

</p>

<div className="mt-10 grid gap-5">

{

[
"Premium UI/UX Design",

"React & MERN Development",

"Android & iOS Apps",

"SEO & Marketing",

"24/7 Support",

"Fast Delivery"

].map((item,index)=>(

<motion.div

key={index}

initial={{
opacity:0,
x:40
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
delay:index*.15
}}

className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5"

>

<div className="w-4 h-4 rounded-full bg-cyan-400"/>

<p>{item}</p>

</motion.div>

))

}

</div>

</motion.div>

</motion.div>

</div>

</div>

</section>


{/* CONTACT CARDS */}

{/* CONTACT CARDS */}

<section className="relative z-10 pb-24">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
      {contactCards.map((card, index) => {
        const isExternal = card.link?.startsWith("http");

        return (
          <motion.a
            key={index}
            href={card.link || "#"}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.12,
            }}
            whileHover={{
              y: -12,
            }}
            className="block rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 relative overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-10`}
            />

            <div className="relative z-10">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-3xl`}
              >
                {card.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {card.title}
              </h3>

              <p className="mt-4 text-gray-400">
                {card.subtitle}
              </p>
            </div>
          </motion.a>
        );
      })}
    </div>
  </div>
</section>


{/* 
<section className="relative z-10 pb-24">

<div className="max-w-7xl mx-auto px-6">

<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

{

contactCards.map((card,index)=>(

<motion.div

key={index}

initial={{
opacity:0,
y:60
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
delay:index*.12
}}

whileHover={{
y:-12
}}

className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 relative overflow-hidden"

>

<div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-10`} />

<div className="relative z-10">

<div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-3xl`}>

{card.icon}

</div>

<h3 className="mt-8 text-2xl font-bold">

{card.title}

</h3>

<p className="mt-4 text-gray-400">

{card.subtitle}

</p>

</div>

</motion.div>

))

}

</div>

</div>

</section> */}

{/* CONTACT FORM SECTION */}


<section
  id="contact-form"
  className="relative z-10 py-24"
>
  <div className="max-w-7xl mx-auto px-6">

    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .8 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-2 gap-14"
    >

      
      {/* LEFT : FORM */}
    

      <div className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 lg:p-10">

        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: .1 }}
          className="text-4xl font-black"
        >
          Send us a Message
        </motion.h2>

        <p className="mt-4 text-gray-400">
          Fill out the form below and our team will contact you within
          24 hours.
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-10 space-y-6"
        >

        

          {/* NAME */}

          <motion.div
            whileHover={{ scale: 1.01 }}
          >
            <label className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-cyan-400 transition"
            />
          </motion.div>

          {/* EMAIL */}

          <motion.div
            whileHover={{ scale: 1.01 }}
          >
            <label className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@email.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-cyan-400 transition"
            />
          </motion.div>

          {/* PHONE */}

          <motion.div
            whileHover={{ scale: 1.01 }}
          >
            <label className="block mb-2 text-sm text-gray-300">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none focus:border-cyan-400 transition"
            />
          </motion.div>

          {/* SERVICE */}

          <motion.div
            whileHover={{ scale: 1.01 }}
          >
            <label className="block mb-2 text-sm text-gray-300">
              Select Service
            </label>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#08111f] px-5 py-4 outline-none focus:border-cyan-400 transition"
            >
              <option value="">Choose Service</option>
              <option>Web Development</option>
              <option>App Development</option>
              <option>UI / UX Design</option>
              <option>SEO Optimization</option>
              <option>Digital Marketing</option>
              <option>E-Commerce</option>
            </select>
          </motion.div>

          {/* MESSAGE */}

          <motion.div
            whileHover={{ scale: 1.01 }}
          >
            <label className="block mb-2 text-sm text-gray-300">
              Message
            </label>

            <textarea
              rows="6"
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 resize-none outline-none focus:border-cyan-400 transition"
            />
          </motion.div>

          {/* BUTTON */}
{/* 
          <motion.button
            whileHover={{
              scale: isLoading ? 1 : 1.04,
              boxShadow: "0 0 40px rgba(34,211,238,.35)"
            }}
            whileTap={{ scale: isLoading ? 1 : .97 }}
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 py-5 flex items-center justify-center gap-3 text-lg font-bold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Sending..." : "Send Message"}

            <FiSend className="text-xl" />
          </motion.button> */}


          <motion.button
  whileHover={{
    scale: 1.04,
    boxShadow: "0 0 40px rgba(34,211,238,.35)"
  }}
  whileTap={{ scale: .97 }}
  type="submit"
  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 py-5 flex items-center justify-center gap-3 text-lg font-bold"
>
  Send Message
  <FiSend className="text-xl" />
</motion.button>

        </form>

      </div>

      
      {/* RIGHT */}
    
      <motion.div

        initial={{
          opacity:0,
          x:80
        }}

        whileInView={{
          opacity:1,
          x:0
        }}

        transition={{
          duration:.8
        }}

        viewport={{
          once:true
        }}

        className="relative"

      >

        <div className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 h-full">

          <h2 className="text-4xl font-black">
            Let's Build
            <br />
            Something Great 🚀
          </h2>

          <p className="mt-6 text-gray-400 leading-8">
            Whether you need a modern website,
            a powerful MERN application,
            an e-commerce platform,
            SEO services or complete digital branding,
            our team is ready to help you.
          </p>

          <div className="mt-12 space-y-6">

            {[
              "✔ Free Project Consultation",
              "✔ 100% Responsive Design",
              "✔ Fast Delivery",
              "✔ SEO Friendly Code",
              "✔ Lifetime Support",
              "✔ Affordable Pricing",
            ].map((item, index) => (

              <motion.div

                key={index}

                initial={{
                  opacity:0,
                  x:40
                }}

                whileInView={{
                  opacity:1,
                  x:0
                }}

                transition={{
                  delay:index*.12
                }}

                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"

              >

                <div className="w-3 h-3 rounded-full bg-cyan-400"/>

                <span>{item}</span>

              </motion.div>

            ))}

          </div>

          <motion.div

            animate={{
              y:[0,-12,0]
            }}

            transition={{
              repeat:Infinity,
              duration:5
            }}

            className="mt-12 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 p-8"

          >

            <h3 className="text-2xl font-bold">

              Need Immediate Help?

            </h3>

            <p className="mt-4 text-white/90">

              Our experts are available
              Monday to Saturday.

            </p>

            <motion.a

              whileHover={{
                scale:1.05
              }}

              href="tel:+918619627463"

              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white text-slate-900 px-7 py-4 font-bold"

            >

              <FiPhone />

              Call Now

            </motion.a>

          </motion.div>

        </div>

      </motion.div>

    </motion.div>
  </div>
</section>

{/* GOOGLE MAP */}


<section className="relative z-10 py-24">
  <div className="max-w-7xl mx-auto px-6">

    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl"
    >

      <div className="p-8 border-b border-white/10">
        <h2 className="text-4xl font-black">
          Visit Our Office
        </h2>

        <p className="mt-3 text-gray-400">
          We'd love to meet you. Come visit our office anytime during
          working hours.
        </p>
      </div>

      <iframe
        title="Google Map"
        // src="https://www.google.com/maps?q=Jaipur,Rajasthan&output=embed"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28490.871279261354!2d75.73351984284524!3d26.860341738722477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db560273e196d%3A0x918a37842bf2bbc3!2sMansarovar%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin" 

        className="w-full h-[500px]"
        loading="lazy"
      />


    </motion.div>

  </div>
</section>


{/* FAQ */}


<section className="relative z-10 py-24">

<div className="max-w-5xl mx-auto px-6">

<motion.h2

initial={{opacity:0,y:50}}
whileInView={{opacity:1,y:0}}
transition={{duration:.8}}
viewport={{once:true}}

className="text-center text-5xl font-black"

>

Frequently Asked Questions

</motion.h2>

<p className="text-center text-gray-400 mt-5 mb-16">

Everything you need to know.

</p>

{[
{
q:"How long does a website take?",
a:"The development timeline depends on your project's size and complexity. A standard business website usually takes 7–15 days, while custom websites, eCommerce platforms, or web applications may require 3–8 weeks. We always provide a clear timeline before starting the project."
},
{
q:"Do you provide SEO?",
a:"Yes. We offer comprehensive SEO services, including on-page SEO, technical SEO, local SEO, keyword research, content optimization, Google Business Profile optimization, and performance improvements to help your website rank higher on search engines and attract more organic traffic.."
},
{
q:"Do you build mobile apps?",
a:"Absolutely. We develop high-performance Android and iOS mobile applications using modern technologies like Flutter, React Native, Kotlin, and Swift. Our apps are fast, secure, scalable, and designed to deliver an excellent user experience."
},
{
q:"Do you provide support?",
a:"Yes. We provide ongoing website maintenance, technical support, security updates, bug fixes, backups, performance optimization, and feature enhancements to ensure your website or application remains secure, reliable, and up to date after launch."
}

].map((item,index)=>(

<motion.details

key={index}

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
delay:index*.12
}}

viewport={{
once:true
}}

className="group mb-5 rounded-3xl border border-white/10 bg-white/5 overflow-hidden"

>

<summary className="cursor-pointer list-none px-8 py-6 text-xl font-semibold flex justify-between items-center">

{item.q}

<span className="transition group-open:rotate-45 text-cyan-400 text-3xl">

+

</span>

</summary>

<div className="px-8 pb-8 text-gray-400 leading-8">

{item.a}

</div>

</motion.details>

))}

</div>

</section>


{/* CTA */}


<section className="relative z-10 py-24">

<div className="max-w-7xl mx-auto px-6">

<motion.div

initial={{
opacity:0,
scale:.9
}}

whileInView={{
opacity:1,
scale:1
}}

transition={{
duration:.8
}}

viewport={{
once:true
}}

className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 p-16 text-center"

>

<motion.div

animate={{
scale:[1,1.2,1],
rotate:[0,180,360]
}}

transition={{
repeat:Infinity,
duration:18,
ease:"linear"
}}

className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-[80px]"

/>

<motion.div

animate={{
scale:[1.2,1,1.2]
}}

transition={{
repeat:Infinity,
duration:14
}}

className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-300/20 blur-[100px]"

/>

<div className="relative z-10">

<h2 className="text-5xl font-black">

Let's Build Your Dream Project

</h2>

<p className="mt-8 text-xl text-white/90 max-w-3xl mx-auto leading-9">

From business websites to complete
digital solutions,
Digital Pintu is ready to help you grow.

</p>

<div className="flex flex-wrap justify-center gap-6 mt-12">

<motion.a

whileHover={{
scale:1.05
}}

whileTap={{
scale:.95
}}

href="tel:+918619627463"

className="px-10 py-5 rounded-full bg-white text-slate-900 font-bold"

>

Call Now

</motion.a>

<motion.a

whileHover={{
scale:1.05
}}

whileTap={{
scale:.95
}}

href="mailto:@digitalpintu.com"

className="px-10 py-5 rounded-full border border-white text-white font-bold"

>

Email Us

</motion.a>

</div>

</div>

</motion.div>

</div>

</section>


{/* FOOTER GLOW */}

<motion.div

animate={{
opacity:[0.3,1,0.3]
}}

transition={{
repeat:Infinity,
duration:5
}}

className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/20 blur-[160px]"

/>

</div>
</section>
    </>
)}
