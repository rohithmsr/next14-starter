import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <h1>Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Return to home page</Link>
    </>
  );
};

export default NotFound;
