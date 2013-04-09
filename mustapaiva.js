/*This code is by SC5 and all rights belongs to them. http://sc5.github.com/copyright-campaign*/
var copyrightCampaign = function(options) {
    options = typeof options !== 'undefined' ? options : {};
    function setDefaultOption(option, value) {
        options[option] = typeof options[option] !== 'undefined' ? options[option] : value;
    }

    setDefaultOption(options, {});
    setDefaultOption("onCampaignDayOnly", true);
    setDefaultOption("showOnlyOnce", true);
    setDefaultOption("showCoders", false);
    setDefaultOption("title", 'Common sense into copyright law?');
    setDefaultOption("bigText", 'Sign the <a href="https://www.kansalaisaloite.fi/fi/aloite/70" target="_blank">law proposal for better copyright law</a>.');
    setDefaultOption("smallText", 'Check also: <a href="https://www.facebook.com/events/160986290729976/" target="_blank">Finnish Internet black day 23.4. event</a>');

    console.log(options);

    var today = new Date();
    if (!(today.getDate() == 23 && today.getMonth() == 3) && options["onCampaignDayOnly"]) {
        return;
    }

    if (typeof jQuery === "undefined") {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type","text/javascript");
        script_tag.setAttribute("src",
          "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
        script_tag.onload = main; // Run main() once jQuery has loaded
        script_tag.onreadystatechange = function () { // Same thing but for IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') main();
        }
        document.getElementsByTagName("head")[0].appendChild(script_tag);
    } else {
        main();
    }

    function main() {
        jQuery(document).ready(function (e) {
            jQuery("head").prepend("<link href='http://fonts.googleapis.com/css?family=Open+Sans:800|Gentium+Book+Basic' rel='stylesheet' type='text/css'>");
            
            var widgetStyle = '<style type="text/css">#copyright-campaign-box { z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;background:rgb(0,0,0);background:rgba(0,0,0,0.9);text-align:center;font-family:\'Gentium Book Basic\', serif;letter-spacing:0.1em;font-size:1em; } .inner-campaign-box { position:fixed;top:28px;right:28px;bottom:28px;left:28px;color:#EFEFEF;padding:20px;border:5px solid #ffffff; } #corner-close-button { position:fixed;top:8px;right:8px;padding:8px 16px;border-radius:2em;text-decoration:none;border:5px solid #ffffff;color:#ffffff;background:#000000;font-size:1em;font-weight:bold; } #corner-close-button:hover { background:#333333; } #campaign-text-content { position:fixed;top:30%;left:0;width:100%; } #copyright-campaign-box h1 { width:100%;font-family:\'Open Sans\', sans-serif;text-transform:uppercase;text-align:center;font-size:2.5em;margin: 0 auto 40px auto; } .campaign-text-content div { max-width:25em; padding: 0 30px; margin: 0 auto 40px auto; } #copyright-campaign-box a { color:#aaaacc;text-decoration:none; } #copyright-campaign-box a:hover { color:#ccccee;text-decoration:none; } #copyright-campaign-box .subscribe { font-size:1.5em; } #copyright-campaign-box .credits { position:fixed;bottom:40px;left:0;text-align:center;width:100%; } @media (max-width: 680px) { #copyright-campaign-box, #copyright-campaign-box .subscribe { font-size:1em; } #copyright-campaign-box h1 { font-size:1.5em; } .campaign-text-content { top: 20% } .campaign-text-content div, #copyright-campaign-box h1 { margin-bottom: 20px; } } @media(max-height: 500px) { .campaign-text-content { top: 10%; } .campaign-text-content div, #copyright-campaign-box h1 { margin-bottom: 10px; max-width: 35em } #copyright-campaign-box .credits { position: static;width:auto;max-width:none;} } </style>';

            jQuery("head").prepend(widgetStyle);

            var coders = '';
            if (options['showCoders']) {
                var coders = '<div class="credits"><a href="https://github.com/SC5/copyright-campaign/">Code</a> by <a href="http://sc5.io" target="_blank">SC5</a> and WordPress <a href="https://github.com/SipuliSopuli/mustapaiva">implementation</a> by <a href="http://wahalahti.fi" target="_blank">Wahalahti</a></div>';
            };

            var widgetElement = '<div id="copyright-campaign-box"><div class="inner-campaign-box";><a href="#" id="corner-close-button" class="close-copyright-campaign-box" style="color:#ffffff">Close</a><div class="campaign-text-content"><h1>'+options.title+'</h1><div class="subscribe">'+options.bigText+'</div><div>'+options.smallText+'</div><div><a href="#" class="close-copyright-campaign-box">Close</a></div></div>'+coders+'</div></div>';
            jQuery(document.body).append(widgetElement);

            function hideBox() {
                jQuery("#copyright-campaign-box").hide();
                if(options["showOnlyOnce"] && typeof(Storage)!=="undefined") {
                    localStorage.boxClosed = true;
                }
            }

            if(options["showOnlyOnce"] && typeof(Storage)!=="undefined" && localStorage.boxClosed) {
                hideBox();
            }

            jQuery(".close-copyright-campaign-box").click(function(e) {
                hideBox();
            });

            jQuery(document).keyup(function(e) {
                if (e.keyCode == 27) {
                    hideBox();
                }
            });
        });
    }
};