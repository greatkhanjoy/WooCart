import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setModal } from "../../features/modal/modalSlice";
import { BsCart2, BsTrash } from "react-icons/bs";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useClearCartMutation,
  useDeleteItemMutation,
  useApplyCouponMutation,
  useRemoveCouponMutation,
} from "../../features/cart/cartApi";
import Loader from "../Loader";

const Cart = ({ settingsData }) => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.modal);
  const { data, isLoading, isError, error, isSuccess } = useGetCartQuery();
  const [
    updateCart,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateCartMutation();

  const [
    emptyCart,
    {
      isLoading: isClearing,
      isSuccess: isCleared,
      isError: isClearError,
      error: clearError,
    },
  ] = useClearCartMutation();

  const [
    deleteItem,
    {
      isLoading: isDeleteing,
      isSuccess: isDeleted,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteItemMutation();

  const [
    applyCoupon,
    {
      isLoading: isApplying,
      isSuccess: isApplied,
      isError: isCouponError,
      error: couponError,
    },
  ] = useApplyCouponMutation();

  const [
    removeCoupon,
    {
      isLoading: isRemoving,
      isSuccess: isRemoved,
      isError: isCouponRemoveError,
      error: couponRemoveError,
    },
  ] = useRemoveCouponMutation();

  const [items, setItems] = useState(null);
  const [coupon, setCoupon] = useState("");

  const quantityHandler = (value, id, key) => {
    if (value > 0) {
      updateCart({ itemKey: key, quantity: value });
    } else {
      deleteItem(key);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      applyCoupon(coupon);
    }
  };

  const formatPrice = (
    price,
    decimalPlaces,
    decimalSeparator,
    thousandSeparator
  ) => {
    const formattedPrice = (price / 100).toFixed(2).toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      decimalSeparator: decimalSeparator,
      groupingSeparator: thousandSeparator,
    });
    return formattedPrice;
  };

  const goToCart = () => {
    dispatch(setModal());
    if (window.location.href !== settingsData?.cart_url) {
      window.location.replace(settingsData?.cart_url);
    }
  };

  const goToCheckout = () => {
    dispatch(setModal());
    if (window.location.href !== settingsData?.checkout_url) {
      window.location.replace(settingsData?.checkout_url);
    }
  };

  const goToShop = () => {
    dispatch(setModal());
    if (window.location.pathname !== "/shop/") {
      window.location.replace("/shop");
    }
  };

  useEffect(() => {
    if (isApplied) {
      toast.success("Coupon Applied Successfuly.");
      setCoupon("");
    } else if (isCouponError) {
      toast.error(couponError?.data?.message);
    }
  }, [isApplied, couponError, isCouponError]);

  useEffect(() => {
    if (isRemoved) {
      toast.success("Coupon Removed Successfully.");
    } else if (isCouponRemoveError) {
      toast.error(couponRemoveError?.data?.message);
    }
  }, [isRemoved, isCouponRemoveError, couponRemoveError]);

  useEffect(() => {
    if (isCleared) {
      toast.success("Cart Cleared.");
    } else if (isClearError) {
      toast.error(clearError?.data?.message);
    }
  }, [clearError, isCleared, isClearError]);

  useEffect(() => {
    if (isDeleted) {
      toast.success("Item Removed Successfuly.");
    } else if (isDeleteError) {
      toast.error(deleteError?.data?.message);
    }
  }, [isDeleted, isDeleteError, deleteError]);

  useEffect(() => {
    if (isSuccess || data) {
      setItems(data?.items);
    }
  }, [data, isSuccess]);

  //Styles
  const [buttonMediumColor, setButtonMediumColor] = useState({
    backgroundColor: "#2f9700",
    color: "white",
  });
  const buttonMedium = {
    width: "100%",
    height: "56px",
    color: buttonMediumColor.color,
    backgroundColor: buttonMediumColor.backgroundColor,
    cursor: "pointer",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
  };

  const buttonMediumHover = () => {
    setButtonMediumColor({ ...buttonMediumColor, backgroundColor: "#47be10" });
  };
  const buttonMediumMouseLeave = () => {
    setButtonMediumColor({ ...buttonMediumColor, backgroundColor: "#2f9700" });
  };

  const couponField = {
    width: "100%",
    height: "56px",
    border: "1px solid #2f9700",
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    color: "#666666",
  };
  const [emptyCartColor, setEmptyCartColor] = useState({
    backgroundColor: "transparent",
    color: "#2f9700",
  });
  const emptyCartButton = {
    width: "100%",
    height: "56px",
    border: "1px solid #2f9700",
    borderRadius: "8px",
    backgroundColor: emptyCartColor.backgroundColor,
    color: emptyCartColor.color,
  };
  const emptyCartHover = () => {
    setEmptyCartColor({
      backgroundColor: "#2f9700",
      color: "white",
    });
  };
  const emptyCartMouseLeave = () => {
    setEmptyCartColor({
      backgroundColor: "transparent",
      color: "#2f9700",
    });
  };

  const [smallButtonColor, setSmallButtonColor] = useState({
    backgroundColor: "#2f9700",
    color: "white",
  });
  const smallButton = {
    width: "100%",
    padding: "8px 2px 8px 2px",
    color: smallButtonColor.color,
    backgroundColor: smallButtonColor.backgroundColor,
    borderRadius: "8px",
  };
  const smallButtonHover = () => {
    setSmallButtonColor({
      backgroundColor: "#47be10",
      color: "white",
    });
  };
  const smallButtonMouseLeave = () => {
    setSmallButtonColor({
      backgroundColor: "#2f9700",
      color: "white",
    });
  };

  const [smallButtonOneColor, setSmallButtonOneColor] = useState({
    backgroundColor: "#2f9700",
    color: "white",
  });
  const smallButtonOne = {
    width: "100%",
    padding: "8px 2px 8px 2px",
    color: smallButtonOneColor.color,
    backgroundColor: smallButtonOneColor.backgroundColor,
    borderRadius: "8px",
  };
  const smallButtonOneHover = () => {
    setSmallButtonOneColor({
      backgroundColor: "#47be10",
      color: "white",
    });
  };
  const smallButtonOneMouseLeave = () => {
    setSmallButtonOneColor({
      backgroundColor: "#2f9700",
      color: "white",
    });
  };

  return (
    <>
      <div
        className={`${
          open ? "" : "hidden"
        } popup-cart-container  fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center`}
      >
        <div
          onClick={() => dispatch(setModal())}
          className="absolute top-0 left-0 w-full h-screen bg-black opacity-60 z-40"
        ></div>
        <div className="bg-[#fcf9f7] z-50 container mx-auto">
          <div className="head-wrap w-full bg-[#fcf9f7] flex justify-between items-center p-4 text-xl">
            <BsCart2 />
            <h3>{settingsData?.cart_title}</h3>
            <AiOutlineClose
              className="cursor-pointer"
              onClick={() => dispatch(setModal())}
            />
          </div>

          {data?.items?.length > 0 ? (
            <div className="flex flex-col lg:flex-row justify-between gap-8 p-10 relative">
              {isUpdating && <Loader />}
              {isLoading && <Loader />}
              {isClearing && <Loader />}
              {isApplying && <Loader />}
              {isRemoving && <Loader />}
              <div className="w-full lg:w-2/3 bg-[#fcfcfc] border border-[#FEF2EB] p-5 rounded-md">
                <div>
                  <div className="flex justify-normal items-center mb-5 p-1 md:p-3 font-semibold text-[16px] text-[#665F5C] w-full">
                    <span className="w-2/5 text-center">Product</span>
                    <span className="w-1/5">Price</span>
                    <span className="w-1/5">Quantity</span>
                    <span className="w-1/5">Subtotal</span>
                  </div>
                  <div className="space-y-6 w-full text-[16px] text-[#665F5C] max-h-[60vh] overflow-scroll">
                    {items?.map((cartItem) => (
                      <div
                        key={cartItem?.id}
                        className="flex justify-normal items-center bg-[#fcf4f2] rounded-md p-1 md:p-3"
                      >
                        <div className="w-2/5 flex gap-2 items-center">
                          <BsTrash
                            className="cursor-pointer"
                            onClick={() => deleteItem(cartItem?.key)}
                          />
                          <a
                            href={cartItem.permalink}
                            className="w-0 md:w-auto"
                          >
                            <img
                              src={cartItem.images[0].src}
                              className="w-[65px] max-h-[65px] object-cover rounded-md"
                            />
                          </a>

                          <a href={cartItem.permalink}>
                            <p>{cartItem.name}</p>
                          </a>
                        </div>
                        <span className="w-1/5">
                          {cartItem?.totals?.currency_symbol}
                          {formatPrice(
                            cartItem?.prices?.price,
                            cartItem?.totals?.currency_minor_unit,
                            cartItem?.totals?.currency_decimal_separator,
                            cartItem?.totals?.currency_thousand_separator
                          )}
                        </span>
                        <div className="w-1/5">
                          <input
                            type="number"
                            value={cartItem.quantity}
                            className="w-14 rounded-md px-2"
                            onChange={(e) =>
                              quantityHandler(
                                e.target.value,
                                cartItem.id,
                                cartItem.key
                              )
                            }
                          />
                        </div>
                        <div className="w-1/5">
                          {cartItem?.totals?.currency_symbol}
                          {formatPrice(
                            cartItem?.totals?.line_subtotal,
                            cartItem?.totals?.currency_minor_unit,
                            cartItem?.totals?.currency_decimal_separator,
                            cartItem?.totals?.currency_thousand_separator
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/3  rounded-md ">
                <div className="space-y-5 bg-white p-5 rounded-md">
                  <div className="w-full flex items-center ">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={settingsData?.apply_coupon_field_placeholder}
                      style={couponField}
                    />
                    <button
                      onClick={() => applyCoupon(coupon)}
                      style={buttonMedium}
                      onMouseEnter={buttonMediumHover}
                      onMouseLeave={buttonMediumMouseLeave}
                    >
                      {settingsData?.apply_coupon_btn_text}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {data?.coupons?.length > 0 && (
                      <div className="flex gap-4 items-center">
                        <p>Coupons:</p>
                        <ul className="flex flex-wrap gap-3">
                          {data?.coupons?.map((coupon, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md"
                            >
                              <p className="">{coupon.code}</p>
                              <AiOutlineCloseCircle
                                onClick={() => removeCoupon(coupon.code)}
                                className="cursor-pointer"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => emptyCart()}
                    disabled={isClearing}
                    style={emptyCartButton}
                    onMouseEnter={emptyCartHover}
                    onMouseLeave={emptyCartMouseLeave}
                  >
                    {settingsData?.empty_cart_btn_text}
                  </button>
                  <div className="space-y-4">
                    <p>Cart totals</p>
                    <div className="flex justify-between items-center">
                      <p className="w-2/5">Subtotal</p>
                      <p className="w-1/5">:</p>
                      <p className="w-2/5 text-right">
                        {data?.totals?.currency_symbol}
                        {formatPrice(
                          data?.totals?.total_items,
                          data?.totals?.currency_minor_unit,
                          data?.totals?.currency_decimal_separator,
                          data?.totals?.currency_thousand_separator
                        )}
                      </p>
                    </div>
                    {data?.totals?.total_shipping > 0 && (
                      <div className="flex justify-between items-center">
                        <p className="w-2/5">Discount</p>
                        <p className="w-1/5">:</p>
                        <p className="w-2/5 text-right">
                          {data?.totals?.currency_symbol}
                          {formatPrice(
                            data?.totals?.total_shipping,
                            data?.totals?.currency_minor_unit,
                            data?.totals?.currency_decimal_separator,
                            data?.totals?.currency_thousand_separator
                          )}
                        </p>
                      </div>
                    )}
                    {data?.totals?.total_tax > 0 && (
                      <div className="flex justify-between items-center">
                        <p className="w-2/5">Discount</p>
                        <p className="w-1/5">:</p>
                        <p className="w-2/5 text-right">
                          {data?.totals?.currency_symbol}
                          {formatPrice(
                            data?.totals?.total_tax,
                            data?.totals?.currency_minor_unit,
                            data?.totals?.currency_decimal_separator,
                            data?.totals?.currency_thousand_separator
                          )}
                        </p>
                      </div>
                    )}
                    {data?.totals?.total_discount > 0 && (
                      <div className="flex justify-between items-center">
                        <p className="w-2/5">Discount</p>
                        <p className="w-1/5">:</p>
                        <p className="w-2/5 text-right">
                          {data?.totals?.currency_symbol}
                          {formatPrice(
                            data?.totals?.total_discount,
                            data?.totals?.currency_minor_unit,
                            data?.totals?.currency_decimal_separator,
                            data?.totals?.currency_thousand_separator
                          )}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="w-2/5 font-bold">Total</p>
                      <p className="w-1/5">:</p>
                      <p className="w-2/5 text-right">
                        {data?.totals?.currency_symbol}
                        {formatPrice(
                          data?.totals?.total_price,
                          data?.totals?.currency_minor_unit,
                          data?.totals?.currency_decimal_separator,
                          data?.totals?.currency_thousand_separator
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-5 mt-5">
                  <button
                    onClick={goToCart}
                    style={smallButton}
                    onMouseEnter={smallButtonHover}
                    onMouseLeave={smallButtonMouseLeave}
                  >
                    {settingsData?.view_cart_btn_text}
                  </button>
                  <button
                    onClick={goToCheckout}
                    style={smallButtonOne}
                    onMouseEnter={smallButtonOneHover}
                    onMouseLeave={smallButtonOneMouseLeave}
                  >
                    {settingsData?.checkout_now_btn_text}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center">
              <p className="text-xl">Your cart is empty.</p>
              <p className="text-xl">
                Please go to{" "}
                <a
                  href={settingsData?.shop_url}
                  // onClick={goToShop}
                  className="text-2xl underline"
                >
                  Shop Now
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
