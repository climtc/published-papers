(() => {
  const input = document.getElementById('paper-search');
  if (!input) return;
  const year = document.getElementById('paper-year');
  const records = [...document.querySelectorAll('.publication')];
  const count = document.getElementById('paper-count');
  const normal = value => value.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, '').trim();
  function filter() {
    const query = normal(input.value);
    let visible = 0;
    for (const record of records) {
      const match = (!query || normal(record.dataset.search).includes(query)) && (!year.value || record.dataset.year === year.value);
      record.hidden = !match;
      visible += Number(match);
    }
    count.textContent = query || year.value ? `검색 결과 ${visible}편` : `전체 ${records.length}편`;
    document.getElementById('paper-empty').hidden = visible !== 0;
  }
  function reset() { input.value = ''; year.value = ''; filter(); input.focus(); }
  document.getElementById('library-filters').hidden = false;
  input.addEventListener('input', filter);
  year.addEventListener('change', filter);
  document.getElementById('paper-reset').addEventListener('click', reset);
  document.getElementById('empty-reset').addEventListener('click', reset);
})();
