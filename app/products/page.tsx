"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Form = () => {
  const [nome, setNome] = useState("");
  const [ean, setEan] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, ean, descricao, preco });
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-gray-200 w-64 h-screen fixed top-25 left-0 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-2xl font-semibold">Menu</h2>
          </div>
          <ul className="space-y-4">
            <li className="p-4 hover:bg-gray-300">
              <a href="/produtos">Produto</a>
            </li>
            <li className="p-4 hover:bg-gray-300">
              <a href="/variacoes">Variações</a>
            </li>
            <li className="p-4 hover:bg-gray-300">
              <a href="/seos">SEO</a>
            </li>
            <li className="p-4 hover:bg-gray-300">
              <a href="/midias">Mídias</a>
            </li>
          </ul>
        </div>

        {/* Conteúdo principal */}
        <div className="ml-64 p-4 custom-container-width w-1000">

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nome" className="block text-black font-semibold">
                Nome:
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ean" className="block text-black font-semibold">
                EAN:
              </label>
              <input
                type="text"
                id="ean"
                name="ean"
                value={ean}
                onChange={(e) => setEan(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="descricao"
                className="block text-black font-semibold"
              >
                Descrição:
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="preco" className="block text-black font-semibold">
                Preço:
              </label>
              <input
                type="number"
                id="preco"
                name="preco"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Form;
