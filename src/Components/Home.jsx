import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'


// function Home() {
// const navigate=useNavigate()


//   useEffect(() => {
//     navigate('/Adddata')
//   }, [])

//   return (
//     <div>
//         <h2>welcome</h2>
//     </div>
//   )
// }

// export default Home

function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Welcome to Dashboard</h2>
      <p>Manage your products easily.</p>
    </div>
  )
}

export default Home
