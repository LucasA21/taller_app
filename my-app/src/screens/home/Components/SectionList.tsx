import {SectionContainer} from "./SectionContainer";
import { contenidosAudiovisuales }     from "@/src/data/contenidosAudiovisuales";
import { tiposContenidoAudiovisual }   from "@/src/data/tiposContenidoAudiovisual";
import { mapGeneros }                  from "@/src/data/helper";
import { ScrollView } from "react-native";


export function SectionList() {
    return (
       <ScrollView
       showsVerticalScrollIndicator={false}>
       {tiposContenidoAudiovisual.map(tipo => {
        const items = contenidosAudiovisuales
          .filter(item => item.tipoId === tipo.id)
          .map(item => ({
            title:       item.nombre,
            image:       item.imageUrl,
            categorys:   mapGeneros(item.generos),
            description: item.descripcion,
          }));

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