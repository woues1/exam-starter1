const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  publisher: { type: String, required: true },
  genre: { type: String, required: true },
  availability: {
    isAvailable: { type: Boolean, required: true },
    dueDate: { type: Date },
    borrower: { type: String }
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


//add  virtual field id
bookSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});
    
    

module.exports = mongoose.model('Book', bookSchema);

