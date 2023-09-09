import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useUpdateSettingsMutation } from "../../features/settings/settingsApi";
import Loader from "../../components/Loader";

const PopupCartText = ({ data: settingsData }) => {
  const [updateSettings, { data, isLoading, isError, error, isSuccess }] =
    useUpdateSettingsMutation();

  const [cartTitle, setCartTitle] = useState(settingsData?.cart_title);
  const [couponBtnText, setCouponBtnText] = useState(
    settingsData?.apply_coupon_btn_text
  );
  const [couponFieldPlaceholder, setCouponFieldPlaceholder] = useState(
    settingsData?.apply_coupon_field_placeholder
  );
  const [emptyCartBtnText, setEmptyCartBtnText] = useState(
    settingsData?.empty_cart_btn_text
  );
  const [viewBtnText, setViewBtnText] = useState(
    settingsData?.view_cart_btn_text
  );
  const [checkoutBtnText, setCheckoutBtntext] = useState(
    settingsData?.checkout_now_btn_text
  );

  const formHandler = (e) => {
    e.preventDefault();
    updateSettings({
      cart_title: cartTitle,
      apply_coupon_btn_text: couponBtnText,
      apply_coupon_field_placeholder: couponFieldPlaceholder,
      empty_cart_btn_text: emptyCartBtnText,
      view_cart_btn_text: viewBtnText,
      checkout_now_btn_text: checkoutBtnText,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Settings Saved.");
    } else if (isError) {
      toast.error("Sorry! Something went wrong. please try again.");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccess || data) {
      setCartTitle(data.cart_title);
      setCouponBtnText(data?.apply_coupon_btn_text);
      setCouponFieldPlaceholder(data?.apply_coupon_field_placeholder);
      setEmptyCartBtnText(data?.empty_cart_btn_text);
      setViewBtnText(data?.view_cart_btn_text);
      setCheckoutBtntext(data?.checkout_now_btn_text);
    }
  }, [isSuccess, data]);
  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={formHandler} className="flex flex-col divide-y">
        <div className="flex gap-5 items-center py-5">
          <div className="w-full md:w-1/5">
            <label
              htmlFor="cart_title"
              className="w-full font-semibold text-[16px]"
            >
              Cart Name
            </label>
            <p className="text-[14px]">Popup cart title</p>
          </div>
          <div className="w-full md:w-4/5 flex">
            <input
              id="cart_title"
              value={cartTitle}
              onChange={(e) => setCartTitle(e.target.value)}
              type="text"
              placeholder="Your Cart"
              className="w-full md:w-1/2 h-8"
            />
          </div>
        </div>

        <div className="flex gap-5 items-center py-5">
          <div className="w-full md:w-1/5">
            <label
              htmlFor="apply_coupon_btn_text"
              className="w-full font-semibold text-[16px]"
            >
              Coupon Button
            </label>
            <p className="text-[14px]">Apply Coupon Button text</p>
          </div>
          <div className="w-full md:w-4/5 flex">
            <input
              id="apply_coupon_btn_text"
              value={couponBtnText}
              onChange={(e) => setCouponBtnText(e.target.value)}
              type="text"
              placeholder="Apply Coupon"
              className="w-full md:w-1/2 h-8"
            />
          </div>
        </div>

        <div className="flex gap-5 items-center py-5">
          <div className="w-full md:w-1/5">
            <label
              htmlFor="apply_coupon_field_placeholder"
              className="w-full font-semibold text-[16px]"
            >
              Coupon Placeholder
            </label>
            <p className="text-[14px]">
              Apply Coupon input field placeholder text
            </p>
          </div>
          <div className="w-full md:w-4/5 flex">
            <input
              id="apply_coupon_field_placeholder"
              type="text"
              value={couponFieldPlaceholder}
              onChange={(e) => setCouponFieldPlaceholder(e.target.value)}
              placeholder="Coupon code"
              className="w-full md:w-1/2 h-8"
            />
          </div>
        </div>

        <div className="flex gap-5 items-center py-5">
          <div className="w-full md:w-1/5">
            <label
              htmlFor="empty_cart_btn_text"
              className="w-full font-semibold text-[16px]"
            >
              Clear Cart
            </label>
            <p className="text-[14px]">Clear Cart button text</p>
          </div>
          <div className="w-full md:w-4/5 flex">
            <input
              id="empty_cart_btn_text"
              type="text"
              value={emptyCartBtnText}
              onChange={(e) => setEmptyCartBtnText(e.target.value)}
              placeholder="Empty Cart"
              className="w-full md:w-1/2 h-8"
            />
          </div>
        </div>

        <div className="flex gap-5 items-center py-5">
          <div className="w-full md:w-1/5">
            <label
              htmlFor="view_cart_btn_text"
              className="w-full font-semibold text-[16px]"
            >
              View Cart
            </label>
            <p className="text-[14px]">View cart button text</p>
          </div>
          <div className="w-full md:w-4/5 flex">
            <input
              id="view_cart_btn_text"
              type="text"
              value={viewBtnText}
              onChange={(e) => setViewBtnText(e.target.value)}
              placeholder="View Cart"
              className="w-full md:w-1/2 h-8"
            />
          </div>
        </div>

        <div className="flex gap-5 items-center py-5">
          <div className="w-full md:w-1/5">
            <label
              htmlFor="checkout_now_btn_text"
              className="w-full font-semibold text-[16px]"
            >
              Checkout Now
            </label>
            <p className="text-[14px]">Checkout Now button text</p>
          </div>
          <div className="w-full md:w-4/5 flex">
            <input
              id="checkout_now_btn_text"
              type="text"
              value={checkoutBtnText}
              onChange={(e) => setCheckoutBtntext(e.target.value)}
              placeholder="Checkout Now"
              className="w-full md:w-1/2 h-8"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="w-full md:w-1/5"></div>
          <div className="w-full md:w-4/5">
            <button
              type="submit"
              disabled={isLoading}
              className="w-[150px] h-[40px] bg-green-500 text-white rounded-md block mx-auto mt-5 text-[16px] font-semibold"
            >
              {isLoading ? "Saving" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PopupCartText;
