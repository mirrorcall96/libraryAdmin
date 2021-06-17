import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import MultiSelect from "react-multi-select-component";
import { addBook, updateBook, updateMember } from "../store/actions";
import { Helmet } from "react-helmet";

const BookForm = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const books = useSelector((state) => state.books);
  const history = useHistory();
  const bookSlug = useParams().bookSlug;
  const tier = { silver: 2, gold: 3, platinum: 5 };
  let myBook;

  if (bookSlug) myBook = books.find((book) => book.slug === bookSlug);
  else
    myBook = {
      image: "",
      author: "",
      title: "",
      genre: [],
      borrowedBy: [],
      available: true,
    };
  let options = [];
  books.forEach((book) => {
    book.genre.forEach((a) => {
      if (!options.includes(a)) options.push(a);
    });
  });
  options = options.map((a) => ({ label: a, value: a }));

  const [book, setBook] = useState(myBook);

  let currentOwner = "";
  const availableMembers = members
    .filter((member) => {
      if (myBook.id && member.currentlyBorrowedBooks.includes(myBook.id))
        currentOwner = member;
      return (
        member.currentlyBorrowedBooks.length + 1 <= tier[member.membership] ||
        (myBook.id && member.currentlyBorrowedBooks.includes(myBook.id))
      );
    })
    .map((member) => (
      <option
        key={member.id}
        value={member.id}
      >{`${member.firstName} ${member.lastName}`}</option>
    ));
  const [newOwner, setNewOwner] = useState(
    currentOwner === "" ? currentOwner : currentOwner.id
  );
  if (!myBook) {
    return <Redirect to="/404" />;
  }
  const handelChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };
  const handelChangeSelect = (event) => {
    setBook({
      ...book,
      genre: event.map((a) => a.value),
    });
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    //addBook;
    let newborrowedBy = [...book.borrowedBy];

    if (newOwner !== "") {
      newborrowedBy = book.borrowedBy.filter((b) => b !== +newOwner);
      console.log(newborrowedBy);
      newborrowedBy.push(+newOwner);
    }
    if (!bookSlug)
      dispatch(
        addBook({
          ...book,
          available: newOwner === "",
          borrowedBy: newborrowedBy,
        })
      );
    else
      dispatch(
        updateBook({
          ...book,
          available: newOwner === "",
          borrowedBy: newborrowedBy,
        })
      );
    if (currentOwner !== "") {
      let oldMember = members.find((member) => member.id === currentOwner.id);
      console.log(oldMember);
      oldMember.currentlyBorrowedBooks =
        oldMember.currentlyBorrowedBooks.filter((a) => a !== book.id);
      dispatch(updateMember(oldMember));
    }
    if (newOwner !== "") {
      let thisBook;
      if (book.id) thisBook = book.id;
      else thisBook = books[books.length - 1].id + 1;
      let newMember = members.find((member) => member.id === +newOwner);
      newMember.currentlyBorrowedBooks.push(thisBook);
      console.log(thisBook);

      dispatch(updateMember(newMember));
    }
    handelRest();
    history.push("/books");
  };
  const handelRest = () => {
    setBook({
      image: "",
      author: "",
      title: "",
      genre: [],
      borrowedBy: [],
      available: true,
    });
  };
  const ImageCover = (
    <img
      style={{ paddingBottom: "30px" }}
      className="mx-auto d-block"
      alt={book.title}
      width="250px"
      src={book.image}
    />
  );
  return (
    <div className="d-flex justify-content-center">
      <Helmet>
        <title>{bookSlug ? "Edit" : "Create"} Book</title>
      </Helmet>

      <div className="jumbotron" style={{ paddingTop: "30px", width: "400px" }}>
        {book.image ? ImageCover : ""}
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <div className="input-group mb-2 mr-sm-2">
              <input
                value={book.title}
                name="title"
                type="text"
                className="form-control"
                onChange={handelChange}
                placeholder="Title"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Book Genere</label>
            <MultiSelect
              options={options}
              value={book.genre.map((a) => ({
                label: a,
                value: a,
              }))}
              onChange={handelChangeSelect}
              hasSelectAll={false}
            />
          </div>
          <div className="form-group">
            <label>Book Image</label>

            <div className="input-group mb-2 mr-sm-2">
              <input
                value={book.image}
                name="image"
                type="url"
                className="form-control"
                onChange={handelChange}
                placeholder="image"
              />
            </div>
          </div>
          <div className="form-group">
            <label>{book.available ? "Give to :" : "Borrowed By"}</label>
            <select
              className="form-control"
              defaultValue={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
            >
              <option value="">
                {book.available ? "No One" : "Remove Owner"}
              </option>
              {availableMembers}
            </select>
          </div>

          <center>
            <button type="submit" className="btn btn-primary">
              {bookSlug ? "Edit" : "Submit"}
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
