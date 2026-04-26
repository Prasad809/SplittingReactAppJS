import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom"
import Loader from "../libs/Others/Loader";

const pagesContext = require.context("../Pages", true, /\.js$/);

const Component = (componentPath) =>{
    return React.lazy(() =>
    Promise.resolve({
      default: pagesContext(`./${componentPath}.js`).default
    })
  );
}
  
function Maincontainer({ routers,setNxt }) {
    return (
         <Suspense fallback={<Loader />}>
        <Routes>
          {routers.headComponents.map((route) => {
            const DynamicComponent = Component(route.component);

            return (
              <Route
                key={route.id}
                path={route.path}
                element={<DynamicComponent setNxt={setNxt}/>}
              />
            );
          })}
        </Routes>
      </Suspense>
    )
}

export default Maincontainer;