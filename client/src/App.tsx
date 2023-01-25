import React from 'react';
import { Layout } from './Components/Layout/Layout';
import './Styles/main.scss';
import { useCookies } from 'react-cookie';
import { Navigate } from "react-router-dom";

function App() {

  return  <Layout>
            {useCookies()[0].loginToken && 
              <Navigate to="/general" replace={true} />
            }
              {!useCookies()[0].loginToken && 
              <Navigate to="/auth" replace={true} />
            }
          </Layout>

}

export default App;
