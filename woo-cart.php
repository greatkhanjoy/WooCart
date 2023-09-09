<?php

/**
 * Plugin Name: Woo Cart
 * Description: Woocommerce Instant add to cart and on page checkout plugin.
 * Author URI:  https://greatkhanjoy.browter.com
 * Plugin URI:  https://browter.com
 * Version:     1.0.0
 * Author:      Imran Hosein Khan Joy
 * Text Domain: browter-woocart
 * Domain Path: /i18n
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

final class Browter_Woo_Cart
{
    /**
     * Plugin version
     *
     * @var string
     */
    const version = '1.0.0';
    const prefix = 'browter-woo-cart';

    /**
     * class constructor
     */
    private function __construct()
    {
        $this->define_constants();
        register_activation_hook(__FILE__, [$this, 'activate']);

        register_uninstall_hook(__FILE__, [__CLASS__, 'uninstall']);
        register_deactivation_hook(__FILE__, [$this, 'deactivation']);
        add_action('plugins_loaded', [$this, 'init_plugin']);
        add_action('admin_notices', [$this, 'plugin_activation_notice']);
    }

    /**
     * Initialize a singleton instance
     *
     * @return \Browter_Woo_Cart
     */
    public static function init()
    {
        static $instance = false;

        if (!$instance) {
            $instance = new self();
        }
    }

    /**
     * Define necessary constants
     * @return void
     */
    public function define_constants()
    {
        define('BWC_VERSION', self::version);
        define('BWC_FILE', __FILE__);
        define('BWC_PATH', __DIR__);
        define('BWC_URL', plugins_url('', BWC_FILE));
        define('BWC_ASSETS', BWC_URL . '/assets');
    }


    /**
     * Function to deactivation the plugin
     */
    protected function deactivation_plugin()
    {
        require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        deactivation_plugins(plugin_basename(__FILE__));
        if (isset($_GET['activate'])) {
            unset($_GET['activate']);
        }
    }

    /**
     * Admin Notice
     */
    function plugin_activation_notice()
    {

        $current_permalink_structure = get_option('permalink_structure');
        if ($current_permalink_structure === '/%postname%/') {
            return;
        }


        echo '<div class="notice notice-warning is-dismissible">';
        echo '<p>Please update your permalink structure to "Post name" for optimal plugin functionality. You can change this under Settings > Permalinks.</p>';
        echo '</div>';
    }

    /**
     * Initialize the plugin
     *
     * @return void
     */
    public function init_plugin()
    {
        if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {
            add_action('admin_enqueue_scripts', [$this, 'loadAssets']);
            add_action('wp_enqueue_scripts', [$this, 'loadAssets']);
            add_filter('script_loader_tag', [$this, 'loadScriptAsModule'], 10, 3);
            add_filter('script_loader_tag', [$this, 'loadScriptAsModuleTwo'], 10, 3);


            if (is_admin()) {
                new Browter\Woocart\Admin();
            } else {
                new Browter\Woocart\Frontend();
            }

            new \Browter\Woocart\Api();
        } else {
            $this->deactivation_plugin();
            wp_die('Could not be activated. ' . $this->get_admin_notices());
        }
    }

    /**
     * Do stuff upon plugin activation
     *
     * @return void
     */
    public function activate()
    {
        if (in_array('woocommerce/woocommerce.php', apply_filters('active_plugins', get_option('active_plugins')))) {

            global $wp_rewrite;
            $current_permalink_structure = get_option('permalink_structure');
            if ($current_permalink_structure !== '/%postname%/') {
                $wp_rewrite->set_permalink_structure('/%postname%/');
                $wp_rewrite->flush_rules();
            }




            new \Browter\Woocart\Admin\Settings();
        } else {
            $this->deactivation_plugin();
            wp_die('Could not be activated. ' . $this->get_admin_notices());
        }
    }

    /**
     * Deactivation 
     */

    public function deactivation()
    {
        new \Browter\Woocart\Admin\Deactivation();
    }

    protected function uninstall()
    {
        //
    }

    /**
     * Writing the admin notice
     */
    protected function get_admin_notices()
    {
        return sprintf(
            'WooCommerce is required to activate WooCart plugin. Please install and activate WooCommerce before activate Woocart'
        );
    }





    // function load script as module
    function loadScriptAsModule($tag, $handle, $src)
    {
        if ('browter-woo-cart-core' !== $handle) {
            return $tag;
        }
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
        return $tag;
    }

    // function load script as module
    function loadScriptAsModuleTwo($tag, $handle, $src)
    {
        if ('browter-woo-cart-script' !== $handle) {
            return $tag;
        }
        $tag = '
        <script type="module" crossorigin >
        import RefreshRuntime from "' . esc_url($src) . '";
        RefreshRuntime.injectIntoGlobalHook(window);
        window.$RefreshReg$ = () => {};
        window.$RefreshSig$ = () => (type) => type;
        window.__vite_plugin_react_preamble_installed__ = true;
        </script>';
        return $tag;
    }


    // Add admin menu
    function adminMenu()
    {
        add_menu_page('Woo cart', 'Woo cart', 'manage_options', 'browter-woo-cart', [$this, 'loadAdminPage'], 'dashicons-vault', 6);
    }

    // Admin page render
    function loadAdminPage()
    {
        wp_enqueue_script('browter-woo-cart-core');
        wp_enqueue_script('browter-woo-cart-script');
        // wp_enqueue_style('browter-woo-cart-style');

        $pluginUrl = plugin_dir_url(__FILE__);
        wp_localize_script('browter-woo-cart-core', 'woocart', [
            'url' => $pluginUrl,
            'nonce' => wp_create_nonce('wp_rest'),
        ]);

        include_once(plugin_dir_path(__FILE__) . "/inc/admin.php");
    }

    // Load assets  for admin and frontend
    function loadAssets()
    {
        // wp_register_script('browter-woo-cart-core', plugins_url('dist/assets/index-0340b01b.js', __FILE__), [], time(), true);
        // wp_register_style('browter-woo-cart-style', plugins_url('dist/assets/index-f25b5597.css', __FILE__), [], time(), 'all');

        wp_register_script('browter-woo-cart-core', 'http://localhost:5173/src/main.jsx', ['browter-woo-cart-script'], time(), true);


        wp_register_script(
            'browter-woo-cart-script',
            'http://localhost:5173/@react-refresh',
            [],
            null,
            true
        );
    }
}

/**
 * Initialize the plugin
 *
 * @return \Browter_Woo_Cart
 */
function browter_woo_cart()
{
    return Browter_Woo_Cart::init();
}



browter_woo_cart();
