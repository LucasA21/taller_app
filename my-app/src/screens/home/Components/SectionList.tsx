import {SectionContainer} from "./SectionContainer";
import { moviesData } from "@/src/data/movies";
import { seriesData } from "@/src/data/series";
import { animesData } from "@/src/data/animes";
import { ScrollView } from "react-native";

export function SectionList() {
    return (
       <ScrollView
       showsVerticalScrollIndicator={false}>
       <SectionContainer sectionTitle="Series" item={seriesData} />
       <SectionContainer sectionTitle="Peliculas" item={moviesData} />
       <SectionContainer sectionTitle="Animes" item={animesData} />
       </ScrollView>  
    );
}