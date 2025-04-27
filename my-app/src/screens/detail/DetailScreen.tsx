import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";
import { MovieInfo } from "./Components/MovieInfo";
import { BackButton } from "./Components/BackButton";

type DetailScreenProps = {
  item: {
    title: string;
    image: string;
    categorys: string[];
    description: string;
  };
};

export default function DetailScreen({ item }: DetailScreenProps) {
  return (
    <View style={styles.container}>
    <BackButton />
      <View style={styles.bordercont}>
        <MovieInfo
            image={item.image}
            title={item.title}
            categorys={item.categorys}
            description={item.description}
        >
        </MovieInfo>
      </View> 
    </View>
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
