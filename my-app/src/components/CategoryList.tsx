import { View, Text, StyleSheet,TextStyle, ViewStyle } from "react-native";
import { colors } from "@/src/theme/colors";

type CategoryListProps = {
  categories: string[];
  containerStyle?: ViewStyle; 
  itemStyle?: TextStyle;
};

export function CategoryList({
  categories,
  containerStyle,
  itemStyle,
}: CategoryListProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {categories.map((cat, i) => (
        <Text key={i} style={[styles.item, itemStyle]}>
          {cat}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  item: {
    backgroundColor: colors.darkGray,
    color: "#fff",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
});
