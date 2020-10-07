import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";

import api from "../services/api";

interface IProduct {
  id: number;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <section>
        <Title>Recommended Producs</Title>

        <ul>
          {recommendedProducts.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await api.get("recommended");

  const recommendedProducts = response.data;

  return {
    props: {
      recommendedProducts,
    },
  };
};
