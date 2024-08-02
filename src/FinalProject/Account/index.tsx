import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { useSelector } from "react-redux";
export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="wd-account-screen">
      <div className="flex-fill p-4 pt-0">
        <Routes>
          <Route path="/" element={ <Navigate to={ currentUser ? "/FinalProject/Account/Profile" : "/FinalProject/Account/Signin"} /> } />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
