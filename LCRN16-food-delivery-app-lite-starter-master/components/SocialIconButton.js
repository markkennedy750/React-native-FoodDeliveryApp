import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { FONTS, COLORS } from "../constants";

const SocialIconButton = ({
  containerStyle,
  label,
  labelStyle,
  icon,
  iconStyle,
  iconPosition,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {iconPosition == "LEFT" && (
        <Image
          source={icon}
          style={{
            ...styles.image,
            ...iconStyle,
          }}
        />
      )}

      <Text
        style={{
          ...FONTS.body3,
          ...labelStyle,
        }}
      >
      {label}
      </Text>

      {iconPosition == "RIGHT" && (
        <Image
          source={icon}
          style={{
            ...styles.image,
            ...iconStyle,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 5,
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
});

export default SocialIconButton;
