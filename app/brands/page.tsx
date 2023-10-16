"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";

type FormData = {
  label: string;
  name: string;
  logo: string;
};

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [message, setMessage] = useState<string>("");
  const [isDisable, setIsDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData, e: React.BaseSyntheticEvent) => {
    console.log("chamou");

    setIsLoading(true);
    try {
      const response = await fetch("/api/v2/postBrand", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Inserção bem-sucedida");
        setMessage("Cadastro Criado");
        setIsDisable(true);
        setIsLoading(false);
      } else {
        console.error("Erro na inserção");
        setIsDisable(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      setIsDisable(true);
      console.log(`Depois de setIsDisable${isDisable}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? <span>Salvando...</span> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="label"
          >
            Label
          </label>
          <input
            type="text"
            {...register("label", { required: true })}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.label && (
            <p className="text-red-500">Este campo é obrigatório.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="logo"
          >
            Logo
          </label>
          <input
            type="text"
            {...register("logo")}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6 text-center">
          {!isDisable ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar
            </button>
          ) : null}
        </div>
        <span>{message}</span>
        <br />

        <button
          style={{ display: "block", marginTop: 20 }}
          type="reset"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => (reset(), setIsDisable(false), setMessage(""))}
        >
          Novo{" "}
        </button>
      </form>

      <Footer />
    </>
  );
};

export default MyForm;
