import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaYoutube, FaBars, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IMAGES } from "../assets/Images";
import { LINK } from "../data";

const links = [
  { id: "home", label: "Home", path: "/" },
  { id: "events", label: "Events", path: "/events" },
  { id: "teams", label: "Teams", path: "/teams" },
  { id: "contact", label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const highlightRef = useRef(null);
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Lock scroll when mobile menu opens
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Scroll glass effect
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 3.2);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Highlight movement
  const moveHighlight = (id, popOut = false) => {
    if (!navRef.current || !highlightRef.current) return;

    const el = navRef.current.querySelector(`#nav-${id}`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const parentRect = navRef.current.getBoundingClientRect();

    highlightRef.current.style.width = `${rect.width}px`;
    highlightRef.current.style.transform = `
      translateX(${rect.left - parentRect.left}px)
      scale(${popOut ? 1.25 : 1})
    `;
  };

  useEffect(() => {
    const activeLink = links.find((l) => l.path === location.pathname);
    if (activeLink) {
      setActive(activeLink.id);
      moveHighlight(activeLink.id);
    }
  }, [location.pathname]);

  useEffect(() => {
    moveHighlight(hovered || active, !!hovered);
  }, [hovered, active]);

  const navGlassClass =
    !isHome || scrolled
      ? "bg-white/30 backdrop-blur-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)]"
      : "bg-black/30 backdrop-blur-3xl shadow-[0_0_30px_rgba(0,0,0,0.3)]";

  const iconColorClass =
    !isHome || scrolled ? "text-white" : "text-black";

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 transition-colors duration-500">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <NavLink
          to="/"
          className={`inline-flex items-center justify-center w-44 h-14 p-1 
          backdrop-blur-2xl rounded-full shadow transition-transform hover:scale-105
          ${!isHome || scrolled ? "bg-white/70 border-white/30" : "bg-black/5 border-black/40"}`}
        >
          <img src={IMAGES.AVL} alt="logo" />
        </NavLink>

        {/* Desktop Nav */}
        <div
          ref={navRef}
          onMouseLeave={() => setHovered(null)}
          className={`hidden lg:flex relative items-center rounded-full py-2 ${navGlassClass}`}
        >
              <div
            ref={highlightRef}
            className="absolute left-0 top-0 h-[100%] rounded-full pointer-events-none z-0
              bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),rgba(255,255,255,0.05) 50%)]
              backdrop-blur-[18px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-4px_6px_rgba(255,255,255,0.1),0_12px_35px_rgba(0,0,0,0.35),0_4px_12px_rgba(0,0,0,0.3)]
              transition-all duration-300 ease-[cubic-bezier(.19,1,.22,1)] origin-center"
          /> 

          {links.map((link) => (
            <NavLink
              key={link.id}
              id={`nav-${link.id}`}
              to={link.path}
              onMouseEnter={() => setHovered(link.id)}
              className={({ isActive }) =>
                `relative z-10 px-5 py-2 text-sm font-medium
                ${isActive ? "text-[#2CFF05]" : iconColorClass}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-6">

          {/* Register Button */}
          <Link
  to="/#events"
  className={`px-5 py-2 rounded-full font-semibold backdrop-blur-xl ${navGlassClass} z-10
  hover:text-black transition ${iconColorClass}`}
>
  Register Now
</Link>

          {/* Social Icons */}
        <div className={`hidden lg:flex gap-5 text-2xl ${iconColorClass}`}>

<a href={LINK.insta} target="_blank" rel="noreferrer">
  <FaInstagram className="hover:scale-125 hover:text-pink-500 transition" />
</a>
<a href={`https://wa.me/91${LINK.whatsapp}`} target="_blank" rel="noreferrer">
  <FaWhatsapp className="hover:scale-125 hover:text-green-400 transition" />
</a>
<a href={`mailto:${LINK.email}`}>
  <MdEmail className="hover:scale-125 hover:text-cyan-400 transition" />
</a>
<a href={LINK.youtube} target="_blank" rel="noreferrer">
  <FaYoutube className="hover:scale-125 hover:text-red-500 transition" />
</a>
</div>
        </div>

        {/* Mobile Register Button */}
<Link
  to="/#events"
  className={`lg:hidden px-4 py-2 rounded-full text-lg font-semibold ${navGlassClass} backdrop-blur-xl ${iconColorClass}`}
>
  Register
</Link>


        {/* Mobile Toggle */}
        <button
          className={`lg:hidden text-2xl z-50 ${iconColorClass}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 lg:hidden transition-all duration-700
        ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
        bg-white/30 backdrop-blur-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)]`}
      >
        <ul
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center justify-center h-full gap-8 text-2xl"
        >
          {links.map((link) => (
            <NavLink key={link.id} to={link.path} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}

          {/* Social Icons */}
          <div className="flex gap-6 text-3xl mt-8">
            <a href={LINK.insta} target="_blank" rel="noreferrer">
              <FaInstagram className="hover:scale-125 hover:text-pink-500 transition" />
            </a>
            <a href={`https://wa.me/91${LINK.whatsapp}`} target="_blank" rel="noreferrer">
              <FaWhatsapp className="hover:scale-125 hover:text-green-400 transition" />
            </a>
            <a href={`mailto:${LINK.email}`}>
              <MdEmail className="hover:scale-125 hover:text-cyan-400 transition" />
            </a>
            <a href={LINK.youtube} target="_blank" rel="noreferrer">
              <FaYoutube className="hover:scale-125 hover:text-red-500 transition" />
            </a>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
