import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCakeOrderForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCake = queryParams.get('cake') || '';

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    cakeType: initialCake,
    size: 'Medium',
    flavor: 'Vanilla Bean',
    dietaryRestrictions: [],
    notes: '',
  });

  const WHATSAPP_NUMBER = '972500000000'; // Replace with your actual number

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDietaryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, dietaryRestrictions: [...prev.dietaryRestrictions, value] };
      } else {
        return { ...prev, dietaryRestrictions: prev.dietaryRestrictions.filter((item) => item !== value) };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Format the data for WhatsApp
    const message = `*New Cake Order Request* 🎂
--------------------------
👤 *Customer:* ${formData.customerName}
📞 *Phone:* ${formData.phone}
🍰 *Cake Type:* ${formData.cakeType}
📏 *Size:* ${formData.size}
🍦 *Flavor:* ${formData.flavor}
🚫 *Dietary:* ${formData.dietaryRestrictions.join(', ') || 'None'}
📝 *Notes:* ${formData.notes || 'No special requests'}`;

    // 2. Encode the message
    const encodedMessage = encodeURIComponent(message);

    // 3. Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const formContainerStyle = {
    maxWidth: '800px',
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
    fontFamily: 'var(--font-sans)',
  };

  return (
    <div className="container">
      <div style={formContainerStyle}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Custom Cake Inquiry</h2>
          <p style={{ color: 'var(--text-light)' }}>Complete the form to send us your order via WhatsApp.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontWeight: '600' }}>Your Name</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontWeight: '600' }}>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: '600' }}>Selected Cake Style</label>
            <input type="text" name="cakeType" value={formData.cakeType} onChange={handleChange} required style={inputStyle} placeholder="e.g. Wedding, Birthday, or specific model" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontWeight: '600' }}>Size</label>
              <select name="size" value={formData.size} onChange={handleChange} style={inputStyle}>
                <option value="Small">Small (6-8 portions)</option>
                <option value="Medium">Medium (10-15 portions)</option>
                <option value="Large">Large (20-25 portions)</option>
                <option value="Tiered">Tiered / Event</option>
              </select>
            </div>
            <div>
              <label style={{ fontWeight: '600' }}>Base Flavor</label>
              <select name="flavor" value={formData.flavor} onChange={handleChange} style={inputStyle}>
                <option value="Vanilla Bean">Vanilla Bean</option>
                <option value="Double Chocolate">Double Chocolate</option>
                <option value="Red Velvet">Red Velvet</option>
                <option value="Zesty Lemon">Zesty Lemon</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: '600' }}>Dietary Options</label>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
              {['Gluten-Free', 'Vegan', 'Nut-Free'].map((dr) => (
                <label key={dr} style={{ cursor: 'pointer' }}>
                  <input type="checkbox" value={dr} onChange={handleDietaryChange} style={{ marginRight: '0.5rem' }} /> {dr}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontWeight: '600' }}>Design Notes / Hebrew Inscriptions</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" style={inputStyle} placeholder="Add any specific details or the text you want on the cake..."></textarea>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem' }}>
            Send Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomCakeOrderForm;