'use client'

import { useState } from 'react';
import styles from './Tabs.module.css'

type TabsProps = {
    children: JSX.Element[] | JSX.Element;
}

const Tabs = ({ children }: TabsProps) => {
    const tabs: JSX.Element[] = Array.isArray(children) ? children : [children]
    const [activeTab, setActiveTab] = useState(tabs[0].props.id);

    const selectTab = (label: string) => {
        setActiveTab(label)
    }

    return (
        <div>
            <ul className={styles.tabList}>
                {tabs.map((child: JSX.Element) => {
                    const { id } = child.props;
                    return (
                        <li key={id} className={id === activeTab ? styles.activeTabLabel : styles.inactiveTabLabel} onClick={() => selectTab(id)}>
                            <a role='button'>{id}</a>
                        </li>
                    )
                })}
            </ul>
            <div>
                {
                    tabs.map((child: JSX.Element) => {
                        if (child.props.id === activeTab) return child
                        else return null;
                    })
                }
            </div>
        </div>
    )
}

export default Tabs;