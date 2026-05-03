import React, { useState } from 'react';

const CakeUploadForm = () => {
  const [name, setName] = useState('');
  const [flavor, setFlavor] = useState('');
  const [size, setSize] = useState('Medium');
  const [category, setCategory] = useState('Birthday');
  const [basePrice, setBasePrice] = useState(0);
  const [images, setImages] = useState([]); // Changed to an array for multiple files
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    // Convert FileList to an Array
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setMessage('Please select at least one image.');
      return;
    }

    // 1. Prepare FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('flavor', flavor);
    formData.append('size', size);
    formData.append('category', category);
    formData.append('basePrice', basePrice);
    
    // Iterate and append each image to the 'images' field
    // The name 'images' MUST match upload.array('images') in the backend
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      // 2. Send POST Request
      const response = await fetch('http://localhost:5000/api/cakes/upload', {
        method: 'POST',
        body: formData, // Do NOT set Content-Type header; fetch does it for you
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Cake and images uploaded successfully!');
        console.log('Success:', data);
        // Reset form
        setName('');
        setFlavor('');
        setImages([]);
      } else {
        setMessage(`Upload failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error uploading cake:', error);
      setMessage('Error connecting to the server.');
    }
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const inputGroupStyle = {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Cake</h2>
      
      {message && <p style={{ textAlign: 'center', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={inputGroupStyle}>
          <label>Cake Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ padding: '0.5rem' }}
          />
        </div>

        <div style={inputGroupStyle}>
          <label>Flavor:</label>
          <input 
            type="text" 
            value={flavor} 
            onChange={(e) => setFlavor(e.target.value)} 
            required 
            style={{ padding: '0.5rem' }}
          />
        </div>

        <div style={inputGroupStyle}>
          <label>Base Price:</label>
          <input 
            type="number" 
            value={basePrice} 
            onChange={(e) => setBasePrice(e.target.value)} 
            required 
            style={{ padding: '0.5rem' }}
          />
        </div>

        <div style={inputGroupStyle}>
          <label>Select Local Images (Multiple):</label>
          <input 
            type="file" 
            name="images"
            accept="image/*" 
            multiple 
            onChange={handleImageChange} 
            required 
            style={{ marginTop: '0.5rem' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Upload Cake
        </button>
      </form>
    </div>
  );
};

export default CakeUploadForm;