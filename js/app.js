

let rawKeystrokeBuffer = [];
let prevPressTime = null;
let prevReleaseTime = null;

const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const currentTaskField = document.getElementById('currentTask');
const exampleField = document.getElementById('exampleQuery');
const resultsField = document.getElementById('resultsField');

let current_task = 0
let taskList = [
  {
    'instruction': 'Go to wikipedia',
    'intent': 0,
    'suggested': 'wikipedia homepage'
  },
  {
    'instruction': 'Go to Tom Cruises Instagram Page',
    'intent': 0,
    'suggested': 'tom cruise official instagram account'
  },
  {
    'instruction': 'Go to reddit',
    'intent': 0,
    'suggested': 'reddit home page login'
  },
  {
    'instruction': 'Go to the white house website',
    'intent': 0,
    'suggested': 'official white house website URL'
  },
  {
    'instruction': 'Find out about the different chameleon colors',
    'intent': 1,
    'suggested': 'why do chameleons change color and what do the colors mean'
  },
  {
    'instruction': 'Look up the capital of Australia',
    'intent': 1,
    'suggested': 'what is the capital city of Australia'
  },
  {
    'instruction': 'Read about how black holes form in space',
    'intent': 1,
    'suggested': 'how are stellar black holes formed step by step'
  },
  {
    'instruction': 'Research the symptoms of vitamin D deficiency',
    'intent': 1,
    'suggested': 'main signs and symptoms of low vitamin D levels in adults'
  },
  {
    'instruction': 'Buy a leather jacket online',
    'intent': 2,
    'suggested': 'mens real leather jacket online shop free shipping'
  },
  {
    'instruction': 'Order a pepperoni pizza from Dominos',
    'intent': 2,
    'suggested': 'dominos order large pepperoni pizza delivery near me'
  },
  {
    'instruction': 'Purchase tickets for the upcoming concert',
    'intent': 2,
    'suggested': 'ticketmaster buy tickets coldplay world tour'
  },
  {
    'instruction': 'Subscribe to Netflix premium plan',
    'intent': 2,
    'suggested': 'netflix sign up page premium 4k plan'
  },
  {
    'instruction': 'Find the google translate tool page',
    'intent': 0,
    'suggested': 'google translate web tool'
  },
  {
    'instruction': 'Locate the YouTube Kids sub-site',
    'intent': 0,
    'suggested': 'youtube kids official site url'
  },
  {
    'instruction': 'Navigate to the Dropbox account login',
    'intent': 0,
    'suggested': 'dropbox user sign in portal'
  },
  {
    'instruction': 'Go to the google blog',
    'intent': 0,
    'suggested': 'the keyword official google blog'
  },
  {
    'instruction': 'Find out what "quantum computing" means.',
    'intent': 1,
    'suggested': 'quantum computing basic definition simple explanation'
  },
  {
    'instruction': 'Look up the height of Mount Kilimanjaro.',
    'intent': 1,
    'suggested': 'how tall is mount kilimanjaro in meters and feet'
  },
  {
    'instruction': 'Look up the height of mount everest',
    'intent': 1,
    'suggested': 'official height of mount everest peak'
  },
  {
    'instruction': 'Find out how search engines work so fast',
    'intent': 1,
    'suggested': 'how web search engines index and return results so fast'
  },
  {
    'instruction': 'Find an online retailer with Levi\'s 501 jeans in stock.',
    'intent': 2,
    'suggested': 'buy levis 501 original fit mens jeans in stock online'
  },
  {
    'instruction': 'Find the sign-up page for a Spotify Premium subscription.',
    'intent': 2,
    'suggested': 'spotify premium account subscription page'
  },
  {
    'instruction': 'Find a website offering cheap flight deals for students.',
    'intent': 2,
    'suggested': 'book cheap student discount flights online'
  },
  {
    'instruction': 'Find the official download page for the Zoom desktop app.',
    'intent': 2,
    'suggested': 'zoom desktop client app official download link'
  },
  {
    'instruction': 'Go to the AWS Console login page',
    'intent': 0,
    'suggested': 'aws cloud management console sign in'
  },
  {
    'instruction': 'Open GitHub home',
    'intent': 0,
    'suggested': 'github official main platform url'
  },
  {
    'instruction': 'Go to React documentation',
    'intent': 0,
    'suggested': 'react dev official documentation home'
  },
  {
    'instruction': 'Navigate to arXiv homepage',
    'intent': 0,
    'suggested': 'arxiv paper search homepage'
  },
  {
    'instruction': 'Go to Tesla store site',
    'intent': 0,
    'suggested': 'tesla official website home'
  },
  {
    'instruction': 'Open NYT main site',
    'intent': 0,
    'suggested': 'new york times news home page'
  },
  {
    'instruction': 'Compare GPT-4 vs Llama 3 training costs and architecture',
    'intent': 1,
    'suggested': 'gpt 4 versus llama 3 parameter architecture and training compute cost breakdown'
  },
  {
    'instruction': 'Find a 7 day Tokyo itinerary for first timers',
    'intent': 1,
    'suggested': 'best 7 day tokyo trip itinerary for first time visitors transit tips'
  },
  {
    'instruction': 'Research how interest rates impact commercial property values',
    'intent': 1,
    'suggested': 'how rising central bank interest rates affect commercial real estate capitalization rates'
  },
  {
    'instruction': 'Compare cognitive therapy vs SSRIs for anxiety disorder',
    'intent': 1,
    'suggested': 'mindfulness based cognitive therapy vs ssri medications clinical trial effectiveness anxiety'
  },
  {
    'instruction': 'Look up how the electron transport chain produces ATP',
    'intent': 1,
    'suggested': 'mitochondrial electron transport chain ATP production steps oxidative phosphorylation'
  },
  {
    'instruction': 'Get code for FastAPI JWT authentication with SQLAlchemy',
    'intent': 2,
    'suggested': 'fastapi sqlalchemy jwt user authentication python backend code snippet'
  },
  {
    'instruction': 'Build a marketing strategy for a new DTC apparel brand',
    'intent': 2,
    'suggested': 'dtc sustainable apparel brand launch digital marketing campaign checklist template'
  },
  {
    'instruction': 'Get a contract template for remote software developers',
    'intent': 2,
    'suggested': 'remote software developer employment contract template doc free download'
  },
  {
    'instruction': 'Find a 12 week upper lower lifting routine spreadsheet',
    'intent': 2,
    'suggested': '12 week progressive overload upper lower workout routine google sheet template'
  },
  {
    'instruction': 'Find a SaaS financial projection spreadsheet model',
    'intent': 2,
    'suggested': 'saas financial model excel template monthly cash flow burn rate LTV CAC free'
  },
  {
    'instruction': 'Buy a Keychron hot-swappable mechanical keyboard',
    'intent': 2,
    'suggested': 'buy keychron hot swappable wireless mechanical keyboard online order'
  },
  {
    'instruction': 'Buy Ableton Live 12 Suite license code',
    'intent': 2,
    'suggested': 'buy ableton live 12 suite digital license key discount online'
  }
];

function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

taskList = getRandomSubarray(taskList, 15);

if (currentTaskField && taskList[current_task]) {
  currentTaskField.innerText = 'Task: ' + taskList[current_task].instruction;
  exampleField.innerText = taskList[current_task].suggested;
}

function switchTask() {
  if (current_task + 1 < taskList.length) {
    current_task++;
    if (currentTaskField) {
      currentTaskField.innerText = 'Task: ' + taskList[current_task].instruction;
      exampleField.innerText = taskList[current_task].suggested;

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

  let width = searchBox.offsetWidth;
  let height = searchBox.offsetHeight;
  let complete_query = document.getElementById('search-input').value.trim();
  let json_string = {
    'width': width,
    'height': height,
    'intent': taskList[current_task].intent,
    'query': complete_query,
    'keystrokes': rawKeystrokeBuffer
  };
  const data = await storeApi(json_string).then(r => {
    console.log(r);
    return r;
  });
  searchInput.value = '';
  rawKeystrokeBuffer = [];

  resultsField.innerHTML = data?.map(item => `
    <div class="result-card">
        <a href="${item.url}" target="_blank">${item.title}</a>
    </div>
`).join('');
  switchTask()

}


function consent(){
  var element = document.documentElement;
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }

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
