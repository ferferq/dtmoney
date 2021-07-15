import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { useState } from "react";
import { DeashBoard } from "./components/DashBoard";
import { NewTransactionModal } from "./components/NewTransactionModal";

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransaction] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransaction(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransaction(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <DeashBoard />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
   </>
  );
}