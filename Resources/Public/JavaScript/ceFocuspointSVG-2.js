RGAPP.focuspoints = {

    lazyCallback: function(img){
        // show the features (html on outside)
        var fileUid = $(img).attr('data-file-uid');
        $('.focuspoint__feature--hidden[data-file-uid="'+fileUid+'"]').removeClass('focuspoint__feature--hidden');

        // start the corresponding start animation
        var startAnimation = $('#startAnimation[data-file-uid="'+fileUid+'"]').get(0);
        if(startAnimation) startAnimation.beginElement();
    }

}
// register callback to global scope in order to make it callable from bw_lazyload_placeholder extension js
var RGLazyCallback = RGAPP.focuspoints.lazyCallback;