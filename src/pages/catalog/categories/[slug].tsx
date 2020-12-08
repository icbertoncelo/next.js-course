import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'

import api from '@/services/api'

interface IProduct {
  id: number;
  title: string;
}

interface CategoryProps {
  products: IProduct[]
}

export default function Category({products}: CategoryProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Loading...</p>
  }

  return (
    <div>
       <h1>{router.query.slug}</h1>

       <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('categories')

  const paths = data.map((category: IProduct) => ({
    params: {
      slug: category.id
    }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const {slug} = context.params;

  const response = await api.get('products', {
    params: {
      category_id: slug,
    }
  })

  const products = response.data

  return {
    props: {
      products,
    },
    revalidate: 60
  }
}