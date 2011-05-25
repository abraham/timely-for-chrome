console.log('Loading Timely');
var timelyChromeReset = (new Date()).getTime();

if (window.location.pathname && window.location.pathname === '/intent/tweet') {
  $('#update-form')
    .addClass('timely')
    .find('input.submit')
    .before("<a href='#' class='tweet-button timely-button button disabled'><img width='13px' height='13px' src='" + chrome.extension.getURL('clock.png') + "' title='Schedule with Timely' /></a>");

  $('a.timely-button').click(openPopup);
  $('#status').keyup(  function() {
        var $this = $(this),
            $button = $this.parents('#update-form').find('a.timely-button');

        if ($this.val().length > 0) {
          $button.removeClass('disabled');
        } else {
          $button.addClass('disabled');
        }
      });
} else {
  $('.twitter-anywhere-tweet-box-editor').live('focus', attachDefaultButton);
}

function attachDefaultButton() {
  // Find DM fields and mark to avoid.
  $('a.tweet-button:contains("Send")').parents('div.tweet-box').addClass('no-timely');
  // Attach button to form.
  $('div.tweet-box:not(.timely):not(.no-timely)')
    .addClass('timely')
    .find('a.tweet-button')
    .before("<a href='#' class='tweet-button timely-button button disabled'><img width='13px' height='13px' src='" + chrome.extension.getURL('clock.png') + "' title='Schedule with Timely' /></a>");
  $('.twitter-anywhere-tweet-box-editor').keyup(triggerKeyup);
  $('a.timely-button').click(openPopup);
}

function triggerKeyup() {
  var $this = $(this),
      $button = $this.parents('div.tweet-box').find('a.timely-button');
  
  if ($this.val().length > 0) {
    $button.removeClass('disabled');
  } else {
    $button.addClass('disabled');
  }
}

function openPopup() {
  // Hack to keep from opening duplicate windows for 2 seconds.
  if (timelyChromeReset > (new Date()).getTime() - 2 * 1000) {
    return;
  }

  var $this = $(this),
      $textarea = $this.parents('div.tweet-box').find('textarea').length ? $this.parents('div.tweet-box').find('textarea') : $this.parents('#update-form').find('textarea'),
      width = 500,
      height = 225,
      left = Math.round((screen.width - width) / 2),
      top = Math.round((screen.height - height) / 2);
  window.ft = window.open('http://timely.flowtown.com/bookmarklet?s=' + encodeURIComponent($textarea.val()), '', 'left=' + left + ',top=' + (top > 0 ? top : 0) + ',width=' + width + ',height=' + height + ',personalbar=0,toolbar=0,scrollbars=0,resizable=1');
      
  $this.addClass('disabled');
  $textarea.val('');
  $textarea.trigger('keyup');
  timelyChromeReset = (new Date()).getTime();
}