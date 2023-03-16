const { useContext, createContext, useState, useEffect } = require("react");


// context 생성
const MyContext = createContext();


//자식 안에 자식
function GrandchildComponent() {
  useEffect(() => {
    console.log("GrandchildComponent is rendered!");
  });

  const value = useContext(MyContext);
  return (<>
  <div>{value.a}</div>
  <div>{value.b}</div>
  </>)
  ;
}


//자식
function ChildComponent() {
  useEffect(() => {
    console.log("ChildComponent is rendered!");
  });

  return <GrandchildComponent />;
}



//context에 새값
export default function ParentComponent() {
  const [a, setA] = useState(0);
  const [b, setB] = useState("text");

  const contextValue = { a, b };

  return (
    <MyContext.Provider value={contextValue}>
      <button onClick={() => setA((prev) => prev + 1)}>updateA</button>
      <button onClick={() => setB((prev) => `${prev}text`)}>updateB</button>
      <ChildComponent />
    </MyContext.Provider>
  );
}
