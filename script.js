// Before/after pairs: [title, before file, after file]
const pairs = [
  ['Side walkway', 'Landscaping Side Walkway Before.png', 'Landscaping Side Walkway After.png'],
  ['Nature strip', 'Landscaping Nature Strip Before.png', 'Landscaping Nature Strip After.jpg'],
  ['Backyard', 'Landscaping Backyard Before.png', 'Landscaping Backyard After.png'],
  ['Backyard makeover', 'Landscaping Backyard 2 Before.png', 'Landscaping Backyard 2 After.png'],
  ['Front garden', 'Landscaping Before 1.png', 'Landscaping After 1.png'],
  ['Garden refresh', 'Landscaping Before 2.png', 'Landscaping After 2.png']
];

const designs = [
  'Landscaping Final House Design.PNG',
  'Landscaping Final House Design 2.PNG',
  'Landscaping Final House Design 3.PNG',
  'Landscaping Final House Design 4.PNG'
];

const src = f => encodeURI(f);

document.getElementById('pairs').innerHTML = pairs.map(([t, b, a]) => `
  <div>
    <div class="pair">
      <figure><img src="${src(b)}" alt="${t} before" loading="lazy"><figcaption>Before</figcaption></figure>
      <figure><img src="${src(a)}" alt="${t} after" loading="lazy"><figcaption>After</figcaption></figure>
    </div>
    <h3 style="font-size:20px;margin-top:10px">${t}</h3>
  </div>`).join('');

document.getElementById('dgrid').innerHTML = designs
  .map((f, i) => `<img src="${src(f)}" alt="Finished landscape ${i + 1}" loading="lazy">`).join('');

document.addEventListener('click', e => {
  const m = document.querySelector('.menu');
  if (m && !m.contains(e.target)) m.open = false;
});

// Quote form: sends to Web3Forms, shows the thank-you only after a successful send.
const WEB3FORMS_ACCESS_KEY = '461f0ba0-441f-448d-a5b8-a2887b7c7203';
const ENDPOINT = 'https://api.web3forms.com/submit';
const form = document.getElementById('quote');
const btn = form.querySelector('button[type="submit"]');
const thanks = form.querySelector('.thanks');
const err = form.querySelector('.err');

form.addEventListener('submit', async e => {
  e.preventDefault();
  [...form.elements].forEach(el => el.classList && el.classList.add('touched'));
  if (!form.checkValidity()) { form.reportValidity(); return; }

  thanks.hidden = true;
  err.hidden = true;
  btn.disabled = true;
  btn.textContent = 'Sending...';

  const data = new FormData(form);
  data.append('access_key', WEB3FORMS_ACCESS_KEY);
  data.append('subject', 'Quote request: ' + data.get('service'));

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    });
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error('Send failed');
    form.reset();
    form.querySelectorAll('.touched').forEach(el => el.classList.remove('touched'));
    thanks.hidden = false;
  } catch (_) {
    err.hidden = false;
  }
  btn.disabled = false;
  btn.textContent = 'Send my details';
});
