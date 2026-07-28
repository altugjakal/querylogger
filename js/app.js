const rawKeystrokeBuffer = [];
let prevPressTime = null;
let prevReleaseTime = null;

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keydown', (event) => {
  if (event.repeat) return;

  const now = performance.now();
  const currentKey = event.code;

  const flightUD = prevReleaseTime ? now - prevReleaseTime : 0.0;
  const flightDD = prevPressTime ? now - prevPressTime : 0.0;




  let flag = 0;
  if (currentKey === 'Space') flag = 1.0;
  if (currentKey === 'Backspace' || currentKey === 'Delete') flag = -1.0;


  rawKeystrokeBuffer.push({
    code: currentKey,
    pressTime: now,
    flightUD: flightUD,
    flightDD: flightDD,
    flag: flag,
    dwellTime: 0.0
  });

  prevPressTime = now;

  if (currentKey === 'Enter') search();

});

searchInput.addEventListener('keyup', (event) => {
  const now = performance.now();

  const matchingStep = rawKeystrokeBuffer.findLast(step => step.code === event.code && step.dwellTime === 0.0);

  if (matchingStep) {
    matchingStep.dwellTime = now - matchingStep.pressTime;
  }

  prevReleaseTime = now;
});

function search() {
  let complete_query = document.getElementById('search-input').value.trim();
  let json_string = {'query': complete_query, 'keystrokes': rawKeystrokeBuffer};
  storeApi(json_string).then(r => console.log(r));
}

async function storeApi(input){
  try {
    const response = await fetch('/api/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input)
    });
    return await response.json();
  } catch (e) {
    console.error('Fetch error:', e);
  }
}
