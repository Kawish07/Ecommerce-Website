import HomePage from "../components/HomePage";

export default function Home({ products = [] }) {
  return <HomePage products={products} />;
}

export async function getStaticProps() {
  const base = process.env.API_BASE_URL || "http://localhost:3000/api";
  try {
    const res = await fetch(`${base}/products`);
    const data = await res.json();
    return { 
      props: { products: data.products || [] },
      revalidate: 3600 // ISR: Revalidate every hour
    };
  } catch (err) {
    return { 
      props: { products: [] },
      revalidate: 3600 // ISR: Revalidate every hour
    };
  }
}