import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "rotafolego:favoritos";

interface FavoritosContextValue {
  favoritos: number[];
  isFavorito: (id: number) => boolean;
  alternar: (id: number) => void;
}

const FavoritosContext = createContext<FavoritosContextValue | null>(null);

function lerIniciais(): number[] {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) return JSON.parse(salvo) as number[];
  } catch {
    /* ignora */
  }
  return [];
}

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<number[]>(lerIniciais);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos));
    } catch {
      /* ignora */
    }
  }, [favoritos]);

  const isFavorito = useCallback((id: number) => favoritos.includes(id), [favoritos]);

  const alternar = useCallback((id: number) => {
    setFavoritos((atuais) =>
      atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id]
    );
  }, []);

  return (
    <FavoritosContext.Provider value={{ favoritos, isFavorito, alternar }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos(): FavoritosContextValue {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error("useFavoritos precisa estar dentro de <FavoritosProvider>");
  return ctx;
}
