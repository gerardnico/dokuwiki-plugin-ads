# Dokuwiki Plugin Ad


## About

Show Ads on Dokuwiki


## Installation

  * Add the trigger `TPL_SIDEBAR_OUTPUT`
```php
$data="";// Mandatory
trigger_event('TPL_SIDEBAR_OUTPUT',$data);
```
  * Add the trigger `TPL_TOP_OUTPUT`
```php
$data="";// Mandatory
trigger_event('TPL_TOP_OUTPUT',$data);
```

## Configuration

  * You can set the `TestMode` to show Ads if you develop on localhost
