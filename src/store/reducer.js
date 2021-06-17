import books from "../data/books";
import members from "../data/members";
import {
  ADD_BOOK,
  ADD_MEMBER,
  BORROW_BOOK,
  DELETE_BOOK,
  DELETE_MEMBER,
  UNBORROW_BOOK,
  UPDATE_BOOK,
  UPDATE_MEMBER,
} from "./actions";
import slugify from "react-slugify";
const initialState = {
  books,
  members,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBER:
      const newMember = action.payload.member;
      newMember.id = state.members[state.members.length - 1].id + 1;
      newMember.slug = slugify(`${newMember.firstName} ${newMember.lastName}`);
      return { ...state, members: [...state.members, newMember] };
    case UPDATE_MEMBER:
      let updatedMember = state.members.find(
        (member) => member.id === action.payload.member.id
      );
      updatedMember = { ...updatedMember, ...action.payload.member };
      updatedMember.slug = slugify(
        `${updatedMember.firstName} ${updatedMember.lastName}`
      );
      const updatedMembers = state.members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      );
      return { ...state, members: updatedMembers };
    case DELETE_MEMBER:
      const deletedMembers = state.members.filter(
        (member) => member.id !== action.payload.memberId
      );
      return { ...state, members: deletedMembers };
    case BORROW_BOOK:
      let myMemberId;
      if (!action.payload.memberId) {
        myMemberId = state.members[state.members.length - 1].id;
      } else {
        myMemberId = action.payload.memberId;
      }
      const updatedBooksBorrow = state.books.map((book) => {
        if (action.payload.bookIds.includes(book.id)) {
          book.available = false;
          book.borrowedBy = book.borrowedBy.filter(
            (memberid) => memberid !== myMemberId
          );
          book.borrowedBy.push(myMemberId);
        }
        return book;
      });
      return { ...state, books: updatedBooksBorrow };
    case UNBORROW_BOOK:
      const updatedUnborowbook = state.books.map((book) => {
        if (action.payload.bookIds.includes(book.id)) {
          book.available = true;
        }
        return book;
      });
      return { ...state, books: updatedUnborowbook };
    case ADD_BOOK:
      const newBook = action.payload.book;
      newBook.id = state.books[state.books.length - 1].id + 1;
      newBook.slug = slugify(newBook.title);
      return { ...state, books: [...state.books, newBook] };
    case DELETE_BOOK:
      const deletedBooks = state.books.filter(
        (book) => book.id !== action.payload.bookId
      );
      return { ...state, books: deletedBooks };
    case UPDATE_BOOK:
      let updatedbook = state.books.find(
        (book) => book.id === action.payload.book.id
      );
      updatedbook = { ...updatedbook, ...action.payload.book };
      updatedbook.slug = slugify(updatedbook.title);
      const updatedBooks = state.books.map((book) =>
        book.id === updatedbook.id ? updatedbook : book
      );
      return { ...state, books: updatedBooks };
    default:
      return state;
  }
};
export default reducer;
