import Link from "next/link";
import Products from "./components/Products";
import { getSession } from "./session";
import CerrarSesionButton from "./components/CerrarSesionButton";

export default async function Home() {
  const authenticated = await getSession();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center bg-slate-200 min-h-screen ">
      <div className="bg-yellow-300 w-full h-[100px] flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-slate-800">
          PRUEBA TECNICA
        </h1>
      </div>

      {authenticated ? (
        <CerrarSesionButton></CerrarSesionButton>
      ) : (
        <div className=" flex gap-4 absolute top-16 right-16">
          <Link href="/login" className="hover:text-red-400">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="hover:text-red-400">
            Registrarse
          </Link>
        </div>
      )}

      <Products></Products>
    </main>
  );
}
