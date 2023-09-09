import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetVariableProductQuery } from "../../features/product/productApi";
import { useAddToCartMutation } from "../../features/cart/cartApi";
import Loader from "../Loader";
import { setModal } from "../../features/modal/modalSlice";

const Variation = ({ id }) => {
  const { data, isLoading, isSuccess } = useGetVariableProductQuery(id);

  const [
    addToCart,
    {
      isLoading: isAdding,
      isError: isAddError,
      isSuccess: isAdded,
      error: addError,
    },
  ] = useAddToCartMutation();
  const dispatch = useDispatch();
  const [variations, setVariations] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [attributeType, setAttributeType] = useState(null);
  const [attributes, setAttributes] = useState(null);
  const [filter, setFilter] = useState({});
  const attributeValues = {};

  const addToCartHandler = () => {
    addToCart({ id: selectedProduct[0].variation_id, quantity });
  };

  useEffect(() => {
    if (isAdded) {
      dispatch(setModal());
    } else if (isAddError) {
      console.log(addError);
    }
  }, [isAdded, isAddError, addError, dispatch]);

  const addFilterTypes = (arr) => {
    arr.forEach((item) => {
      setFilter((prevFilter) => ({ ...prevFilter, [item[0]]: "" }));
    });
  };

  const getAttributes = (products) => {
    products.forEach((product) => {
      attributeType.forEach((type) => {
        const values = product.attributes[type].split(", ");
        if (attributeValues[type]) {
          values.forEach((v) => {
            if (!attributeValues[type].includes(v)) {
              attributeValues[type].push(...values);
            }
          });
        } else {
          attributeValues[type] = values;
        }
      });
    });
    const arr = Object.entries(attributeValues);
    setAttributes(arr);
    addFilterTypes(arr);
  };

  const getLastItem = (string) => {
    let array = string.split("_");
    let lastElement = array[array.length - 1];
    return lastElement;
  };

  const filterHandler = (value, type) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value === "" ? "" : value,
    }));
  };

  useEffect(() => {
    if (
      Object.values(filter).every(
        (value) => value !== null && value !== "" && value !== undefined
      )
    ) {
      setSelectedProduct(
        data?.filter((product) => {
          return attributeType?.every((attribute) => {
            const selectedValue = filter[attribute];
            const productValue = product.attributes[attribute];
            return productValue.includes(selectedValue);
          });
        })
      );
    }
  }, [filter]);

  useEffect(() => {
    if (attributeType) {
      getAttributes(data);
    }
  }, [attributeType, data]);

  useEffect(() => {
    if (isSuccess) {
      setVariations(data);
      setAttributeType(Object.keys(data[0].attributes));
    }
  }, [isSuccess, data, id]);

  //styles
  const [backgroundColor, setBackgroundColor] = useState("#2f9700");
  const buttonStyles = {
    color: "white",
    backgroundColor: backgroundColor,
    width: "100%",
    height: "50px",
    cursor: "pointer",
  };

  const handleButtonHover = () => {
    setBackgroundColor("#47be10");
  };
  const handleButtonMouseLeave = () => {
    setBackgroundColor("#2f9700");
  };

  let content = null;
  if (isLoading || isAdding) {
    content = (
      <div className="w-[300px] relative bg-white border border-gray-200 p-4 space-y-4 min-h-[300px]">
        <Loader />
      </div>
    );
  } else if ((!isLoading && attributes) || (isAdding && attributes)) {
    content = (
      <div className="w-[300px] relative bg-white border border-gray-200 p-4 space-y-4">
        {attributes.map((item, index) => (
          <div
            key={item[0]}
            className="flex justify-between items-center gap-8 w-full"
          >
            <label className="w-1/2 text-left">
              {getLastItem(item[0]).charAt(0).toUpperCase() +
                getLastItem(item[0]).slice(1)}
              :
            </label>
            <select
              onChange={(e) => filterHandler(e.target.value, item[0])}
              className="w-1/2 h-10 px-2"
              id={item[0]}
              name={item[0]}
            >
              <option value="">choose an option</option>
              {item[1].map((option, index) => (
                <option key={index} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
        {selectedProduct && selectedProduct.length > 0 ? (
          <div>
            <p>${selectedProduct[0].display_price}</p>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-between items-center gap-8 w-full">
          <input
            type="number"
            className="w-16 p-2 border border-gray-200"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            type="button"
            disabled={selectedProduct === undefined}
            onClick={addToCartHandler}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonMouseLeave}
            style={buttonStyles}
          >
            Add To Cart
          </button>
        </div>
      </div>
    );
  }

  return content;
};

export default Variation;
