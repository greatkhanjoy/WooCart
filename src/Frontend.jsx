import { useEffect, useState } from "react";
import useAuthCheck from "./hooks/useAuthCheck";
import Floating from "./components/frontend/Floating";
import { Toaster } from "react-hot-toast";
import Cart from "./components/frontend/Cart";

const Frontend = ({ data }) => {
  const authCheck = useAuthCheck(data);

  return !authCheck ? (
    ""
  ) : (
    <>
      {/* cart icon  */}
      <Toaster
        toastOptions={{
          style: {
            zIndex: "9999",
          },
        }}
      />
      <Floating />
      <Cart settingsData={data} />
    </>
  );
};

export default Frontend;
