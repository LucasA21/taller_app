import { View, StyleSheet,TextStyle, ViewStyle } from "react-native";
import { colors } from "@/src/theme/colors";
import { Etiqueta } from "@/src/components/Etiqueta";

type CategoryListProps = {
  categories?: string[];
  containerStyle?: ViewStyle; 
  itemStyle?: TextStyle;
};

export function CategoryList({
  categories = [],
  containerStyle,
  itemStyle,
}: CategoryListProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {categories.map((cat, i) => (
        <Etiqueta
          key={i}
          fontSize={itemStyle?.fontSize ? Number(itemStyle.fontSize) : 10}
          backgroundColor={itemStyle?.backgroundColor ? String(itemStyle.backgroundColor) : String(colors.darkGray)}
          color={itemStyle?.color ? String(itemStyle.color) : "#fff"}
          paddingHorizontal={itemStyle?.paddingHorizontal ? Number(itemStyle.paddingHorizontal) : 6}
          paddingVertical={itemStyle?.paddingVertical ? Number(itemStyle.paddingVertical) : 2}
          style={itemStyle}
        >
          {cat}
        </Etiqueta>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    marginLeft: 4
  },
});
