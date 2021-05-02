import React, {useEffect} from 'react';

function getCook(cookiename) 
  {
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

function doRequest(){
   return fetch('http://localhost:1525/protected', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
     'authorization': 'bearer' + getCook('access') 
   },
   credentials: 'include',
   body: JSON.stringify({})
 })
   .then(data => 
    console.log(data.json())
  )
}
export default function Dashboard() {
  useEffect(() => {
    console.log("Request");
    doRequest()
  }, [])
  return(
    <h2>Dashboard</h2>
  );
}