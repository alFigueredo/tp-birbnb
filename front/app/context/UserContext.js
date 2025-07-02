"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUsuarios } from "@/app/services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    getUsuarios()
      .then((res) => {
        setUsuarios(res.data);
        setUsuarioActual(res.data.length > 0 ? res.data[0] : []); // por defecto, el primero
      })
      .catch((err) => console.error("Error al cargar usuarios:", err));
    // .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ usuarios, usuarioActual, setUsuarioActual }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsuario() {
  return useContext(UserContext);
}
