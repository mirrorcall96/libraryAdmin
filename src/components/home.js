import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
const Home = () => {
  const history = useHistory();

  const members = useSelector((state) => state.members);
  const books = useSelector((state) => state.books);
  books.sort((a, b) => b.borrowedBy.length - a.borrowedBy.length);
  console.log(books);
  return (
    <>
      <Helmet>
        <title>Libray - Home</title>
      </Helmet>
      <div className="container">
        <h2>Library</h2>
        <div class="row">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div
                      onClick={() => history.push("/books/")}
                      class="text-xs font-weight-bold text-primary mb-1"
                    >
                      Books #
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {books.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary  mb-1">
                      Available Books #
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {books.filter((a) => a.available).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div
                      onClick={() => history.push("/members/")}
                      class="text-xs font-weight-bold text-primary mb-1"
                    >
                      Members #
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {members.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary  mb-1">
                      Active Members #
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      {
                        members.filter(
                          (a) => a.currentlyBorrowedBooks.length > 0
                        ).length
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        Most Populer Books
        <ul class="list-group list-group-flush">
          {books
            .map((a) => (
              <li
                onClick={() => history.push("/books/" + a.slug)}
                class="list-group-item"
              >
                {a.title}
              </li>
            ))
            .slice(0, 5)}
        </ul>
      </div>
    </>
  );
};
export default Home;
