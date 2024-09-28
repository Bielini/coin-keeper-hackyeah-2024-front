import React, { useState } from 'react';

const CoinKeeper: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [monsterLife, setMonsterLife] = useState<number>(100);
  const [expenseList, setExpenseList] = useState<{ description: string; amount: number }[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  // Function to handle setting the initial balance and monster's life
  const handleSetInitialValues = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const initialBalance = parseFloat((e.target as any).elements.initialBalance.value);
    const initialMonsterLife = parseFloat((e.target as any).elements.initialMonsterLife.value);
    
    setBalance(initialBalance);
    setMonsterLife(initialMonsterLife);
    setIsGameStarted(true);
  };

  // Function to handle adding expenses
  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expenseAmount = parseFloat((e.target as any).elements.expenseAmount.value);
    const expenseDescription = (e.target as any).elements.expenseDescription.value;

    setBalance(prevBalance => prevBalance - expenseAmount);
    setExpenseList([...expenseList, { description: expenseDescription, amount: expenseAmount }]);

    // Check if balance falls below monster's life
    if (balance - expenseAmount < monsterLife) {
      setIsGameOver(true);
    }

    e.currentTarget.reset(); // Clear the form inputs
  };

  // Function to reset the game
  const resetGame = () => {
    setBalance(0);
    setMonsterLife(100);
    setExpenseList([]);
    setIsGameOver(false);
    setIsGameStarted(false);
  };

  return (
    <div className="container">
      {!isGameOver ? (
        <>
          <div className="right-panel">
            {isGameStarted && (
              <div className="monster">
                <h1>Przeciwnik</h1>
                <img src="https://via.placeholder.com/150" alt="Potwór" />
                <div className="life">Życie: {monsterLife}</div>
              </div>
            )}
          </div>

          <div className="left-panel">
            <h1>Coin Keeper</h1>
            {!isGameStarted ? (
              <form onSubmit={handleSetInitialValues}>
                <input type="number" name="initialBalance" placeholder="Ustaw początkową Moc (Przychód)" required />
                <input type="number" name="initialMonsterLife" placeholder="Ustaw życie przeciwnika (Cel oszczędzania)" required />
                <button type="submit">Ustaw cel</button>
              </form>
            ) : (
              <div id="expense-section">
                <div className="balance">{balance}zł</div>
                <form onSubmit={handleAddExpense}>
                  <input type="number" name="expenseAmount" placeholder="Wartość wydatku" required />
                  <input type="text" name="expenseDescription" placeholder="Opis wydatku" required />
                  <button type="submit">Dodaj wydatek</button>
                </form>
                <div className="expense-list">
                  {expenseList.map((expense, index) => (
                    <div className="expense-item" key={index}>
                      <span>{expense.description}</span> - <span>{expense.amount}zł</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div id="game-over-screen">
          <div>Przegrałeś! Twoja moc jest mniejsza niż życie przeciwnika.</div>
          <button onClick={resetGame}>Zacznij ponownie</button>
        </div>
      )}
    </div>
  );
};

export default CoinKeeper;
