import { useEffect } from "react";
import axios from "axios";
import MenuBar from "../components/MenuBar";

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;

function HomePage() {
  useEffect(() => {
    axios
      .get(REACT_APP_API_HOST + "/auth/login-check", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          if (!res.data) {
            // 로그인 상태 아닐 시 로그인 페이지로 이동
            window.location.replace("/login");
          }
        } else {
          window.location.replace("/login");
        }
      })
      .catch((err) => {
        window.location.replace("/login");
      });
  });

  return (
    <div>
      <MenuBar></MenuBar>
      Home Page
    </div>
  );
}

export default HomePage;
