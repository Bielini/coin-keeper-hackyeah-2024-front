import { Image, StyleSheet, Platform, Button, ScrollView, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../../ctx';
import UserAccount from '@/components/UserAccount';
import AnimalWave from '@/components/AnimalWave';


export default function HomeScreen() {
  const { signOut } = useSession();

  return (
    <ScrollView style={{flex:1,  backgroundColor:'white'}}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}>
          Sign Out
        </Text>
      </View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">User</ThemedText>
      </ThemedView>
      <UserAccount />
      <AnimalWave />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop:10
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
