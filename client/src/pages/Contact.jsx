import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const WHATSAPP_NUMBER = '0542313638'; // Replace with your actual number

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const waMessage = `*New Contact Inquiry* ✉️
--------------------------
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📌 *Subject:* ${formData.subject}
💬 *Message:* ${formData.message}`;

    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '4rem auto',
    padding: '3rem',
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'var(--shadow)',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    marginTop: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1.5rem',
  };

  return (
    <div className="container">
      <div style={containerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>Contact Us</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '2rem' }}>
          Have a question? Send us a message directly on WhatsApp.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ fontWeight: '600' }}>Your Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />

          <label style={{ fontWeight: '600' }}>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />

          <label style={{ fontWeight: '600' }}>Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required style={inputStyle} />

          <label style={{ fontWeight: '600' }}>Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" style={inputStyle}></textarea>

          <button type="submit" className="btn-gold" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
            Chat on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;