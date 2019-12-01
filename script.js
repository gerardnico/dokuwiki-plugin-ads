var ads = {
    consent: function () {
        let modal_id = '#dialog';
        jQuery(modal_id).dialog(
            {
                autoOpen: true,
                width: '100%',
                height: 60,
                draggable: false,
                resizable: false,
                position: { my: "center bottom", at: "center bottom", of: window  },
                dialogClass: 'ads_style bg-light'
            }
        );
    }
};


ads.consent();
