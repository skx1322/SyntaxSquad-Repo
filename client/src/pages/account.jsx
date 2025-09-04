import * as React from 'react'
import Login from './partial/login'
import Register from './partial/register'

const Account = () => {
  const [currentPage, setCurrentPage] = React.useState("register")
  console.log(currentPage);
  return (
    <main>
      {
        currentPage === "login" ? (<Login onClickPage={setCurrentPage}></Login>) : (<Register onClickPage={setCurrentPage}></Register>)
      }
    </main>
  )
}

export default Account