
var ads = {
    consent: function(){
        let modal_id = '#ads_consent';
        jQuery(modal_id).modal({
            keyboard: true,
            show: true,
            backdrop: false
        })
        jQuery('body').css('overflow-y', 'auto');
        jQuery(modal_id).css('padding-right', '0');
    }
};

ads.consent();
