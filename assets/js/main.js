// JS simple : année automatique + formulaire contact (mailto)

(function () {
  // Année dans le footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Formulaire contact
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var subject = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      var to = 'hamdibenjedidiaa@gmail.com';
      var body =
        'Nom: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        message;

      var mailto =
        'mailto:' + encodeURIComponent(to) +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      // Ouvre le client mail
      window.location.href = mailto;
    });
  }
})();
