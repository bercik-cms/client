import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { loadTheme } from './util/colorSchemes';
import EditorSelector from './components/tabsView/editorSelector/EditorSelector';
import TabsView from './components/tabsView/TabsView';
import LoginComponent from './components/loginComponent/LoginComponent';
import axios from 'axios';

function App() {
    useEffect(() => loadTheme(), []);

    let [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (token !== null) {
            (axios.defaults.headers as any)['Authorization'] =
                'Bearer ' + token;
        } else {
            (axios.defaults.headers as any)['Authorization'] = '';
        }
    }, [token]);

    if (token === null)
        return <LoginComponent onSetToken={(tok) => setToken(tok)} />;

    return (
        <div className="App">
            <TabsView />
        </div>
    );
}

export default App;
