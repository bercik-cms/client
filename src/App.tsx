import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { loadTheme } from './util/colorSchemes';
import EditorSelector from './components/tabsView/editorSelector/EditorSelector';
import TabsView from './components/tabsView/TabsView';

function App() {
    useEffect(() => loadTheme(), []);
    return (
        <div className="App">
            <TabsView />
        </div>
    );
}

export default App;
