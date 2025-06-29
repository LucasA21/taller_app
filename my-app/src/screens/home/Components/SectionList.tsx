import { useEffect, useState } from "react";
import { API_URL } from "@/src/common/constants";
import {SectionContainer} from "./SectionContainer";
import { mapGeneros }  from "@/src/data/helper";
import { ActivityIndicator, ScrollView } from "react-native";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";


type SectionListFetchProps = {
  selectedTypes: number[];
  selectedGenres: number[];
}

export function SectionListFetch({selectedTypes, selectedGenres}: SectionListFetchProps) {

  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadAll() {
      try {
        const [r1,r2] = await Promise.all([
          fetch(`${API_URL}/tipos`),
          fetch(`${API_URL}/contenidos`)
        ]);
        const tiposData: ITipoContenidoAudiovisual[] = await r1.json();
        const contenidosData: IContenidoAudiovisual[] = await r2.json();
        setTipos(tiposData);
        setContenidos(contenidosData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large"/>;
  }

  const contenidosFiltrados = contenidos.filter((c) => {
    const okTipo =
      selectedTypes.length === 0 || selectedTypes.includes(c.tipoId);
    const okGenero =
      selectedGenres.length === 0 ||
      c.generos.some((g) => selectedGenres.includes(g));
    return okTipo && okGenero;
  });

  const tiposAMostrar =
    selectedTypes.length === 0
      ? tipos
      : tipos.filter((t) => selectedTypes.includes(t.id));



    return (
       <ScrollView
       showsVerticalScrollIndicator={false}>
       {tiposAMostrar.map((tipo) => {
        const items = contenidosFiltrados
          .filter((c) => c.tipoId === tipo.id)
          .map((c) => ({
            title:       c.nombre,
            image:       c.imageUrl,
            categorys:   mapGeneros(c.generos),
            description: c.descripcion,
          }));


        if (items.length === 0) return null;

        return (
          <SectionContainer
            key={tipo.id}
            sectionTitle={tipo.plural}
            item={items}
          />
        );
      })}
       </ScrollView>  
    );
}