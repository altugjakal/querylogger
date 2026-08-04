let rawKeystrokeBuffer = [];
let prevPressTime = null;
let prevReleaseTime = null;

const searchInput = document.getElementById('search-input');
const currentTaskField = document.getElementById('currentTask');

let current_task = 0
let taskList = [
    {'instruction': 'Go to wikipedia', 'intent': 0},
    {'instruction': 'Go to Tom Cruises Instagram Page', 'intent': 0},
    {'instruction': 'Go to reddit', 'intent': 0},
    {'instruction': 'Go to the white house website', 'intent': 0},
    {'instruction': 'Find out about the different chameleon colors', 'intent': 1},
    {'instruction': 'Look up the capital of Australia', 'intent': 1},
    {'instruction': 'Read about how black holes form in space', 'intent': 1},
    {'instruction': 'Research the symptoms of vitamin D deficiency', 'intent': 1},
    {'instruction': 'Buy a leather jacket online', 'intent': 2},
    {'instruction': 'Order a pepperoni pizza from Dominos', 'intent': 2},
    {'instruction': 'Purchase tickets for the upcoming concert', 'intent': 2},
    {'instruction': 'Subscribe to Netflix premium plan', 'intent': 2}
  ];

if (currentTaskField && taskList[current_task]) {
  currentTaskField.innerText = taskList[current_task].instruction;
}

function switchTask() {
  if (current_task + 1 < taskList.length) {
    current_task++;
    if (currentTaskField) {
      currentTaskField.innerText = taskList[current_task].instruction;
    }
  } else {
    console.log("No more tasks available.");
  }
}

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
    type: 'keystroke',
    code: currentKey,
    pressTime: now,
    flightUD: flightUD,
    flightDD: flightDD,
    flag: flag,
    dwellTime: 0.0,
    caretStart: searchInput.selectionStart,
    caretEnd: searchInput.selectionEnd
  });

  prevPressTime = now;

  if (currentKey === 'Enter') search();
});

searchInput.addEventListener('keyup', (event) => {
  const now = performance.now();

  const matchingStep = rawKeystrokeBuffer.findLast(
    step => step.type === 'keystroke' && step.code === event.code && step.dwellTime === 0.0
  );

  if (matchingStep) {
    matchingStep.dwellTime = now - matchingStep.pressTime;
  }

  prevReleaseTime = now;
});

searchInput.addEventListener('mousemove', (event) => {
  const now = performance.now();

  rawKeystrokeBuffer.push({
    type: 'cursor_move',
    code: 'MouseMove',
    timestamp: now,
    x: event.clientX,
    y: event.clientY,
    caretStart: searchInput.selectionStart,
    caretEnd: searchInput.selectionEnd
  });
});

searchInput.addEventListener('click', (event) => {
  const now = performance.now();

  rawKeystrokeBuffer.push({
    type: 'cursor_click',
    code: 'MouseClick',
    timestamp: now,
    x: event.clientX,
    y: event.clientY,
    caretStart: searchInput.selectionStart,
    caretEnd: searchInput.selectionEnd
  });
});


async function search() {
  let complete_query = document.getElementById('search-input').value.trim();
  let json_string = {
    'intent': taskList[current_task].intent,
    'query': complete_query,
    'keystrokes': rawKeystrokeBuffer
  };
  await storeApi(json_string).then(r => console.log(r));
  searchInput.value = '';
  rawKeystrokeBuffer = [];
  switchTask()

}

async function storeApi(input) {
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
