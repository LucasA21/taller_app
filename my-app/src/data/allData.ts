import { contenidosAudiovisuales } from "./contenidosAudiovisuales";
import { generosContenidoAudiovisual } from "./generosContenidoAudiovisual";

export type item = {
  title:       string;
  image:       string;
  categorys:   string[];
  description: string;
};

export const allItems: item[] = contenidosAudiovisuales.map((c) => ({
  title:       c.nombre,
  image:       c.imageUrl,
  description: c.descripcion,
  categorys:   c.generos
    .map((genId) => {
      const g = generosContenidoAudiovisual.find((x) => x.id === genId);
      return g ? g.nombre : null;
    })
    .filter((n): n is string => n !== null),
}));
