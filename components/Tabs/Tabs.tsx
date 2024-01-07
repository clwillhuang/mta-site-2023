'use client'

import { useState } from 'react';
import styles from './Tabs.module.css'

export type TabProp = {
    children: (JSX.Element | null)[];
    title: string; 
    key: string;
}

export type TabsProps = {
    tabs: TabProp[]
}

const Tabs = ({ tabs }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const selectTab = (label: string) => {
        setActiveTab(label)
    }

    const tabData = tabs.find(x => x.key === activeTab);

    return (
        <div>
            <ul className={styles.tabList}>
                {tabs.map((child: TabProp) => {
                    return (
                        <li key={child.key} className={child.key === activeTab ? styles.activeTabLabel : styles.inactiveTabLabel} onClick={() => selectTab(child.key)}>
                            <a role='button'>{child.title}</a>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.tabContent}>
                {
                    tabData && tabData.children
                }
            </div>
        </div>
    )
}

export default Tabs;