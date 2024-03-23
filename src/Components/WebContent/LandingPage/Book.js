import React from "react";
import { useDispatch } from "react-redux";
import { decrement } from "./BookListSlice";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./BookList.module.css";

export function Book({ book, bookindex, showAddModal }) {
  const dispatch = useDispatch();

  return (
    <tr key={`book-${bookindex}`}>
      <td
        className="editable"
        key={`name-${bookindex}`}
        onClick={() => showAddModal("Edit Book", bookindex)}
      >
        {book.name}
      </td>
      <td
        className="editable rightaligned"
        key={`price-${bookindex}`}
        onClick={() => showAddModal("Edit Book", bookindex)}
      >
        {book.price}
      </td>
      <td
        className="editable"
        key={`category-${bookindex}`}
        onClick={() => showAddModal("Edit Book", bookindex)}
      >
        {book.category}
      </td>
      <td
        className="editable"
        key={`description-${bookindex}`}
        onClick={() => showAddModal("Edit Book", bookindex)}
      >
        {book.description}
      </td>
      <td>
        <button
          className={styles.button}
          onClick={() => dispatch(decrement(bookindex))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
