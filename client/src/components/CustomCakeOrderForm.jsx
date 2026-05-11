import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CustomCakeOrderForm.css';

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

  return (
    <div className="container">
      <div className="form-container">
        <header className="form-header">
          <h2>Custom Cake Inquiry</h2>
          <p>Complete the form to send us your order via WhatsApp.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label>Selected Cake Style</label>
            <input type="text" name="cakeType" value={formData.cakeType} onChange={handleChange} required className="form-input" placeholder="e.g. Wedding, Birthday, or specific model" />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Size</label>
              <select name="size" value={formData.size} onChange={handleChange} className="form-input">
                <option value="Small">Small (6-8 portions)</option>
                <option value="Medium">Medium (10-15 portions)</option>
                <option value="Large">Large (20-25 portions)</option>
                <option value="Tiered">Tiered / Event</option>
              </select>
            </div>
            <div className="form-group">
              <label>Base Flavor</label>
              <select name="flavor" value={formData.flavor} onChange={handleChange} className="form-input">
                <option value="Vanilla Bean">Vanilla Bean</option>
                <option value="Double Chocolate">Double Chocolate</option>
                <option value="Red Velvet">Red Velvet</option>
                <option value="Zesty Lemon">Zesty Lemon</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Dietary Options</label>
            <div className="dietary-options">
              {['Gluten-Free', 'Vegan', 'Nut-Free'].map((dr) => (
                <label key={dr} className="dietary-checkbox">
                  <input type="checkbox" value={dr} onChange={handleDietaryChange} /> {dr}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Design Notes / Hebrew Inscriptions</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" className="form-input" placeholder="Add any specific details or the text you want on the cake..."></textarea>
          </div>

          <button type="submit" className="btn-primary form-submit-btn">
            Send Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomCakeOrderForm;