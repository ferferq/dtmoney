import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { DeashBoard } from "./components/DashBoard";

export function App() {
  return (
    <>
      <Header />
      <DeashBoard />
      <GlobalStyle />
   </>
  );
}