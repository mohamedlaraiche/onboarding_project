/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import GetResult from "@/components/GetResult";
import SearchResult from "@/components/SearchResult";
import { useQuery, gql, useMutation } from "@apollo/client";
import NavBar from "../components/NavBar";
import Head from "next/head";
import Modal from "../components/Modal";
// Get all generic catalytics
const getGenCats = gql`
  {
    getGenericCatalytics {
      _id
      maker
      brand
      type
      ref
      price
      images
    }
  }
`;
// search for catalytics
const getSearchQuery = gql`
  query searchWithPagination($byPage: Float!, $page: Float!, $query: String!) {
    searchWithPagination(byPage: $byPage, page: $page, query: $query) {
      items {
        _id
        ref
        price
        images
      }
    }
  }
`;
// excute pending operations
const executePendingOperation = gql`
  mutation {
    executePendingOperation
  }
`;
//chceck if there is any  pending operations
const getPenOperations = gql`
  {
    getPendingOperation {
      data
    }
  }
`;
const index = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [query, setQuery] = useState<string>("");
  const [byPage] = useState<number>(200);
  const [page] = useState<number>(0);

  const getGenericCatalytics = useQuery(getGenCats);
  const searchCataytics = useQuery(getSearchQuery, {
    variables: { byPage, page, query },
  });
  const getPendingOperations = useQuery(getPenOperations);
  const [executeNewOperations, { data, error, loading }] = useMutation(
    executePendingOperation
  );

  const executeNewOperationsHandler = (e: any) => {
    e.preventDefault();
    executeNewOperations();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  // in the above i add setTimeOut function so when we click on the excution button we need sometime for the function to trigger and the redirect worked fast.
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="./holderImg.ico" type="image/x-icon" />
        <meta name="theme-color" content="#1dbc79" />

        <title>Catalytics Converter</title>
      </Head>
      <NavBar
        getSearchQuery={getSearchQuery}
        getPendingOperations={getPendingOperations}
        executeNewOperationsHandler={executeNewOperationsHandler}
        handleOpen={handleOpen}
        query={query}
        setQuery={setQuery}
        searchCataytics={searchCataytics}
      />

      <section className="container">
        <section className="description">
          <p>In this app we can read,search create and excute new Catalytics</p>
        </section>
        <section className="cardHolder">
          {query === "" ? (
            <GetResult getGenericCatalytics={getGenericCatalytics} />
          ) : (
            <SearchResult searchCataytics={searchCataytics} />
          )}
        </section>
      </section>
      <Modal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        setOpen={setOpen}
      />
    </>
  );
};

export default index;
