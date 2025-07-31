import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.text}>This app includes example code to help you get started.</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>File-based routing</Text>
        <Text style={styles.text}>
          This app has two screens: app/(tabs)/index.js and app/(tabs)/explore.js
        </Text>
        <Text style={styles.text}>
          The layout file in app/(tabs)/_layout.js sets up the tab navigator.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Android, iOS, and web support</Text>
        <Text style={styles.text}>
          You can open this project on Android, iOS, and the web. To open the web version, press <Text style={styles.bold}>w</Text> in the terminal running this project.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Images</Text>
        <Text style={styles.text}>
          For static images, you can use the @2x and @3x suffixes to provide files for different screen densities.
        </Text>
        <Text style={styles.link}>
          Learn more: https://reactnative.dev/docs/images
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Custom fonts</Text>
        <Text style={styles.text}>
          Open app/_layout.js to see how to load custom fonts such as this one.
        </Text>
        <Text style={styles.link}>
          Learn more: https://docs.expo.dev/versions/latest/sdk/font
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Light and dark mode components</Text>
        <Text style={styles.text}>
          This template has light and dark mode support. The useColorScheme() hook lets you inspect what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </Text>
        <Text style={styles.link}>
          Learn more: https://docs.expo.dev/develop/user-interface/color-themes/
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Animations</Text>
        <Text style={styles.text}>
          This template includes an example of an animated component. The components/HelloWave.js component uses the powerful react-native-reanimated library to create a waving hand animation.
        </Text>
        {Platform.OS === 'ios' && (
          <Text style={styles.text}>
            The components/ParallaxScrollView.js component provides a parallax effect for the header image.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#f1f4f8',
    borderRadius: 8,
    padding: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: '#444',
    marginBottom: 3,
  },
  link: {
    color: '#007AFF',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginBottom: 3,
  },
  bold: {
    fontWeight: 'bold',
  },
});
