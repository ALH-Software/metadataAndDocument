(function ($) {

  function setCookie(name, value, days) {
    var expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length == 2)
      return parts.pop().split(';').shift();
  }

  if (getCookie('task_tkn') !== undefined) {
    var span = document.createElement('span');
    span.classList.add('navbar-text');

    var logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.classList.add('btn', 'btn-sm', 'btn-light');
    let btnText = document.createTextNode('Logout');
    logoutBtn.appendChild(btnText);

    span.appendChild(logoutBtn);

    document.getElementById('navbarsExample02').appendChild(span);
  }

  $('#logoutBtn').on('click', function () {
    document.cookie = "task_tkn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = '/login';
  });

  if ($('body')[0].id === 'listMetadata' || $('body')[0].id === 'listDocuments') {
    if (getCookie('task_tkn') === undefined) {
      location.href = '/login';
    } else {
      var url = $('body')[0].id === 'listMetadata' ? '/api/metadata/' : '/api/document/';
      var content = [];
      $.ajax({
        async: false,
        url: url,
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + getCookie('task_tkn')
        },
        success: function (response) {
          content = response;
        },
        error: function (err) {
          if (err.statusText === 'Unauthorized') {
            location.href = '/login';
          }
          alert('Error!');
          console.log(err);
        },
      });

      content.forEach(function (item) {
        var tbody = document.getElementById('dataTbody');
        var tr = tbody.insertRow(-1);

        var name = $('body')[0].id === 'listMetadata' ? item.metadata_name : item.document_name;
        var value = $('body')[0].id === 'listMetadata' ? item.metadata_string : item.document_file;

        tr.id = name.replace(/\s+/g, '_');

        var td1 = tr.insertCell(0);
        var nameElem = document.createTextNode(name);
        td1.appendChild(nameElem);

        var td2 = tr.insertCell(1);

        if ($('body')[0].id === 'listMetadata') {
          var valueTxt = document.createTextNode(value);
          td2.appendChild(valueTxt);
        } else {
          var aLink = document.createElement('a');
          aLink.href = value;
          var aTxt = document.createTextNode('Download');
          aLink.appendChild(aTxt);
          td2.appendChild(aLink);
        }

        var td3 = tr.insertCell(2);
        var btn = document.createElement('a');
        btn.href = $('body')[0].id === 'listMetadata' ? '/metadata/' + name : '/document/' + name;
        var btnTxt = document.createTextNode('Show');
        btn.classList.add('btn', 'btn-sm', 'btn-primary');
        btn.appendChild(btnTxt);
        td3.appendChild(btn);
      });
    }


  }

  if ($('body')[0].id === 'showMetadata' || $('body')[0].id === 'showDocument') {
    if (getCookie('task_tkn') === undefined) {
      location.href = '/login';
    } else {

      var entityName = location.href.split('/').pop();
      var url = $('body')[0].id === 'showMetadata' ? '/api/metadata/' + entityName : '/api/document/' + entityName;

      var item = {};
      $.ajax({
        async: false,
        url: url,
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + getCookie('task_tkn')
        },
        success: function (response) {
          item = response;
        },
        error: function (err) {
          if (err.statusText === 'Unauthorized') {
            location.href = '/login';
          }
          alert('Error!');
          console.log(err);
        },
      });

      var name = $('body')[0].id === 'showMetadata' ? item.metadata_name : item.document_name;

      var valueElem = document.createElement('h4');

      if ($('body')[0].id === 'showMetadata') {
        h4Txt = document.createTextNode('Metadata:' + item.metadata_string);
        valueElem.appendChild(h4Txt);
      } else {
        var aLink = document.createElement('a');
        aLink.href = item.document_file;
        var aTxt = document.createTextNode('Download File');
        aLink.appendChild(aTxt);
        valueElem.appendChild(aLink);
      }

      var dataDiv = document.getElementById('dataDiv');

      var nameElem = document.createElement('h4');
      var h4Txt = document.createTextNode('Name: ' + name);
      nameElem.appendChild(h4Txt);

      dataDiv.appendChild(nameElem);
      dataDiv.appendChild(valueElem);
    }
  }

  $('form').submit(function (event) {
    event.preventDefault();

    var form = $('form')[0];
    var formData = new FormData(form);

    if (form.id === 'loginForm') {
      $.ajax({
        url: '/api/token/',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function (data, status) {
          if (data) {
            setCookie('task_tkn', data.access, 1);
            location.href = '/metadata';
          } else {
            alert('Request Error occured!');
          }
        },
        error: function (err) {
          alert('Unauthorised User!');
          console.log(err);
        }
      });

    } else if (form.id === 'signupForm') {
      $.ajax({
        url: '/api/createuser/',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function (data, status) {
          if (data) {
            location.href = '/login';
          } else {
            alert('Request Error occured!');
          }
        },
        error: function (err) {
          alert(err.responseJSON.username[0]);
          console.log(err);
        }
      });

    } else if (form.id === 'addDocument') {
      var url = '/api/document/';
      var redirect = '/document';
    } else if (form.id === 'addMetadata') {
      var url = '/api/metadata/';
      var redirect = '/metadata'
    }

    $.ajax({
      url: url,
      data: formData,
      type: 'POST',
      contentType: false,
      processData: false,
      headers: {
        'Authorization': 'Bearer ' + getCookie('task_tkn')
      },
      success: function (data, status) {
        if (data) {
          location.href = redirect;
        } else {
          alert('Request Error occured!');
        }
      },
      error: function (err) {
        console.log(err);
        if (err.statusText === 'Unauthorized') {
          location.href = '/login';
        } else {
          if(form.id === 'addDocument'){
            var errorText = err.responseJSON.document_name[0];
            alert('Error! ' + errorText);
          } else if (form.id === 'addMetadata'){
            var errorText = err.responseJSON.metadata_name[0];
            alert('Error! ' + errorText);
          }
          console.log(err);
        }
      }
    });
  });
}(jQuery))