import { useState, useCallback,useEffect, useRef } from "react"


function App() {
  const [length,setLength] = useState(8)
  const [num,setNum] = useState(false)
  const [char,setChar] = useState(false)
  const [pass,setPass] = useState("");
  const passwordRef = useRef()
  const passGenerator = useCallback(() => {
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str += "0123456789"
    if(char) str += "@#$%&*()"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPass(pass)
  },[length,num,char,setPass])

  const copyPass = useCallback(() => {
    passwordRef.current?.select()
   window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(() => {
    passGenerator()
  }, [length,num,setPass,passGenerator])

  return (
   
      <div className="w-full max-w-md mx-auto  shadow-md rounded-lg px-4 py-3 my-8  bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
        type="text"
        value={pass}
        className="outline-none w-full py-1 px-3"
        placeholder="password"
        readOnly
        ref={passwordRef}
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={copyPass}
        >Copy</button>
        </div>


      <div className="flex text-sm gap-x-2">
    <div className="flex items-center gap-x-1">
    <input type="range"
     min={8}
     max={50}
     value={length}
     className="cursor-pointer"
     onChange={(e) => {setLength(e.target.value)}}
     />
     <label>length: {length}</label>
    </div>


    <div className="flex items-center gap-x-1">
      <input 
      type="checkbox"
      defaultChecked={num}
      id="numinput"
      onChange={() => {
        setNum((prev) => !prev)
      }}
      />
      <label htmlFor="numinput">Numbers</label>

    </div>

    <div className="flex items-center gap-x-1">
      <input 
      type="checkbox"
      defaultChecked={char}
      id="charinput"
      onChange={() => {
        setNum((prev) => !prev)
      }}
      />
      <label htmlFor="charinput">Character</label>

    </div>



      </div>
      </div>
   
  )
}

export default App
