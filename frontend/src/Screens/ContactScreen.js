import React from "react";
import Contact from "../Components/Contact";
import MyGoogleMap from "../Components/MyGoogleMap";
import Layout from "../Components/Layout/Layout";

function ContactScreen() {
  return (
    <>
      <Layout
        content={
          <div>
            <Contact />
            <MyGoogleMap />
          </div>
        }
      />
    </>
  );
}

export default ContactScreen;
