import { GetStaticProps } from "next";
import { Title } from "../styles/pages/Home";

import api from "../services/api";

interface IProduct {
  id: number;
  title: string;
}

interface TopTenProps {
  products: IProduct[];
}

export default function TopTen({ products }: TopTenProps) {
  return (
    <div>
      <section>
        <Title>Top 10</Title>

        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<TopTenProps> = async (context) => {
  const response = await api.get("products");

  const products = response.data;

  return {
    props: {
      products,
    },
  };
};
