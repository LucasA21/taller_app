import { moviesData } from "./movies";
import { seriesData } from "./series";
import { animesData } from "./animes";

export const allItems = [
  ...moviesData,
  ...seriesData,
  ...animesData,
];