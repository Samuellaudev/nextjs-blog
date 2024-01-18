import { blogPage, dashboardPage } from '@/utils/constants';
import NavLink from './NavLink';
import ThemeSwitch from '../ThemeSwitch';

const MenuOverlay = ({
  isLogin,
  isAdmin,
  username,
  links,
  pathname,
  onClick,
  onClickNavBar,
}) => {
  const renderLoggedInLinks = () => {
    return (
      <>
        {isAdmin ? (
          <NavLink
            href={`${dashboardPage}`}
            title={`(${username})`}
            pathname={pathname}
          />
        ) : (
          <NavLink
            href={`${blogPage}`}
            title={`(${username})`}
            pathname={pathname}
          />
        )}
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
