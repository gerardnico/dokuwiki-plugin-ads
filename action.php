<?php

if (!defined('DOKU_INC')) die();
if (!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN', DOKU_INC . 'lib/plugins/');
require_once(DOKU_PLUGIN . 'action.php');

class action_plugin_ads extends DokuWiki_Action_Plugin
{


    /**
     * Constructor
     */
    function __construct()
    {
        // enable direct access to language strings
        $this->setupLocale();
    }

    function getInfo()
    {
        return confToHash(dirname(__FILE__) . '/plugin.info.txt');
    }

    function register(Doku_Event_Handler $controller)
    {
        $controller->register_hook(
            'TPL_PAGE_TOP_OUTPUT',
            'BEFORE',
            $this,
            '_adTop',
            array()
        );

        $controller->register_hook(
            'TPL_SIDEBAR_BOTTOM_OUTPUT',
            'BEFORE',
            $this,
            '_adSideBar',
            array()
        );

    }

    //
    // Function for conditional Ads based on Country
    //
    // Example: Geo
    // $IPaddress=$_SERVER['REMOTE_ADDR'];
    // $IPaddress='193.173.53.8';
    // $two_letter_country_code=$this->iptocountry($IPaddress);
    // if ($two_letter_country_code=="NL")
    //
    // Bonus: Time : if ( time( ) < strtotime( "2020-2-7" ) ) {
    function iptocountry($ip)
    {
        $numbers = preg_split("/\./", $ip);
        include("ip_files/" . $numbers[0] . ".php");
        $code = ($numbers[0] * 16777216) + ($numbers[1] * 65536) + ($numbers[2] * 256) + ($numbers[3]);
        foreach ($ranges as $key => $value) {
            if ($key <= $code) {
                if ($ranges[$key][0] >= $code) {
                    $two_letter_country_code = $ranges[$key][1];
                    break;
                }
            }
        }
        if ($two_letter_country_code == "") {
            $two_letter_country_code = "unknown";
        }
        return $two_letter_country_code;
    }

    /**
     * Main function; dispatches the visual comment actions
     */
    function _adTop(&$event, $param)
    {


        global $ACT;
        $mode = array('admin', 'edit');
        if (!in_array($ACT, $mode)) {

            if (!$this->isMainPageHidden()) {
                if ($this->getConf('TestMode') == 1) {
                    ptln('<div align="center" style="border:1px solid;padding:30px;height:90px">Placeholder added by the `' . $this->getInfo()['name'] . '`</div>');
                } else {
                    ptln($this->getConf('AdsPageTop'));
                }
            }
        }

    }

    function _adSidebar(&$event, $param)
    {

        if (!$this->isMainPageHidden()) {
            if ($this->getConf('TestMode') == 1) {
                ptln('<div align="center" style="border:1px solid;padding:30px;height:90px">Placeholder added by the `' . $this->getInfo()['name'] . '`</div>');
            } else {

                ptln($this->getConf('AdsSidebarBottom'));

            }
        }

    }


    function isMainPageHidden()
    {

        global $INFO;
        global $ID;
        // The id of the page (not of the sidebar)
        $id = $ID;
        if ($INFO != null) {
            $id = $INFO['id'];
        }

        return isHiddenPage($id);
    }

}
