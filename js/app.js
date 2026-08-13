let rawKeystrokeBuffer = [];
let prevPressTime = null;
let prevReleaseTime = null;

const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const currentTaskField = document.getElementById('currentTask');
const exampleField = document.getElementById('exampleQuery');
const resultsField = document.getElementById('resultsField');
const languageSelect = document.getElementById('languageField');

const masterTaskPool = [
  {
    intent: 0,
    tr: { instruction: 'Twitter ana sayfasına git', suggested: 'twitter x ana sayfa giriş' },
    en: { instruction: 'Go to Twitter homepage', suggested: 'twitter x home page login' }
  },
  {
    intent: 0,
    tr: { instruction: 'Elon Musk\'ın resmi X profiline git', suggested: 'elon musk resmi x twitter profili hesabı' },
    en: { instruction: 'Go to Elon Musk\'s official X profile', suggested: 'elon musk official x twitter profile account' }
  },
  {
    intent: 0,
    tr: { instruction: 'LinkedIn giriş sayfasına git', suggested: 'linkedin giriş yap kullanıcı paneli' },
    en: { instruction: 'Go to LinkedIn login page', suggested: 'linkedin sign in user dashboard' }
  },
  {
    intent: 0,
    tr: { instruction: 'NASA resmi web sitesine git', suggested: 'resmi nasa uzay ajansı web sitesi URL' },
    en: { instruction: 'Go to official NASA website', suggested: 'official nasa space agency website URL' }
  },
  {
    intent: 1,
    tr: { instruction: 'Soğanın neden insanları ağlattığını öğren', suggested: 'soğan doğrerken neden ağlarız kimyasal tepkime açıklaması' },
    en: { instruction: 'Learn why onions make people cry', suggested: 'why onions make us cry chemical reaction explanation' }
  },
  {
    intent: 1,
    tr: { instruction: 'Kanada\'nın nüfusuna bak', suggested: 'kanada güncel toplam nüfusu ne kadar' },
    en: { instruction: 'Check the population of Canada', suggested: 'canada current total population count' }
  },
  {
    intent: 1,
    tr: { instruction: 'Güneş panellerinin nasıl elektrik ürettiğini oku', suggested: 'fotovoltaik güneş panelleri nasıl çalışır adım adım anlatım' },
    en: { instruction: 'Read how solar panels generate electricity', suggested: 'how photovoltaic solar panels work step by step' }
  },
  {
    intent: 1,
    tr: { instruction: 'Akut apandisit belirtilerini araştır', suggested: 'yetişkinlerde apandisit patlaması ana belirtileri ve semptomları' },
    en: { instruction: 'Research acute appendicitis symptoms', suggested: 'main symptoms and signs of appendicitis in adults' }
  },
  {
    intent: 2,
    tr: { instruction: 'İnternetten kışlık mont satın al', suggested: 'kadın sıcak tutan kışlık kaz tüyü mont online alışveriş hızlı kargo' },
    en: { instruction: 'Buy a winter coat online', suggested: 'women warm winter down jacket online shopping fast delivery' }
  },
  {
    intent: 2,
    tr: { instruction: 'Burger King\'den cheeseburger menü sipariş et', suggested: 'burger king ikili cheeseburger menü siparişi bana en yakın paket servis' },
    en: { instruction: 'Order a cheeseburger meal from Burger King', suggested: 'burger king double cheeseburger meal order delivery near me' }
  },
  {
    intent: 2,
    tr: { instruction: 'Yaklaşan basketbol maçı için bilet satın al', suggested: 'biletix euroleague basketbol maçı bilet satın al' },
    en: { instruction: 'Buy tickets for an upcoming basketball game', suggested: 'buy euroleague basketball match tickets online' }
  },
  {
    intent: 2,
    tr: { instruction: 'Spotify aile planına abone ol', suggested: 'spotify premium aile paketi üyelik kayıt sayfası' },
    en: { instruction: 'Subscribe to Spotify Family Plan', suggested: 'spotify premium family plan signup page' }
  },
  {
    intent: 0,
    tr: { instruction: 'Microsoft Outlook web posta sayfasını bul', suggested: 'outlook webmail arayüzü giriş sayfası' },
    en: { instruction: 'Find Microsoft Outlook webmail page', suggested: 'outlook webmail interface login page' }
  },
  {
    intent: 0,
    tr: { instruction: 'Disney Plus yayın portalına git', suggested: 'disney plus resmi dizi film izleme sitesi url' },
    en: { instruction: 'Go to Disney Plus streaming portal', suggested: 'disney plus official streaming website url' }
  },
  {
    intent: 0,
    tr: { instruction: 'OneDrive bulut depolama girişine yönlen', suggested: 'microsoft onedrive kişisel bulut depolama oturum açma' },
    en: { instruction: 'Navigate to OneDrive cloud storage login', suggested: 'microsoft onedrive personal cloud storage sign in' }
  },
  {
    intent: 0,
    tr: { instruction: 'OpenAI araştırma bloguna git', suggested: 'openai resmi yapay zeka araştırma blogu dizini' },
    en: { instruction: 'Go to OpenAI research blog', suggested: 'openai official ai research blog directory' }
  },
  {
    intent: 1,
    tr: { instruction: '"Blokzincir teknolojisi" ne anlama geliyor öğren', suggested: 'blockchain blokzincir teknolojisi nedir yeni başlayanlar için rehber' },
    en: { instruction: 'Learn what "Blockchain technology" means', suggested: 'what is blockchain technology beginner guide' }
  },
  {
    intent: 1,
    tr: { instruction: 'Mariana Çukuru\'nun derinliğine bak', suggested: 'mariana çukuru kaç metre derinlikte en derin yeri neresi' },
    en: { instruction: 'Check the depth of the Mariana Trench', suggested: 'mariana trench depth in meters deepest point' }
  },
  {
    intent: 1,
    tr: { instruction: 'Nil Nehri\'nin uzunluğuna bak', suggested: 'nil nehri resmi toplam uzunluğu kaç kilometre' },
    en: { instruction: 'Check the length of the Nile River', suggested: 'nile river official total length kilometers' }
  },
  {
    intent: 1,
    tr: { instruction: 'Fiber optik kabloların veriyi nasıl ilettiğini bul', suggested: 'fiber optik kablo çalışma prensibi yüksek hızlı veri iletimi' },
    en: { instruction: 'Find how fiber optic cables transmit data', suggested: 'how fiber optic cables work high speed data transmission' }
  },
  {
    intent: 2,
    tr: { instruction: 'Stokta Nike Air Max ayakkabı olan bir online mağaza bul', suggested: 'orijinal nike air max koşu ayakkabısı satın al online mağaza' },
    en: { instruction: 'Find an online store with Nike Air Max in stock', suggested: 'buy authentic nike air max running shoes online store' }
  },
  {
    intent: 2,
    tr: { instruction: 'YouTube Premium aboneliği için kayıt sayfasını bul', suggested: 'youtube premium bireysel üyelik planı kayıt olma sayfası' },
    en: { instruction: 'Find sign-up page for YouTube Premium subscription', suggested: 'youtube premium individual plan sign up page' }
  },
  {
    intent: 2,
    tr: { instruction: 'Öğrenciler için ucuz tren bileti sunan bir site bul', suggested: 'tcdd indirimli öğrenci tren bileti al online rezervasyon' },
    en: { instruction: 'Find a site offering cheap train tickets for students', suggested: 'discounted student train ticket booking online' }
  },
  {
    intent: 2,
    tr: { instruction: 'Slack masaüstü uygulaması için resmi indirme sayfasını bul', suggested: 'slack windows mac masaüstü uygulaması resmi indirme linki' },
    en: { instruction: 'Find official download page for Slack desktop app', suggested: 'slack desktop app official download link windows mac' }
  },
  {
    intent: 0,
    tr: { instruction: 'Google Cloud Console giriş sayfasına git', suggested: 'google cloud platformu yönetim konsolu oturum açma' },
    en: { instruction: 'Go to Google Cloud Console login page', suggested: 'google cloud platform management console sign in' }
  },
  {
    intent: 0,
    tr: { instruction: 'GitLab panelini aç', suggested: 'gitlab resmi yazılımcı platformu depo yönetim url' },
    en: { instruction: 'Open GitLab dashboard', suggested: 'gitlab official developer platform repository management url' }
  },
  {
    intent: 0,
    tr: { instruction: 'Vue.js dokümantasyonuna git', suggested: 'vue js resmi türkçe veya ingilizce dokümantasyon ana sayfa' },
    en: { instruction: 'Go to Vue.js documentation', suggested: 'vue js official documentation homepage' }
  },
  {
    intent: 0,
    tr: { instruction: 'PubMed ana sayfasına git', suggested: 'pubmed tıbbi makale veri tabanı arama dizini' },
    en: { instruction: 'Go to PubMed homepage', suggested: 'pubmed medical literature database search index' }
  },
  {
    intent: 0,
    tr: { instruction: 'Apple Store sitesine git', suggested: 'apple store resmi online teknoloji mağazası' },
    en: { instruction: 'Go to Apple Store website', suggested: 'apple store official online technology store' }
  },
  {
    intent: 0,
    tr: { instruction: 'BBC Türkçe ana sayfasını aç', suggested: 'bbc news türkçe resmi haber ana sayfası' },
    en: { instruction: 'Open BBC News homepage', suggested: 'bbc news official homepage' }
  },
  {
    intent: 1,
    tr: { instruction: 'Claude 3 ile Gemini 1.5\'in bağlam penceresi ve token fiyatlarını kıyasla', suggested: 'claude 3 opus vs gemini 1.5 pro bağlam uzunluğu ve api token maliyeti karşılaştırması' },
    en: { instruction: 'Compare context window and token pricing of Claude 3 vs Gemini 1.5', suggested: 'claude 3 opus vs gemini 1.5 pro context length and api token cost comparison' }
  },
  {
    intent: 1,
    tr: { instruction: 'Sanatseverler için 5 günlük Paris gezi rotası bul', suggested: 'en iyi 5 günlük paris müze ve sanat galerisi seyahat planı kartı tüyoları' },
    en: { instruction: 'Find a 5-day Paris itinerary for art lovers', suggested: 'best 5 day paris museum and art gallery travel itinerary tips' }
  },
  {
    intent: 1,
    tr: { instruction: 'Enflasyon oranlarının tüketici harcama alışkanlıklarını nasıl etkilediğini araştır', suggested: 'makroekonomik yüksek enflasyonun perakende sektörü tüketici alım gücüne etkisi' },
    en: { instruction: 'Research how inflation rates affect consumer spending habits', suggested: 'macroeconomic high inflation impact on retail purchasing power' }
  },
  {
    intent: 1,
    tr: { instruction: 'Bel fıtığı tedavisinde fizik tedavi ile ameliyatı kıyasla', suggested: 'bel fıtığı tedavisinde fizik tedavi vs mikrocerrahi ameliyatı iyileşme oranları' },
    en: { instruction: 'Compare physical therapy vs surgery for herniated disc treatment', suggested: 'herniated disc physical therapy vs microsurgery recovery rates' }
  },
  {
    intent: 1,
    tr: { instruction: 'Krebs döngüsünün nasıl NADH ürettiğine bak', suggested: 'hücresel solunum sitrik asit krebs döngüsü nadh fadh2 üretimi basamakları' },
    en: { instruction: 'Check how the Krebs cycle produces NADH', suggested: 'cellular respiration citric acid krebs cycle nadh production steps' }
  },
  {
    intent: 2,
    tr: { instruction: 'Prisma kullanan Next.js NextAuth.js yapılandırması için kod al', suggested: 'nextjs nextauth prisma adaptörü sosyal medya giriş kurulumu kod örneği' },
    en: { instruction: 'Get code for Next.js NextAuth.js setup with Prisma', suggested: 'nextjs nextauth prisma adapter social login setup code example' }
  },
  {
    intent: 2,
    tr: { instruction: 'B2B SaaS girişimi için ürün lansman çerçevesi oluştur', suggested: 'b2b saas pazara giriş stratejisi ürün lansman kontrol listesi taslağı doc' },
    en: { instruction: 'Create a product launch framework for a B2B SaaS startup', suggested: 'b2b saas go to market strategy product launch checklist template' }
  },
  {
    intent: 2,
    tr: { instruction: 'Sözleşmeli çalışanlar için gizlilik sözleşmesi şablonu al', suggested: 'karşılıklı gizlilik sözleşmesi nda kontratı şablonu ücretsiz indir' },
    en: { instruction: 'Get a non-disclosure agreement (NDA) template for contractors', suggested: 'mutual non disclosure agreement nda contract template free download' }
  },
  {
    intent: 2,
    tr: { instruction: '4 günlük push pull legs antrenman takip tablosu bul', suggested: '4 günlük push pull legs aşamalı yüklenme fitness takip excel tablosu' },
    en: { instruction: 'Find a 4-day push pull legs workout tracking sheet', suggested: '4 day push pull legs progressive overload fitness tracking spreadsheet' }
  },
  {
    intent: 2,
    tr: { instruction: 'Gayrimenkul kira portföyü nakit akışı hesaplama modeli bul', suggested: 'gayrimenkul yatırım analizi excel şablonu kiralık mülk nakit akışı hesaplayıcı' },
    en: { instruction: 'Find a cash flow calculation model for a rental real estate portfolio', suggested: 'real estate investment analysis excel template rental cash flow calculator' }
  },
  {
    intent: 2,
    tr: { instruction: 'Logitech MX Master kablosuz fare satın al', suggested: 'logitech mx master ergonomik kablosuz bluetooth mouse satın al online sipariş' },
    en: { instruction: 'Buy a Logitech MX Master wireless mouse', suggested: 'buy logitech mx master ergonomic wireless bluetooth mouse online' }
  },
  {
    intent: 2,
    tr: { instruction: 'Adobe Premiere Pro yıllık lisans kodu satın al', suggested: 'adobe premiere pro video düzenleme yıllık abonelik dijital lisans anahtarı al' },
    en: { instruction: 'Buy an Adobe Premiere Pro annual license key', suggested: 'buy adobe premiere pro video editing annual subscription digital license key' }
  }
];

let selectedTasksPool = [];
let taskList = [];
let current_task = 0;

// Initialize language settings from localStorage
const savedLanguage = localStorage.getItem('preferredLang') || 'tr';

if (languageSelect) {
  languageSelect.value = savedLanguage;
}

// Get language safely
function getActiveLanguage() {
  const lang = languageSelect ? languageSelect.value : savedLanguage;
  return ['tr', 'en'].includes(lang) ? lang : 'tr';
}

function getRandomSubarray(arr, size) {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

// Build taskList array from current pool selections and active language
function loadTasks() {
  const activeLang = getActiveLanguage();
  taskList = selectedTasksPool.map(task => ({
    instruction: task[activeLang].instruction,
    intent: task.intent,
    suggested: task[activeLang].suggested
  }));

  updateTaskUI();
}

function updateTaskUI() {
  if (currentTaskField && taskList[current_task]) {
    currentTaskField.innerText = 'Task: ' + taskList[current_task].instruction;
  }
  if (exampleField && taskList[current_task]) {
    exampleField.innerText = taskList[current_task].suggested;
  }
}

// Initialize active pool on start
selectedTasksPool = getRandomSubarray(masterTaskPool, 15);
loadTasks();

// Listen for dynamic language changes and save choice
if (languageSelect) {
  languageSelect.addEventListener('change', () => {
    localStorage.setItem('preferredLang', languageSelect.value);
    loadTasks();
  });
}

function switchTask() {
  if (current_task + 1 < taskList.length) {
    current_task++;
    updateTaskUI();
  } else {
    console.log("No more tasks available.");
  }
}

if (searchInput) {
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
}

async function search() {
  if (!taskList[current_task]) return;

  let width = searchBox ? searchBox.offsetWidth : 0;
  let height = searchBox ? searchBox.offsetHeight : 0;
  let complete_query = searchInput ? searchInput.value.trim() : '';

  let json_string = {
    'width': width,
    'height': height,
    'intent': taskList[current_task].intent,
    'query': complete_query,
    'keystrokes': rawKeystrokeBuffer
  };

  const data = await storeApi(json_string);

  if (searchInput) searchInput.value = '';
  rawKeystrokeBuffer = [];

  if (resultsField) {
    resultsField.innerHTML = data?.map(item => `
      <div class="result-card">
          <a href="${item.url}" target="_blank">${item.title}</a>
      </div>
    `).join('') || '';
  }

  switchTask();
}

function consent(){
  var element = document.documentElement;
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) {
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {
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
