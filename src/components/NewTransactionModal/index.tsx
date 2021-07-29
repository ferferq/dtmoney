//bibliotecas
import { FormEvent, useRef, useState } from 'react';
import Modal from 'react-modal';

//images
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/UseTransactionContext';
import { toast } from 'react-toastify';

import * as yup from 'yup';

//styles
import { Container, RadioBox, TransactionTypeContainer } from './styles';

Modal.setAppElement('#root');

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type NewTransactionFormData = {
  titulo?: string;
  category?: string;
};

const createUserFormScrema = yup.object().shape({
  titulo: yup.string().required('Titulo obrigatório'),
  category: yup.string().required('Categoria obrigatória'),
})

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');
  const {createTransaction} = useTransactions();

  function getValid(err: yup.ValidationError) {
    const newMessageError = [''];

     err.inner.forEach(erro => {
      if (erro.path)
      newMessageError.push(erro.message)
    })
      return newMessageError;
    }

  async function checkerror (data:NewTransactionFormData) {
    await createUserFormScrema.validate(data, {
      abortEarly: false,
    });
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    try{

      await checkerror({titulo: title, category: category});

      await createTransaction({
        title,
        amount:value, 
        category, 
        type, 
        createdAt: String(new Date()),
      });
      setTitle('');
      setValue(0);
      setCategory('');
      setType('deposit');
      onRequestClose();

    }catch( error) {
      if (error instanceof yup.ValidationError) {
        const messageError = getValid(error)
        messageError.filter(message => {
          if (message)
          toast.error(message);
          return message;
        })
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close">
        <img src={closeImg} alt="Fechar" />
      </button>

      <Container ref={formRef} onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            isActiveColor='green'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            isActiveColor='red'
          >
            <img src={outcomeImg} alt="Saídas" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}