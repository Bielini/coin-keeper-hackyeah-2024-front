import { Image, StyleSheet, Platform, Button, ScrollView, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../../ctx';
import UserAccount from '@/components/UserAccount';
import AnimalWave from '@/components/AnimalWave';

export default function HomeScreen() {
  const { signOut } = useSession();

  return (
    <ScrollView style={{flex:1, paddingTop:40 , backgroundColor:'white'}}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">User</ThemedText>
      </ThemedView>
      <UserAccount />
      <View style={{paddingTop:20}}/>
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
