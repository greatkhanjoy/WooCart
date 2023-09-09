<?php

namespace Browter\Woocart;

class Api
{

    /**
     * class constructor
     */
    function __construct()
    {
        add_action('rest_api_init', [$this, 'register_api']);
    }

    public function register_api()
    {
        $product_api = new Api\ProductApi();
        $product_api->register_routes();

        $cart_api = new Api\CartApi();
        $cart_api->register_routes();

        $settings_api = new Api\SettingsApi();
        $settings_api->register_routes();
    }
}
