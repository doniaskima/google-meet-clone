import React, { useEffect } from 'react';
import { useDarkMode } from './hooks';
import { ThemeProvider } from 'styled-components';
import lightTheme, { darkTheme } from './theming/themeContext';
import GlobalStyles from './theming/global';
import { AppWrapper, Landing} from './pages';
import {  Routes, Route } from 'react-router-dom';
import JoinRoom from './pages/JoinRoom';
import { ContextProvider } from './SocketContext';
import ChatRoom from './pages/ChatRoom';
import Join from './pages/Join';
import Meet from './pages/Meet';

function App() {
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
                            <AppWrapper>
                                <ChatRoom
                                />
                            </AppWrapper>
                        }
                    />
                    <Route
                        exact
                        path='/join'
                        element={
                            <AppWrapper>
                                <Join
                                />
                            </AppWrapper>
                        }
                    />
                                  <Route
                        exact
                        path='/meet'
                        element={
                            <AppWrapper>
                                <Meet
                                />
                            </AppWrapper>
                        }
                    />
                    
          </Routes>
          
    </ThemeProvider>
    </ContextProvider>
 
 
 
  )
}

export default App
