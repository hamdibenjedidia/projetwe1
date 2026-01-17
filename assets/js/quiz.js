// Quiz simple (10 questions) : afficher les questions, calculer la note, afficher les bonnes réponses.

(function () {
  var quizContainer = document.getElementById('quizContainer');
  var quizForm = document.getElementById('quizForm');
  var resetBtn = document.getElementById('resetBtn');
  var resultBox = document.getElementById('resultBox');
  var scoreText = document.getElementById('scoreText');
  var answersBox = document.getElementById('answersBox');

  if (!quizContainer || !quizForm) {
    return;
  }

  var questions = [
    {
      text: 'HTML sert principalement à :',
      choices: ['Styliser une page', 'Structurer le contenu', 'Gérer une base de données'],
      answerIndex: 1
    },
    {
      text: 'En CSS, la propriété pour changer la couleur du texte est :',
      choices: ['color', 'background', 'font-weight'],
      answerIndex: 0
    },
    {
      text: 'Quelle balise est sémantique ?',
      choices: ['<div>', '<span>', '<header>'],
      answerIndex: 2
    },
    {
      text: 'En JavaScript, pour afficher un message, on peut utiliser :',
      choices: ['alert()', 'print()', 'show()'],
      answerIndex: 0
    },
    {
      text: 'Le rôle de la balise <a> est :',
      choices: ['Créer un lien', 'Créer une image', 'Créer un tableau'],
      answerIndex: 0
    },
    {
      text: 'Quel attribut permet d’ouvrir un lien dans un nouvel onglet ?',
      choices: ['target="_blank"', 'href="new"', 'rel="open"'],
      answerIndex: 0
    },
    {
      text: 'Quelle balise sert à créer une liste non ordonnée ?',
      choices: ['<ul>', '<ol>', '<li>'],
      answerIndex: 0
    },
    {
      text: 'Le sélecteur CSS ".card" cible :',
      choices: ['Une balise <card>', 'Un id nommé card', 'Une classe nommée card'],
      answerIndex: 2
    },
    {
      text: 'Quel événement JS est souvent utilisé lors d’un clic ?',
      choices: ['click', 'hover', 'scrollend'],
      answerIndex: 0
    },
    {
      text: 'GitHub Pages sert à :',
      choices: ['Héberger un site statique', 'Créer une base de données', 'Compiler du C#'],
      answerIndex: 0
    }
  ];

  function renderQuestions() {
    quizContainer.innerHTML = '';

    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];

      var block = document.createElement('div');
      block.className = 'question';

      var title = document.createElement('p');
      title.className = 'question-title';
      title.textContent = (i + 1) + ') ' + q.text;
      block.appendChild(title);

      for (var c = 0; c < q.choices.length; c++) {
        var label = document.createElement('label');
        label.className = 'choice';

        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'q' + i;
        radio.value = String(c);

        label.appendChild(radio);
        label.appendChild(document.createTextNode(' ' + q.choices[c]));
        block.appendChild(label);
      }

      quizContainer.appendChild(block);
    }
  }

  function getUserAnswers() {
    var answers = [];

    for (var i = 0; i < questions.length; i++) {
      var selected = document.querySelector('input[name="q' + i + '"]:checked');
      answers.push(selected ? Number(selected.value) : null);
    }

    return answers;
  }

  function showResults(score, userAnswers) {
    var total = questions.length;
    resultBox.style.display = 'block';
    scoreText.textContent = 'Votre note : ' + score + ' / ' + total;

    // Liste des bonnes réponses
    var html = '<h4>Bonnes réponses</h4><ol>';

    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var good = q.choices[q.answerIndex];
      var user = (userAnswers[i] === null) ? 'Aucune réponse' : q.choices[userAnswers[i]];

      var ok = (userAnswers[i] === q.answerIndex);
      html += '<li><strong>' + q.text + '</strong><br>' +
              'Votre réponse : <span class="' + (ok ? 'ok' : 'ko') + '">' + user + '</span><br>' +
              'Bonne réponse : <span class="ok">' + good + '</span></li>';
    }

    html += '</ol>';
    answersBox.innerHTML = html;
  }

  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var userAnswers = getUserAnswers();
    var score = 0;

    for (var i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answerIndex) {
        score++;
      }
    }

    showResults(score, userAnswers);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      quizForm.reset();
      resultBox.style.display = 'none';
      answersBox.innerHTML = '';
      window.scrollTo(0, 0);
    });
  }

  renderQuestions();
})();
