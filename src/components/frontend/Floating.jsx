import { useEffect, useState } from "react";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "../../app/store";
import ReactDOM from "react-dom/client";
import { setModal } from "../../features/modal/modalSlice";
import toast from "react-hot-toast";
import {
  useGetCartQuery,
  useAddToCartMutation,
} from "../../features/cart/cartApi";
import Variation from "./Variation";

const Floating = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isError, error, isSuccess } = useGetCartQuery();
  const [
    addToCart,
    {
      isLoading: isAdding,
      isError: isAddingError,
      isSuccess: isAdded,
      error: addError,
    },
  ] = useAddToCartMutation();

  const [items, setItems] = useState(null);
  const [item, setitem] = useState("");
  const [node, setNode] = useState(null);
  const [itemCount, setItemCount] = useState("");
  const [varID, setVarID] = useState("");

  const hasNextSibling = (target) => {
    return target.nextSibling !== null;
  };

  useEffect(() => {
    if (data) {
      setItems(data?.items);
      setItemCount(data?.items_count);
    }
  }, [data]);

  useEffect(() => {
    if (isAdded) {
      dispatch(setModal());
    } else if (isAddingError) {
      toast.error(addError);
    }
  }, [isAdded, isAddingError, addError]);

  useEffect(() => {
    if (data) {
      const cartButtons = document.querySelectorAll(".add_to_cart_button");
      cartButtons.forEach((button) => {
        const productID = button.getAttribute("data-product_id");
        if (productID) {
          const found = data.items?.filter((item) => item.id == productID);
          if (found.length > 0) {
            button.classList.add("has-tick-mark");
          } else if (button.classList.contains("has-tick-mark")) {
            button.classList.remove("has-tick-mark");
          }
        }
      });
    }
  }, [data]);

  useEffect(() => {
    //remove ajax add to cart button to disable default add to cart function
    const buttons = document.querySelectorAll(".add_to_cart_button");
    buttons.forEach((button) => {
      button.classList.remove("ajax_add_to_cart");
    });

    const links = document.querySelectorAll("a.product_type_variable");
    const linksSimple = document.querySelectorAll("a.product_type_simple");

    if (linksSimple) {
      linksSimple.forEach((link) => {
        const button = document.createElement("button");
        Array.from(link.attributes).forEach((attr) => {
          button.setAttribute(attr.name, attr.value);
        });
        button.innerHTML = link.innerHTML;
        link.parentNode.replaceChild(button, link);
      });
    }

    links.forEach((product) => {
      const button = document.createElement("button");
      Array.from(product.attributes).forEach((attr) => {
        button.setAttribute(attr.name, attr.value);
      });
      button.innerHTML = product.innerHTML;
      product.parentNode.replaceChild(button, product);
    });

    const handleClick = (event) => {
      if (
        event.target.classList.contains("add_to_cart_button") &&
        event.target.classList.contains("product_type_simple")
      ) {
        addToCart({
          id: event.target.getAttribute("data-product_id"),
          quantity: 1,
        });
        event.target.disabled = true;
        event.target.classList.add("has-tick-spinner");
        setTimeout(() => {
          event.target.disabled = false;
          event.target.classList.remove("has-tick-spinner");
        }, 2000);
      } else if (
        event.target.classList.contains("add_to_cart_button") &&
        event.target.classList.contains("product_type_variable")
      ) {
        const divElement = document.createElement("div");
        divElement.classList.add("variation-container");
        divElement.setAttribute(
          "id",
          event.target.getAttribute("data-product_id")
        );

        if (
          Number(event.target.parentNode.lastElementChild.id) !==
          Number(event.target.getAttribute("data-product_id"))
        ) {
          const variationContainer = document.querySelectorAll(
            ".variation-container"
          );

          variationContainer.forEach((vc) => {
            vc.remove();
          });

          const container = event.target.parentNode.insertBefore(
            divElement,
            event.target.nextSibling
          );
          ReactDOM.createRoot(container).render(
            <Provider store={store}>
              <Variation id={event.target.getAttribute("data-product_id")} />
            </Provider>
          );
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <>
      {/* cart icon  */}
      <div className="w-full relative">
        <div
          onClick={() => {
            dispatch(setModal());
          }}
          className={`fixed bottom-16 right-16 flex flex-col cursor-pointer items-center rounded-full justify-center  bg-white border border-gray-300 w-16 h-16 divide-y-2 overflow-hidden`}
        >
          <div className="bg-[#90FF20] w-full flex items-center justify-center text-xl h-8">
            <span>{itemCount}</span>
          </div>
          <div className="w-full flex items-center justify-center  h-8">
            <PiShoppingCartSimpleThin className="text-black text-xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Floating;
