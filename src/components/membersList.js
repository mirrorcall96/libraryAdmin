import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";
import MemberItem from "./memberItem";
import { useState } from "react";
import { Helmet } from "react-helmet";

const MemberList = () => {
  const [query, setQuery] = useState("");
  const members = useSelector((state) => state.members);
  const memberTable = members
    .filter((member) =>
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .map((member) => <MemberItem key={member.id} member={member} />);
  return (
    <Container>
      <Helmet>
        <title>Member List</title>
      </Helmet>
      <h2>
        Member List{" "}
        <Button as={Link} to="members/create">
          Add new
        </Button>
      </h2>
      <div className="form-group  mb-2 ">
        <input
          className="col-lg-12 form-control"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
        />
      </div>
      <Table striped bordered hover>
        <tbody>{memberTable}</tbody>
      </Table>
    </Container>
  );
};
export default MemberList;
