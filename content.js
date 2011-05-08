console.log('content');
var timelyChromeReset = (new Date()).getTime();
$('.twitter-anywhere-tweet-box-editor').live('focus', function() {
  $('a.tweet-button:contains("Send")').parents('div.tweet-box').addClass('no-timely');
  $('div.tweet-box:not(.timely):not(.no-timely)').addClass('timely').find('a.tweet-button').before("<a href='#' class='tweet-button timely-button button disabled'><img width='13px' height='13px' src='" + chrome.extension.getURL('clock.png') + "' title='Schedule with Timely' /></a>");
  $('a.timely-button').click(function() {
    if (timelyChromeReset > (new Date()).getTime() - 2 * 1000) {
      return;
    }
    var $this = $(this),
        $textarea = $this.parents('div.tweet-box').find('textarea'),
        width = 500,
        height = 225,
        left = Math.round((screen.width - width) / 2),
        top = Math.round((screen.height - height) / 2);
    window.ft = window.open('http://timely.flowtown.com/bookmarklet?s=' + encodeURIComponent($textarea.val()), '', 'left=' + left + ',top=' + (top > 0 ? top : 0) + ',width=' + width + ',height=' + height + ',personalbar=0,toolbar=0,scrollbars=0,resizable=1');
        
    $this.addClass('disabled');
    $textarea.val('');
    timelyChromeReset = (new Date()).getTime();
  });
  $('.twitter-anywhere-tweet-box-editor').keyup(function() {
    var $this = $(this),
        $button = $this.parents('div.tweet-box').find('a.timely-button');
    
    if ($this.val().length > 0) {
      $button.removeClass('disabled');
    } else {
      $button.addClass('disabled');
    }
    
  });
});


