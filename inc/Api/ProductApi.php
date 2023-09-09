<?php

namespace Browter\Woocart\Api;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Response;

class ProductApi extends WP_REST_Controller
{

    /**
     * class constructor
     */
    function __construct()
    {
        $this->namespace = 'browter-woo-cart/v1';
        $this->rest_base = 'products';
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)/variations',
            [
                [
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => [$this, 'get_product_variations'],
                    'permission_callback' => [$this, 'read_permissions_check']
                ]

            ],
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>\d+)',
            [
                [
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => [$this, 'get_product'],
                    'permission_callback' => [$this, 'read_permissions_check']
                ]

            ],
        );
    }

    public function read_permissions_check()
    {
        return true;
    }


    public function get_product_variations($request)
    {

        $product_id = $request->get_param('id');
        $product = wc_get_product($product_id);

        if (!$product) {
            return new WP_Error('product_not_found', __('Product not found'), array('status' => 404));
        }

        $variations = $product->get_available_variations();

        return new WP_REST_Response($variations, 200);
    }

    public function get_product($request)
    {
        $product_id = $request->get_param('id');

        $product = wc_get_product($product_id);

        if (!$product) {
            return new WP_Error('product_not_found', __('Product not found'), array('status' => 404));
        }

        $product_data = $product->get_data();

        return new WP_REST_Response($product_data, 200);
    }
}
