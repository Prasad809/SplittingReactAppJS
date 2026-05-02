import Body from './Common/Body';
import Header from './Common/Header';
import './style.css';
import routingConfig from "./Common/routingConfig.json"
import { useLocation } from 'react-router-dom';
import { AxiosMemory } from './Common/InterCeptors';
import { useState } from 'react';

function App() {
  const [nxt,setNxt] = useState("");
  const location = useLocation();
  const hideHead=location?.pathname == "/Login" || location?.pathname == "/"
  
  return (
    <div>
      <AxiosMemory />
        {!hideHead && nxt && <Header />}
        <Body routers={routingConfig} setNxt={setNxt}/>
    </div>
  );
}

export default App;
