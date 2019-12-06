

const Gdpr  = class {

    // The key to store the consent (true, false or nonEur)
    static consentKey = 'consent_gdpr';
    // They key to store the country why not
    static countryKey = 'country_code';
    // Consent Value set if the country is not an EU country
    static consentValueNonEu = 'nonEu';

    static consent() {

        let consentStorage = localStorage.getItem(Gdpr.consentKey);
        if (!consentStorage) {
            localStorage.setItem(Gdpr.consentKey, false);
        }
        // getItem return a string, therefore !'false' is false and not true
        let consent = ( consentStorage !== 'true' || consentStorage !== Gdpr.consentValueNonEu);
        if (consent) {
            jQuery.ajax(
                'https://ip2c.org/self',
                {
                    success: function (data) {
                        let countryCode = data.split(";")[1];
                        localStorage.setItem(Gdpr.countryKey, countryCode);
                        let euCountryCodes = ['AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FO', 'FI', 'FR', 'GB', 'GE', 'GI', 'GR', 'HU', 'HR', 'IE', 'IS', 'IT', 'LT', 'LU', 'LV', 'MC', 'MK', 'MT', 'NO', 'NL', 'PO', 'PT', 'RO', 'RU', 'SE', 'SI', 'SK', 'SM', 'TR', 'UA', 'VA'];
                        if (euCountryCodes.includes(countryCode)) {
                            Gdpr.consentBox();
                        } else {
                            localStorage.setItem(Gdpr.consentKey, Gdpr.consentValueNonEu);
                        }
                    }
                }
            )
        }
    }

    static consentBox = function () {

        let consentBoxId = 'gdpr_consent';
        let consentBoxSelector = '#' + consentBoxId;
        let consentBox = `
                <div id="${consentBoxId}" class="container alert alert-secondary alert-dismissible fixed-bottom text-center fade" role="alert" >
                    By using our site, you acknowledge that you have read and understand our <a href="/legal/cookie">Cookie Policy</a>, <a href="/legal/privacy">Privacy Policy</a>, and our <a href="/legal/terms">Terms of Service</a>.
                    <button type="button" class="close" style="float:initial"  data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
        jQuery("body").append(consentBox);
// Show the alert
        jQuery(consentBoxSelector).addClass('show');
// When it's closed, we save the consent
        jQuery(consentBoxSelector).on('closed.bs.alert', function () {
            //  This event is fired when the alert has been closed (will wait for CSS transitions to complete)
            localStorage.setItem(Gdpr.consentKey, true);
        })


    };

};

// Must be started after page load
jQuery(function () {
        Gdpr.consent();
    }
);


