import { View, Text, StyleSheet } from "react-native";
import { ImageBackground } from "expo-image";
import { PressStartFont } from "@/src/components/PressStartFont";
import { CategoryList } from "@/src/components/CategoryList";
import { colors } from "@/src/theme/colors";

type MovieInfoProps = {
  image: string;
  title: string;
  tipo: string;
  categorys: string[];
  description: string;
};

export function MovieInfo({
  image,
  title,
  tipo,
  categorys,
  description,
}: MovieInfoProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.poster}
      />

      <PressStartFont style={styles.title}>
        {title}
      </PressStartFont>

      <View style={styles.tipoContainer}>
      <Text style={styles.tipo}>
        {tipo}
      </Text>
      </View>

      <Text style={styles.descripcion}>
        {description}
      </Text>

      <PressStartFont style={styles.genero}>
        Géneros
      </PressStartFont>

      <CategoryList
        categories={categorys}
        containerStyle={styles.categoriasContainer}
        itemStyle={styles.categorias}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  poster: {
    width: "100%",
    height: 360,
    marginBottom: 40,
  },
  title: {
    color: colors.purple,
    fontSize: 20,
    marginBottom: 10,
  },
  tipo: {
    backgroundColor: colors.darkGray,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  tipoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    backgroundColor: colors.darkGray,
    padding: 5,
    marginBottom: 10,
  },
  descripcion: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  genero: {
    fontSize: 14,
    marginTop: 20,
    color: colors.green,
  },
  categoriasContainer: {
    marginTop: 8,
  },
  categorias: {
    backgroundColor: colors.darkGray,
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
});
