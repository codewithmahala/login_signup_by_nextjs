import FooterWaves from '../layout/footerwave/page';
import Image from 'next/image';
import Link from 'next/link';
import Layout from "../layout/app/page";
import "../../../styles/frontend/blog.css";
export default function Blog() {
  return (
    <Layout>
    <section className="start-section" style={{ marginTop: '5rem' }}>
      {/* Banner Section */}
      <section className="banner">
        <h1>Our Blog</h1>
        <p>Stay updated with our latest news and activities</p>
      </section>

      <div className="main-section">
        {/* Blog Filter Section */}
        <section className="blog-filter">
          <div className="filter-container">
            <h2>Filter by Category</h2>
            <div className="filter-buttons">
              <button className="filter-btn active" data-category="all">All</button>
              <button className="filter-btn" data-category="events">Events</button>
              <button className="filter-btn" data-category="activities">Activities</button>
              <button className="filter-btn" data-category="news">News</button>
              <button className="filter-btn" data-category="stories">Success Stories</button>
            </div>
          </div>
          <div className="search-container">
            <input type="text" id="searchInput" placeholder="Search blog posts..." />
            <button id="searchBtn" aria-label="Search">
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="blog-posts container">
          <div className="blog-grid">
            {/* Blog Post 1 */}
            <div className="blog-card" data-category="events">
              <div className="blog-image">
                <Image src="/assets/images/b1.webp" alt="Annual Cow Festival" width={300} height={200} />
                <div className="blog-category">Events</div>
              </div>
              <div className="blog-content">
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i> March 15, 2024
                </div>
                <h3>Annual Cow Festival Celebration</h3>
                <p>
                  Join us for our annual cow festival where we celebrate the importance of cows in our culture and
                  tradition with various activities and rituals.
                </p>
                <Link href="/blog_detail" className="read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="blog-card" data-category="activities">
              <div className="blog-image">
                <Image src="/assets/images/b2.webp" alt="Cow Feeding Program" width={300} height={200} />
                <div className="blog-category">Activities</div>
              </div>
              <div className="blog-content">
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i> March 10, 2024
                </div>
                <h3>Daily Cow Feeding Program</h3>
                <p>
                  Learn about our daily cow feeding program and how we ensure proper nutrition for all the cows in our
                  goshala with organic and natural feed.
                </p>
                <Link href="/blog_detail" className="read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="blog-card" data-category="news">
              <div className="blog-image">
                <Image src="/assets/images/b3.webp" alt="New Shelter Construction" width={300} height={200} />
                <div className="blog-category">News</div>
              </div>
              <div className="blog-content">
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i> March 5, 2024
                </div>
                <h3>New Shelter Construction Completed</h3>
                <p>
                  We are excited to announce the completion of our new shelter that can accommodate an additional 100
                  cows with modern facilities and care.
                </p>
                <Link href="/blog_detail" className="read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            {/* Blog Post 4 */}
            <div className="blog-card" data-category="stories">
              <div className="blog-image">
                <Image src="/assets/images/b4.webp" alt="Rescued Cow Story" width={300} height={200} />
                <div className="blog-category">Success Stories</div>
              </div>
              <div className="blog-content">
                <div className="blog-date">
                  <i className="far fa-calendar-alt"></i> February 28, 2024
                </div>
                <h3>The Story of Radha: A Rescued Cow</h3>
                <p>
                  Read the inspiring story of Radha, a cow rescued from difficult conditions who is now thriving in our
                  goshala with proper care and love.
                </p>
                <Link href="/blog_detail" className="read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <Link href="#" className="active">
              1
            </Link>
            <Link href="#">2</Link>
            <Link href="#">3</Link>
            <Link href="#" className="next">
              Next <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter">
          <div className="newsletter-container">
            <div className="newsletter-content">
              <h2>Subscribe to Our Newsletter</h2>
              <p>Stay updated with our latest news, events, and activities</p>
              <form id="newsletterForm">
                <div className="form-group-blog">
                  <input type="email" id="emailInput" placeholder="Enter your email address" required />
                  <button type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <FooterWaves />
        </section>
      </div>
    </section>
    </Layout>
  );
}