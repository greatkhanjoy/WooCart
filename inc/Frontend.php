<?php

namespace Browter\Woocart;

class Frontend
{

    /**
     * class constructor
     */
    function __construct()
    {
        // add_shortcode('browter_woo_cart', [$this, 'browter_woo_cart_render_shortcode']);
        add_action('wp_footer', array($this, 'render_frontend'));
    }


    public function render_frontend()
    {
        wp_enqueue_script('browter-woo-cart-core');
        wp_enqueue_style('browter-woo-cart-script');
        // wp_enqueue_style('browter-woo-cart-style');

        if (is_shop()) {
            // Enqueue the WooCommerce variation scripts
            wp_enqueue_script('wc-add-to-cart-variation');
            wp_enqueue_script('wc-single-product');
        }

        $pluginUrl = plugin_dir_url(__FILE__);
        $nonce = wp_create_nonce('wp_rest');
        $wc_nonce = wp_create_nonce('wc_store_api');
        wp_localize_script('browter-woo-cart-core', 'browterwoocart', [
            'url' => $pluginUrl,
            'nonce' => $nonce,
            'wc_nonce' => $wc_nonce,
        ]);

        $cart_title = get_option('browter_woo_cart_title');
        $apply_coupon_btn_text = get_option('browter_woo_cart_apply_coupon_btn_text');
        $apply_coupon_field_placeholder = get_option('browter_woo_cart_apply_coupon_field_placeholder');
        $empty_cart_btn_text = get_option('browter_woo_cart_empty_cart_btn_text');
        $view_cart_btn_text = get_option('browter_woo_cart_view_cart_btn_text');
        $checkout_now_btn_text = get_option('browter_woo_cart_checkout_now_btn_text');
        $shop_page_id = get_option('woocommerce_shop_page_id');

        $data = [
            'nonce' => $nonce,
            'wc_nonce' => $wc_nonce,
            'version' => BWC_VERSION,
            'cart_title' => $cart_title ? $cart_title : '',
            'apply_coupon_btn_text' => $apply_coupon_btn_text ? $apply_coupon_btn_text : '',
            'apply_coupon_field_placeholder' => $apply_coupon_field_placeholder ? $apply_coupon_field_placeholder : '',
            'empty_cart_btn_text' => $empty_cart_btn_text ? $empty_cart_btn_text : '',
            'view_cart_btn_text' => $view_cart_btn_text ? $view_cart_btn_text : '',
            'checkout_now_btn_text' => $checkout_now_btn_text ? $checkout_now_btn_text : '',
            'cart_url' => wc_get_cart_url(),
            'checkout_url' => wc_get_checkout_url(),
            'shop_url' => get_permalink($shop_page_id)
        ];

        echo '<div id="browter-woo-cart-frontend"><pre id="browter-woo-cart-data-front" style="display: none;">' . wp_json_encode($data) . '</pre></div>';
    }

    // function shortocode render()
    // public function browter_woo_cart_render_shortcode()
    // {
    //     wp_enqueue_script('browter-woo-cart-core');
    //     wp_enqueue_style('browter-woo-cart-script');
    //     // wp_enqueue_style('browter-woo-cart-style');




    //     $pluginUrl = plugin_dir_url(__FILE__);
    //     $nonce = wp_create_nonce('wp_rest');
    //     wp_localize_script('browter-woo-cart-core', 'browterwoocart', [
    //         'url' => $pluginUrl,
    //         'nonce' => $nonce,
    //     ]);

    //     $data = [
    //         'nonce' => $nonce,
    //         'version' => BWC_VERSION,
    //     ];

    //     return '<div id="browter-woo-cart-frontend"><pre id="browter-woo-cart-data-front" style="display: none;">' . wp_json_encode($data) . '</pre></div>';
    // }
}
