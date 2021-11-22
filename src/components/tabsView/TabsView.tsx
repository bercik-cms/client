import React, { useEffect, useState } from 'react';
import EditorSelector from './editorSelector/EditorSelector';
import TabBar from './tabBar/TabBar';

interface Props {

}

const TabsView: React.FC<Props> = ({ }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabNames, setTabNames] = useState<Array<Array<string>>>([[], ["test"], ['test2']]);

    // Keep the selected tab index less than the count of tabs
    useEffect(() => {
        if (selectedTab >= tabNames.length)
            setSelectedTab(tabNames.length - 1);
    }, [tabNames]);

    function handleOnSelect(index: number) {
        setSelectedTab(index);
    }

    function handleOnClose(index: number) {
        if (tabNames.length <= index) {
            console.error(`\
                Close tab logic error: \
                tried to close tab index \
                ${index} (of ${tabNames.length})`);
            return;
        }

        if (tabNames.length === 1) {
            setTabNames([[]]);
        } else {
            const newTabNames = [
                ...tabNames.slice(0, index),
                ...tabNames.slice(index + 1, tabNames.length),
            ];
            setTabNames(newTabNames);
        }
    }

    function onNewTab() {
        if (tabNames[tabNames.length - 1].length === 0) {
            // The last tab is already a new tab - select it
            setSelectedTab(tabNames.length - 1);
        } else {
            let oldLen = tabNames.length;
            setTabNames([...tabNames, []]);
            setSelectedTab(oldLen);
        }
    }

    return <div>
        <TabBar
            tabNames={tabNames}
            selectedTab={selectedTab}
            onSelect={handleOnSelect}
            onClose={handleOnClose}
            onNewTab={onNewTab}
        />
    </div>;
};

export default TabsView;