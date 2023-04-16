// Routing of the web application handled here
import config from './gitprofile.config';
import React, { useEffect } from 'react';
import { useDarkMode } from './hooks';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './theming/global';
import { AppWrapper, Landing} from './pages';
import lightTheme, { darkTheme } from './theming/themeContext';
import { ContextProvider } from './SocketContext';
import {
 Route, Routes
 
} from 'react-router-dom';
import JoinRoom from './components/Home/JoinRoom/JoinRoom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Join from './components/Join/Join';
import Meet from './components/Meet/Meet';

function App() {
  //if application is not connected to the internet, display this alert.
  useEffect(() => {
    if (!navigator.onLine) alert('Connect to internet!');
  }, [navigator]);
  const [
    mode,
    toggleMode,
    spread,
    componentMounted,
    setDisableScroll,
] = useDarkMode();
if (!componentMounted) {
    return <div />;
}
 
  return (
    //SocketContect provider for the components
    <ContextProvider>
     

     <ThemeProvider theme={mode === 'dark' ? darkTheme: lightTheme  }>
        <GlobalStyles />
          <Routes>
        
                    <Route
                        exact
                        path='/'
                        element={
                            <AppWrapper>
                                <Landing
                                    setDisableScroll={setDisableScroll}
                                    spread={spread}
                                    mode={mode}
                                    toggleMode={toggleMode}
                                />
                            </AppWrapper>
                        }
                    />
                     <Route
                        exact
                        path='/joinRoom'
                        element={
                            <AppWrapper>
                                <JoinRoom
                                    setDisableScroll={setDisableScroll}
                                    spread={spread}
                                    mode={mode}
                                    toggleMode={toggleMode}
                                />
                            </AppWrapper>
                        }
                    />
                     <Route
                        exact
                        path='/chatRoom'
                        element={
                           
                                <ChatRoom   config={config}
                                />
                          
                        }
                    />
                    <Route
                        exact
                        path='/join'
                        element={
                           
                                <Join
                                />
                       
                        }
                    />
                                  <Route
                        exact
                        path='/meet'
                        element={
                           
                                <Meet
                                />
                       
                        }
                    />
                       
                    
          </Routes>
          
    </ThemeProvider>
   
  
    </ContextProvider>
  );
}

export default App;
