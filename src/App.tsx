import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { useState } from "react";
import { DeashBoard } from "./components/DashBoard";
import Modal from 'react-modal';

Modal.setAppElement('#root');

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

      <Modal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h1>Cadastrar transação</h1>
      </Modal>

      <GlobalStyle />
   </>
  );
}