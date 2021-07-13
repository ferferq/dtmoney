import { Container } from "./styles";

export function TransactionTable () {
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
            <td className="deposit">R$ 12,000</td>
            <td>Desenvolvimento</td>
            <td>13/07/2021</td>
          </tr>
          <tr>
            <td>Alugel</td>
            <td className="withdraw">- R$ 780,00</td>
            <td>Casa</td>
            <td>12/07/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}