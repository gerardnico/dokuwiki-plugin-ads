// // Must be started after page load
// jQuery(function () {
//         Gdpr.consent();
//     }
// );


// The key to store the consent (true, false or nonEur)

let consentKey = 'consent_gdpr';
// They key to store the country why not

let countryKey = 'country_code';
// Consent Value set if the country is not an EU country

let consentValueNonEu = 'nonEu';


function consentBox(consentPages) {

    let pages = 'privacy policy';

    if (typeof consentPages !== 'undefined') {
        pages = '';
        var keys = Object.keys(consentPages);
        for (var i = 0; i < keys.length; i++) {
            pages += `<a href="${consentPages[keys[i]]}">${keys[i]} policy</a>`;
            if (i<keys.length-2){
                pages +=", "
            }
            if (i===(keys.length-2)){
                pages +=" and "
            }
        }
    }
    let consentBoxId = 'gdpr_consent';
    let consentBoxSelector = '#' + consentBoxId;
    let consentBox = `
                <div id="${consentBoxId}" class="container alert alert-secondary alert-dismissible fixed-bottom text-center fade" role="alert" >
                    By using our site, you acknowledge that you have read and understand our ${pages}.
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
        localStorage.setItem(consentKey, true);
    })


}


export function consent(consentPages) {

    let consentStorage = localStorage.getItem(consentKey);
    if (!consentStorage) {
        localStorage.setItem(consentKey, false);
    }
    // getItem return a string, therefore !'false' is false and not true
    let consent = ( consentStorage !== 'true' || consentStorage !== consentValueNonEu);
    if (consent) {
        jQuery.ajax(
            'https://ip2c.org/self',
            {
                success: function (data) {
                    let countryCode = data.split(";")[1];
                    localStorage.setItem(countryKey, countryCode);
                    let euCountryCodes = ['AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FO', 'FI', 'FR', 'GB', 'GE', 'GI', 'GR', 'HU', 'HR', 'IE', 'IS', 'IT', 'LT', 'LU', 'LV', 'MC', 'MK', 'MT', 'NO', 'NL', 'PO', 'PT', 'RO', 'RU', 'SE', 'SI', 'SK', 'SM', 'TR', 'UA', 'VA'];
                    if (euCountryCodes.includes(countryCode)) {
                        consentBox(consentPages);
                    } else {
                        localStorage.setItem(consentKey, consentValueNonEu);
                    }
                }
            }
        )
    }
}





