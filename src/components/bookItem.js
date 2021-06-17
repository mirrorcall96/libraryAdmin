import { useHistory } from "react-router";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../store/actions";
const BookItem = (props) => {
  const dispatch = useDispatch();
  const { id, available, title, slug } = props.book;
  const members = useSelector((state) => state.members);
  const history = useHistory();
  const owner = members.find((member) =>
    member.currentlyBorrowedBooks.includes(id)
  );
  const renderTooltip = (
    <Tooltip id="button-tooltip">
      {owner ? `${owner.firstName} ${owner.lastName}` : "No One"}
    </Tooltip>
  );
  return (
    <tr>
      <td onClick={() => history.push("/books/" + slug)}>{title}</td>
      <td>
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <span className={`badge badge-${available ? "success" : "dark"}`}>
            {available ? "Available" : "Borrowed (?)"}
          </span>
        </OverlayTrigger>
      </td>
      <td>
        <Button
          onClick={() => history.push("/books/" + slug + "/edit")}
          variant="dark"
        >
          Edit
        </Button>
      </td>
      <td>
        <Button onClick={() => dispatch(deleteBook(id))} variant="danger">
          Remove
        </Button>
      </td>
    </tr>
  );
};
export default BookItem;
