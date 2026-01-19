import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adduser from "./Components/Adduser"
import Login from "./Components/Login";
import Home from "./Components/Home";
import Adddata from "./Components/Adddata";
import Getdata from "./Components/Getdata";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProutedRoute";
import Dashboard from "./Components/Dashboard";
import EditProduct from "./Components/EditProduct";
import Profile from "./Components/Profile";


function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Adduser />} />
          <Route path="/Login" element={<Login />} />


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />


          <Route
            path="/adddata"
            element={
              <ProtectedRoute>
                <Navbar />
                <Adddata />
              </ProtectedRoute>
            }
          />

          <Route
            path="/getdata"
            element={
              <ProtectedRoute>
                <Navbar />
                <Getdata />
              </ProtectedRoute>
            }
          />

          <Route
            path="/updateProductData/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Navbar />
                <Profile />
              </ProtectedRoute>
            }
          />


        </Routes>
      </BrowserRouter>




    </>
  )
}

export default App