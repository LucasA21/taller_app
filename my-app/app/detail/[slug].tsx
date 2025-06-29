import DetailScreen from "@/src/screens/detail/DetailScreen";
import { mapGeneros } from "@/src/data/helper";
import { useLocalSearchParams } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { useEffect, useState } from "react";
import { API_URL } from "@/src/common/constants";

export default function DetailRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const decodedSlug = decodeURIComponent(slug);
  const [item, setItem] = useState<{
    title: string;
    tipo: string;
    image: string;
    categorys: string[];
    description: string;
  } | null>(null);(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      try {
        const [r1, r2] = await Promise.all([
          fetch(`${API_URL}/contenidos`),
          fetch(`${API_URL}/tipos`)
        ]);
        const contenidos = await r1.json();
        const tipos = await r2.json();

        const found = (contenidos as any[])
          .find(x => x.nombre === decodedSlug);
        if (!found) {
          setItem(null);
          return;
        }

        const tipoStr =
          (tipos as any[]).find(t => t.id === found.tipoId)
            ?.singular ?? "desconocido";

        setItem({
          title:       found.nombre,
          tipo:        tipoStr,
          image:       found.imageUrl,
          categorys:   mapGeneros(found.generos),
          description: found.descripcion,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [decodedSlug]);


  if (loading) return <ActivityIndicator size="large" />;
  if (!item) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <PressStartFont>No encontrado</PressStartFont>
      </View>
    );
  }


  return <DetailScreen item={item} />;
}
