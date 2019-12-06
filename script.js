// http://ip-api.com/json
// var data = JSON.parse(request.responseText);
// var eu_country_codes = ['AL','AD','AM','AT','BY','BE','BA','BG','CH','CY','CZ','DE','DK','EE','ES','FO','FI','FR','GB','GE','GI','GR','HU','HR','IE','IS','IT','LT','LU','LV','MC','MK','MT','NO','NL','PO','PT','RO','RU','SE','SI','SK','SM','TR','UA','VA'];
// if (eu_country_codes.indexOf(data.countryCode) != -1) {

var gdpr = {
    consent: function () {
        let consentKey = 'consent_gdpr';
        if (!localStorage.getItem(consentKey)) {
            localStorage.setItem(consentKey, false);
        }
        // getItem return a string, therefore !'false' is false and not true
        let consent = ( localStorage.getItem(consentKey) === 'true' );
        if (!consent) {
            // Load the consent file
            jQuery("body").load("consent_modal.html", function () {
                let selector = '#gdpr_consent';
                // Show the alert
                jQuery(selector).addClass('show');
                // When it's closed, we save the consent
                jQuery(selector).on('closed.bs.alert', function () {
                    //  This event is fired when the alert has been closed (will wait for CSS transitions to complete)
                    localStorage.setItem(consentKey, true);
                })
            });
        }
    }
};


gdpr.consent();


