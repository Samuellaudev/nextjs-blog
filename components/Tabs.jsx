'use client';

import { Tab } from '@headlessui/react';

const Tabs = ({
  tab1,
  tab2,
  tabListClass,
  tab1Class,
  tab2Class,
  content1,
  content2,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className={tabListClass}>
        <Tab className={tab1Class}>{tab1}</Tab>
        <Tab className={tab2Class}>{tab2}</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>{content1}</Tab.Panel>
        <Tab.Panel>{content2}</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
