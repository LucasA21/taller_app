import { Href } from "expo-router";

export const ROUTES: Record<string, Href> = {
    HOME: "/",
    DETAIL: "/detail/[slug]",
    AHORCADO: "/games/ahorcado",
    REVEAL: "/games/reveal",
} as const;