import Product from "./Product";
import { ProductProps } from "../types/Product";
import { getSession } from "../session";

import { cookies } from "next/headers";

async function getData(url: string) {
  const res = await fetch(url, {
    next: {
      revalidate: 0,
    },
    method: "GET",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getDataAuth(url: string) {
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Products() {
  let products;

  const authenticated = await getSession();

  try {
    if (authenticated) {
      products = await getDataAuth(
        "http://localhost:5000/getProductsAuthenticated"
      );
    } else products = await getData("http://localhost:5000/getProducts");
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="bg-white w-[900px] m-auto ">
      {products.map((p: ProductProps) => (
        <Product {...p} key={p.name}></Product>
      ))}
    </div>
  );
}

export default Products;
