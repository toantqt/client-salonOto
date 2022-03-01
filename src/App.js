import { Route, Redirect, BrowserRouter, HashRouter } from "react-router-dom";
import { isLoggedIn, checkRole } from "./auth/auth";
import Dashboard from "./screens/Admin/Dashboard/screens/Dashboard";
import LoginPage from "./screens/Login/screens/LoginPage";

function App() {
  return (
    <HashRouter>
      <Route
        path="/admin"
        render={() =>
          checkRole("admin") ? <Dashboard /> : <Redirect to="/auth/login" />
        }
      ></Route>
      <Route path="/auth/login" component={LoginPage}></Route>
    </HashRouter>
  );
}

export default App;
