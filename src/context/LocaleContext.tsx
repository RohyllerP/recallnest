"use client";
import { createContext, useContext, useEffect, useState } from "react";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import pt from "@/locales/pt.json";

export type Locale = "es" | "en" | "pt";
const locales = { en, es, pt };

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: typeof es;
}>({ locale: "es", setLocale: () => {}, t: es });

export function LocaleProvider({
  children,
  initialLocale, // Recibimos el valor del servidor
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  // Inicializamos con lo que diga el servidor
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("recallnest_locale", l);
    // Actualizamos la cookie para que el servidor la vea en la próxima carga
    document.cookie = `recallnest_locale=${l}; Path=/; Max-Age=31536000; SameSite=Lax`;
  };

  useEffect(() => {
    // Solo al cargar, verificamos si el localStorage tiene algo distinto (preferencia del usuario)
    const saved = window.localStorage.getItem("recallnest_locale") as Locale;
    if (saved && (saved === "en" || saved === "es" || saved === "pt") && saved !== locale) {
      setLocaleState(saved);
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: locales[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);