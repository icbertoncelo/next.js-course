import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";

import api from "../services/api";

interface IProduct {
  id: number;
  title: string;
  price: number
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const math = (await import('../lib/math')).default

    console.log(process.env.NEXT_PUBLIC_API_URL)
    alert(math.sum(2,5))
  }
  
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

      <button onClick={handleSum}>SUM!</button>
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
