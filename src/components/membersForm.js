import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import {
  addMember,
  borrowBook,
  unborrowBook,
  updateMember,
} from "../store/actions";
import MultiSelect from "react-multi-select-component";
import goldImage from "../image/gold.png";
import platinumImage from "../image/platinum.png";
import silverImage from "../image/silver.png";
import { Helmet } from "react-helmet";

const image = { gold: goldImage, platinum: platinumImage, silver: silverImage };

const MembersForm = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const books = useSelector((state) => state.books);
  const history = useHistory();
  const memberSlug = useParams().memberSlug;
  const tier = { silver: 2, gold: 3, platinum: 5 };
  let myMember;
  if (memberSlug) {
    myMember = members.find((member) => member.slug === memberSlug);
  } else
    myMember = {
      firstName: "",
      lastName: "",
      membership: "silver",
      currentlyBorrowedBooks: [],
    };
  const oldBooks = myMember.currentlyBorrowedBooks;
  const options = books
    .filter(
      (book) =>
        book.available ||
        (myMember.id &&
          book.borrowedBy[book.borrowedBy.length - 1] === myMember.id)
    )
    .map((book) => ({ label: book.title, value: book.id }));
  const [member, setMember] = useState(myMember);
  if (!myMember) {
    return <Redirect to="/404" />;
  }
  const handelChange = (event) => {
    setMember({
      ...member,
      [event.target.name]: event.target.value,
    });
  };
  const handelChangeSelect = (event) => {
    if (event.length <= tier[member.membership])
      setMember({
        ...member,
        currentlyBorrowedBooks: event.map((a) => a.value),
      });
  };
  const handelSubmit = (event) => {
    event.preventDefault();
    if (!memberSlug) dispatch(addMember(member));
    else dispatch(updateMember(member));
    dispatch(unborrowBook(oldBooks));
    dispatch(borrowBook(member.id, member.currentlyBorrowedBooks));
    handelRest();
    history.push("/members");
  };
  const handelRest = () => {
    setMember({
      firstName: "",
      lastName: "",
      membership: "silver",
      currentlyBorrowedBooks: [],
    });
  };
  return (
    <div className="d-flex justify-content-center">
      <Helmet>
        <title>{memberSlug ? "Edit" : "Create"} Member</title>
      </Helmet>
      <div className="jumbotron" style={{ paddingTop: "30px" }}>
        <img
          style={{ paddingBottom: "30px" }}
          className="mx-auto d-block"
          alt={member.membership}
          width="100px"
          src={image[member.membership]}
        />
        <form onSubmit={handelSubmit}>
          <div className="form-inline">
            <div className="form-group">
              <div className="input-group mb-2 mr-sm-2">
                <input
                  value={member.firstName}
                  name="firstName"
                  type="text"
                  className="form-control"
                  onChange={handelChange}
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group mb-2 mr-sm-2">
                <input
                  value={member.lastName}
                  name="lastName"
                  type="text"
                  className="form-control"
                  onChange={handelChange}
                  placeholder="Last Name"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Membership Tier</label>
            <select
              className="form-control"
              defaultValue={member.membership}
              name="membership"
              onChange={handelChange}
            >
              <option>silver</option>
              <option>gold</option>
              <option>platinum</option>
            </select>
          </div>
          <div className="form-group">
            <label>
              Currently Borrowed Books (MAX : <b>{tier[member.membership]}</b>)
            </label>
            <MultiSelect
              options={options}
              value={member.currentlyBorrowedBooks
                .map((a) => ({
                  label: a,
                  value: a,
                }))
                .slice(0, tier[member.membership])}
              onChange={handelChangeSelect}
              hasSelectAll={false}
            />
          </div>
          <center>
            <button type="submit" className="btn btn-primary">
              {memberSlug ? "Edit" : "Submit"}
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};
export default MembersForm;
