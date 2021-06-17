import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import BookItem from "./bookItem";
import { useState } from "react";
import { Helmet } from "react-helmet";

const BookList = () => {
  let history = useHistory();
  const books = useSelector((state) => state.books);
  const [query, setQuery] = useState("");
  const genre = useParams().genre;
  const booksTable = books
    .filter(
      (book) =>
        (!genre || book.genre.find((g) => g.toLowerCase() === genre)) &&
        book.title.toLowerCase().includes(query.toLowerCase())
    )
    .map((book) => <BookItem key={book.id} book={book} />);
  const booksGenres = [
    ...new Set(
      books.reduce((a, b) => {
        a.push(...b.genre);
        return a;
      }, [])
    ),
  ].map((genre) => (
    <option value={genre.toLowerCase()} key={genre}>
      {genre}
    </option>
  ));
  return (
    <Container>
      <Helmet>
        <title>Books List</title>
      </Helmet>
      <h2>
        Books List{" "}
        <Button as={Link} to="books/create">
          Add new
        </Button>
      </h2>
      <span className="form-inline">
        <div className="form-group  mb-2 col-lg-8">
          <input
            className="col-lg-12 form-control"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="form-group  mb-2 mb-2 col-lg-4">
          <select
            defaultValue={genre ?? ""}
            className="col-lg-12 form-control"
            onChange={(event) => history.push("/books/" + event.target.value)}
          >
            <option value="">Select genre</option>
            {booksGenres}
          </select>
        </div>
      </span>

      <Table striped bordered hover>
        <tbody>{booksTable}</tbody>
      </Table>
    </Container>
  );
};
export default BookList;
