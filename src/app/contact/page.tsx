import FooterWaves from '../layout/footerwave/page';
import Layout from "../layout/app/page";
import "../../../styles/frontend/contact.css";
export default function ContactUs() {
  return (
    <Layout>
    <section className="start-section">
      {/* Banner Section */}
      <section className="banner">
        <h1>Contacts</h1>
      </section>

      <div className="main-section container" style={{ marginTop: '3rem' }}>
        {/* Map and Form Section */}
        <section className="map-form-container">
          {/* Map Container */}
          <div className="map-container">
            <div className="contactBox">
              <div className="row">
                <h2 className="letsconnect">
                  <span className="floatNone black">Let&apos;s </span> Connect
                </h2>
                <div className="row">
                  <div className="contactaddress">
                    <div className="row">
                      <i className="fa fa-3x fa-map-signs sign"></i> <strong> Govans Gowsala </strong>
                      <br />
                      <br />
                      201, M Square Commercial Building, Near Double Tree Hotel, Bur Dubai, Dubai, UAE
                    </div>
                    <div className="row newrow">
                      <i className="fab fa-whatsapp"></i>
                      <a href="#" target="_blank" aria-label="WhatsApp" className="grey floatNone">
                        +971-55&nbsp;590&nbsp;3386
                      </a>
                    </div>
                    <div className="row newrow">
                      <i className="fa fa-phone"></i>
                      <a href="#" aria-label="Contactno" className="grey floatNone">
                        +971-4 546 4650
                      </a>{' '}
                      (10:00 AM to 7:00 PM Available)
                    </div>
                    <div className="row newrow">
                      <i className="fa fa-phone"></i>
                      <a href="#" aria-label="Alternateno" className="grey floatNone">
                        +91 01142428686
                      </a>{' '}
                      (24X7 Available)
                    </div>
                    <div className="row newrow">
                      <i className="fa fa-envelope"></i>
                      <a href="mailto:contact@bookmybooking.com" aria-label="email" className="grey floatNone">
                        contact@bookmybooking.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="form-container">
            <h2 className="letsconnect">Send Message</h2>
            <p style={{ color: 'red' }}>* The following info is required</p>
            <form id="contactForm">
              <div className="form-group-contact">
                <input type="text" id="firstName" placeholder="First Name *" required />
              </div>
              <div className="form-group-contact">
                <input type="text" id="lastName" placeholder="Last Name *" />
              </div>
              <div className="form-group-contact">
                <input type="email" id="email" placeholder="Email" required />
              </div>
              <div className="form-group-contact">
                <input type="tel" id="phone" placeholder="Phone *" required />
              </div>
              <div className="form-group-contact">
                <textarea id="message" placeholder="Message" rows={5}></textarea>
              </div>
              <div className="form-group-contact">
                <button type="submit" className="send-btn">
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Footer Waves */}
      <FooterWaves />
    </section>
    </Layout>
  );
}