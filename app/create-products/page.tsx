"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

const Form = () => {
  interface Product {
    name: string;
    sku: string;
    ean: string;
    description: string;
    price: number;
    promo_price: number;
    shipped_weight: number;
    shipped_width: number;
    shipped_length: number;
    shipped_height: number;
    page_title: string;
    url_friendly: string;
    meta_description: string;
    meta_keywords: string;
    tags: number;
    parent_id: number;
    child_id_1: number;
    child_id_2: number;
    child_id_3: number;
  }

  const [product, setProduct] = useState<Product>({
    name: "",
    sku: "",
    ean: "",
    description: "",
    price: 0,
    promo_price: 0,
    shipped_weight: 0,
    shipped_width: 0,
    shipped_length: 0,
    shipped_height: 0,
    page_title: "",
    url_friendly: "",
    meta_description: "",
    meta_keywords: "",
    tags: 0,
    parent_id: 0,
    child_id_1: 0,
    child_id_2: 0,
    child_id_3: 0,
  });
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    fetch("/api/v2/getCategoryParent")
      .then((response) => response.json())
      .then((data) => {
        setParentCategories(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setProduct({
      ...product,
      [fieldName]: fieldValue,
    });
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setProduct({
      ...product,
      [fieldName]: fieldValue,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
  };
  //----ate aqui o acaba o novo-----//
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpen = () => {
    setOpenCreate(!openCreate);
  };
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  const [selectedOptionWithoutVariation, setSelectedOptionWithoutVariation] =
    useState("produto");
  const handleOptionChangeWithoutVariation = (option: string) => {
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
            <option value="">Escolha a opção abaixo</option>
            <option value="7">Sem variacao</option>
            <option value="8">Roupa Adulta</option>
            <option value="9">Roupa Infantil</option>
          </select>

          <p>Você selecionou: {selectedOption}</p>
        </div>
      ) : null}

      {/* Without Variation */}
      {selectedOption === "7" ? (
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
                    htmlFor="name"
                    className="block text-black font-semibold"
                  >
                    Nome:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleFieldChange}
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
                    id="sku"
                    name="sku"
                    value={product.sku}
                    onChange={handleFieldChange}
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
                    value={product.ean}
                    onChange={handleFieldChange}
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
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-black font-semibold"
                  >
                    Preço de:
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="promo_price"
                    className="block text-black font-semibold"
                  >
                    Preço Por:
                  </label>
                  <input
                    type="number"
                    id="promo_price"
                    name="promo_price"
                    value={product.promo_price}
                    onChange={handleFieldChange}
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
              <h1>
                <strong>Dados Para Envio</strong>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="shipped_weight"
                    className="block text-black font-semibold"
                  >
                    Peso:
                  </label>
                  <input
                    type="number"
                    id="shipped_weight"
                    name="shipped_weight"
                    value={product.shipped_weight}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="shipped_width"
                    className="block text-black font-semibold"
                  >
                    Largura:
                  </label>
                  <input
                    type="number"
                    id="shipped_width"
                    name="shipped_width"
                    value={product.shipped_width}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="shipped_height"
                    className="block text-black font-semibold"
                  >
                    Altura:
                  </label>
                  <input
                    type="number"
                    id="shipped_height"
                    name="shipped_height"
                    value={product.shipped_height}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="shipped_length"
                    className="block text-black font-semibold"
                  >
                    Comprimento:
                  </label>
                  <input
                    type="number"
                    id="shipped_length"
                    name="shipped_length"
                    value={product.shipped_length}
                    onChange={handleFieldChange}
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
                    id="page_title"
                    name="page_title"
                    value={product.page_title}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="meta_keywords"
                    className="block text-black font-semibold"
                  >
                    Meta-keywords:
                  </label>
                  <input
                    type="text"
                    id="meta_keywords"
                    name="meta_keywords"
                    value={product.meta_keywords}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="meta_description"
                    className="block text-black font-semibold"
                  >
                    Meta-Description:
                  </label>
                  <input
                    type="text"
                    id="meta_description"
                    name="meta_description"
                    value={product.meta_description}
                    onChange={handleFieldChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="parent_id"
                    className="block text-black font-semibold"
                  >
                    Categoria Principal:
                  </label>
                  <select
                    id="parent_id"
                    name="parent_id"
                    value={product.parent_id}
                    onChange={handleSelectChange} // Usar o manipulador de eventos correto para o select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione uma categoria principal</option>
                    {parentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* ...outros campos de entrada */}
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
                    Cor
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
                    Material do Produto
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
                    Garantia de Fábrica
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
                    Altura do Produto
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
                    Largura do Produto
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
                    Profundidade do Produto
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
                    Peso do Produto
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
