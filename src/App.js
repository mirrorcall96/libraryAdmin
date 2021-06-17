import { Image, Navbar, Nav } from "react-bootstrap";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Logo from "./image/logo.png";
import MemberList from "./components/membersList";
import MemberDetails from "./components/memberDetails";
import MembersForm from "./components/membersForm";

import BookList from "./components/bookList";
import BookDetails from "./components/bookDetails.js";
import BookForm from "./components/bookForm";
import { useSelector } from "react-redux";

import Home from "./components/home";
import { Helmet } from "react-helmet";

function App() {
  const books = useSelector((state) => state.books);
  const booksGenres = [
    ...new Set(
      books.reduce((a, b) => {
        a.push(...b.genre);
        return a;
      }, [])
    ),
  ]
    .join("|")
    .toLowerCase();
  return (
    <>
      <Navbar bg="light" expand="lg" className="">
        <Navbar.Brand as={Link} to="/">
          <Image width="7%" height="7%" src={Logo} />
          Library
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/members">
            Members
          </Nav.Link>
          <Nav.Link as={Link} to="/books">
            Books
          </Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path={["/members/:memberSlug/edit", "/members/create"]}>
          <MembersForm />
        </Route>
        <Route exact path="/members/:memberSlug">
          <MemberDetails />
        </Route>
        <Route exact path="/members/">
          <MemberList />
        </Route>
        <Route exact path={["/books/:bookSlug/edit", "/books/create"]}>
          <BookForm />
        </Route>
        <Route exact sensitive path={`/books/:genre(${booksGenres})?`}>
          <BookList />
        </Route>
        <Route exact path="/books/:bookSlug">
          <BookDetails />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <Helmet>
            <title>Not Found</title>
          </Helmet>
          <center>
            <h1>404 Not Found</h1>
          </center>
        </Route>
      </Switch>
    </>
  );
}

export default App;
