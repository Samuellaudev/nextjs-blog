import React from 'react';
import NavLink from './NavLink';
import ThemeSwitch from '../ThemeSwitch';

const MenuOverlay = ({
  isLogin,
  username,
  links,
  pathname,
  onClick,
  onClickNavBar,
}) => {
  const renderLoggedInLinks = () => {
    return (
      <>
        <NavLink
          href="/dashboard?search=&pageNumber=1"
          title={`(${username})`}
          pathname={pathname}
        />
        <NavLink href="" title="Logout" pathname="/logout" onClick={onClick} />
      </>
    );
  };

  const renderNavLinks = () => {
    return (
      <>
        {isLogin && renderLoggedInLinks()}
        {links.map((link, index) => (
          <li key={index}>
            <NavLink
              href={link.path}
              title={link.title}
              pathname={pathname}
              onClick={onClickNavBar}
            />
          </li>
        ))}
        <ThemeSwitch className="mt-5" />
      </>
    );
  };

  return (
    <ul className="flex flex-col py-4 items-center md:hidden">
      {renderNavLinks()}
    </ul>
  );
};

export default MenuOverlay;
