import React from 'react';
import { Clock, Truck, Shield, Heart, Users, Award } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About Valley Fresh</h1>
            <p className="hero-subtitle">
              Bringing fresh groceries to your doorstep 24/7 in the beautiful Kathmandu Valley
            </p>
          </div>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          <section className="story-section">
            <div className="section-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Founded in 2024, Valley Fresh was born from a simple idea: fresh, quality groceries 
                  should be accessible to everyone in Kathmandu Valley, anytime they need them. 
                  We started as a small team of passionate individuals who believed that convenience 
                  shouldn't come at the cost of quality.
                </p>
                <p>
                  Today, we're proud to serve thousands of families across Kathmandu, Lalitpur, 
                  and Bhaktapur, delivering the freshest produce, dairy, meat, and everyday essentials 
                  right to their doorsteps. Our commitment to quality and customer satisfaction 
                  has made us the most trusted grocery delivery service in the valley.
                </p>
              </div>
              <div className="story-image">
                <img 
                  src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Fresh vegetables and fruits"
                />
              </div>
            </div>
          </section>

          <section className="values-section">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <Heart size={40} />
                </div>
                <h3>Quality First</h3>
                <p>We source only the freshest, highest-quality products from trusted local farmers and suppliers.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Clock size={40} />
                </div>
                <h3>24/7 Service</h3>
                <p>Round-the-clock availability because we know fresh food needs don't follow a schedule.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Truck size={40} />
                </div>
                <h3>Fast Delivery</h3>
                <p>Express delivery within 30 minutes across the Kathmandu Valley, guaranteed fresh.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Shield size={40} />
                </div>
                <h3>Trust & Safety</h3>
                <p>Your satisfaction is guaranteed with our 100% money-back policy and secure transactions.</p>
              </div>
            </div>
          </section>

          <section className="stats-section">
            <h2 className="section-title">Valley Fresh by Numbers</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">10,000+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">50,000+</div>
                <div className="stat-label">Orders Delivered</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">500+</div>
                <div className="stat-label">Products Available</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">25 min</div>
                <div className="stat-label">Average Delivery Time</div>
              </div>
            </div>
          </section>

          <section className="team-section">
            <div className="section-content">
              <div className="team-text">
                <h2>Our Team</h2>
                <p>
                  Behind Valley Fresh is a dedicated team of professionals who are passionate 
                  about bringing you the best grocery shopping experience. From our sourcing 
                  experts who handpick the freshest produce to our delivery heroes who ensure 
                  your orders reach you in perfect condition, every team member is committed 
                  to our mission.
                </p>
                <div className="team-highlights">
                  <div className="highlight-item">
                    <Users size={24} />
                    <span>50+ Team Members</span>
                  </div>
                  <div className="highlight-item">
                    <Award size={24} />
                    <span>Best Service Award 2024</span>
                  </div>
                </div>
              </div>
              <div className="team-image">
                <img 
                  src="https://images.pexels.com/photos/3182774/pexels-photo-3182774.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Happy team members"
                />
              </div>
            </div>
          </section>

          <section className="mission-section">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p className="mission-text">
                To revolutionize grocery shopping in Kathmandu Valley by providing unparalleled 
                convenience, quality, and service. We envision a future where fresh, healthy food 
                is accessible to every household, supporting both our customers' well-being and 
                our local farming community.
              </p>
              <div className="mission-goals">
                <div className="goal-item">✓ Support local farmers and suppliers</div>
                <div className="goal-item">✓ Reduce food waste through efficient distribution</div>
                <div className="goal-item">✓ Promote healthy eating habits</div>
                <div className="goal-item">✓ Create employment opportunities</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;