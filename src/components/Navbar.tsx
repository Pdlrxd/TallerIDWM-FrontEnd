"use client";

import { useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuIcon, UserIcon, XIcon, ShoppingCart } from "lucide-react";
import { Button } from "./ui/Button";
import { AuthContext } from "@/contexts/auth/AuthContext";

interface NavbarProps {
  activePage?: string;
}

export const Navbar = ({ activePage }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, status, logout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const goToProfile = () => {
    setProfileMenuOpen(false);
    router.push("/profile");
  };

  const goToOrders = () => {
    setProfileMenuOpen(false);
    router.push("/orders");
  };

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    router.push("/");
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  const baseLinkStyle =
    "font-bold text-sm uppercase cursor-pointer font-[Arial Black],Arial,sans-serif";

  const currentPath = activePage ?? pathname;

  const isActive = (path: string) => {
    if (path === "/product") {
      return currentPath === "/product" || currentPath.startsWith("/product/");
    }
    return currentPath === path;
  };

  const activeClass = "bg-white text-black rounded-md px-4 py-2";
  const inactiveClass = "text-gray-300 hover:text-white transition";

  // Define links dinámicamente según rol del usuario
  const links = [];

  // Botón Inicio, según rol del usuario
  if (user?.role === "Admin") {
    links.push({ label: "Inicio", href: "/admin" });
  } else {
    links.push({ label: "Inicio", href: "/" });
  }

  // **Botones Productos y Servicios eliminados para usuarios no admin**

  return (
    <nav className="bg-black text-white relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Izquierda: Logo */}
        <div className="font-bold text-2xl cursor-pointer hover:text-gray-400 transition">
          <Link href={user?.role === "Admin" ? "/admin" : "/"}>BLACKCAT</Link>
        </div>

        {/* Centro: Texto ADMINISTRADOR solo para admin */}
        {user?.role === "Admin" && (
          <div className="absolute left-1/2 transform -translate-x-1/2 font-extrabold text-lg uppercase tracking-widest">
            ADMINISTRADOR
          </div>
        )}

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${baseLinkStyle} ${isActive(href) ? activeClass : inactiveClass
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* Mostrar carrito solo si NO es admin */}
          {user?.role !== "Admin" && (
            <li>
              <button
                onClick={() => router.push("/cart")}
                className={`${baseLinkStyle} ${isActive("/cart") ? activeClass : inactiveClass
                  } flex items-center gap-1`}
                aria-label="Carrito"
                type="button"
              >
                <ShoppingCart size={18} />
              </button>
            </li>
          )}

          {status === "authenticated" && user ? (
            <div className="relative" ref={profileMenuRef}>
              <Button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className={`${baseLinkStyle} ${isActive("/profile") || profileMenuOpen
                    ? activeClass
                    : "bg-transparent text-white hover:text-gray-300"
                  }`}
                title="Perfil"
                type="button"
              >
                {user.firstName?.split(" ")[0].toUpperCase() || ""}
              </Button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-black text-white rounded-lg shadow-lg z-50 flex flex-col p-2">
                  <Button
                    onClick={goToProfile}
                    className="px-6 py-3 hover:bg-gray-800 cursor-pointer text-left text-base text-center rounded-md"
                    type="button"
                  >
                    Ver Perfil
                  </Button>

                  {/* Mostrar 'Mis Pedidos' solo si NO es admin */}
                  {user.role !== "Admin" && (
                    <Button
                      onClick={goToOrders}
                      className="px-6 py-3 hover:bg-gray-800 cursor-pointer text-left text-base text-center rounded-md"
                      type="button"
                    >
                      Mis Pedidos
                    </Button>
                  )}

                  <Button
                    onClick={handleLogout}
                    className="mt-1 px-6 py-3 hover:bg-gray-800 cursor-pointer text-left text-base text-center rounded-md"
                    type="button"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={`${baseLinkStyle} ${inactiveClass}`}>
              <Button
                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center gap-2 px-4 py-2"
                type="button"
              >
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
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={toggleMenu}
              className={`${baseLinkStyle} ${isActive(href) ? activeClass : inactiveClass
                }`}
            >
              {label}
            </Link>
          ))}

          {/* Mostrar carrito móvil solo si no es admin */}
          {user?.role !== "Admin" && (
            <button
              onClick={() => {
                router.push("/cart");
                toggleMenu();
              }}
              className={`${baseLinkStyle} ${isActive("/cart") ? activeClass : inactiveClass
                } flex items-center gap-1`}
              type="button"
            >
              <ShoppingCart size={18} />
            </button>
          )}

          {status === "authenticated" && user ? (
            <div className="flex flex-col items-center space-y-2">
              <Button
                onClick={() => {
                  goToProfile();
                  toggleMenu();
                }}
                className={`${baseLinkStyle} ${inactiveClass}`}
                type="button"
              >
                {user.firstName?.split(" ")[0].toUpperCase() || ""}
              </Button>

              {/* Cerrar sesión botón */}
              <Button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="px-6 py-3 hover:bg-gray-800 cursor-pointer text-left text-base text-center bg-white text-black rounded"
                type="button"
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <Link href="/login" className="w-full flex items-center justify-center px-7">
              <Button
                className="bg-gray-800 hover:bg-gray-700 text-white rounded-full w-full flex items-center gap-2"
                type="button"
              >
                <UserIcon size={18} /> Iniciar sesión
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
