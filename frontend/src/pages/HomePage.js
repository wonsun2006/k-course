import { Navigate } from "react-router-dom";

function HomePage() {
  const isLogin = false;
  return isLogin ? <div>Home Page</div> : <Navigate to="/login" />;
}

export default HomePage;
