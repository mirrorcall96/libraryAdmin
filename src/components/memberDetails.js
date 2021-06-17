import { Card, Button } from "react-bootstrap";
import { useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteMember, unborrowBook } from "../store/actions";
import goldImage from "../image/gold.png";
import platinumImage from "../image/platinum.png";
import silverImage from "../image/silver.png";
import { Helmet } from "react-helmet";

const image = { gold: goldImage, platinum: platinumImage, silver: silverImage };
const MemberDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const memberSlug = useParams().memberSlug;
  const members = useSelector((state) => state.members);
  const myMember = members.find((member) => member.slug === memberSlug);
  const books = useSelector((state) => state.books);
  if (!myMember) {
    return <Redirect to="/404" />;
  }
  const { id, slug, firstName, lastName, membership, currentlyBorrowedBooks } =
    myMember;
  const borrowedBooks = books
    .filter((book) => currentlyBorrowedBooks.includes(book.id))
    .map((book) => (
      <li
        onClick={() => history.push("/books/" + book.slug)}
        key={book.slug}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {book.title}
        <img
          width="80px"
          src={book.image}
          className="img-fluid"
          alt={book.title}
        />
      </li>
    ));
  const historyBooks = books
    .filter(
      (book) =>
        book.borrowedBy.includes(id) &&
        !currentlyBorrowedBooks.includes(book.id)
    )
    .map((book) => (
      <img
        key={book.id}
        width="80px"
        src={book.image}
        className="img-fluid"
        alt={book.title}
        title={book.title}
        onClick={() => history.push("/books/" + book.slug)}
      />
    ));
  return (
    <>
      <Helmet>
        <title>{`${firstName} ${lastName}`}</title>
      </Helmet>

      <div className="container vertical-center">
        <div className="row">
          <Card style={{ width: "28rem" }} className="mx-auto">
            <img
              className="mx-auto d-block"
              variant="top"
              style={{ width: "4rem" }}
              src={image[membership]}
              alt={membership}
            />
            <Card.Body>
              <Card.Title>
                <center>{`${firstName} ${lastName}`}</center>
              </Card.Title>
              <Card.Text>
                <center>
                  <Button
                    onClick={() => history.push("/members/" + slug + "/edit")}
                    variant="dark"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      dispatch(deleteMember(id));
                      dispatch(unborrowBook(currentlyBorrowedBooks));
                      history.push("/members/");
                    }}
                    variant="danger"
                  >
                    Remove
                  </Button>
                </center>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="row">
          <div className="mx-auto">
            <h6 className="text-muted">
              Borrowed Books ({borrowedBooks.length})
            </h6>
            <ul className="list-group" style={{ width: "28rem" }}>
              {borrowedBooks}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="mx-auto">
            <h6 className="text-muted">History ({historyBooks.length})</h6>
            <ul className="list-group" style={{ width: "28rem" }}>
              <li className="list-group-item d-flex justify-content-around align-items-center">
                {historyBooks}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberDetails;
