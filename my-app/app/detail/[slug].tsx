import { useLocalSearchParams } from "expo-router";
import DetailScreen from "@/src/screens/detail/DetailScreen";
import { View, Text } from "react-native";
import { allItems } from "@/src/data/allData";
import { PressStartFont } from "@/src/components/PressStartFont";

export default function DetailRoute() {
  
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const decodedSlug = decodeURIComponent(slug);

  const item = allItems.find(x => x.title === decodedSlug);

  if (!item) {
    return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <PressStartFont>No encontrado</PressStartFont>
      </View>
    );
  }


  return <DetailScreen item={item} />;
}
