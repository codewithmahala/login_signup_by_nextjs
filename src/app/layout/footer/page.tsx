import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-columns">
          {/* Column 1 */}
          <div className="footer-column">
            <h3>Our Eco Farm</h3>
            <p>
              We&apos;re dedicated to providing the highest quality dairy products while maintaining sustainable
              farming practices.
            </p>
            <div className="social-icons">
              <Link href="#"><i className="fab fa-facebook-f"></i></Link>
              <Link href="#"><i className="fab fa-twitter"></i></Link>
              <Link href="#"><i className="fab fa-instagram"></i></Link>
              <Link href="#"><i className="fab fa-pinterest"></i></Link>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><Link href="#">Our Story</Link></li>
              <li><Link href="#">Farm Tours</Link></li>
              <li><Link href="#">Sustainability</Link></li>
              <li><Link href="#">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-column">
            <h3>Find us on map</h3>
            <div style={{ width: '100%' }}>
              <iframe
                title="Google Map showing the location of Sikar"
                width={100}
                height={200}
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=sikar+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; 2025 Gowsala All Rights Reserved @ Designed By Ankit Mahala.</p>
        </div>
      </div>
    </footer>
  );
}