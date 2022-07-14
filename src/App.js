import LandingPage from "./components/LandingPage";
import AddPost from "./components/UI/AddPost";
import React, {useState} from "react";
export const store=React.createContext({
});
function App() {
  
  const [CartOpen, setCartOpen] = useState(false);
  const [AlbumData, setAlbumData] = useState([]);
  return (
    <store.Provider value={{CartOpen,setCartOpen,AlbumData,setAlbumData}}>
    <LandingPage CartOpen={setCartOpen} setdata={{setAlbumData}}/>
    {CartOpen&&<AddPost setdata={setAlbumData} data={AlbumData} CartOpen={setCartOpen} />}
    </store.Provider>
    
  );
}

export default App;
