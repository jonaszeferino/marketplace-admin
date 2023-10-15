"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { error } from "console";
import React, { useState, useEffect } from "react";

interface Definition {
  name: string;
  description: string;
  definition_label: string;
  product_definition_id: number;
}

interface Attribute {
  type: string;
  label: string;
  key_attribute: string;
  product_definition_id: number;
}

interface Data {
  definitions: Definition[];
  attributes: Attribute[];
}

const ProductTable: React.FC = () => {
  const [data, setData] = useState<Data>({ definitions: [], attributes: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Chamou");
        const response = await fetch("/api/v2/getDefinitions", {
          method: "POST",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Erro na solicitação");
          console.log(response);
        }

        const jsonData: Data = await response.json();
        setData(jsonData);
        console.log("veio algo");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-3">Tipo de Variação</th>
              <th className="text-left py-2 px-3">Opção</th>
              <th className="text-left py-2 px-3">Tipo de Atributo</th>
            </tr>
          </thead>
          <tbody>
            {data.definitions.map((definition, index) => {
              return data.attributes
                .filter(
                  (attribute) =>
                    attribute.product_definition_id ===
                    definition.product_definition_id
                )
                .map((attribute, innerIndex) => (
                  <tr key={attribute.label} className="hover:bg-gray-100">
                    {index === 0 && innerIndex === 0 && (
                      <td
                        className="py-2 px-3"
                        rowSpan={data.attributes.length}
                      >
                        {definition.definition_label}
                      </td>
                    )}
                    {index === 0 && innerIndex === 0 && (
                      <td
                        className="py-2 px-3"
                        rowSpan={data.attributes.length}
                      >
                        {definition.description}
                      </td>
                    )}
                    <td className="py-2 px-3">
                      {attribute.type === "option" ? "Opção" : null}
                    </td>
                    <td className="py-2 px-3">{attribute.label}</td>
                    <td className="py-2 px-3">
                      {attribute.key_attribute === "size"
                        ? "Tamanho"
                        : attribute.key_attribute === "material"
                        ? "Tecido"
                        : attribute.key_attribute === "color"
                        ? "Cor"
                        : null}
                    </td>
                  </tr>
                ));
            })}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default ProductTable;
