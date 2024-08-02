import store from "./store";
import { Provider } from "react-redux";
import ProjectNavigation from "./Navigation";
import Session from "./Account/Session";
import Account from "./Account";
import Home from "./Home";
import { Routes, Route, Navigate } from "react-router";

export default function FinalProject() {
    return (
        <Provider store={store}>
          <Session>
            <div id="wd-final-project" className="h-100">
              <ProjectNavigation/>
            </div>
            <div className="flex-fill p-4">
              <Routes>
                <Route path="/" element={<Navigate to="Home"/> } />
                <Route path="Home" element={<Home />} />
                <Route path="Account/*" element={<Account />} />
              </Routes>
            </div>
          </Session>
        </Provider>
    );
}