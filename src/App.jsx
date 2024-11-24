import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route.config.jsx";
import { useEffect, useState } from "react";
import "./App.css";
import { AuthProvider } from "./component/layout/header/AuthContext";

function App() {
  const [data, setData] = useState(null);

  return (
    <AuthProvider>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </AuthProvider>
  );
}

export default App;