import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route.config.jsx";
import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';


function App() {
const [data, setData] = useState(null);
// useEffect(() => {
//     axios.get('/api/test')
//       .then(response => {
//         setData(response.data);
//       })
//       .catch(error => {
//         setData('Connection failed');
//         console.error("Error connecting to backend: ", error);
//       });
//   }, []);
  return (
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
  );
}

export default App;
