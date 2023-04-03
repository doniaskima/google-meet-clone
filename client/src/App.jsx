import React from 'react';
import { useDarkMode } from './hooks';
import { ThemeProvider } from 'styled-components';
import lightTheme, { darkTheme } from './theming/themeContext';
import GlobalStyles from './theming/global';
import { AppWrapper, Landing} from './pages';
import {  Routes, Route } from 'react-router-dom';
import JoinRoom from './pages/JoinRoom';

function App() {
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
    <ThemeProvider theme={mode === 'dark' ?darkTheme: lightTheme  }>
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
          </Routes>
          
    </ThemeProvider>
  )
}

export default App
