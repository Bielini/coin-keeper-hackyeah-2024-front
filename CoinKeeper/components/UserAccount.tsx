import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const UserAccount: React.FC = () => {
  // State to store the account balance
  const [accountBalance, setAccountBalance] = useState<number>(1000); // Initial account balance
  const [expense, setExpense] = useState<string>(''); // State to store the entered expense

  // Function to handle the expense submission
  const handleExpenseSubmit = () => {
    const expenseValue = parseFloat(expense); // Convert the input to a number

    // Check if the entered expense is a valid number and greater than zero
    if (isNaN(expenseValue) || expenseValue <= 0) {
      Alert.alert('Error', 'Please enter a valid expense amount!');
      return;
    }

    // Check if the entered expense is greater than the current account balance
    if (expenseValue > accountBalance) {
      Alert.alert('Error', 'The expense exceeds the account balance!');
      return;
    }

    // Deduct the expense from the account balance
    setAccountBalance((prevBalance) => prevBalance - expenseValue);
    setExpense(''); // Clear the input field after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Account Balance</Text>

      {/* Display the current account balance */}
      <Text style={styles.balance}>Account Balance: {accountBalance} zł</Text>

      {/* Input field for entering the expense */}
      <TextInput
        style={styles.input}
        placeholder="Enter expense amount"
        keyboardType="numeric"
        value={expense}
        onChangeText={(text) => setExpense(text)} // Update state on text input
      />

      {/* Button to submit the expense and update the balance */}
      <Button title="Add Expense" onPress={handleExpenseSubmit} />
    </View>
  );
};

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balance: {
    fontSize: 22,
    color: 'green',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default UserAccount;
