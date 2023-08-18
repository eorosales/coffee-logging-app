import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { formatDate } from "../../utils/formatting";

const Coffee = () => {
  const { name, roaster, origin, process, flavorNotes, createdAt, favorite } =
    useLoaderData();

  const formattedDate = formatDate(createdAt);

  return (
    <>
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
      <p>Created {formattedDate}</p>
    </>
  );
};

export default Coffee;
