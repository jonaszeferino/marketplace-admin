"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Form = () => {
  const [nome, setNome] = useState("");
  const [ean, setEan] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [sku, setSku] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, ean, descricao, preco });
  };

  const [openCreate, setOpenCreate] = useState(false);

  const handleOpen = () => {
    setOpenCreate(!openCreate);
  };

  // Seleciona a Definição
  const [selectedOption, setSelectedOption] = useState("sem");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Seleciona a opcoes no sidebar
  const [selectedOptionWithoutVariation, setSelectedOptionWithoutVariation] =
    useState("produto");

  const handleOptionChangeWithoutVariation = (option) => {
    setSelectedOptionWithoutVariation(option);
  };

  return (
    <>
      <Navbar />

      <button
        onClick={handleOpen}
        className="w-600px bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg hover:bg-blue-700"
      >
        Criar
      </button>

      <span>Ver se funcionou o side bar {selectedOptionWithoutVariation}</span>

      {openCreate ? (
        <div>
          <h2>Selecione uma opção:</h2>
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="sem">Sem variacao</option>
            <option value="Roupa Adulta">Roupa Adulta</option>
            <option value="Roupa Infantil">Roupa Infantil</option>
          </select>

          <p>Você selecionou: {selectedOption}</p>
        </div>
      ) : null}

      {selectedOption === "sem" ? (
        <div className="flex">
          <div className="bg-gray-200 w-64 left-0">
            <ul className="space-y-4">
              <li
                className={`p-4 hover:bg-gray-300 ${
                  selectedOptionWithoutVariation === "produto"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionChangeWithoutVariation("produto")}
              >
                Produto
              </li>
              <li
                className={`p-4 hover:bg-gray-300 ${
                  selectedOptionWithoutVariation === "dimensoes"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionChangeWithoutVariation("dimensoes")}
              >
                Dimensões
              </li>
              <li
                className={`p-4 hover:bg-gray-300 ${
                  selectedOptionWithoutVariation === "seo"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionChangeWithoutVariation("seo")}
              >
                SEO
              </li>
              <li
                className={`p-4 hover:bg-gray-300 ${
                  selectedOptionWithoutVariation === "atributos"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionChangeWithoutVariation("atributos")}
              >
                Atributos
              </li>
              <li
                className={`p-4 hover:bg-gray-300 ${
                  selectedOptionWithoutVariation === "midias"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionChangeWithoutVariation("midias")}
              >
                Mídias
              </li>

              <li
                className={`p-4 hover:bg-gray-300 ${
                  selectedOptionWithoutVariation === "variacoes"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleOptionChangeWithoutVariation("variacoes")}
              >
                Variações
              </li>
            </ul>
          </div>

          {selectedOptionWithoutVariation === "produto" ? (
            <div className="ml-4 p-4 custom-container-width w-1000">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nome"
                    className="block text-black font-semibold"
                  >
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
                  <label
                    htmlFor="nome"
                    className="block text-black font-semibold"
                  >
                    SKU:
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="ean"
                    className="block text-black font-semibold"
                  >
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
                  <label
                    htmlFor="preco"
                    className="block text-black font-semibold"
                  >
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
                  Salvar
                </button>
              </form>
            </div>
          ) : null}

          {selectedOptionWithoutVariation === "dimensoes" ? (
            <div className="ml-4 p-4 custom-container-width w-1000">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nome"
                    className="block text-black font-semibold"
                  >
                    Peso:
                  </label>
                  <input
                    type="number"
                    id="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="ean"
                    className="block text-black font-semibold"
                  >
                    Largura:
                  </label>
                  <input
                    type="number"
                    id="ean"
                    name="ean"
                    value={ean}
                    onChange={(e) => setEan(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="preco"
                    className="block text-black font-semibold"
                  >
                    Altura:
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
       

                <div className="mb-4">
                  <label
                    htmlFor="preco"
                    className="block text-black font-semibold"
                  >
                    Comprimento:
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
                  Salvar
                </button>
              </form>
            </div>
          ) : null}

          {selectedOptionWithoutVariation === "seo" ? (
            <div className="ml-4 p-4 custom-container-width w-1000">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nome"
                    className="block text-black font-semibold"
                  >
                    Título da Página:
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
                  <label
                    htmlFor="ean"
                    className="block text-black font-semibold"
                  >
                    Meta-keywords:
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
                    Meta-Description:
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
                  <label
                    htmlFor="preco"
                    className="block text-black font-semibold"
                  >
                    Tags:
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
                  Salvar
                </button>
              </form>
            </div>
          ) : null}

          {selectedOptionWithoutVariation === "atributos" ? (
            <div className="ml-4 p-4 custom-container-width w-1000">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nome"
                    className="block text-black font-semibold"
                  >
                    Atributo 1{" "}
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
                  <label
                    htmlFor="ean"
                    className="block text-black font-semibold"
                  >
                    Atributo 2
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
                    Atributo 3{" "}
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
                  <label
                    htmlFor="preco"
                    className="block text-black font-semibold"
                  >
                    Atributo 4{" "}
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
                  Salvar
                </button>
              </form>
            </div>
          ) : null}

          {selectedOptionWithoutVariation === "midias" ? (
            <div className="ml-4 p-4 custom-container-width w-1000">
              Midias{" "}
            </div>
          ) : null}

          {selectedOptionWithoutVariation === "variacoes" ? (
            <div className="ml-4 p-4 custom-container-width w-1000">
              SEM VARIAÇÕES
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Form;
