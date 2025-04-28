import React from "react";
import { Text, TextProps, StyleSheet, TextStyle } from "react-native";

export function PressStartFont({
  children,
  style,
  ...props
}: TextProps & { style?: TextStyle }) {

  const flat = StyleSheet.flatten(style) || {};

  //flatten toma cualquier cosa que se pasa le pasa al componente en style y lo convierte
  //en un unico objeto plano con todas las propiedades css convinadas

  const isBold = flat.fontWeight === "bold";

  //revisa en el objeto plano si esta la propiedad bold, si es asi lo pone en true

  const family = isBold
    ? "PressStart2P_700Bold"
    : "PressStart2P_400Regular";

  //dependiendo de isbold elije la fuente

  const { fontWeight, ...styleWithoutFW } = flat;

  //aca se usa destructuring para para separar el fontweight del resto de propiedades
  //styleWith.. es un nuevo objeto sin esa propiedad, esto lo hago para que react native no ignore la fuente y caiga en fallback
  //sin hacer esto el bold no funciona y va a poner la tipografica por defecto

  return (
    <Text
      {...props}
      style={[
        { fontFamily: family },
        styleWithoutFW,
      ]}
    >
      {children}
    </Text>
  );
}
