import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteMember, unborrowBook } from "../store/actions";
import goldImage from "../image/gold.png";
import platinumImage from "../image/platinum.png";
import silverImage from "../image/silver.png";
const image = { gold: goldImage, platinum: platinumImage, silver: silverImage };
const MemberItem = (props) => {
  const { id, firstName, lastName, slug, membership, currentlyBorrowedBooks } =
    props.member;
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <tr>
      <td onClick={() => history.push("/members/" + slug)}>
        <img alt={membership} src={image[membership]} width="40px" />{" "}
        {firstName} {lastName}
      </td>
      <td>
        <Button
          onClick={() => history.push("/members/" + slug + "/edit")}
          variant="dark"
        >
          Edit
        </Button>
      </td>
      <td>
        <Button
          onClick={() => {
            dispatch(deleteMember(id));
            dispatch(unborrowBook(currentlyBorrowedBooks));
          }}
          variant="danger"
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};
export default MemberItem;
