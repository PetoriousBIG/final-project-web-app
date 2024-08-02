import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProjectNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = [
      { label: "Test1", path: "/FinalProject" },
      { label: "Test2", path: "/FinalProject" },
      { label: "Test3", path: "/FinalProject" },
    ]
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-around">
        <Link className="navbar-brand" key="/FinalProject" to="/FinalProject">Home</Link>
        {currentUser !== null ? 
          <Link className="navbar-brand" key="/FinalProject/Account/Profile" to="/FinalProject/Account/Profile">Profile</Link> :
          <div>
            <Link className="navbar-brand" key="/FinalProject/Account/Singin" to="/FinalProject/Account/Signin">Sign In</Link>
            <Link className="navbar-brand" key="/FinalProject/Account/Singup" to="/FinalProject/Account/Signup">Sign Up</Link>
          </div> }
        {links.map((link) => (
          <Link className="navbar-brand" key={link.path} to={link.path}>{link.label}</Link>
        ))}
      </nav>
    );
}