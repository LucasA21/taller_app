import { contenidosAudiovisuales } from "./contenidosAudiovisuales";
import { generosContenidoAudiovisual } from "./generosContenidoAudiovisual";
import { tiposContenidoAudiovisual } from "./tiposContenidoAudiovisual";

export interface Item {
  title:       string;
  image:       string;
  categorys:   string[];
  description: string;
  tipo:        string;
}

export const allItems: Item[] = contenidosAudiovisuales.map((c) => {

  const tipoObj = tiposContenidoAudiovisual.find((t) => t.id === c.tipoId);

  const categorys = c.generos
    .map((genId) => {
      const g = generosContenidoAudiovisual.find((x) => x.id === genId);
      return g ? g.nombre : null;
    })
    .filter((n): n is string => n !== null);

  return {
    title:       c.nombre,
    image:       c.imageUrl,
    description: c.descripcion,
    categorys,
    tipo:        tipoObj?.singular ?? "desconocido",
  };
});
