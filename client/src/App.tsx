import { useEffect, useState } from "react";

import io from "socket.io-client";

import "./style.scss";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main";
import Dashboard from "./pages/dashboard";
import Borrower from "./pages/borrower";
import { SocketSetup } from "./utils/types";
import Auth from "./layouts/auth";
import Login from "./pages/login";

function App() {
  const [socket, setSocket] = useState<SocketSetup>(null);

  const setupSocket = () => {
    const token = localStorage.getItem("socket-test-token");
    if (token && !socket) {
      const newSocket = io(import.meta.env.VITE_APP_URL, {
        query: {
          token: localStorage.getItem("socket-test-token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
      });

      newSocket.on("connect", () => {
        console.log("Connect success!");
      });

      setSocket(newSocket);
    }
  };
  useEffect(() => {
    setupSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard socket={socket} />} />
        <Route path="/borrowers" element={<Borrower socket={socket} />} />
      </Route>

      <Route element={<Auth />}>
        <Route
          index
          path="/auth/login"
          element={<Login setupSocket={setupSocket} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
