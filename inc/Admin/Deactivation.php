<?php

namespace Browter\Woocart\Admin;

class Deactivation
{

    /**
     * class constructor
     */
    function __construct()
    {
        $this->remove_fields();
    }

    protected function remove_fields()
    {
        $installed = get_option('browter_woo_cart_installed');
        $version = get_option('browter_woo_cart_version');

        if ($installed) {
            delete_option('browter_woo_cart_installed');
        }
        if ($version) {
            delete_option('browter_woo_cart_version');
        }
    }
}
