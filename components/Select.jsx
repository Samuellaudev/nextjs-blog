'use client';
import { Listbox } from '@headlessui/react';

const tagData = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Certifications' },
  { id: 3, name: 'Projects' },
  { id: 4, name: 'Badges' },
];

const Select = ({ tagName, setTagName }) => {
  return (
    <Listbox value={tagName} onChange={setTagName}>
      <Listbox.Button className="w-full border rounded my-5 py-2 block md:hidden">
        {tagName}
      </Listbox.Button>
      <Listbox.Options className="mb-5 cursor-pointer">
        {tagData.map((tag) => (
          <Listbox.Option
            key={tag.id}
            value={tag.name}
            className={`w-full text-center`}
          >
            {({ active }) => (
              <p
                className={`${
                  active
                    ? 'bg-primary-400 text-white'
                    : 'bg-white text-black  dark:text-white dark:bg-black'
                } py-2`}
              >
                {tag.name}
              </p>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default Select;
