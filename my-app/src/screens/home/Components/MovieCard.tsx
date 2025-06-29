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
            categories={categorys}
            containerStyle={styles.categoriesContainer}
            itemStyle={{}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 290,
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
    height: 220,
    backgroundColor: colors.lightGray,
  },
  info: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: "flex-start",
  },
  title: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 7,
    paddingTop: 10,
    marginBottom: 5,
  },
  categoriesContainer: {
    marginTop: 4,
  },
  category: {
    backgroundColor: colors.darkGray,
    color: "#fff",
    fontSize: 9,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
});
