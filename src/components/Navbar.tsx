"use client";

import { useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MenuIcon, UserIcon, XIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, status, logout } = useContext(AuthContext);
  const router = useRouter();

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToProfile = () => {
    setProfileMenuOpen(false);
    router.push("/profile");
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    router.push("/");  // Redirige a la página principal
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  return (
    <nav className="bg-black text-white relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="font-bold text-2xl cursor-pointer hover:text-gray-400 transition">
          <Link href="/">BLACKCAT</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium items-center">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/about">Productos</Link>
          </li>
          <li>
            <Link href="/services">Servicios</Link>
          </li>
          <li>
            <Link href="/contact">Contacto</Link>
          </li>

          {status === "authenticated" && user ? (
            <div className="relative" ref={profileMenuRef}>
              <Button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="text-gray-300 hover:text-white font-bold text-sm uppercase cursor-pointer"
                style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                title="Perfil"
                type="button"
              >
                {user.firstName?.split(" ")[0].toUpperCase() || ""}
              </Button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded shadow-lg z-50 flex flex-col">
                  <Button
                    onClick={goToProfile}
                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-left text-base text-center"
                    type="button"
                  >
                    Ver Perfil
                  </Button>
                  <Button
                    onClick={handleLogout}
                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-left text-base text-center"
                    type="button"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center gap-2" type="button">
                <UserIcon size={18} /> Iniciar sesión
              </Button>
            </Link>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Button onClick={toggleMenu} type="button">
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-black text-white space-y-4 py-4">
          <Link href="/" onClick={toggleMenu}>
            Inicio
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            Productos
          </Link>
          <Link href="/services" onClick={toggleMenu}>
            Servicios
          </Link>
          <Link href="/contact" onClick={toggleMenu}>
            Contacto
          </Link>

          {status === "authenticated" && user ? (
            <div className="flex flex-col items-center space-y-2">
              <Button
                onClick={() => {
                  goToProfile();
                  toggleMenu();
                }}
                className="text-gray-300 hover:text-white font-bold text-sm uppercase cursor-pointer"
                type="button"
              >
                {user.firstName?.split(" ")[0].toUpperCase() || ""}
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="px-6 py-3 hover:bg-gray-100 cursor-pointer text-left text-base text-center bg-white text-black rounded"
                type="button"
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <Link href="/login" className="w-full flex items-center justify-center px-7">
              <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full w-full flex items-center gap-2" type="button">
                <UserIcon size={18} /> Iniciar sesión
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
