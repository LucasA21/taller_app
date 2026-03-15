import { View, Text, StyleSheet } from "react-native";
import { ImageBackground } from "expo-image";
import { PressStartFont } from "@/src/components/PressStartFont";
import { CategoryList } from "@/src/components/CategoryList";
import { colors } from "@/src/theme/colors";
import { Etiqueta } from "@/src/components/Etiqueta";

type MovieInfoProps = {
  image: string | number;
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
        source={typeof image === 'string' ? { uri: image } : image}
        contentFit="fill"
        style={styles.poster}
      />

      <PressStartFont style={styles.title}>
        {title}
      </PressStartFont>

      <View style={styles.tipoContainer}>
        <Etiqueta
          fontSize={16}
          backgroundColor={colors.darkGray}
          color={colors.white}
          paddingHorizontal={6}
          paddingVertical={2}
          style={{ fontWeight: "bold" }}
        >
          {tipo}
        </Etiqueta>
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
        itemStyle={{
          backgroundColor: colors.darkGray,
          color: colors.white,
          fontSize: 14,
          paddingHorizontal: 6,
          paddingVertical: 2,
          marginRight: 4,
          marginBottom: 4,
          fontWeight: "bold"
        }}
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
    height: "70%",
    marginBottom: 40,
  },
  title: {
    color: colors.purple,
    fontSize: 20,
    marginBottom: 10,
  },
  tipoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  descripcion: {
    color: colors.white,
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
    color: colors.white,
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
});
