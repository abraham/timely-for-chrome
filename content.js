console.log('Loading Timely');
var type = 'newTwitter',
    formSelectors = { newTwitter: 'div.tweet-box', intent: '#update-form' },
    submitSelectors = { newTwitter: 'a.tweet-button', intent: 'input.submit' },
    timelyChromeReset = (new Date()).getTime();

if (window.location.pathname && window.location.pathname === '/intent/tweet') {
  type = 'intent';
  attatchButton()
} else {
  $('.twitter-anywhere-tweet-box-editor').live('focus', attatchButton);
}

function attatchButton() {
  $('a.tweet-button:contains("Send")').parents('div.tweet-box').addClass('no-timely');
  $(formSelectors[type] + ':not(.timely):not(.no-timely)')
    .addClass('timely')
    .find(submitSelectors[type])
    .before("<a href='#' class='tweet-button timely-button button disabled'><img width='13px' height='13px' src='" + chrome.extension.getURL('clock.png') + "' title='Schedule with Timely' /></a>");
  $('a.timely-button').click(openPopup);
  $('textarea').keyup(triggerKeyup);
}

function triggerKeyup() {
  var $this = $(this),
      $button = $this.parents(formSelectors[type]).find('a.timely-button');
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
      $textarea = $this.parents(formSelectors[type]).find('textarea'),
      width = 500,
      height = 225,
      left = Math.round((screen.width - width) / 2),
      top = Math.round((screen.height - height) / 2);
  window.ft = window.open('http://timely.flowtown.com/bookmarklet?s=' + encodeURIComponent($textarea.val()), '', 'left=' + left + ',top=' + (top > 0 ? top : 0) + ',width=' + width + ',height=' + height + ',personalbar=0,toolbar=0,scrollbars=0,resizable=1');
  
  $this.addClass('disabled').next().addClass('disabled');
  $textarea.val('');
  timelyChromeReset = (new Date()).getTime();
}