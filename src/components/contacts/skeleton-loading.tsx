import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColor } from '@/hooks/use-theme-color';

function SkeletonItem() {
  const opacity = useSharedValue(0.3);
  const backgroundColor = useThemeColor({}, 'icon');

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.7, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.itemContainer}>
      <Animated.View
        style={[styles.avatar, { backgroundColor }, animatedStyle]}
      />
      <View style={styles.content}>
        <Animated.View
          style={[styles.nameLine, { backgroundColor }, animatedStyle]}
        />
        <Animated.View
          style={[styles.emailLine, { backgroundColor }, animatedStyle]}
        />
        <Animated.View
          style={[styles.phoneLine, { backgroundColor }, animatedStyle]}
        />
      </View>
    </View>
  );
}

export function SkeletonLoading() {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonItem key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(128, 128, 128, 0.3)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    gap: 8,
  },
  nameLine: {
    height: 16,
    width: '60%',
    borderRadius: 4,
  },
  emailLine: {
    height: 12,
    width: '80%',
    borderRadius: 4,
  },
  phoneLine: {
    height: 12,
    width: '40%',
    borderRadius: 4,
  },
});
