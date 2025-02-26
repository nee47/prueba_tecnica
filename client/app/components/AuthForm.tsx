"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { login } from "../actions";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const loginn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch("http://localhost:5000/login", {
      next: {
        revalidate: 0,
      },
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log(data);
    if (!data.error) {
      router.push("/");
    }
  };

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch("http://localhost:5000/register", {
      next: {
        revalidate: 0,
      },
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    console.log(data);
    if (!data.error) {
      router.push("/");
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log(type.toUpperCase(), data);

    if (type == "login") {
      loginn({ email: data.email, password: data.password });
    } else if (type == "register") {
      signUp({ email: data.email, password: data.password });
    }
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        {type === "login" ? "Iniciar Sesión" : "Registrarse"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-300  p-2 rounded-md hover:bg-yellow-400 transition"
        >
          {loading
            ? "Cargando..."
            : type === "login"
            ? "Iniciar Sesión"
            : "Registrarse"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        {type === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <Link
          href={type === "login" ? "/register" : "/login"}
          className="text-blue-600 hover:underline"
        >
          {type === "login" ? "Regístrate aquí" : "Inicia sesión aquí"}
        </Link>
      </p>
    </div>
  );
}
