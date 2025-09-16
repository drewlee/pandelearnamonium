export default function SiteNavLinks() {
  return (
    <nav className="nh-navbar_links font-style_body">
      <ul className="nh-navbar_links-list">
        <li>
          <a href="#home" className="nh-navbar_link font-style_body">
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
