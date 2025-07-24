'use client';

import FrontendLayout from "../layout/app/page";
import FooterWaves from '../layout/footerwave/page';
import "../../../styles/frontend/about.css";
export default function AboutUs() {
  return (
    <FrontendLayout>
    <section className="start-section">
      {/* Banner Section */}
      <section className="banner">
        <h1>ABOUT US</h1>
      </section>

      <div className="main-section container" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
        <br />
        <h3 className="head-title">Introduction</h3>
        <br />
        <p className="description">
          Welcome to Gowsala, where our passion for cattle and sustainable farming drives everything we do. For
          generations, we have been dedicated to raising high-quality cattle, ensuring the well-being of our livestock,
          and promoting responsible farming practices. Our commitment to excellence and ethical agriculture makes us a
          trusted name in the industry.
        </p>
        <br />
        <h3 className="head-title">Our Story</h3>
        <br />
        <p className="description">
          Our journey began with a simple vision: to provide the best quality cattle while maintaining a deep respect
          for the land and animals. What started as a small family farm has grown into a thriving business built on
          tradition, innovation, and dedication. Through hard work, perseverance, and a love for what we do, we have
          expanded our operations while staying true to our core values of honesty, quality, and sustainability.
        </p>
        <br />
        <h3 className="head-title">Farm Tours</h3>
        <br />
        <p className="description">
          We believe in transparency and love sharing our passion with others. Our farm tours offer a unique opportunity
          to experience the daily operations of a working cattle farm. Visitors can see firsthand how we care for our
          livestock, learn about responsible farming practices, and gain insight into the importance of sustainable
          agriculture. Whether you&apos;re a cattle enthusiast, a student, or simply curious about farm life, we welcome you
          to visit and connect with nature in a meaningful way.
        </p>
        <br />
        <h3 className="head-title">Sustainability</h3>
        <br />
        <p className="description">
          Sustainability is at the heart of our operations. We take great care in managing our resources responsibly to
          ensure a better future for both our farm and the environment. Our sustainable practices include rotational
          grazing, water conservation, and natural feeding methods to promote the health of our cattle and the land
          they graze on. By prioritizing eco-friendly initiatives, we strive to minimize our environmental impact and
          contribute to a greener planet.
          <br />
          Join us on our journey as we continue to raise premium cattle with integrity and sustainability. Whether
          you&apos;re looking for top-quality livestock, an educational farm experience, or insight into ethical farming,
          Gowsala is here to provide you with excellence every step of the way.
        </p>
      </div>

      {/* Footer Waves */}
      <FooterWaves />
    </section>
    </FrontendLayout>
  );
}