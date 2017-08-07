<?php
/* 
Plugin Name: AS PostACE
Plugin URI: http://github.com/applehat/postace
Description: Replaces the default post text editor with ACE.
Version: 1.0
Author: Applehat Studios
Author URI: http://applehat.com
*/


class WPL_AsACE_Editor {

	static public $PLUGIN_NAME;
	static public $PLUGIN_PATH;
	static public $PLUGIN_DIR;
	static public $PLUGIN_URL;
	
	public function __construct() {
	
		self::$PLUGIN_NAME = basename(__FILE__);
		self::$PLUGIN_PATH = plugin_basename( dirname(__FILE__) );
		self::$PLUGIN_DIR = WP_PLUGIN_DIR.'/'.self::$PLUGIN_PATH.'/';
		self::$PLUGIN_URL = WP_PLUGIN_URL.'/'.self::$PLUGIN_PATH.'/';
		
		add_action( 'admin_init', array( &$this, 'onWpAdminInit' ) );
	
	}
		
	public function onWpAdminInit() {
		global $pagenow;

		if ( ( $pagenow == 'post.php') ) {
			add_action( 'admin_enqueue_scripts', array( &$this, 'onWpEnqueueScripts' ) );		
		}

	}
	
	public function onWpEnqueueScripts() {

		// ace editor
		wp_register_script( 'ace_editor', self::$PLUGIN_URL.'ace/ace.js', array() );
		wp_enqueue_script( 'ace_editor' );
	    
		// ace php mode
		wp_register_script( 'ace_mode_html', self::$PLUGIN_URL.'ace/mode-html.js', array( 'ace_editor' ) );
		wp_enqueue_script( 'ace_mode_html' );
	    
		// ace chrome theme
		wp_register_script( 'ace_theme_chrome', self::$PLUGIN_URL.'ace/theme-chrome.js', array( 'ace_editor' ) );
		wp_enqueue_script( 'ace_theme_chrome' );
		
		wp_enqueue_style( 'inject_ace_style', self::$PLUGIN_URL.'style.css');
		// modified editor.js admin panel script.
		wp_enqueue_script( 'modified_editor', self::$PLUGIN_URL.'editor.js',array('editor'),'1.0',true);
		wp_enqueue_script( 'inject_ace', self::$PLUGIN_URL.'handle.js',array('modified_editor'),'1.0',true);
	}
} 

// instantiate object
$oACE_Editor = new WPL_AsACE_Editor();

