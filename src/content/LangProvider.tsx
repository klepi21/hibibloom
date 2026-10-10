"use client"

import { createContext, useContext, type ReactNode } from "react"
import { content, type Lang } from "./index"

const LangContext = createContext<Lang>("el")

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
export const useContent = () => content[useContext(LangContext)]
