"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import React, { useState  } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  label: string;
  name: string;
  logo: string;
};

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  
  const [message, setMessage] = useState<string>("");
  const [isDisable, setIsDisable] = useState<Boolean>(false);

  console.log("chamou");
  const onSubmit: SubmitHandler<FormData> = async (data) => {
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
        console.log(`Depois de setIsDisable${isDisable}`);
      } else {
        console.error("Erro na inserção");
        setIsDisable(true);
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
      setIsDisable(true);
      console.log(isDisable);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="label"
          >
            Label
          </label>
          <input
            {...register("label", { required: true })}
            type="text"
            id="label"
            name="label"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.label ? "border-red-500" : ""
            }`}
          />
          {errors.label && (
            <p className="text-red-500 text-xs italic">
              Este campo é obrigatório.
            </p>
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
            {...register("name", { required: true })}
            type="text"
            id="name"
            name="name"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">
              Este campo é obrigatório.
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="logo"
          >
            Logo
          </label>
          <input
            {...register("logo", { required: true })}
            type="text"
            id="logo"
            name="logo"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.logo ? "border-red-500" : ""
            }`}
          />
          {errors.logo && (
            <p className="text-red-500 text-xs italic">
              Este campo é obrigatório.
            </p>
          )}
        </div>

        <div className="mb-6 text-center">
          <button
            disabled={isDisable}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </div>
        <span>{message}</span>
        <br />
        <span>Teste:{isDisable}</span>
      </form>
      <Footer />
    </>
  );
};

export default MyForm;
