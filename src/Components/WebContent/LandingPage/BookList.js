import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, update, selectBookList } from "./BookListSlice";
import { Book } from "./Book";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./BookList.module.css";

export function BookList() {
  const bookList = useSelector(selectBookList);
  const dispatch = useDispatch();

  const [modalTitle, setModalTitle] = useState("");
  const [bookIndex, setBookIndex] = useState(0);

  const updateInput = (name, input) => {
    setNewBook({ ...newBook, [name]: input });
  };

  const [newBook, setNewBook] = useState({
    name: "",
    price: 0.0,
    category: "",
    description: "",
  });

  const resetModal = () => {
    setNewBook({
      name: "",
      price: 0.0,
      category: "",
      description: "",
    });
  };

  const [showAdd, setShowAdd] = useState(false);
  const showAddModal = (title, index) => {
    setShowAdd(true);
    setModalTitle(title);
    //console.log("40: " + JSON.stringify(newBook));
    //console.log("41: " + JSON.stringify(bookList));
    //console.log("42: " + title + ", index: " + JSON.stringify(index));
    if (typeof index !== "undefined") {
      setNewBook(bookList[index]);
      setBookIndex(index);
    }
    //console.log("47: " + JSON.stringify(newBook));
  };
  const hideAddModal = () => setShowAdd(false);

  return (
    <div>
      <button
        className={styles.button}
        onClick={() => {
          resetModal();
          showAddModal("Add Book");
        }}
      >
        Add
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, i) => {
            return (
              <Book
                key={`book-${i}`}
                book={book}
                bookindex={i}
                showAddModal={showAddModal}
              />
            );
          })}
        </tbody>
      </table>

      <Modal show={showAdd} onHide={() => hideAddModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input value={bookIndex} type="hidden" name="bookindex" />
          <label>
            Name:
            <input
              value={newBook.name}
              type="text"
              onChange={(e) => updateInput("name", e.target.value)}
              name="name"
            />
          </label>
          <label>
            Price:
            <input
              value={newBook.price === 0 ? "" : newBook.price}
              type="number"
              onChange={(e) =>
                updateInput("price", parseFloat(e.target.value))
              }
              name="price"
            />
          </label>
          <label>
            Category:
            <input
              value={newBook.category}
              type="text"
              onChange={(e) => updateInput("category", e.target.value)}
              name="category"
            />
          </label>
          <label>
            Description:
            <input
              value={newBook.description}
              type="text"
              onChange={(e) => updateInput("description", e.target.value)}
              name="description"
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              newBook.price = parseFloat(newBook.price);
              if(newBook.name === "" || newBook.price <= 0) {
                return alert("Name and price should not be empty.");
              }
              if (modalTitle === "Add Book") {
                dispatch(increment(newBook));
              } else if (modalTitle === "Edit Book") {
                dispatch(update({ bookindex: bookIndex, values: newBook }));
              }
              hideAddModal();
              resetModal();
            }}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={() => hideAddModal()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
