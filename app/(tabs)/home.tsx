import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="h7">Hello, Guest</ThemedText>
          <ThemedText type="xSmall">Welcome to New Star Cineplex!</ThemedText>

          <ThemedView style={styles.filter}>
            <TouchableOpacity style={styles.location}>
              <Ionicons
                name={"location-outline"}
                size={16}
                color={Colors.light.bunker700}
              />
              <ThemedText style={{ flex: 1 }} type="small">
                Belitung
              </ThemedText>
              <Ionicons
                name={"chevron-down"}
                size={16}
                color={Colors.light.bunker700}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Ionicons
                name={"notifications-outline"}
                size={16}
                color={Colors.light.bunker700}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Ionicons
                name={"search"}
                size={16}
                color={Colors.light.bunker700}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.rowBetween}>
          <ThemedText type="h8">Now Showing</ThemedText>
          <ThemedText type="small">See All</ThemedText>
        </ThemedView>

        <ThemedView style={styles.rowBetween}>
          <ThemedText type="h8">Upcoming</ThemedText>
          <ThemedText type="small">See All</ThemedText>
        </ThemedView>

        <ThemedView style={styles.rowBetween}>
          <ThemedText type="h8">Best Offers</ThemedText>
          <ThemedText type="small">See All</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    paddingHorizontal: 16,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  location: {
    flex: 1,
    backgroundColor: Colors.light.bunker100,
    borderRadius: 8,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: Colors.light.bunker100,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
});
