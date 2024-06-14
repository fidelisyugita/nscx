import { Link, Stack, router } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Onboardings } from "@/constants/Onboardings";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ThemedButton";
import { useMemo } from "react";

export default function OnboardingScreen() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const flatListRef = useAnimatedRef();
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    flatListIndex.value = viewableItems[0].index;
    console.log(viewableItems[0].index);
  };

  const onPress = () => {
    if (flatListIndex.value < Onboardings.length - 1) {
      flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      router.navigate("/home");
    }
  };

  const RenderItem = ({ item, index }) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP
      );
      return {
        width: 245,
        height: 245,
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
      };
    });

    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolation.CLAMP
      );
      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
        marginTop: 36,
        marginHorizontal: 44,
      };
    });

    return (
      <View style={{ ...styles.itemContainer, width: SCREEN_WIDTH }}>
        <Animated.Image source={item.image} style={imageAnimationStyle} />
        <Animated.View style={textAnimationStyle}>
          <ThemedText type="h4" style={styles.title}>
            {item.title}
          </ThemedText>
          <ThemedText type="small" style={styles.subtitle}>
            {item.subtitle}
          </ThemedText>
        </Animated.View>
      </View>
    );
  };

  const DotComponent = ({ i }) => {
    const dotAnimationStyle = useAnimatedStyle(() => {
      const widthAnimation = interpolate(
        x.value,
        [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH],
        [6, 32, 6],
        Extrapolation.CLAMP
      );
      return {
        width: widthAnimation,
        backgroundColor:
          widthAnimation > 16
            ? Colors.light.primary500
            : Colors.light.bunker300,
      };
    });
    return <Animated.View style={[styles.dot, dotAnimationStyle]} />;
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        data={Onboardings}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => String(item.id)}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.dotsContainer}>
        {Onboardings.map((_, i) => {
          return <DotComponent i={i} key={i} />;
        })}
      </View>
      <View style={styles.button}>
        <ThemedButton
          onPress={onPress}
          text1={flatListIndex.value == 2 ? "Get Started" : "Next"}
          // text1={"Next"}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 140,
    gap: 4,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    // marginHorizontal: 2,
    backgroundColor: Colors.light.bunker300,
  },
  button: {
    marginHorizontal: 16,
    // marginVertical: 14,
  },
});
