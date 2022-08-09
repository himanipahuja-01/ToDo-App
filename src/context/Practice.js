
import { createContext, useState } from "react";

const Practice = createContext();

const ToProvider = ({children}) => {
const [use, setUse] = useState([
    {
        id:1,
        username: 'satyam',
        email: 'satyam@gmail.com',
        password: 'admin'
    },
    {
        id:2,
        username: 'himani',
        email: 'himani@gmail.com',
        password: 'admin' 
    }
   
])

const userLogin = (formdata) => {
    const data = use.filter((el)=>{
return formdata.email === use.email && formdata.password === use.password
    })
    if(data.length>0){
        alert("hello");
    }
    else{
        alert("bye bye")
    }
}


const [out, setOut] = useState(1)
const updateOut =() => {
setOut((prev)=>{
    return prev+1;
})
console.log(out);
}

return(
    <Practice.Provider value = {{use,updateOut}}>
{children}
    </Practice.Provider>
)
}

export {ToProvider};
export default Practice;