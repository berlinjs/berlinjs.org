;(function (win, element) {
  function twitterLink(attendee, content) {
    return '<a href="http://twitter.com/' + attendee.twitter + '" title="' + attendee.name + ' - ' + attendee.twitter + '">' + content + '</a>';
  }

  function imageTag(attendee) {
    return '<img src="' + attendee.avatar + '" width="48" height="48">';
  }

  function showError() {
    element.innerHTML = 'Error fetching the attendees from Lanyrd';
  }

  function log(message) {
    'console' in win ? console.log(message) : ''
  }

  if (!('JSON' in win && typeof JSON.parse === 'function')) {
    // no JSON, no cry
    showError();
    return;
  }

  var xhr = 'XMLHttpRequest' in win ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

  xhr.onerror = function(event) {
    log(event);
    showError();
  };

  xhr.onreadystatechange = function() {
    var attendees = [];
    var html      = '';

    try {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        showError();
      } else {
        attendees = JSON.parse(xhr.responseText);

        for (var i = 0; i < attendees.length; i++) {
          html = html + '<li>' + twitterLink(attendees[i], imageTag(attendees[i])) + '</li>';
        }

        element.innerHTML = html;
      }
    } catch (e) {
      log(e);
      showError();
    }
  };

  xhr.open('GET', 'http://lanyrd.berlinjs.org/2011/rejectjs/', true);
  xhr.send();
}(window, document.getElementById('lanyrd-attendees')));
