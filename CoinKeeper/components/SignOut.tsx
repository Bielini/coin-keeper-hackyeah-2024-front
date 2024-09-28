import { Button, Text, View } from 'react-native';

import { useSession } from '../ctx';

export default function SignOut() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{flex:1, top:0}}>  
          <Button   
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut()
          }}
          title='Sign Out'
        />    
      
      </View>
    
    </View>
  );
}
