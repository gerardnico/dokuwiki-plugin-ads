# Dokuwiki Plugin Ad


## About

Show Ads on Dokuwiki


## Installation

In your template:
  * Add the trigger `TPL_PAGE_TOP_OUTPUT` at the top of your page
```php
$data="";// Mandatory
trigger_event('TPL_PAGE_TOP_OUTPUT',$data);
```
  * Add the trigger `TPL_SIDEBAR_BOTTOM_OUTPUT` at the bottom of your sidebar
```php
$data="";// Mandatory
trigger_event('TPL_SIDEBAR_BOTTOM_OUTPUT',$data);
```

Then gives the ads code in the admin configuration page of Dokuwiki.

## Configuration

  * You can set the `TestMode` to show Ads if you develop on localhost
  * `HomeAdInTopSlot` toggle the impression of an ad in top slot of your home page.
  * `NoAdPages` configuration has the same logic that the [hidepages](https://www.dokuwiki.org/config:hidepages)

Example to not show any ad on the `start` page and in the namespace `signup`

```regexp
^:(start|signup:.*)
```

