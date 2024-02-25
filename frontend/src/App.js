import StorePage from "./pages/StorePage";
import Navigation from "./components/Navigation";
import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import {useGlobalState} from "./state/globalState";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import OrderViewPage from "./pages/OrderViewPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CreateItemPage from "./pages/CreateItemPage";

function App() {
  const state = useGlobalState();

  return (
    <div>
      <Router>
      <Navigation/>
        <Routes>
          <Route exact path="*" element={<StorePage/>}></Route>
          <Route exact path="/login" element={<LoginPage/>}></Route>
          <Route exact path="/register" element={<RegisterPage/>}></Route>
          {state.loggedIn && <Route exact path="/profile" element={<ProfilePage/>}></Route>}
          <Route exact path="/item/:id" element={<ProductPage/>}></Route>
          {state.loggedIn && <Route exact path="/order/:id" element={<OrderViewPage/>}></Route>}
          {state.loggedIn && state.role == "user" && <Route exact path="/cart" element={<CartPage/>}></Route>}
          {state.loggedIn && state.role == "admin" && <Route exact path="/orders" element={<OrdersPage/>}></Route>}
          {state.loggedIn && state.role == "admin" && <Route exact path="/newitem" element={<CreateItemPage/>}></Route>}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
