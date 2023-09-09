<?php

namespace Browter\Woocart\Admin;

class Settings
{

    /**
     * class constructor
     */
    function __construct()
    {
        $this->add_settings_data();
        // wp_die('Could not be activated');
    }

    public function add_settings_data()
    {
        $cart_title = get_option('browter_woo_cart_title');
        $apply_coupon_btn_text = get_option('browter_woo_cart_apply_coupon_btn_text');
        $apply_coupon_field_placeholder = get_option('browter_woo_cart_apply_coupon_field_placeholder');
        $empty_cart_btn_text = get_option('browter_woo_cart_empty_cart_btn_text');
        $view_cart_btn_text = get_option('browter_woo_cart_view_cart_btn_text');
        $checkout_now_btn_text = get_option('browter_woo_cart_checkout_now_btn_text');

        $installed = get_option('browter_woo_cart_installed');

        if (!$installed) {
            update_option('browter_woo_cart_installed', time());
        }
        update_option('browter_woo_cart_version', BWC_VERSION);

        if (!$cart_title) {
            update_option('browter_woo_cart_title', 'Your Cart');
        }
        if (!$apply_coupon_btn_text) {
            update_option('browter_woo_cart_apply_coupon_btn_text', 'Apply Coupon');
        }
        if (!$apply_coupon_field_placeholder) {
            update_option('browter_woo_cart_apply_coupon_field_placeholder', 'Coupon code');
        }
        if (!$empty_cart_btn_text) {
            update_option('browter_woo_cart_empty_cart_btn_text', 'Empty Cart');
        }
        if (!$view_cart_btn_text) {
            update_option('browter_woo_cart_view_cart_btn_text', 'View Cart');
        }
        if (!$checkout_now_btn_text) {
            update_option('browter_woo_cart_checkout_now_btn_text', 'Checkout Now');
        }
    }
}
