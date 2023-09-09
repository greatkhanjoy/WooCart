<?php

namespace Browter\Woocart\Admin;

class Menu
{

    /**
     * class constructor
     */
    function __construct()
    {
        add_action('admin_menu', [$this, 'adminMenu']);
        add_filter('woocommerce_rest_check_permissions', [$this, 'my_woocommerce_rest_check_permissions'], 90, 4);
    }



    public function my_woocommerce_rest_check_permissions($permission, $context, $object_id, $post_type)
    {
        return true;
    }

    // Add admin menu
    function adminMenu()
    {
        add_menu_page('Woo cart', 'Woo cart', 'manage_options', 'browter-woo-cart', [$this, 'loadAdminPage'], 'dashicons-cart', 6);
    }

    // Admin page render
    function loadAdminPage()
    {
        wp_enqueue_script('browter-woo-cart-core');
        wp_enqueue_script('browter-woo-cart-script');
        // wp_enqueue_style('browter-woo-cart-style');


        $pluginUrl = plugin_dir_url(__FILE__);
        $nonce = wp_create_nonce('wp_rest');
        wp_localize_script('browter-woo-cart-core', 'browterwoocart', [
            'url' => $pluginUrl,
            'nonce' => $nonce,
        ]);

        $cart_title = get_option('browter_woo_cart_title');
        $apply_coupon_btn_text = get_option('browter_woo_cart_apply_coupon_btn_text');
        $apply_coupon_field_placeholder = get_option('browter_woo_cart_apply_coupon_field_placeholder');
        $empty_cart_btn_text = get_option('browter_woo_cart_empty_cart_btn_text');
        $view_cart_btn_text = get_option('browter_woo_cart_view_cart_btn_text');
        $checkout_now_btn_text = get_option('browter_woo_cart_checkout_now_btn_text');


        $data = [
            'nonce' => $nonce,
            'version' => BWC_VERSION,
            'cart_title' => $cart_title ? $cart_title : '',
            'apply_coupon_btn_text' => $apply_coupon_btn_text ? $apply_coupon_btn_text : '',
            'apply_coupon_field_placeholder' => $apply_coupon_field_placeholder ? $apply_coupon_field_placeholder : '',
            'empty_cart_btn_text' => $empty_cart_btn_text ? $empty_cart_btn_text : '',
            'view_cart_btn_text' => $view_cart_btn_text ? $view_cart_btn_text : '',
            'checkout_now_btn_text' => $checkout_now_btn_text ? $checkout_now_btn_text : '',
        ];

        ob_start();
?>
        <div class="browter-plugin-page-wrap">
            <div id="browter-woo-cart">
                <pre id="browter-woo-cart-data" style="display: none;"><?php echo wp_json_encode($data) ?></pre>
            </div>
        </div>
<?php
        $output = ob_get_clean();
        echo $output;
        return $output;
    }
}
