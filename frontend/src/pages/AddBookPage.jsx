import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setISBN] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [borrower, setBorrower] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();

  const addBook = async (newBook) => {
    try {
      console.log("Adding book:", newBook);
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) {
        throw new Error("Failed to add book");
      }
      return true;
    } catch (error) {
      console.error("Error adding book:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newdBook = {
      title,
      author,
      isbn,
      publisher,
      genre,
      availability: {
        isAvailable,
        borrower,
      },
    };

    const success = await addBook(newdBook);
    if (success) {
      console.log("Book Added Successfully");
      navigate("/");
    } else {
      console.error("Failed to add the book");
    }
  };

  const handleAvailabilityChange = (e) => {
    setIsAvailable(e.target.value === "Yes");
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>ISBN:</label>
        <input
          type="text"
          required
          value={isbn}
          onChange={(e) => setISBN(e.target.value)}
        />
        <label>Publisher:</label>
        <input
          type="text"
          required
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <label>Genre:</label>
        <input
          type="text"
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label>Availability:</label>
        <select
          value={isAvailable ? "Yes" : "No"}
          onChange={handleAvailabilityChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <label>borrower:</label>
        <input
          type="text"
          required
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
