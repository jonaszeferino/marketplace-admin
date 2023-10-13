import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <nav className="bg-blue-600 p-10">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-4 text-white">
          <li>
            <Link href="/">Pedidos</Link>
          </li>
          <li
            onMouseEnter={toggleSubMenu}
            onMouseLeave={toggleSubMenu}
            className="relative"
          >
            <span className="cursor-pointer">
              Catálogo
            </span>
            {showSubMenu && (
              <ul className="absolute bg-blue-600 text-white p-2 space-y-2 top-full left-0 w-48">
                <li className="bg-blue-700">
                  <Link href="/product-definitions">Definição de Produtos</Link>
                </li>
                <li className="bg-blue-800">
                  <Link href="/products">Produtos</Link>
                </li>
                <li className="bg-blue-700">
                  <Link href="/products-configs">Configs</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
