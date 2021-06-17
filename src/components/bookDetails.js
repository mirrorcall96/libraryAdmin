import { Card, Button } from "react-bootstrap";
import { useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import goldImage from "../image/gold.png";
import platinumImage from "../image/platinum.png";
import silverImage from "../image/silver.png";
import { deleteBook } from "../store/actions";
import { Helmet } from "react-helmet";

const imagemember = {
  gold: goldImage,
  platinum: platinumImage,
  silver: silverImage,
};

const BookDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bookSlug = useParams().bookSlug;
  const books = useSelector((state) => state.books);
  const members = useSelector((state) => state.members);
  const myBook = books.find((book) => book.slug === bookSlug);
  if (!myBook) {
    return <Redirect to="/404" />;
  }

  const { id, slug, title, image, borrowedBy, available } = myBook;
  let historyOwners = members.filter((member) =>
    borrowedBy.includes(member.id)
  );
  console.log(borrowedBy);
  let currentOwner = !available ? borrowedBy[borrowedBy.length - 1] : "";
  if (currentOwner) {
    historyOwners = historyOwners.filter(
      (member) => member.id !== currentOwner
    );
    currentOwner = members.find((member) => member.id === currentOwner);
    let currentslug = currentOwner.slug;
    currentOwner = (
      <li
        onClick={() => history.push("/members/" + currentslug)}
        key={currentOwner.slug}
        className="list-group-item d-flex align-items-center "
      >
        <img
          width="30px"
          src={imagemember[currentOwner.membership]}
          className="img-fluid"
          alt={`${currentOwner.firstName} ${currentOwner.lastName}`}
        />
        {`${currentOwner.firstName} ${currentOwner.lastName}`}
      </li>
    );
  }
  historyOwners = historyOwners.map((member) => (
    <li
      onClick={() => history.push("/members/" + member.slug)}
      key={member.slug}
      className="list-group-item d-flex align-items-center "
    >
      <img
        width="30px"
        src={imagemember[member.membership]}
        className="img-fluid"
        alt={`${member.firstName} ${member.lastName}`}
      />
      {`${member.firstName} ${member.lastName}`}
    </li>
  ));

  return (
    <>
      <div className="container vertical-center">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="row">
          <Card style={{ width: "28rem" }} className="mx-auto">
            <img
              className="mx-auto d-block"
              variant="top"
              style={{ width: "15rem" }}
              src={image}
              alt={title}
            />
            <Card.Body>
              <Card.Title>
                <center>{`${title}`}</center>
              </Card.Title>
              <Card.Text>
                <center>
                  <Button
                    onClick={() => history.push("/books/" + slug + "/edit")}
                    variant="dark"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => {
                      dispatch(deleteBook(id));
                      history.push("/books/");
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
            <h6 className="text-muted">Current Owner</h6>
            <ul className="list-group" style={{ width: "28rem" }}>
              {currentOwner}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="mx-auto">
            <h6 className="text-muted">
              Previous Owners ({historyOwners.length})
            </h6>
            <ul className="list-group" style={{ width: "28rem" }}>
              {historyOwners}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookDetails;
