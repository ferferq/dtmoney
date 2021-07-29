import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionsProps {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string
}
interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionsPropsData = Omit<TransactionsProps, 'id'>

interface TransactionContextProps {
  transactions: TransactionsProps[];
  createTransaction: (transaction: TransactionsPropsData) => Promise<void>;
  amountDeposit: number;
  amountWithDraw: number
}

export const TransactionContext = createContext({} as TransactionContextProps);

export function TransactionsProvider (props: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState([] as TransactionsProps[]);
  const [dAmountDeposit , setdAmountDeposit] = useState(0);
  const [dAmountWithDraw , setdAmountWithDraw] = useState(0);

  useEffect( () => {
    api.get('transactions')
    .then((response) => {//setTransactions(response.data)
      setTransactions(response.data.transactions);
    });
  }, []);

  useEffect(() => {
    transactions.map(transaction => {
      if (transaction.type === 'deposit') {
        return setdAmountDeposit((lastValue) => lastValue + transaction.amount);
      }
      else{
        return setdAmountWithDraw((lastValue) => lastValue + transaction.amount);
      }
    })
  }, [transactions]);

   async function createTransaction (transactionInput: TransactionsPropsData) {
    const resposta = await api.post('transactions', transactionInput);
    setdAmountDeposit(0);
    setdAmountWithDraw(0);
    console.log(resposta);
    const { transaction } = resposta.data
    setTransactions([
      ...transactions,
      transaction
    ]);
  }

  return (
    <TransactionContext.Provider value={
      {
        transactions: transactions, 
        createTransaction, 
        amountDeposit: dAmountDeposit,
        amountWithDraw: dAmountWithDraw
      }
      }>
      {props.children}
    </TransactionContext.Provider>

  );  
}


export function useTransactions () {
  return useContext(TransactionContext);
}