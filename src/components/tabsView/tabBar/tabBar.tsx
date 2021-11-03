import React from 'react';
import Tab from './tab/tab';

export interface Props {
    tabNames: Array<string>;
    selectedTab: number;

    onSelect: (index: number) => void,
    onClose: (index: number) => void,
}

const TabBar: React.FC<Props> = ({ tabNames, selectedTab, onSelect, onClose }) => {
    return <div>
        {tabNames.map((name, index) => {
            <Tab
                key={index}
                tabName={name} selected={index === selectedTab}
                onSelect={() => onSelect(index)}
                onClose={() => onClose(index)}
            />;
        })}
    </div>;
};

export default TabBar;