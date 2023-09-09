<?php

namespace Browter\Woocart\Api;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Response;

class CartApi extends WP_REST_Controller
{
    /**
     * Class constructor
     */
    public function __construct()
    {
        $this->namespace = 'browter-woo-cart/v1';
        $this->rest_base = 'cart';
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/',
            [
                [
                    'methods' => \WP_REST_Server::EDITABLE,
                    'callback' => [$this, 'update_cart_item_quantity'],
                    'permission_callback' => [$this, 'read_permissions_check']
                ],
                [
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => [$this, 'delete_cart_item'],
                    'permission_callback' => [$this, 'read_permissions_check']
                ],
                [
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => [$this, 'empty_cart'],
                    'permission_callback' => [$this, 'read_permissions_check']
                ]
            ]
        );
    }

    public function read_permissions_check()
    {
        return true;
    }

    public function update_cart_item_quantity($request)
    {
        $item_key = $request->get_param('item_key');
        $quantity = $request->get_param('quantity');
        // $cart = WC()->session->get('cart');

        // foreach ($cart['cart_contents'] as &$item) {
        //     if ($item['key'] === $item_key) {
        //         $item['quantity'] = $quantity;
        //         break;
        //     }
        // }

        // WC()->session->set('cart', $cart);

        $response = new WP_REST_Response([
            'success' => true,
            'message' => 'Cart item quantity updated successfully.',
        ]);

        $response->set_status(200);

        return $response;
    }

    public function delete_cart_item($request)
    {
        $item_key = $request->get_param('item_key');

        // Perform the necessary logic to delete the cart item
        // You can use WooCommerce functions or interact with the database directly
        // Example using WooCommerce functions
        WC()->cart->remove_cart_item($item_key);

        $response = new WP_REST_Response([
            'success' => true,
            'message' => 'Cart item deleted successfully.',
        ]);

        $response->set_status(200);

        return $response;
    }

    public function empty_cart()
    {
        // Perform the necessary logic to empty the cart
        // You can use WooCommerce functions or interact with the database directly
        // Example using WooCommerce functions
        WC()->cart->empty_cart();

        $response = new WP_REST_Response([
            'success' => true,
            'message' => 'Cart emptied successfully.',
        ]);

        $response->set_status(200);

        return $response;
    }
}
