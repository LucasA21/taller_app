import { View,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/src/theme/colors";
import { MovieInfo } from "./Components/MovieInfo";
import { BackButton } from "../../components/BackButton";

type DetailScreenProps = {
  item: {
    title: string;
    tipo: string;
    image: string;
    categorys: string[];
    description: string;
  };
};

export default function DetailScreen({ item }: DetailScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
    <BackButton />
      <View style={styles.bordercont}>
        <MovieInfo
            image={item.image}
            title={item.title}
            tipo={item.tipo}
            categorys={item.categorys}
            description={item.description}
        >
        </MovieInfo>
      </View> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex:1, 
     padding:10, 
     backgroundColor: colors.background 
    },
  bordercont:{
    marginTop: 20,
    flex: 1,
    borderWidth: 4,
    borderColor: colors.darkGray,
  }
});
