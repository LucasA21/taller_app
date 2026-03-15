import { useEffect, useState } from "react";
import {SectionContainer} from "./SectionContainer";
import { mapGeneros }  from "@/src/data/helper";
import { ActivityIndicator, ScrollView } from "react-native";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { BannerList } from "./BannerList";
import { fetchTipos, fetchContenidos } from "@/src/services/supabaseData";


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
        const [tiposData, contenidosData] = await Promise.all([
          fetchTipos(),
          fetchContenidos()
        ]);
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
       <BannerList />
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