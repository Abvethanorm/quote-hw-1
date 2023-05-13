// Quote.js
import { useState, useEffect } from "react";
import axios from "axios";

//setting up the different states needed for each feature
function Quote() {
 //api rechival component 
  const [data, setData] = useState(null);
  //button reset state this will allow the button to get new quotes everytime its clicked 
  const [key, setKey] = useState(0);
  //state handling the loading screen
  const [isLoading, setIsLoading] = useState(false);



//function that grabs the quote and waits for a response from the api 
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await axios.get(`https://api.quotable.io/random`);
      setData(response.data);
      setIsLoading(false);
    }
//logic for fetching the data after the button is clicked 
    if (key > 0) {
      fetchData();
    }
  }, [key]);


//handles displaying the quotes after being clicked also displays loading screen while data is being retrived 
  const handleClick = () => {
    setData(null);
    setIsLoading(true);
    setKey(key + 1);
  };

  return (
    <div>
      {data === null ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <button onClick={handleClick}>Get Quote</button>
        )
      ) : (
        <>
          <h2>{data.content}</h2>
          <p>{data.author}</p>
          <button onClick={handleClick}>New Quote</button>
        </>
      )}
    </div>
  );
}

export default Quote;
