// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

function reduceToSingleDigit(num) {
  const masterNumbers = [11, 22, 33];
  while (num > 9 && !masterNumbers.includes(num)) {
    num = String(num).split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

function getDestinySteps(dateString) {
  const digits = dateString.replace(/-/g, '').split('').map(Number);
  const steps = [];
  let sum = digits.reduce((a, b) => a + b, 0);
  const digitStr = digits.join('+');
  steps.push(`${digitStr} = ${sum}`);

  const masterNumbers = [11, 22, 33];
  while (sum > 9 && !masterNumbers.includes(sum)) {
    const parts = String(sum).split('').map(Number);
    const next = parts.reduce((a, b) => a + b, 0);
    steps.push(`${parts.join('+')} = ${next}`);
    sum = next;
  }

  return { steps, result: sum };
}

const numberDescriptions = {
  1: {
    name: 'Лидер',
    text: 'Единица — число первопроходцев и новаторов. Люди с числом судьбы 1 обладают сильной волей, независимостью и стремлением быть первыми. Они рождены для лидерства и не боятся идти своим путём. Такие люди обладают яркой индивидуальностью, уверенностью в себе и способностью вдохновлять окружающих. Им свойственна предприимчивость и желание создавать что-то новое. В профессиональной сфере единицы часто становятся руководителями, предпринимателями или творческими лидерами. Однако им важно научиться сотрудничать с другими и не подавлять окружающих своей силой. В отношениях единицы ценят партнёров, которые уважают их независимость. Их жизненный путь — это путь самореализации через личную инициативу и смелые решения.'
  },
  2: {
    name: 'Дипломат',
    text: 'Двойка — число партнёрства и гармонии. Люди с этим числом обладают тонкой интуицией, чувствительностью и умением находить общий язык с окружающими. Они природные миротворцы, способные сглаживать конфликты и создавать атмосферу согласия. Им важны отношения, семья и эмоциональная близость. Двойки часто работают в сферах, связанных с помощью людям: психология, медицина, дипломатия, искусство. Их сила — в терпении, такте и способности слушать. Однако чрезмерная чувствительность может приводить к зависимости от мнения других. Двойкам важно развивать уверенность в себе и учиться говорить «нет». В любви они преданы и заботливы, стремятся к глубокой эмоциональной связи. Их путь — через сотрудничество, понимание и создание гармонии вокруг себя.'
  },
  3: {
    name: 'Творец',
    text: 'Тройка — число творчества и самовыражения. Люди с числом 3 наделены ярким воображением, оптимизмом и даром слова. Они умеют вдохновлять, развлекать и нести радость окружающим. Тройки часто реализуют себя в искусстве, литературе, музыке, актёрском мастерстве или публичных выступлениях. Их энергия заразительна, а общительность помогает заводить новые знакомства. Однако склонность к поверхностности и рассеянности может мешать доводить дела до конца. Тройкам важно научиться дисциплине и сосредоточенности. В отношениях они романтичны, щедры на комплименты и эмоции. Их жизненный путь — через творческое самовыражение, радость жизни и способность делиться своим светом с миром.'
  },
  4: {
    name: 'Строитель',
    text: 'Четвёрка — число порядка и стабильности. Люди с этим числом судьбы — надёжные, трудолюбивые и практичные. Они строят прочный фундамент во всём: в карьере, семье, финансах. Четвёрки ценят дисциплину, системность и чёткие правила. Они отличные организаторы, инженеры, бухгалтеры и управленцы. Их терпение и настойчивость позволяют достигать долгосрочных целей. Однако чрезмерная ригидность может превращаться в упрямство и страх перемен. Четвёркам полезно иногда выходить из зоны комфорта и пробовать новое. В отношениях они верны и заботливы, создают для близких ощущение безопасности. Их путь — через упорный труд, создание стабильности и построение чего-то прочного и долговечного.'
  },
  5: {
    name: 'Искатель',
    text: 'Пятёрка — число свободы и перемен. Люди с числом 5 жаждут приключений, новых впечатлений и разнообразия. Они любознательны, энергичны и не терпят скуки. Пятёрки часто путешествуют, меняют профессии, пробуют себя в разных сферах. Их обаяние и коммуникабельность открывают множество дверей. Они прекрасно адаптируются к изменениям и умеют находить нестандартные решения. Однако стремление к свободе может приводить к непостоянству и избеганию обязательств. Пятёркам важно найти баланс между свободой и ответственностью. В любви они страстны и непредсказуемы, нуждаются в партнёре, который не будет их сдерживать. Их жизненный путь — через познание мира, расширение горизонтов и обретение мудрости через опыт.'
  },
  6: {
    name: 'Хранитель',
    text: 'Шестёрка — число любви и ответственности. Люди с этим числом глубоко заботятся о близких, стремятся создать гармонию в доме и обществе. Они щедры, сострадательны и готовы жертвовать ради других. Шестёрки часто работают в сферах помощи: медицина, образование, социальная работа, дизайн интерьеров. Их чувство эстетики и справедливости делает их прекрасными советчиками. Однако склонность к гиперопеке может приводить к выгоранию и контролю над близкими. Шестёркам важно заботиться и о себе. В отношениях они преданы, романтичны и создают атмосферу тепла. Их путь — через служение другим, создание красоты и гармонии, воспитание и поддержку.'
  },
  7: {
    name: 'Мудрец',
    text: 'Семёрка — число мудрости и познания. Люди с числом 7 стремятся к глубокому пониманию жизни, духовному развитию и поиску истины. Они аналитичны, интроспективны и обладают развитой интуицией. Семёрки часто увлекаются наукой, философией, эзотерикой, исследовательской деятельностью. Им нужно время в одиночестве для размышлений. Они ценят качество превыше количества — как в отношениях, так и в работе. Однако склонность к изоляции может приводить к отчуждённости и недоверию. Семёркам важно делиться своими открытиями с миром. В любви они ищут глубокую духовную связь, а не поверхностные отношения. Их жизненный путь — через познание, медитацию и обретение внутренней мудрости.'
  },
  8: {
    name: 'Властелин',
    text: 'Восьмёрка — число силы и материального успеха. Люди с этим числом обладают амбициями, организаторскими способностями и талантом к управлению ресурсами. Они стремятся к власти, признанию и финансовому благополучию. Восьмёрки часто становятся руководителями, бизнесменами, финансистами или политиками. Их решительность и практичность помогают достигать масштабных целей. Однако одержимость материальным успехом может приводить к жёсткости и пренебрежению духовными ценностями. Восьмёркам важно использовать свою силу во благо. В отношениях они надёжны, но могут быть требовательны. Их путь — через ответственное лидерство, построение империи и баланс между материальным и духовным.'
  },
  9: {
    name: 'Гуманист',
    text: 'Девятка — число альтруизма и завершения. Люди с числом 9 обладают широкой душой, состраданием и стремлением служить человечеству. Они видят общую картину, понимают связь всех вещей и стремятся сделать мир лучше. Девятки часто работают в благотворительности, искусстве, медицине, дипломатии. Их мудрость и опыт привлекают людей, ищущих совета. Однако идеализм может приводить к разочарованиям, а склонность к самопожертвованию — к истощению. Девяткам важно принимать несовершенство мира. В любви они щедры и преданы, но могут идеализировать партнёра. Их жизненный путь — через служение высшим идеалам, завершение циклов и передачу мудрости следующим поколениям.'
  },
  11: {
    name: 'Просветлённый',
    text: 'Одиннадцать — мастер-число духовного просветления. Люди с этим числом обладают повышенной интуицией, вдохновением и способностью влиять на сознание других. Они чувствительны к тонким энергиям, часто обладают экстрасенсорными способностями или творческим гением. Одиннадцатые — проводники высших идей, способные вдохновлять массы. Однако высокая чувствительность делает их уязвимыми к стрессу и тревожности. Им важно заземляться и заботиться о физическом теле. В отношениях они ищут духовного родственника. Их путь — через служение высшему, развитие интуиции и реализацию духовного предназначения на Земле.'
  },
  22: {
    name: 'Мастер-строитель',
    text: 'Двадцать два — мастер-число великих свершений. Люди с числом 22 способны воплощать масштабные идеи в материальном мире. Они сочетают практичность четвёрки с духовным видением одиннадцати. Это архитекторы судьбы, способные строить империи, создавать системы и менять общество. Двадцать вторые обладают огромным потенциалом, но и огромной ответственностью. Им важно не бояться своей силы и использовать её конструктивно. Давление ожиданий может быть тяжёлым, поэтому им нужна поддержка близких. В отношениях они ищут партнёра, разделяющего их амбиции. Их путь — через великие дела, которые приносят пользу многим людям.'
  },
  33: {
    name: 'Мастер-учитель',
    text: 'Тридцать три — мастер-число высшей любви. Люди с этим числом несут энергию безусловной любви, исцеления и духовного учительства. Они способны поднимать других, исцелять души и нести свет в самые тёмные уголки. Тридцать третьи часто становятся наставниками, целителями, художниками или общественными деятелями. Их сострадание безгранично, но им важно не растворяться в проблемах других. Это редкое и мощное число, требующее духовной зрелости. В отношениях они безусловно любят и принимают. Их жизненный путь — через служение человечеству, исцеление и распространение любви.'
  }
};

const letterValues = {
  'А': 1, 'Б': 2, 'В': 3, 'Г': 4, 'Д': 5, 'Е': 6, 'Ё': 7, 'Ж': 8, 'З': 9,
  'И': 1, 'Й': 2, 'К': 3, 'Л': 4, 'М': 5, 'Н': 6, 'О': 7, 'П': 8, 'Р': 9,
  'С': 1, 'Т': 2, 'У': 3, 'Ф': 4, 'Х': 5, 'Ц': 6, 'Ч': 7, 'Ш': 8, 'Щ': 9,
  'Ъ': 1, 'Ы': 2, 'Ь': 3, 'Э': 4, 'Ю': 5, 'Я': 6
};

function calculateDestinyNumber(dateString) {
  const { result } = getDestinySteps(dateString);
  return result;
}

function calculateNameNumber(name) {
  const upper = name.toUpperCase().trim();
  let sum = 0;
  const breakdown = [];

  for (const char of upper) {
    if (letterValues[char]) {
      sum += letterValues[char];
      breakdown.push({ letter: char, value: letterValues[char] });
    }
  }

  return { number: reduceToSingleDigit(sum), sum, breakdown };
}

function calculateCompatibility(num1, num2) {
  const compatNumber = reduceToSingleDigit(num1 + num2);
  const percent = getCompatibilityPercent(num1, num2);
  const text = getCompatibilityText(num1, num2, compatNumber, percent);
  return { compatNumber, percent, text };
}

function getCompatibilityPercent(n1, n2) {
  const matrix = {
    '1-1': 75, '1-2': 55, '1-3': 80, '1-4': 45, '1-5': 85, '1-6': 60, '1-7': 50, '1-8': 70, '1-9': 65,
    '1-11': 90, '1-22': 88, '1-33': 85,
    '2-2': 80, '2-3': 65, '2-4': 70, '2-5': 50, '2-6': 90, '2-7': 75, '2-8': 55, '2-9': 70,
    '2-11': 85, '2-22': 80, '2-33': 92,
    '3-3': 75, '3-4': 50, '3-5': 85, '3-6': 80, '3-7': 60, '3-8': 55, '3-9': 70,
    '3-11': 88, '3-22': 75, '3-33': 90,
    '4-4': 70, '4-5': 45, '4-6': 75, '4-7': 65, '4-8': 85, '4-9': 60,
    '4-11': 70, '4-22': 92, '4-33': 75,
    '5-5': 70, '5-6': 55, '5-7': 65, '5-8': 60, '5-9': 75,
    '5-11': 80, '5-22': 70, '5-33': 78,
    '6-6': 85, '6-7': 60, '6-8': 65, '6-9': 80,
    '6-11': 88, '6-22': 75, '6-33': 95,
    '7-7': 75, '7-8': 55, '7-9': 70,
    '7-11': 92, '7-22': 80, '7-33': 90,
    '8-8': 65, '8-9': 60,
    '8-11': 75, '8-22': 88, '8-33': 80,
    '9-9': 70, '9-11': 90, '9-22': 85, '9-33': 95,
    '11-11': 95, '11-22': 90, '11-33': 98,
    '22-22': 92, '22-33': 95,
    '33-33': 98
  };

  const a = Math.min(n1, n2);
  const b = Math.max(n1, n2);
  const key = `${a}-${b}`;
  return matrix[key] || 65;
}

function getCompatibilityText(n1, n2, compatNum, percent) {
  const desc = numberDescriptions[compatNum];
  const level = percent >= 85 ? 'отличная' : percent >= 70 ? 'хорошая' : percent >= 55 ? 'средняя' : 'сложная';

  return `Нумерологическая совместимость между числами ${n1} и ${n2} оценивается как ${level} — ${percent}%. ` +
    `Число совместимости вашей пары — ${compatNum} (${desc.name}). ` +
    `Это означает, что ваши энергии ${percent >= 70 ? 'дополняют друг друга и создают потенциал для гармоничных отношений' : 'имеют различия, которые потребуют понимания и компромиссов'}. ` +
    `${desc.text.split('.')[0]}. ` +
    `В отношениях важно ${percent >= 85 ? 'ценить уникальность друг друга и развивать общие цели' : 'уважать различия, открыто общаться и находить точки соприкосновения'}. ` +
    `Помните: нумерология — это инструмент самопознания, а не приговор. Любые числа могут создать счастливый союз при взаимном уважении и любви.`;
}

function getShortDescription(num) {
  const desc = numberDescriptions[num];
  if (!desc) return '';
  const sentences = desc.text.split('. ');
  return sentences.slice(0, 2).join('. ') + '.';
}

const CYRILLIC_NAME_RE = /[А-Яа-яЁё]/;

function validateName(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Введите имя';
  }
  if (!CYRILLIC_NAME_RE.test(trimmed)) {
    return 'Введите имя кириллицей (русский алфавит)';
  }
  const { breakdown } = calculateNameNumber(trimmed);
  if (breakdown.length === 0) {
    return 'В имени нет букв для расчёта. Используйте русский алфавит';
  }
  return null;
}

function showFieldError(input, message) {
  clearFieldError(input);
  const error = document.createElement('p');
  error.className = 'form-error';
  error.setAttribute('role', 'alert');
  error.textContent = message;
  input.classList.add('form-control-error');
  input.after(error);
}

function clearFieldError(input) {
  input.classList.remove('form-control-error');
  const group = input.closest('.form-group');
  if (group) {
    group.querySelectorAll('.form-error').forEach((el) => el.remove());
  }
}

function bindFieldErrorClear(input) {
  input.addEventListener('input', () => clearFieldError(input));
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function animateCountUp(element, target, duration = 600) {
  const value = Number(target);
  if (!Number.isFinite(value)) {
    element.textContent = target;
    return;
  }

  element.classList.remove('result-number-animate');
  void element.offsetWidth;

  if (prefersReducedMotion()) {
    element.textContent = String(target);
    return;
  }

  element.classList.add('result-number-animate');

  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = progress < 1 ? String(Math.round(value * eased)) : String(target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  element.textContent = '0';
  requestAnimationFrame(tick);
}

function animateResultNumbers(container, selectors = '.result-number, .compat-num-item .num') {
  container.querySelectorAll(selectors).forEach((element) => {
    const target = element.dataset.animateTarget;
    if (target !== undefined) {
      animateCountUp(element, target);
    }
  });
}

function revealResultBlock(container, selectors) {
  container.classList.add('visible');
  animateResultNumbers(container, selectors);
}

function renderDestinyResult(container, dateString) {
  const num = calculateDestinyNumber(dateString);
  const desc = numberDescriptions[num];
  const { steps } = getDestinySteps(dateString);

  container.querySelector('.result-number').dataset.animateTarget = num;
  container.querySelector('.result-title').textContent = `Число судьбы — ${num}: ${desc.name}`;
  container.querySelector('.result-text').textContent = desc.text;

  const formulaBlock = container.querySelector('.formula-block');
  if (formulaBlock) {
    formulaBlock.innerHTML = '<h4>Формула расчёта</h4>' +
      steps.map(s => `<div class="formula-step">${s}</div>`).join('');
  }

  revealResultBlock(container);
}

function renderNameResult(container, name) {
  const { number, breakdown } = calculateNameNumber(name);
  const desc = numberDescriptions[number];
  if (!desc) return;

  const breakdownEl = container.querySelector('.letter-breakdown');
  if (breakdownEl) {
    breakdownEl.innerHTML = breakdown.map(item =>
      `<div class="letter-item"><span class="letter">${item.letter}</span><span class="value">${item.value}</span></div>`
    ).join('');
  }

  container.querySelector('.result-number').dataset.animateTarget = number;
  container.querySelector('.result-title').textContent = `Число имени — ${number}: ${desc.name}`;
  container.querySelector('.result-text').textContent = desc.text;
  revealResultBlock(container);
}

function renderCompatResult(container, data) {
  const { person1, person2, num1, num2, compat } = data;

  container.querySelector('.person1-num').dataset.animateTarget = num1;
  container.querySelector('.person1-label').textContent = person1;
  container.querySelector('.person2-num').dataset.animateTarget = num2;
  container.querySelector('.person2-label').textContent = person2;
  container.querySelector('.result-number').dataset.animateTarget = compat.compatNumber;
  container.querySelector('.result-title').textContent = `Совместимость: ${compat.percent}%`;
  container.querySelector('.result-text').textContent = compat.text;

  const fill = container.querySelector('.progress-bar-fill');
  const percentEl = container.querySelector('.progress-percent');
  if (fill) {
    fill.style.width = '0';
    setTimeout(() => { fill.style.width = compat.percent + '%'; }, 100);
  }
  if (percentEl) {
    percentEl.textContent = compat.percent + '%';
  }

  revealResultBlock(container);
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  const setMenuOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  toggle.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
}

function initHeroCalculator() {
  const form = document.getElementById('hero-calc-form');
  if (!form) return;

  const dateInput = form.querySelector('input[type="date"]');
  const result = document.getElementById('hero-result');
  bindFieldErrorClear(dateInput);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFieldError(dateInput);

    if (!dateInput.value) {
      showFieldError(dateInput, 'Укажите дату рождения');
      result.classList.remove('visible');
      return;
    }

    const num = calculateDestinyNumber(dateInput.value);
    const desc = numberDescriptions[num];

    const numEl = result.querySelector('.result-number');
    numEl.dataset.animateTarget = num;
    result.querySelector('.result-title').textContent = `Число судьбы — ${num}: ${desc.name}`;
    result.querySelector('.result-text').textContent = getShortDescription(num);
    revealResultBlock(result);
  });
}

function initDestinyCalculator() {
  const form = document.getElementById('destiny-calc-form');
  if (!form) return;

  const dateInput = form.querySelector('input[type="date"]');
  const result = document.getElementById('destiny-result');
  bindFieldErrorClear(dateInput);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFieldError(dateInput);

    if (!dateInput.value) {
      showFieldError(dateInput, 'Укажите дату рождения');
      result.classList.remove('visible');
      return;
    }

    renderDestinyResult(result, dateInput.value);
  });
}

function initNameCalculator() {
  const form = document.getElementById('name-calc-form');
  if (!form) return;

  const nameInput = form.querySelector('input[type="text"]');
  const result = document.getElementById('name-result');
  bindFieldErrorClear(nameInput);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFieldError(nameInput);

    const error = validateName(nameInput.value);
    if (error) {
      showFieldError(nameInput, error);
      result.classList.remove('visible');
      return;
    }

    renderNameResult(result, nameInput.value);
  });
}

function initCompatCalculator() {
  const form = document.getElementById('compat-calc-form');
  if (!form) return;

  const name1Input = form.querySelector('#person1-name');
  const name2Input = form.querySelector('#person2-name');
  const result = document.getElementById('compat-result');
  bindFieldErrorClear(name1Input);
  bindFieldErrorClear(name2Input);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFieldError(name1Input);
    clearFieldError(name2Input);

    const name1 = name1Input.value;
    const date1 = form.querySelector('#person1-date').value;
    const name2 = name2Input.value;
    const date2 = form.querySelector('#person2-date').value;

    const name1Error = validateName(name1);
    if (name1Error) {
      showFieldError(name1Input, name1Error);
      result.classList.remove('visible');
      return;
    }

    const name2Error = validateName(name2);
    if (name2Error) {
      showFieldError(name2Input, name2Error);
      result.classList.remove('visible');
      return;
    }

    if (!date1 || !date2) {
      const dateInput = !date1
        ? form.querySelector('#person1-date')
        : form.querySelector('#person2-date');
      showFieldError(dateInput, 'Укажите дату рождения');
      result.classList.remove('visible');
      return;
    }

    const num1 = calculateDestinyNumber(date1);
    const num2 = calculateDestinyNumber(date2);
    const compat = calculateCompatibility(num1, num2);

    renderCompatResult(result, {
      person1: name1.trim(),
      person2: name2.trim(),
      num1,
      num2,
      compat
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeroCalculator();
  initDestinyCalculator();
  initNameCalculator();
  initCompatCalculator();
});
