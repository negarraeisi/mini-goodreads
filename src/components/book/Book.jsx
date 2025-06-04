import "./Book.css";
import "rsuite/dist/rsuite.min.css";
import {
  Popover,
  Dropdown,
  IconButton,
  ButtonGroup,
  Button,
  Whisper,
} from "rsuite";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import { AuthContext } from "../../App";
import React, { useState, useContext, useEffect, useCallback } from "react";

function Book(props) {
  const { user, handleLogin } = useContext(AuthContext);
  const { id, imageLink, title, author } = props;

  const options = ["Want to Read", "Read", "Currently Reading"];

  const getInitialStatus = useCallback(() => {
    const bookIdNum = Number(id);
    if (!user || isNaN(bookIdNum)) return 0;

    if (user.currentlyReading && user.currentlyReading.includes(bookIdNum)) return 2;
    if (user.read && user.read.includes(bookIdNum)) return 1;
    if (user.wantToRead && user.wantToRead.includes(bookIdNum)) return 0;
    return 0;
  }, [user, id]);

  const [action, setAction] = useState(getInitialStatus);

  useEffect(() => {
    setAction(getInitialStatus());
  }, [getInitialStatus]);

  const updateReadingList = async (bookId, newStatusKey) => {

    if (!user) {
      alert("Please sign in to manage your books.");
      return;
    }

    const currentUserId = user.id;
    const newStatus = options[newStatusKey];

    console.log("DEBUG: updateReadingList called for book:", title);
    console.log("DEBUG: received bookId prop:", bookId, " (type:", typeof bookId, ")");

    const bookIdNum = Number(bookId);
    console.log("DEBUG: converted bookIdNum:", bookIdNum, " (type:", typeof bookIdNum, ")");


    if (isNaN(bookIdNum) || bookIdNum === 0) {
      console.error("DEBUG: Invalid book ID caused alert.",
                    "Original bookId prop:", bookId,
                    "Converted bookIdNum:", bookIdNum,
                    "Book Title:", title);
      alert("Cannot update book status: Invalid book ID.");
      return;
    }

    const cleanAndUnique = (arr) =>
      Array.from(new Set(arr || []).values())
        .filter(item => typeof item === 'number' && !isNaN(item));

    let updatedWantToRead = cleanAndUnique(user.wantToRead);
    let updatedRead = cleanAndUnique(user.read);
    let updatedCurrentlyReading = cleanAndUnique(user.currentlyReading);

    updatedWantToRead = updatedWantToRead.filter((existingId) => existingId !== bookIdNum);
    updatedRead = updatedRead.filter((existingId) => existingId !== bookIdNum);
    updatedCurrentlyReading = updatedCurrentlyReading.filter((existingId) => existingId !== bookIdNum);

    if (newStatus === "Want to Read") {
      updatedWantToRead.push(bookIdNum);
    } else if (newStatus === "Read") {
      updatedRead.push(bookIdNum);
    } else if (newStatus === "Currently Reading") {
      updatedCurrentlyReading.push(bookIdNum);
    }

    const updatedUser = {
      ...user,
      wantToRead: updatedWantToRead,
      read: updatedRead,
      currentlyReading: updatedCurrentlyReading,
    };

    try {
      const response = await fetch(
        `https://minigoodreads-api.onrender.com/users/${currentUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wantToRead: updatedUser.wantToRead,
            read: updatedUser.read,
            currentlyReading: updatedUser.currentlyReading,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const responseData = await response.json();
      handleLogin(responseData);
      alert(`Book "${title}" moved to "${newStatus}"!`);
    } catch (error) {
      console.error("Error updating reading list:", error);
      alert("Failed to update book status. Please try again.");
    }
  };

  return (
    <div className="book">
      <img src={`${process.env.PUBLIC_URL}${imageLink}`} alt={title} />
      <h5>{title}</h5>
      <h6>{author}</h6>
      <ButtonGroup>
        <Button>{options[action]}</Button>
        <Whisper
          trigger="click"
          speaker={({ onClose, left, top, className }, ref) => {
            const handleSelect = (eventKey) => {
              onClose();
              setAction(eventKey);
              updateReadingList(id, eventKey); 
            };
            return (
              <Popover
                ref={ref}
                className={className}
                style={{ left, top }}
                full
              >
                <Dropdown.Menu onSelect={handleSelect}>
                  {options.map((item, index) => (
                    <Dropdown.Item key={index} eventKey={index}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Popover>
            );
          }}
        >
          <IconButton icon={<ArrowDownIcon />} />
        </Whisper>
      </ButtonGroup>
    </div>
  );
}

export default Book;