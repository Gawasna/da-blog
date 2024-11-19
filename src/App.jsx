import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route.config.jsx";
import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';


function App() {
const [data, setData] = useState(null);
  return (
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
  );
}

export default App;
