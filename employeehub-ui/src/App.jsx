import { useEffect } from 'react'
import api from './services/api';


function App() {
  useEffect(() =>{
    async function fetchEmployees(){
      try
      {
        const response = await api.get("/employees");
        console.log(response.data);
      }
      catch(error)
      {
        console.log(error);
      }
    }

    fetchEmployees();
  }, []);

  return(
    <div>
      <h1>Employee Management System</h1>
    </div>
  );
}

export default App;
