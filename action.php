<?php

if(!defined('DOKU_INC')) die();
if(!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN',DOKU_INC.'lib/plugins/');
require_once(DOKU_PLUGIN.'action.php');

class action_plugin_ads extends DokuWiki_Action_Plugin {


        /**
         * Constructor
         */
	function __construct(){
		// enable direct access to language strings
		$this->setupLocale();
	}

	function getInfo(){
		return confToHash(dirname(__FILE__).'/plugin.info.txt');
	}

	function register(Doku_Event_Handler $controller){
		$controller->register_hook(
				'TPL_TOP_OUTPUT',
				'BEFORE',
				$this,
				'_adTop',
				array()
		);
                
                $controller->register_hook(
				'TPL_SIDEBAR_OUTPUT',
				'BEFORE',
				$this,
				'_adSideBar',
				array()
		);
                
                $controller->register_hook(
				'TPL_METAHEADER_OUTPUT',
				'BEFORE',
				$this,
				'_adJs',
				array()
		);
	}

	function iptocountry($ip) {
		$numbers = preg_split( "/\./", $ip);
		include("ip_files/".$numbers[0].".php");
		$code=($numbers[0] * 16777216) + ($numbers[1] * 65536) + ($numbers[2] * 256) + ($numbers[3]);
		foreach($ranges as $key => $value){
			if($key<=$code){
				if($ranges[$key][0]>=$code){
					$two_letter_country_code=$ranges[$key][1];break;
				}
			}
		}
		if ($two_letter_country_code==""){
			$two_letter_country_code="unkown";
		}
		return $two_letter_country_code;
	}

	/**
	 * Main function; dispatches the visual comment actions
	 */
	function _adTop(&$event, $param) {

            // Example conditional:
            // 
            // Geo
            // $IPaddress=$_SERVER['REMOTE_ADDR'];
            // $IPaddress='193.173.53.8';
            // $two_letter_country_code=$this->iptocountry($IPaddress);
            // if ($two_letter_country_code=="NL")
            //
            // Time
            // if ( time( ) < strtotime( "2020-2-7" ) ) {
            ptln('<div class="ads-top"');
            ptln('<!-- Top -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-9530166455702489"
                     data-ad-slot="9424922515"
                     data-ad-format="auto"
                     data-full-width-responsive="true"');
            
            if ($this->getConf('TestMode') == 1 ){
                print 'data-ad-test="on"';
            }
            
            ptln('>
                </ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>');
			
	}
        
        function _adSidebar(&$event, $param) {

            ptln('
                <!-- Only link -->
                <ins class="adsbygoogle"
                     style="display:block"
                     data-ad-client="ca-pub-9530166455702489"
                     data-ad-slot="9386255497"
                     data-ad-format="link"
                     data-full-width-responsive="true">');
            
            if ($this->getConf('TestMode') == 1 ){
                print 'data-ad-test="on"';
            }
            
            ptln('>
                </ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');
			
	}
        
        /**
	 * Add the Javascript
	 */
	function _adJs(&$event, $param) {

            // Adding the Google AdSense JavaScript File
            $event->data["script"][] = array (
              "async" => "true",
              "type" => "text/javascript",
              "src" => "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
              "_data" => "",
            );
			
	}

}
