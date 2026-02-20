import React, { useEffect, useState } from "react";

function UserComponet() {

  const [count , setCount] = useState(0)
  const [userData , setUserData] = useState([])
  const [id , setId] = useState(1)


  useEffect(() => {
    async function getData() {
      let data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      let results = await data.json();
      console.log(results)
       setUserData(results)
    }

    getData();
  },[id]); 

  function incrementId(){
    setId(id+1)
  }

  return <div>

    {/* <button onClick={increment}>increment</button>
    <h4>{count}</h4>
   <ol>
    {userData.map((user)=>(
      <li>Name : {user.name}    UserName : {user.username}</li>
    ))}

</ol> */}

    <button onClick={incrementId}>ChangeId</button>
    <h3>{id}</h3>


    <h2>{userData.name}</h2>

  



  </div>;
}

export default UserComponet;
