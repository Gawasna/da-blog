import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route.config.jsx";
import { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';


function App() {
const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/posts/latest')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  return (
    <>
      <div>
        {data ? (
          <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      </div>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
