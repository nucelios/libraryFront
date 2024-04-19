import "./App.css";
import { useAppSelector } from "@/hooks/hooks";
import { Container } from "@mui/material";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import RoutesMain from "./components/routes/routes";

function App() {
  const user = useAppSelector((state) => {
    return state.user.userInfo;
  });
  return (
    <>
      <AppToolbar />
      <main>
        <Container maxWidth="xl">
          <RoutesMain user={user}/>
        </Container>
      </main>
    </>
  );
}

export default App;
