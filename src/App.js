import Body from './Common/Body';
import Header from './Common/Header';
import './style.css';
import routingConfig from "./Common/routingConfig.json"
import { HashRouter } from 'react-router-dom';
import { AxiosMemory } from './Common/InterCeptors';
import { useState } from 'react';

function App() {
  const [nxt,setNxt] = useState("");
  return (
    <HashRouter>
      <AxiosMemory />
        {nxt && <Header />}
        <Body routers={routingConfig} setNxt={setNxt}/>
    </HashRouter>
  );
}

export default App;
