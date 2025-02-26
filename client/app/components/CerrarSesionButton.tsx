"use client";
import { useRouter } from "next/navigation";

export default function CerrarSesionButton() {
  const router = useRouter();

  const handleCerrarSesion = async () => {
    const res = await fetch("http://localhost:5000/logout", {
      next: {
        revalidate: 0,
      },
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/");
    }
  };
  return (
    <button
      onClick={() => {
        handleCerrarSesion();
        router.push("/");
      }}
      className="absolute top-16 right-16 hover:text-red-400"
    >
      Cerrar sesión
    </button>
  );
}
