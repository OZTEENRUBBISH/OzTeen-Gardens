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

// Quote form: opens an email to the business with the details filled in.
// Swap this for Formspree, Netlify Forms or your own backend when ready.
const form = document.getElementById('quote');
form.addEventListener('submit', e => {
  e.preventDefault();
  [...form.elements].forEach(el => el.classList && el.classList.add('touched'));
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const d = Object.fromEntries(new FormData(form));
  const body = `Service: ${d.service}\nName: ${d.name}\nSuburb: ${d.suburb}\nPhone: ${d.phone}\n\n${d.notes || ''}`;
  window.location.href = `mailto:ozteenrubbish@gmail.com?subject=${encodeURIComponent('Quote request: ' + d.service)}&body=${encodeURIComponent(body)}`;
  form.querySelector('.thanks').hidden = false;
});