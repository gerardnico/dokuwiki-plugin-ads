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
            consentBox = `
                <div id="gdpr_consent" class="container alert alert-secondary alert-dismissible fixed-bottom text-center fade" role="alert" >
                    By using our site, you acknowledge that you have read and understand our <a href="/legal/cookie">Cookie Policy</a>, <a href="/legal/privacy">Privacy Policy</a>, and our <a href="/legal/terms">Terms of Service</a>.
                    <button type="button" class="close" style="float:initial"  data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `
            jQuery("body").append(consentBox);
            let selector = '#gdpr_consent';
            // Show the alert
            jQuery(selector).addClass('show');
            // When it's closed, we save the consent
            jQuery(selector).on('closed.bs.alert', function () {
                //  This event is fired when the alert has been closed (will wait for CSS transitions to complete)
                localStorage.setItem(consentKey, true);
            })
        }
    }
};


gdpr.consent();


