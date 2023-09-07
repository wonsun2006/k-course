import { useEffect } from "react";
import MenuBar from "../components/MenuBar";
import { axiosInstance } from "../api/axios";

function HomePage() {
  useEffect(() => {
    axiosInstance
      .get("/auth/login-check")
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
