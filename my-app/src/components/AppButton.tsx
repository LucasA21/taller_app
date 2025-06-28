import React from "react";
import {
    Pressable,
    View,
    StyleSheet,
    PressableProps,
    ViewStyle,
    StyleProp,
} from "react-native";

import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";


type AppButtonProps = PressableProps & {
    icon: React.ReactNode;
    text: string;
    style?: StyleProp<ViewStyle>;
}

export function AppButton ({
    icon,text,style,onPress, ...presableProps
}: AppButtonProps) {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed}) => [
        styles.pressable,
        style,
        { opacity: pressed ? 0.5 : 1 },
      ]}
        {...presableProps}> 
        <View style={styles.container}>
            {icon}
            <PressStartFont style={styles.text}>{text}</PressStartFont>
        </View>
    </Pressable>
  );  
}

const styles = StyleSheet.create({
  pressable: {
  },
   container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,     
    padding: 5,
    borderWidth: 1,
    borderTopColor: colors.lightPurple,
    borderLeftColor: colors.lightPurple,
    borderBottomColor: colors.darkPurple,
    borderRightColor: colors.darkPurple,
    backgroundColor: colors.purple,
  },
  text: {
    color: "#fff",
    width: 100,
    fontSize: 12,
    textAlign: "center",
  },
});