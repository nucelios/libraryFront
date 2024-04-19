import { Route, Routes } from "react-router-dom";
import MainPage from "../../containers/MainPage/MainPage";
import Register from "@/containers/register/Register";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import { IUser } from "@/interfaces/IUser";
import Login from "@/containers/login/Login";
import BookAdd from "@/containers/bookAdd/bookAdd";
import BookEdit from "@/containers/bookEdit/bookEdit";
import FindBook from "@/containers/findBook/findBook";


type Props = { user: IUser | null };
function RoutesMain({ user }: Props) {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/find" element={<FindBook />} />
      <Route
        element={<ProtectedRoute isAllowed={!!user} redirectPath="/login" />}
      >
        <Route path="/add_book" element={<BookAdd />} />
        <Route path="/library/:id" element={<BookEdit />} />
      </Route>
    </Routes>
  );
}
export default RoutesMain
