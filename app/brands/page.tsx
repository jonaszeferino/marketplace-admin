"use client";

import Navbar from "../../components/Navbar";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";

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

  type Brand = {
    brand_id: number;
    name: string;
    label: string;
  };

  const methods = useForm<FormData>();
  const [message, setMessage] = useState<string>("");
  const [isDisable, setIsDisable] = useState(false);
  const { isSubmitting } = useFormState({ control: methods.control });
  const [brands, setBrands] = useState([]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("chamou");

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
      } else {
        console.error("Erro na inserção");
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      console.log("Chamou get");
      const response = await fetch("/api/v2/getBrands");
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
        console.log("veio");
      } else {
        console.error("Erro na solicitação GET de marcas");
      }
    } catch (error) {
      console.error("Erro na solicitação GET de marcas:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      <Navbar />
      {isSubmitting && (
        <div className="text-center mb-4">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="text-blue-500">Enviando...</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto mt-10"
      >
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
              className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar
            </button>
          ) : null}
        </div>
        <span>{message}</span>
        <br />
        <button
          style={{ display: "block", marginTop: 2 }}
          type="reset"
          className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={() => (reset(), setMessage(""))}
        >
          Novo{" "}
        </button>
      </form>

      <br />
      <br />
      <div className="mb-6 border-b border-gray-300"></div>

      <>
        <div className="mx-6 mb-8">
          <h2 className="text-2xl font-bold mb-18 mx-auto">Marcas</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left">Marca</th>
                <th className="text-left">Label</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand: Brand) => (
                <tr key={brand.brand_id}>
                  <td className="text-blue-500">{brand.name}</td>
                  <td className="text-gray-700">{brand.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </>
  );
};

export default MyForm;
