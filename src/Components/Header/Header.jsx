import React, { useState } from 'react';
import { Logo } from '../Index';
import { Container, LogoutBtn } from '../Index';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // Import icons for the menu button

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="text-white shadow-sm bg-gray-900">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <div className="mr-4">
            <Link to="/">
              <Logo width="50px" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="ml-auto hidden md:flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-900 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="absolute top-16 left-0 w-full bg-gray-900 z-10 text-white flex flex-col items-center md:hidden">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="w-full text-center py-2 border-b border-gray-700">
                    <button
                      onClick={() => {
                        navigate(item.slug);
                        toggleMenu();
                      }}
                      className="block w-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {authStatus && (
                <li className="w-full text-center py-2">
                  <LogoutBtn />
                </li>
              )}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
