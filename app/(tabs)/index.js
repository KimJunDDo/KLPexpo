import { Platform, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={styles.title}>Welcome!</Text>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Step 1: Try it</Text>
        <Text style={styles.stepText}>
          Edit <Text style={styles.bold}>app/(tabs)/index.js</Text> to see changes.{"\n"}
          Press{' '}
          <Text style={styles.bold}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Step 2: Explore</Text>
        <Text style={styles.stepText}>
          Tap the Explore tab to learn more about what's included in this starter app.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Step 3: Get a fresh start</Text>
        <Text style={styles.stepText}>
          When you're ready, run <Text style={styles.bold}>npm run reset-project</Text> to get a fresh{' '}
          <Text style={styles.bold}>app</Text> directory. This will move the current{' '}
          <Text style={styles.bold}>app</Text> to <Text style={styles.bold}>app-example</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  stepContainer: {
    width: '100%',
    marginVertical: 10,
    padding: 12,
    backgroundColor: '#f1f4f8',
    borderRadius: 8,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  stepText: {
    fontSize: 15,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
