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

  [];

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
        </table>
      </div>

      
    </>
  );
};

export default ProductTable;
