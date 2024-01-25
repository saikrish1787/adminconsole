import { useEffect, useState } from 'react';
import './App.css';
import { Login } from './Components/login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { Signup } from './Components/signup';
import { Home } from './Components/home';
import { useQuery } from 'react-query';

function App() {

  const [user,setUser] = useState([]);
  const [isLoading,setisLoading] = useState(true);

  const userDataquery = useQuery({
    queryKey:["userData"],
    queryFn:() => fetch("http://localhost:4000/user/get").then((res) => res.json()).then(res => {
      console.log(res)
      return res;
    })
  })



  async function getAllUser(){
    setisLoading(true)
    try{
      const res = await fetch("http://localhost:4000/user/get")
      const data =await res.json()
      setUser(data);
      setTimeout(()=> {
        setisLoading(false)
      },3000)
    }catch(e){
      toast.error(e.message + ", Status code 500",{
        theme:"light"
      })
    }
  }

  return (
    <>
   <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signin' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home getAllUser={getAllUser} user={user} isLoading={isLoading}/>}></Route>
   </Routes>
   <ToastContainer  />
   </>
  );
}

export default App;
