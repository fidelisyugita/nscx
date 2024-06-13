import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = TouchableOpacityProps & {
  text1?: string;
};

export function ThemedButton({
  onPress,
  text1,
  style,
  ...rest
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      {...rest}
    >
      <ThemedText style={{ color: Colors.light.bunker50 }}>{text1}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary400,
  },
});
