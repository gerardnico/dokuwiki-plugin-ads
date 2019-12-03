var ads = {
    selector: '#gdpr_consent',
    consent: function () {
        let selector = this.selector;
        // Show the alert
        jQuery(selector).addClass('show');
        // A click on the document, close it
        jQuery( document ).click(function() {
            jQuery(selector).alert('close')
        });
        // Except in the element itself
        jQuery( selector ).click(function(e) {
            e.stopPropagation();
        });
        // When it's closed, we save the consent
        jQuery(selector).on('closed.bs.alert', function () {
            //  This event is fired when the alert has been closed (will wait for CSS transitions to complete)
            console.log("Gdpr was closed");
        })
    }
};


ads.consent();
