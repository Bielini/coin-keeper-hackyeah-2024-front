import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';

// Define an interface for the Expense object
interface Expense {
  name: string;
  amount: number;
}

const UserAccount: React.FC = () => {
  // State to store the account balance (number)
  const [accountBalance, setAccountBalance] = useState<number>(1000); // Initial account balance

  // State to store the entered expense name (string)
  const [expenseName, setExpenseName] = useState<string>(''); 

  // State to store the entered expense amount (string, to be converted to number)
  const [expenseAmount, setExpenseAmount] = useState<string>(''); 

  // State to store the entered amount to add to the balance (string, to be converted to number)
  const [addFundsAmount, setAddFundsAmount] = useState<string>(''); 

  // State to store the list of expenses (array of Expense objects)
  const [expenses, setExpenses] = useState<Expense[]>([]); 

  // Function to handle the expense submission
  const handleExpenseSubmit = (): void => {
    const expenseValue: number = parseFloat(expenseAmount); // Convert string to number

    // Check if the entered expense is a valid number and greater than zero
    if (!expenseName || isNaN(expenseValue) || expenseValue <= 0) {
      Alert.alert('Error', 'Please enter a valid expense name and amount!');
      return;
    }

    // Check if the entered expense is greater than the current account balance
    if (expenseValue > accountBalance) {
      Alert.alert('Error', 'The expense exceeds the account balance!');
      return;
    }

    // Deduct the expense from the account balance
    setAccountBalance((prevBalance) => prevBalance - expenseValue);

    // Add the expense to the list of expenses
    const newExpense: Expense = { name: expenseName, amount: expenseValue };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    // Clear the input fields after submission
    setExpenseName('');
    setExpenseAmount('');
  };

  // Function to handle adding more funds to the account balance
  const handleAddFunds = (): void => {
    const fundsValue: number = parseFloat(addFundsAmount); // Convert string to number

    // Check if the entered amount is valid and greater than zero
    if (isNaN(fundsValue) || fundsValue <= 0) {
      Alert.alert('Error', 'Please enter a valid amount to add!');
      return;
    }

    // Add funds to the account balance
    setAccountBalance((prevBalance) => prevBalance + fundsValue);

    // Clear the input field after submission
    setAddFundsAmount('');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Account Balance</Text>
       {/* Display the current account balance */}
       <Text style={styles.balance}>Account Balance: {accountBalance} zł</Text>
    {/* Input field for adding more funds */}
    <TextInput
        style={styles.input}
        placeholder="Enter amount to add to balance"
        keyboardType="numeric"
        value={addFundsAmount}
        onChangeText={(text) => setAddFundsAmount(text)} // Update state on text input
      />

      {/* Button to add funds */}
      <Button title="Add Funds" onPress={handleAddFunds} />

      {/* Input field for entering the expense name */}
      <TextInput
        style={styles.input}
        placeholder="Enter expense name"
        value={expenseName}
        onChangeText={(text) => setExpenseName(text)} // Update state on text input
      />

      {/* Input field for entering the expense amount */}
      <TextInput
        style={styles.input}
        placeholder="Enter expense amount"
        keyboardType="numeric"
        value={expenseAmount}
        onChangeText={(text) => setExpenseAmount(text)} // Update state on text input
      />

      {/* Button to submit the expense and update the balance */}
      <TouchableOpacity onPress={handleExpenseSubmit} style={styles.expense} >
        <Text style={styles.expenseTxt}>Add Expense</Text>
      </TouchableOpacity>
      {/* List of expenses */}
      <FlatList
      horizontal
        data={expenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseName}>{item.name}</Text>
            <Text style={styles.expenseAmount}>{item.amount} zł</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noExpenses}>No expenses yet</Text>}
      />
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
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseAmount: {
    fontSize: 16,
    color: 'red',
  },
  noExpenses: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  expense: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'white',
    borderRadius:20,
    borderWidth:2,
    padding:10,
  },
  expenseTxt: {
    fontSize:16,
    fontWeight:500,
    color:'blue'
  }
});

export default UserAccount;
