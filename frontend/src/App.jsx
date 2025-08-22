import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaStar, FaStarHalfAlt, FaRegStar, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import "./App.css";


const MotionSection = ({ children, className }) => (
  <motion.section
    className={className}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7 }}
  >
    {children}
  </motion.section>
);

const MotionCard = ({ children }) => {
  const cardAnimation = {
    whileHover: { scale: 1.05, rotate: 1 },
    whileTap: { scale: 0.98, rotate: -0.5 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };
  return (
    <motion.div className="card" {...cardAnimation} tabIndex={0}>
      {children}
    </motion.div>
  );
};

const Stars = ({ score }) => {
  const stars = [];
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} aria-hidden="true" />);
  if (hasHalf) stars.push(<FaStarHalfAlt key={`half-${fullStars}`} aria-hidden="true" />);
  while (stars.length < 5) stars.push(<FaRegStar key={`empty-${stars.length}`} aria-hidden="true" />);

  return <div className="testimonio-estrellas" aria-label={`${score} de 5 estrellas`}>{stars}</div>;
};

const FAQ = () => {
  const preguntas = [
    { pregunta: "¿Cuáles son los paquetes disponibles?", respuesta: "Ofrecemos paquetes de 50, 100 y 200 tacos, con guarniciones y bebidas incluidas." },
    { pregunta: "¿Puedo personalizar el menú?", respuesta: "Sí, se pueden incluir tacos especiales, diferentes tipos de guarniciones y bebidas a elección." },
    { pregunta: "¿Cuál es el costo por paquete?", respuesta: "El precio varía según el tamaño del paquete: 50 tacos $1,500, 100 tacos $2,800, 200 tacos $5,400." },
    { pregunta: "¿Hacen envíos o solo servicio en sitio?", respuesta: "Ofrecemos servicio en sitio y también podemos coordinar entregas dependiendo de la ubicación del evento." },
    { pregunta: "¿Se necesita apartar con anticipación?", respuesta: "Recomendamos reservar con al menos 1 semana de anticipación para asegurar disponibilidad." }
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="py-8 max-w-6xl mx-auto text-center">
      <h2 className="faq-section-title section-title mb-6">Preguntas Frecuentes</h2>
      <div className="faq-list">
        {preguntas.map((item, i) => (
          <div key={i} className="faq-item">
            <button
              onClick={() => toggleIndex(i)}
              className={`faq-question ${openIndex === i ? "open" : ""}`}
            >
              {item.pregunta}
              <span className="faq-arrow">{openIndex === i ? "-" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  className="faq-answer"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  style={{ transformOrigin: 'top', overflow: 'hidden' }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {item.respuesta}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const tacos = ["🌮 Asada", "🌮 Pastor", "🌮 Adobada", "🌮 Pollo", "🌮 Chicharrón"];
  const eventos = ["💍 Bodas", "🎂 Cumpleaños", "💦 Bautizos", "👨‍👩‍👧 Reuniones", "🏢 Empresariales", "🎉 Posadas"];
  const aguasFrescas = ["🥤 Jamaica", "🥤 Horchata", "🥤 Té"];
  const guarniciones = ["Tortillas de harina", "Tortillas de maíz", "Frijoles", "Salsas", "Cebollitas", "Pepinos", "Rabanitos"];

  const testimoniosBase = [
    { nombre: "María L.", comentario: "¡Los tacos estaban deliciosos y el servicio impecable!", estrellas: 5.0 },
    { nombre: "José R.", comentario: "Excelente opción para mi cumpleaños, todos encantados.", estrellas: 4 },
    { nombre: "Ana P.", comentario: "Recomendadísimo, sabores auténticos y frescos.", estrellas: 4.9 },
    { nombre: "Carlos D.", comentario: "Muy puntuales y el sazón espectacular.", estrellas: 4.5 },
    { nombre: "Laura G.", comentario: "Se lucieron en mi boda, invitados felices.", estrellas: 5.0 }
  ];

  const [testimonios, setTestimonios] = useState([]);
  useEffect(() => {
    const shuffled = [...testimoniosBase].sort(() => 0.5 - Math.random());
    setTestimonios(shuffled.slice(0, 4));
  }, []);

  return (
    <main className="min-h-screen text-gray-700">
      {/* Hero */}
      <header className="hero relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center text-white">
        <img
          src="https://source.unsplash.com/1600x900/?tacos-cart-night"
          alt="Taquiza nocturna"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        />
        <div className="social-icons-header">
          <a href="https://facebook.com/tuPagina" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="fb"><FaFacebookF /></a>
          <a href="https://instagram.com/tuPerfil" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ig"><FaInstagram /></a>
          <a href="https://tiktok.com/@tuUsuario" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="tt"><FaTiktok /></a>
        </div>
        <motion.div
          className="relative z-10 text-center px-4 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg uppercase tracking-wide">
            EL SAZÓN DEL CHEF
          </h1>
          <motion.p
            className="mt-3 text-lg md:text-2xl font-light leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Taquiza para tus eventos
          </motion.p>
          <a
            href="https://wa.me/526863216807"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wsp mt-6 inline-flex"
          >
            <FaWhatsapp size={24} /> Aparta tu fecha por WhatsApp
          </a>
        </motion.div>
      </header>

      {/* Tacos */}
      <MotionSection className="py-9 md:py-12 px-6 max-w-6xl mx-auto text-center bg-[var(--color-light)]">
        <h2 className="section-title">Nuestros Tacos</h2>
        <div className="btn-group grid-group" role="list">
          {tacos.map((tipo, i) => <MotionCard key={i}>{tipo}</MotionCard>)}
        </div>
        <p className="mt-6 text-sm md:text-base">
          Incluye guarniciones frescas: {guarniciones.join(", ")}.
        </p>
      </MotionSection>

      {/* Aguas Frescas */}
      <MotionSection className="py-9 md:py-12 px-6 max-w-6xl mx-auto text-center bg-[var(--color-gray)]">
        <h2 className="section-title">Aguas Frescas</h2>
        <div className="btn-group grid-group" role="list">
          {aguasFrescas.map((agua, i) => <MotionCard key={i}>{agua}</MotionCard>)}
        </div>
      </MotionSection>

      {/* Ideal para */}
      <MotionSection className="py-9 md:py-12 px-6 max-w-6xl mx-auto text-center bg-[var(--color-light)]">
        <h2 className="section-title">Ideal para...</h2>
        <div className="btn-group grid-group" role="list">
          {eventos.map((evento, i) => <MotionCard key={i}>{evento}</MotionCard>)}
        </div>
      </MotionSection>

      {/* Testimonios */}
      <MotionSection className="py-9 md:py-12 px-6 max-w-6xl mx-auto text-center bg-[var(--color-gray)]">
        <h2 className="section-title">Testimonios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {testimonios.map((t, i) => (
            <motion.div key={i} className="testimonio-card" whileHover={{ translateY: -3 }} transition={{ duration: 0.2 }}>
              <p className="testimonio-comentario">{t.comentario}</p>
              <div className="testimonio-nombre">{t.nombre}</div>
              <Stars score={t.estrellas} />
            </motion.div>
          ))}
        </div>
      </MotionSection>

      {/* CTA + Footer + FAQ */}
      <MotionSection className="py-14 md:py-16 text-center bg-gradient-to-t from-blue-900 to-blue-700 text-white px-6">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Los mejores tacos al momento para tu evento
        </h2>
        <a
          href="https://wa.me/526863216807"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wsp mb-6 inline-flex"
        >
          <FaWhatsapp size={24} /> Reserva por WhatsApp
        </a>

        {/* <div className="social-icons-footer mt-6">
          <a href="https://facebook.com/tuPagina" target="_blank" rel="noopener noreferrer" className="fb"><FaFacebookF /></a>
          <a href="https://instagram.com/tuPerfil" target="_blank" rel="noopener noreferrer" className="ig"><FaInstagram /></a>
          <a href="https://tiktok.com/@tuUsuario" target="_blank" rel="noopener noreferrer" className="tt"><FaTiktok /></a>
        </div> */}

        {/* FAQ dentro del footer */}
        <FAQ />
      </MotionSection>
    </main>
  );
}
