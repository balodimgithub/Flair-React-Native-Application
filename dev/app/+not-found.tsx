import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

//import { ThemedText } from '@/components/ThemedText';
//import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
     <View>
  <Text>
    NotFoundScreen
  </Text>
     </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});