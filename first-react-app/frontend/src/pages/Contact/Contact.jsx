import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">
              We're here to help! Reach out to us for any questions, concerns, or feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p className="contact-description">
                Have questions about our products or services? Need help with an order? 
                Our friendly customer support team is here to assist you 24/7.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Address</h3>
                    <p>Kathmandu Valley, Nepal<br />Serving Kathmandu, Lalitpur & Bhaktapur</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Phone</h3>
                    <p>+977-9841234567<br />+977-9851234567</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Email</h3>
                    <p>info@valleyfresh.com<br />support@valleyfresh.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Clock size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Operating Hours</h3>
                    <p>24/7 Delivery Service<br />Customer Support: Always Available</p>
                  </div>
                </div>
              </div>

              <div className="support-channels">
                <h3>Other Ways to Reach Us</h3>
                <div className="channels-grid">
                  <div className="channel-item">
                    <MessageCircle size={20} />
                    <span>Live Chat</span>
                  </div>
                  <div className="channel-item">
                    <Phone size={20} />
                    <span>WhatsApp</span>
                  </div>
                  <div className="channel-item">
                    <Mail size={20} />
                    <span>Email Support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send us a Message</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="delivery">Delivery Issue</option>
                    <option value="product">Product Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  <Send size={20} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          <div className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What areas do you deliver to?</h3>
                <p>We deliver throughout Kathmandu Valley including Kathmandu, Lalitpur, and Bhaktapur districts.</p>
              </div>
              
              <div className="faq-item">
                <h3>How fast is your delivery?</h3>
                <p>We offer express delivery within 30 minutes for most areas, with 24/7 availability.</p>
              </div>
              
              <div className="faq-item">
                <h3>Do you have a minimum order amount?</h3>
                <p>No minimum order required. However, free delivery is available on orders above ₹1000.</p>
              </div>
              
              <div className="faq-item">
                <h3>What payment methods do you accept?</h3>
                <p>We accept cash on delivery, mobile banking, and all major credit/debit cards.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I return or exchange products?</h3>
                <p>Yes, we offer 100% money-back guarantee if you're not satisfied with the quality.</p>
              </div>
              
              <div className="faq-item">
                <h3>How do I track my order?</h3>
                <p>You'll receive SMS updates and can track your order in real-time through our website.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;