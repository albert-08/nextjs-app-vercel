import React, {  } from 'react'
import { GetStaticProps } from 'next'
import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'

export const getStaticPaths = async () => {
  const response = await fetch('https://nextjs-app-vercel.vercel.app/api/avo')
  const { data: productList }: TAPIAvoResponse = await response.json()   

  const paths = productList.map(({id}) => ({
    params: {
      id
    }
  }))

  return {
    paths,
    //incremental static generation
    //404 for everything else
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string
  const response = await fetch(
    `https://nextjs-app-vercel.vercel.app/api/avo/${id}`
)
  const product: TProduct = await response.json()   
  
  return {
    props: {
      product,
    }
  }
}

const ProductPage = ({ product }: { product: TProduct}) => {
  //const { query } = useRouter()
  //const [product, setProduct] = useState<TProduct | null>(null)

  // useEffect(() => {
  //   if (query.id) {
  //     window
  //       .fetch(`/api/avo/${query.id}`)
  //       .then((response) => response.json())
  //       .then((data: TProduct) => {
  //         setProduct(data)
  //       })
  //   }
  // }, [query.id])

  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
