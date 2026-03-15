import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import {PressStartFont} from "@/src/components/PressStartFont";
import {CategoryList} from "@/src/components/CategoryList";
import { colors } from "@/src/theme/colors";

type MovieCardProps = {
  title: string;
  image: string | number;
  categorys: string[];
};

export function MovieCard({ title, image, categorys }: MovieCardProps) {
  return (
    <View style={styles.container}>
      <Image
        source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
        contentFit="fill"
      />
      <View style={styles.info}>
        <View>
          <PressStartFont
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {title}
          </PressStartFont>
        </View>
        <View>
          <CategoryList
            categories={categorys.slice(0, 2)}
            containerStyle={styles.categoriesContainer}
            itemStyle={styles.category}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 210, 
    marginRight: 10,
    borderWidth: 2,
    overflow: "hidden",
    borderTopColor: colors.lightPurple,
    borderLeftColor: colors.lightPurple,
    borderBottomColor: colors.darkPurple,
    borderRightColor: colors.darkPurple,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: colors.lightGray,
  },
  info: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 4,
    justifyContent: "flex-start",
  },
  title: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 4,
    paddingTop: 6,
    marginBottom: 2,
  },
  categoriesContainer: {
    marginTop: 2,
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  category: {
    backgroundColor: colors.darkGray,
    color: colors.white,
    fontSize: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 2,
    marginBottom: 2,
  },
});
