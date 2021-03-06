// to debug/load and debug from external
/*
 var e = document.createElement("script");
 e.src = 'https://dl-web.dropbox.com/get/racing/apps/userscripts/iracing-forum-declutterer/forum-declutterer-test.js?_subject_uid=136943504&w=AABqCWuvnaWLb8TAOZxaFjC7UlYVAUjwSMRKWR8q2t1ynQ&dl=1';
 e.type="text/javascript";
 document.getElementsByTagName("head")[0].appendChild(e);
 */
var load,execute,loadAndExecute,executeJQuery;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})}
,executeJQuery=function(a){if(typeof jQuery=='undefined'){var jqUrl='//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';loadAndExecute(jqUrl,a);}else{execute(a);}};

executeJQuery(function(){

    // Give some indication that we have 'decluttered' this list.
    var oldText = $(".lastLink:first").text();

    var images_to_remove = [
        "iconAnnouncement.png",
        "iconReadLocked.png",
        "iconStickyRead.png"
//        , "iconUnreadLocked.png" // leave this showing
//        , "iconStickyUnread.png" // leave this showing
    ];

    // don't filter the announcements
    if(window.location.pathname.indexOf("/605.page") > 0){

        $(".lastLink:first").text(oldText + " (declutterer disabled)")
    }
    else {

        // this isn't announcements, filter away.
        $(".lastLink:first").text(oldText + " (decluttered)")
        $.each(images_to_remove, function( index, image_to_remove ) {

            // original
//            $("td img[src*='/jforum/templates/iracing/images/" + image_to_remove + "']").parent().parent().toggle();

            // leave threads that have 'uning' || 'etup'.  i.e. this leaves 'Tuning Guide' and 'Setups' threads (not case sensitive)
            $("td img[src*='/jforum/templates/iracing/images/" + image_to_remove + "']").parent().parent()
                .filter(function( index ) {
                    return $( ".tdTopic a:first-child:contains('uning'), .tdTopic a:first-child:contains('etup')", this ).length <= 0;
                }).remove();
        });
    }
});