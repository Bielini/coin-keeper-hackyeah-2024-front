import React, { useState } from 'react';
import './App.css'; // You can add your CSS here or use inline styles

interface Expense {
  description: string;
  amount: number;
}

const GameWithMonster: React.FC = () => {
  // State management
  const [balance, setBalance] = useState<number>(0); // Initial player balance (power)
  const [monsterLife] = useState<number>(100); // Monster's life
  const [expenses, setExpenses] = useState<Expense[]>([]); // List of expenses
  const [initialBalanceSet, setInitialBalanceSet] = useState<boolean>(false); // To hide the initial form once balance is set

  // Local states for forms
  const [initialBalanceInput, setInitialBalanceInput] = useState<string>(''); // Input for initial balance
  const [expenseAmount, setExpenseAmount] = useState<string>(''); // Input for expense amount
  const [expenseDescription, setExpenseDescription] = useState<string>(''); // Input for expense description

  // Set initial balance
  const handleInitialBalanceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const initialBalance = parseFloat(initialBalanceInput);
    if (!isNaN(initialBalance) && initialBalance > 0) {
      setBalance(initialBalance);
      setInitialBalanceSet(true); // Hide form after setting balance
    }
  };

  // Add an expense and update balance
  const handleExpenseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expenseValue = parseFloat(expenseAmount);
    if (!isNaN(expenseValue) && expenseValue > 0 && expenseDescription) {
      const newBalance = balance - expenseValue;
      setBalance(newBalance);

      // Add to expense list
      setExpenses([...expenses, { description: expenseDescription, amount: expenseValue }]);

      // Check if player has lost (balance < monster life)
      if (newBalance < monsterLife) {
        alert('You lost! Your power is lower than the monster\'s life.');
        resetGame(); // Reset the game if player loses
      }

      // Clear input fields
      setExpenseAmount('');
      setExpenseDescription('');
    }
  };

  // Reset the game
  const resetGame = () => {
    setBalance(0);
    setExpenses([]);
    setInitialBalanceSet(false);
    setInitialBalanceInput('');
    alert('Game reset! Set a new power to start again.');
  };

  return (
    <div className="container">
      {/* Left panel: Power and Expenses */}
      <div className="left-panel">
        <h1>Power</h1>

        {/* Initial balance form */}
        {!initialBalanceSet && (
          <form onSubmit={handleInitialBalanceSubmit}>
            <input
              type="number"
              value={initialBalanceInput}
              onChange={(e) => setInitialBalanceInput(e.target.value)}
              placeholder="Set initial power"
              required
            />
            <button type="submit">Set Power</button>
          </form>
        )}

        {/* Expense section, shown after initial balance is set */}
        {initialBalanceSet && (
          <>
            <div className="balance">{balance} zł</div>
            <form onSubmit={handleExpenseSubmit}>
              <input
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                placeholder="Expense amount"
                required
              />
              <input
                type="text"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                placeholder="Expense description"
                required
              />
              <button type="submit">Add Expense</button>
            </form>

            {/* Expense List */}
            <div className="expense-list">
              {expenses.length === 0 ? (
                <p>No expenses yet</p>
              ) : (
                expenses.map((expense, index) => (
                  <div key={index} className="expense-item">
                    <span>{expense.description}</span>
                    <span>-{expense.amount} zł</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Right panel: Monster */}
      <div className="right-panel">
        <h1>Monster</h1>
        <div className="monster">
          <img src="https://via.placeholder.com/150" alt="Monster" />
          <div className="life">Life: {monsterLife}</div>
        </div>
      </div>
    </div>
  );
};

export default GameWithMonster;
