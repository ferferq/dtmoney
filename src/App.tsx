import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { useState } from "react";
import { DeashBoard } from "./components/DashBoard";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/UseTransactionContext";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransaction] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransaction(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransaction(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <DeashBoard />
      <ToastContainer autoClose={3000} />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
   </TransactionsProvider>
  );
}