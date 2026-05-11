import React, { useState } from 'react';
import './CakeUploadForm.css';

const CakeUploadForm = () => {
  const [name, setName] = useState('');
  const [flavor, setFlavor] = useState('');
  const [size, setSize] = useState('Medium');
  const [category, setCategory] = useState('Birthday');
  const [basePrice, setBasePrice] = useState(0);
  const [images, setImages] = useState([]); 
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setMessage('Please select at least one image.');
      setIsSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('flavor', flavor);
    formData.append('size', size);
    formData.append('category', category);
    formData.append('basePrice', basePrice);
    
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/cakes/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Cake and images uploaded successfully!');
        setIsSuccess(true);
        setName('');
        setFlavor('');
        setBasePrice(0);
        setImages([]);
      } else {
        setMessage(`Upload failed: ${data.message}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error uploading cake:', error);
      setMessage('Error connecting to the server.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="container">
      <div className="upload-container">
        <header className="upload-header">
          <h2>Add New Creation</h2>
        </header>
        
        {message && (
          <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="upload-group">
            <label>Cake Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="upload-input"
              placeholder="e.g. Midnight Chocolate Dream"
            />
          </div>

          <div className="upload-group">
            <label>Primary Flavor</label>
            <input 
              type="text" 
              value={flavor} 
              onChange={(e) => setFlavor(e.target.value)} 
              required 
              className="upload-input"
              placeholder="e.g. Belgian Dark Chocolate"
            />
          </div>

          <div className="upload-group">
            <label>Base Price ($)</label>
            <input 
              type="number" 
              value={basePrice} 
              onChange={(e) => setBasePrice(e.target.value)} 
              required 
              className="upload-input"
            />
          </div>

          <div className="upload-group">
            <label>Cake Images (Select Multiple)</label>
            <div className="file-input-wrapper" onClick={() => document.getElementById('file-upload').click()}>
              <p>{images.length > 0 ? `${images.length} images selected` : 'Click to select images'}</p>
              <input 
                id="file-upload"
                type="file" 
                name="images"
                accept="image/*" 
                multiple 
                onChange={handleImageChange} 
                required 
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="upload-submit-btn">
            Publish to Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default CakeUploadForm;