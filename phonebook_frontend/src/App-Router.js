import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./Components";
import { Signup, Login, Home, Logout,} from "./Pages";

function AppRouter() {

  return (
    <div className="App">
      <Routes>
        <Route
          path={"/"}
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        />
        <Route
          path={"/signup"}
          element={
            <>
              <NavBar />
              <Signup />
            </>
          }
        />
        <Route
          path={"/login"}
          element={
            <>
              <NavBar />
              <Login />
            </>
          }
        />
        <Route
          path={"/logout"}
          element={
            <>
              <Logout/>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRouter;
