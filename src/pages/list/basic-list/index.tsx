import { useState, useEffect } from "react";

const BasicList = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log(count, count2);
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
      <p>{count2}</p>
      <button onClick={() => setCount2(count2 + 1)}>点击</button>
    </div>
  );
};

export default BasicList;
