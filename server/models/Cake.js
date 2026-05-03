import mongoose from 'mongoose';

const cakeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    flavor: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: ['Small', 'Medium', 'Large', 'Extra Large'],
    },
    dietaryRestrictions: [
      {
        type: String,
        enum: ['Gluten-Free', 'Vegan', 'Nut-Free', 'Dairy-Free', 'None'],
      },
    ],
    basePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['Wedding', 'Birthday', 'Anniversary', 'Custom'],
    },
    images: [
      {
        type: String, // Array of URLs to images
      },
    ],
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Cake = mongoose.model('Cake', cakeSchema);

export default Cake;