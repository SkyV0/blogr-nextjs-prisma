import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import NavLink from './NavLink';
import Button from './Button';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
         To Dos
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            To Dos
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
         <div className="ml-2 d-flex flex-column text-purple-500">
        <NavLink href="/api/auth/signin" data-active={isActive('/signup')}>Log in
        </NavLink>
        </div>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
         <div className="ml-2 d-flex flex-column text-purple-500">
          <NavLink href="/" data-active={isActive('/')}>
            To Dos
          </NavLink>
        <NavLink href="/drafts" data-active={isActive('/drafts')}>My To Dos </NavLink>
          <NavLink href="/create" data-active={isActive('/create')}>
            <a>New To Do</a>
          </NavLink>
        </div>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <div className=" flex-column text-purple-500 mb-5">
        <Button onClick={() => signOut()}>
          <a>Log out</a>
        </Button>
        </div>
      </div>
    );
  }

  return (
<nav className="bg-black border-b border-gray-200 flex justify-between py-2 main-container max-w-1">
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;