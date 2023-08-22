import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { formatDate } from "../../utils/formatting";
import NewDialForm from "../dials/NewDialForm";
import DialsTable from "../dials/DialsTable";

const Coffee = () => {
  const {
    id,
    name,
    roaster,
    origin,
    process,
    flavorNotes,
    createdAt,
    favorite,
  } = useLoaderData();

  return (
    <div style={{ padding: "2em" }}>
      <Link to={`/`} sx={{ textDecoration: "none", mt: "2ch" }}>
        <strong>Back to Home</strong>
      </Link>
      <h2>
        {name} - {roaster}
      </h2>
      <p>
        {origin} | {process} Process
      </p>
      <p>{`${flavorNotes}`}</p>
      {favorite && <p>{`<3`}</p>}
      <p>Created {formatDate(createdAt)}</p>
      <DialsTable coffee={id} />
      <NewDialForm coffee={id} />
    </div>
  );
};

export default Coffee;
