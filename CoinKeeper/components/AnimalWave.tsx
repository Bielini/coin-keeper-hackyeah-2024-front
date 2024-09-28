import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';

// Path to your lemur image (place the image in your assets folder)

const AnimalWave: React.FC = () => {
  // Initialize the Animated.Value to track vertical position (Y axis)
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Start the animation when the component mounts
  useEffect(() => {
    // Looping wave animation using sine wave concept
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -50, // Move up by 50 units
          duration: 1500, // Duration of 1 second for the upward movement
          useNativeDriver: true, // Enable native driver for better performance
        }),
        Animated.timing(animatedValue, {
          toValue: 50, // Move down by 50 units
          duration: 1500, // Duration of 1 second for the downward movement
          useNativeDriver: true,
        }),
      ])
    ).start(); // Start the animation loop
  }, [animatedValue]);
  return (
    <View style={styles.container}>
      {/* Animated View that moves the lemur image */}
      <Animated.View style={[styles.lemurContainer, { transform: [{ translateX: animatedValue }] }]}>
        <Image source={require('@/assets/images/lemur.png')} style={styles.lemur} />
      </Animated.View>
      <Animated.View style={[styles.monsterContainer, { transform: [{ translateX: animatedValue }] }]}>
        <Image source={require('@/assets/images/monsterWM.png')} style={styles.monster} />
      </Animated.View>
    </View>
  );
};

// Define your styles here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#E0F7FA', 
    justifyContent:'center',
    marginTop:60
  },
  lemurContainer: {
    width: 200,
    height: 200,
  },
  lemur: {
    width: '150%',
    height: '150%',
    resizeMode: 'cover', // Make sure the lemur image is contained properly
  },
  monsterContainer: {
    width: 150,
    height: 200,
  },
  monster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Make sure the lemur image is contained properly
  },
});


export default AnimalWave;
