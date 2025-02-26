"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailModal({ ds }: { ds: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  return (
    <div className="flex justify-center items-center ">
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs rounded-md outline outline-2 outline-red-500 w-fit outline-offset-2"
      >
        PDF
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Ingrese su correo</h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  console.log("Correo ingresado:", email);
                  router.push(`http://localhost:5000/downloadDSNoAuth/${ds}`);
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
