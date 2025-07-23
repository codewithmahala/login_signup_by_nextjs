'use client';

import FrontendLayout from "./layout/app/page";
import FooterWaves from "./layout/footerwave/page";
import Image from 'next/image';
import Link from 'next/link';
import "../../styles/frontend/index.css";
import { useState } from "react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    "/assets/images/cow-banner.webp",
    "/assets/images/gawsalbanner-1.jpg",
    "/assets/images/cow-banner.webp",
  ];

  const moveSlide = (step: number) => {
    setCurrentSlide((prev) => (prev + step + sliderImages.length) % sliderImages.length);
  };

  return (
    <FrontendLayout>
      {/* Hero Section */}
      <section className="hero fade-in">
        <div className="slider-container">
          <div className="slider">
            {sliderImages.map((image, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url('${image}')` }}
              ></div>
            ))}
          </div>
          <button className="prev" onClick={() => moveSlide(-1)}>&#10094;</button>
          <button className="next" onClick={() => moveSlide(1)}>&#10095;</button>
        </div>
        <div className="container hero-overlay">
          <div className="hero-content">
            <h1>Milk and More!</h1>
            <p>FRESH LOCAL PRODUCE</p>
            <a href="#" className="btn btn-discover">Discover More</a>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome">
        <div className="container">
          <div className="section-title fade-in">
            <h2>Welcome To Our Farm!</h2>
          </div>
          <section className="farm-stats">
            <div className="container">
              <div className="stats-container">
                <div className="stat-item count-up">
                  <div className="stat-circle">
                    <span className="stat-number">300</span>
                  </div>
                  <h3>Godhan</h3>
                  <p>(Cows + Calf)</p>
                </div>
                <div className="stat-item count-up">
                  <div className="stat-circle">
                    <span className="stat-number">12</span>
                  </div>
                  <h3>Acres</h3>
                  <p>of land</p>
                </div>
                <div className="stat-item count-up">
                  <div className="stat-circle">
                    <span className="stat-number">600</span>
                    <span className="stat-unit">Sq. feet</span>
                  </div>
                  <h3>Khirak</h3>
                  <p>Capacity</p>
                </div>
                <div className="stat-item count-up">
                  <div className="stat-circle">
                    <span className="stat-number">80</span>
                  </div>
                  <h3>Nandi</h3>
                  <p>for Donation</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <div className="container">
          <h2 className="section-heading fade-in">About Us</h2>
          <div className="about-content">
            <div className="about-image slide-right">
              <Image
                src="/assets/images/cow_phtoto_about.webp"
                alt="Cow"
                width={500}
                height={300}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="about-text slide-left">
              <div className="about-box">
                <h3>Our Story</h3>
                <p>Founded in 1985, our family farm has been dedicated to producing the highest quality dairy products for over three generations. We believe in sustainable farming practices and treating our animals with care and respect.</p>
                <p>Our commitment to quality and tradition has made us a trusted name in the community.</p>
                <Link href="/about" className="btn">Read More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gopuja Section */}
      <section className="gopuja-section">
        <div className="container">
          <div className="gopuja-content">
            <div className="gopuja-image slide-right">
              <Image
                src="/assets/images/gopujaimg.webp"
                alt="Cow Worship Ceremony"
                width={400}
                height={300}
                className="gow-puja"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="gopuja-text slide-left">
              <h2>Gopuja & Godanam</h2>
              <p>Gopuja means worship of a cow along with her calf...</p>
              <div className="gopuja-info">
                <p>Shree Vallabh Gaushala provides everyone around the world a chance to serve with following categories:</p>
                <ul>
                  <li>For the Goshala new land acquisition</li>
                  <li>For the contribution of gaushala&apos;s construction</li>
                  <li>Adopt a cow for a year</li>
                  <li>Cow Food</li>
                  <li>Gopujan and Donation on Special Occasions</li>
                </ul>
                <button className="btn modal-open" id="indexmodal">Donate Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-image slide-right">
              <Image
                src="/assets/images/whygoimg.jpg"
                alt="Cow Protection Ceremony"
                width={400}
                height={300}
                className="whygosalaimg"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="mission-text slide-left">
              <h2>Why Support Gaushala</h2>
              <ul className="mission-list">
                <li>Preserve ancient traditions and rural economies</li>
                <li>Shelter for abandoned cows</li>
                <li>Support for organic farming</li>
                <li>Promotes compassion and non-violence</li>
                <li>Remove stigma of cow slaughter</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <div className="container">
        <h2 className="section-heading fade-in">Our attraction</h2>
        <div className="destinations-grid">
          <div className="destination abu-dhabi">
            <div className="overlay"></div>
            <h2>Muffin</h2>
          </div>
          <div className="destination dubai">
            <div className="overlay"></div>
            <h2>Marshmallow</h2>
          </div>
          <div className="destination rajasthan">
            <div className="overlay"></div>
            <h2>Henrietta</h2>
          </div>
          <div className="destination sharjah">
            <div className="overlay"></div>
            <h2>Milky</h2>
          </div>
          <div className="destination goa">
            <div className="overlay"></div>
            <h2>Bella</h2>
          </div>
          <div className="destination uttar-pradesh">
            <div className="overlay"></div>
            <h2>HF</h2>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <section className="blog">
  <div className="container">
    <h2 className="section-heading fade-in">Blog</h2>
    <div className="blog-posts">
      {/* Blog Post 1 */}
      <div className="blog-post slide-up">
        <div className="post-img">
          <Image src="/assets/images/b1.webp" alt="Blog Post 1" width={300} height={200} />
        </div>
        <div className="post-content">
          <h3>A Milk Delicacies</h3>
          <p>Discover the many ways to enjoy fresh milk and its benefits for your health.</p>
          <div className="post-meta">
            <span><i className="far fa-calendar"></i> March 15, 2025</span>
            <span><i className="far fa-comment"></i> 12</span>
          </div>
          <Link href="/blog_detail" className="read-more">Read More</Link>
        </div>
      </div>

      {/* Blog Post 2 */}
      <div className="blog-post slide-up" data-delay="200">
        <div className="post-img">
          <Image src="/assets/images/b2.webp" alt="Blog Post 2" width={300} height={200} />
        </div>
        <div className="post-content">
          <h3>A Serene Country Life</h3>
          <p>Experience the tranquility and beauty of life on our dairy farm.</p>
          <div className="post-meta">
            <span><i className="far fa-calendar"></i> March 10, 2025</span>
            <span><i className="far fa-comment"></i> 8</span>
          </div>
          <Link href="/blog_detail" className="read-more">Read More</Link>
        </div>
      </div>

      {/* Blog Post 3 */}
      <div className="blog-post slide-up" data-delay="400">
        <div className="post-img">
          <Image src="/assets/images/b4.webp" alt="Blog Post 3" width={300} height={200} />
        </div>
        <div className="post-content">
          <h3>Butter of a Dream</h3>
          <p>Learn how we make our award-winning butter and its culinary uses.</p>
          <div className="post-meta">
            <span><i className="far fa-calendar"></i> March 5, 2025</span>
            <span><i className="far fa-comment"></i> 15</span>
          </div>
          <Link href="/blog_detail" className="read-more">Read More</Link>
        </div>
      </div>
    </div>

    {/* View All Posts Button */}
    <div className="text-center">
      <Link href="/blog" className="btn">View All Posts</Link>
    </div>
  </div>
</section>
<section className="team">
  <div className="container">
    <h2 className="section-heading fade-in">Team</h2>
    <div className="team-members">
      {/* Team Member 1 */}
      <div className="team-member zoom-in">
        <div className="member-img">
          <Image src="/assets/images/t1.webp" alt="Team Member 1" width={200} height={200} />
        </div>
        <h3>John Smith</h3>
        <p>Farm Owner</p>
      </div>

      {/* Team Member 2 */}
      <div className="team-member zoom-in" data-delay="200">
        <div className="member-img">
          <Image src="/assets/images/t2.webp" alt="Team Member 2" width={200} height={200} />
        </div>
        <h3>Sarah Johnson</h3>
        <p>Dairy Expert</p>
      </div>

      {/* Team Member 3 */}
      <div className="team-member zoom-in" data-delay="400">
        <div className="member-img">
          <Image src="/assets/images/t3.webp" alt="Team Member 3" width={200} height={200} />
        </div>
        <h3>Laura Wilson</h3>
        <p>Cheese Maker</p>
      </div>

      {/* Team Member 4 */}
      <div className="team-member zoom-in" data-delay="600">
        <div className="member-img">
          <Image src="/assets/images/t4.webp" alt="Team Member 4" width={200} height={200} />
        </div>
        <h3>Mike Brown</h3>
        <p>Farm Manager</p>
      </div>
    </div>
  </div>
</section>
<section className="events-section">
  <div className="container">
    <div className="events-header fade-in">
      <h2>Goshala</h2>
      <h3>Recent Events</h3>
    </div>
    <div className="events-container">
      {/* Event 1 */}
      <div className="event-card slide-up">
        <div className="event-image">
          <Image src="/assets/images/festival1.webp" alt="Cultural Event" width={300} height={200} />
        </div>
        <div className="event-content">
          <h3>The Culture of India. Rebirth</h3>
          <p className="event-date">30 September 22</p>
        </div>
      </div>

      {/* Event 2 */}
      <div className="event-card slide-up" data-delay="200">
        <div className="event-image">
          <Image src="/assets/images/festival2.webp" alt="Cultural Event" width={300} height={200} />
        </div>
        <div className="event-content">
          <h3>The Culture of India. Rebirth</h3>
          <p className="event-date">30 September 22</p>
        </div>
      </div>

      {/* Event 3 */}
      <div className="event-card slide-up" data-delay="400">
        <div className="event-image">
          <Image src="/assets/images/festival3.webp" alt="Cultural Event" width={300} height={200} />
        </div>
        <div className="event-content">
          <h3>The Culture of India. Rebirth</h3>
          <p className="event-date">30 September 22</p>
        </div>
      </div>
    </div>
  </div>
  <FooterWaves />
</section>
    </FrontendLayout>
  );
}