<?php

namespace Browter\Woocart\Api;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Response;

class SettingsApi extends WP_REST_Controller
{

    /**
     * class constructor
     */
    function __construct()
    {
        $this->namespace = 'browter-woo-cart/v1';
        $this->rest_base = 'settings';
    }

    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => [$this, 'get_settings'],
                    'permission_callback' => [$this, 'read_permissions_check']
                ],
                [
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => [$this, 'update_settings'],
                    'permission_callback' => [$this, 'read_permissions_check']
                ]

            ],
        );
    }

    public function read_permissions_check()
    {
        return true;
    }

    public function get_settings()
    {

        $cart_title = get_option('browter_woo_cart_title');
        $apply_coupon_btn_text = get_option('browter_woo_cart_apply_coupon_btn_text');
        $apply_coupon_field_placeholder = get_option('browter_woo_cart_apply_coupon_field_placeholder');
        $empty_cart_btn_text = get_option('browter_woo_cart_empty_cart_btn_text');
        $view_cart_btn_text = get_option('browter_woo_cart_view_cart_btn_text');
        $checkout_now_btn_text = get_option('browter_woo_cart_checkout_now_btn_text');

        $data = [
            'cart_title' => $cart_title ? $cart_title : '',
            'apply_coupon_btn_text' => $apply_coupon_btn_text ? $apply_coupon_btn_text : '',
            'apply_coupon_field_placeholder' => $apply_coupon_field_placeholder ? $apply_coupon_field_placeholder : '',
            'empty_cart_btn_text' => $empty_cart_btn_text ? $empty_cart_btn_text : '',
            'view_cart_btn_text' => $view_cart_btn_text ? $view_cart_btn_text : '',
            'checkout_now_btn_text' => $checkout_now_btn_text ? $checkout_now_btn_text : '',
        ];

        return new WP_REST_Response($data, 200);
    }

    public function update_settings($request)
    {
        $data = $request->get_params();
        isset($data['cart_title']) && update_option('browter_woo_cart_title', $data['cart_title']);
        isset($data['apply_coupon_btn_text']) && update_option('browter_woo_cart_apply_coupon_btn_text', $data['apply_coupon_btn_text']);
        isset($data['apply_coupon_field_placeholder']) && update_option('browter_woo_cart_apply_coupon_field_placeholder', $data['apply_coupon_field_placeholder']);
        isset($data['empty_cart_btn_text']) && update_option('browter_woo_cart_empty_cart_btn_text', $data['empty_cart_btn_text']);
        isset($data['view_cart_btn_text']) && update_option('browter_woo_cart_view_cart_btn_text', $data['view_cart_btn_text']);
        isset($data['checkout_now_btn_text']) && update_option('browter_woo_cart_checkout_now_btn_text', $data['checkout_now_btn_text']);


        $cart_title = get_option('browter_woo_cart_title');
        $apply_coupon_btn_text = get_option('browter_woo_cart_apply_coupon_btn_text');
        $apply_coupon_field_placeholder = get_option('browter_woo_cart_apply_coupon_field_placeholder');
        $empty_cart_btn_text = get_option('browter_woo_cart_empty_cart_btn_text');
        $view_cart_btn_text = get_option('browter_woo_cart_view_cart_btn_text');
        $checkout_now_btn_text = get_option('browter_woo_cart_checkout_now_btn_text');

        $data = [
            'cart_title' => $cart_title ? $cart_title : '',
            'apply_coupon_btn_text' => $apply_coupon_btn_text ? $apply_coupon_btn_text : '',
            'apply_coupon_field_placeholder' => $apply_coupon_field_placeholder ? $apply_coupon_field_placeholder : '',
            'empty_cart_btn_text' => $empty_cart_btn_text ? $empty_cart_btn_text : '',
            'view_cart_btn_text' => $view_cart_btn_text ? $view_cart_btn_text : '',
            'checkout_now_btn_text' => $checkout_now_btn_text ? $checkout_now_btn_text : '',
        ];

        return new WP_REST_Response($data, 200);
    }
}
