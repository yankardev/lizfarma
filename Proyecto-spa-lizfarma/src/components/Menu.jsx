// src/components/Menu.jsx (versión básica)
// Qué se explica aquí:
// 1) useState: guardamos si el menú móvil está abierto o cerrado.

// 3) .map: generamos los enlaces a partir del array.
// 4) NavLink: aplica estilo automáticamente al enlace ACTIVO.
// 5) Render condicional: el menú móvil se muestra solo cuando 'abierto' es true.

import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-lizfarma.png";

//Array de items: fuente de datos para navegacion
const items = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/productos" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Ubicación", to: "/ubicacion" },
];

export default function Menu() {

  const [abierto, setAbierto] = useState(false);

  const base = "block px-4 py-2 rounded-md font-bold transition";

  return (
    <nav className="bg-teal-400 shadow-md" aria-label="Navegación principal">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + marca */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo de LizFarma" className="h-12 w-auto" />
          <span className="text-white text-2xl font-extrabold">LizFarma</span>
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden bg-white text-teal-600 px-3 py-1 rounded"
          onClick={() => setAbierto(!abierto)}  // alterna true/false
        >
          {abierto ? "Cerrar" : "Menú"}
        </button>

        {/* Menú en DESKTOP */}
        <ul className="hidden md:flex gap-4">
          {items.map((it) => (
            <li key={it.to}>
              {/* 4) NavLink: marca activo. end para que "/" no quede activo en subrutas */}
              <NavLink
                to={it.to}
                end={it.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? `${base} bg-white text-teal-700`
                    : `${base} text-white hover:bg-white hover:text-teal-700`
                }
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* 5) Menú en MÓVIL: se muestra solo si 'abierto' es true */}
      {abierto && (
        <ul className="md:hidden px-6 pb-3 space-y-2">
          {items.map((it) => (
            <li key={it.to}>
              <NavLink
                to={it.to}
                end={it.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? `${base} bg-white text-teal-700`
                    : `${base} text-white hover:bg-white hover:text-teal-700`
                }
                onClick={() => setAbierto(false)} // cerrar el menú al elegir opción
              >
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
