interface SiteNavLinksProps {
  isModal?: boolean;
}

/**
 * Site navigation links.
 *
 * @param props - Component props.
 * @remarks
 * `props.isModal` - Whether the caller is the site navigation modal.
 * @returns React JSX element.
 */
export default function SiteNavLinks({ isModal = false }: SiteNavLinksProps): React.JSX.Element {
  return (
    <nav className="nh-navbar_links font-style_body">
      <ul className="nh-navbar_links-list">
        <li>
          <a
            href="#home"
            className="nh-navbar_link font-style_body"
            id={isModal ? undefined : 'nh-nav-home-link'}
          >
            Home
          </a>
        </li>
        <li>
          <a href="#new" className="nh-navbar_link font-style_body">
            New
          </a>
        </li>
        <li>
          <a href="#popular" className="nh-navbar_link font-style_body">
            Popular
          </a>
        </li>
        <li>
          <a href="#trending" className="nh-navbar_link font-style_body">
            Trending
          </a>
        </li>
        <li>
          <a href="#categories" className="nh-navbar_link font-style_body">
            Categories
          </a>
        </li>
      </ul>
    </nav>
  );
}
