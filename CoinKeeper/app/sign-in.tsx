import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '../ctx';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:30, paddingBottom:20}}>Coin Keeper</Text>
      <View style={{  justifyContent: 'center', alignItems: 'center', borderColor:'blue', width:80, borderRadius:20, borderWidth:1, padding:10 }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}>
        Sign In
      </Text>
      </View>
    </View>
  );
}
