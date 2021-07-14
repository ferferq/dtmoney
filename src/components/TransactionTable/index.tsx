import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";


export function TransactionTable () {
  useEffect(() => {
    api.get('transactions')
    .then((response) => console.log(response.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de web site</td>
            <td className="deposit">R$ 1000,00</td>
            <td>Desenvolvimento</td>
            <td>13/07/2021</td>
          </tr>
          <tr>
            <td>Alugel</td>
            <td className="withdraw">- R$ 500,00</td>
            <td>Casa</td>
            <td>12/07/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}