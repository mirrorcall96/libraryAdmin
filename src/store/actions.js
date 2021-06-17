export const ADD_MEMBER = "ADD_MEMBER";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
export const DELETE_MEMBER = "DELETE_MEMBER";

export const BORROW_BOOK = "BORROW_BOOK";
export const UNBORROW_BOOK = "UNBORROW_BOOK";

export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const addMember = (member) => {
  return {
    type: ADD_MEMBER,
    payload: {
      member,
    },
  };
};
export const updateMember = (member) => {
  return {
    type: UPDATE_MEMBER,
    payload: {
      member,
    },
  };
};
export const deleteMember = (memberId) => {
  return {
    type: DELETE_MEMBER,
    payload: {
      memberId,
    },
  };
};
export const borrowBook = (memberId, bookIds) => {
  return {
    type: BORROW_BOOK,
    payload: {
      memberId,
      bookIds,
    },
  };
};
export const unborrowBook = (bookIds) => {
  return {
    type: UNBORROW_BOOK,
    payload: {
      bookIds,
    },
  };
};
export const addBook = (book) => {
  return {
    type: ADD_BOOK,
    payload: {
      book,
    },
  };
};
export const updateBook = (book) => {
  return {
    type: UPDATE_BOOK,
    payload: {
      book,
    },
  };
};
export const deleteBook = (bookId) => {
  return {
    type: DELETE_BOOK,
    payload: {
      bookId,
    },
  };
};
