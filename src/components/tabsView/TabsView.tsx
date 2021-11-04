import React, { useState } from 'react';
import TabBar from './tabBar/TabBar';

interface Props {

}

const TabsView: React.FC<Props> = ({ }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [tabNames, setTabNames] = useState<Array<string>>([]);

    function handleOnSelect(index: number) {
        setSelectedTab(index);
    }

    function handleOnClose(index: number) {
        if (tabNames.length >= index) {
            console.error(`Close tab logic error: tried to close tab index ${index}`);
            return;
        }
    }

    return <div>
        <TabBar
            tabNames={tabNames} selectedTab={selectedTab}
            onSelect={handleOnSelect}
            onClose={handleOnClose}
        />
    </div>;
};

export default TabsView;