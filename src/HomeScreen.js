import ViewAllProd from "./ViewAllProd";

function HomeScreen() {
  return (
    <>
      <header className="p-3 bg-dark text-white ">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <div className="text-end col-7">
              <a href="AddProduct">
                {" "}
                <button className="btn btn-info btn-md px-5 gap-3 me-3">
                  Add Product
                </button>
              </a>
            </div>
          </div>
        </div>
      </header>
      <div>
        <ViewAllProd />
      </div>
    </>
  );
}

export default HomeScreen;
