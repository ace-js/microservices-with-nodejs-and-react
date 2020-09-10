import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    { isVisible: !currentUser, label: "Sign In", href: "/auth/signin" },
    { isVisible: !currentUser, label: "Sign Up", href: "/auth/signup" },
    { isVisible: currentUser, label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((link) => link.isVisible)
    .map((link) => (
      <li key={link.href} className="nav-item">
        <Link href={link.href}>
          <a className="nav-link">{link.label}</a>
        </Link>
      </li>
    ));

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
      <Link href="/">
        <a className="navbar-brand">iTickets</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
