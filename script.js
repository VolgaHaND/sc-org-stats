// script.js

// ═══════════════════════════════════════════════════════════════
// Константы для работы системы
// ═══════════════════════════════════════════════════════════════

// Декодирование архитипов
const ARCHETYPES = {
  1: 'Organization',
  2: 'Corporation',
  3: 'PMC',
  4: 'Faith',
  5: 'Syndicate',
  6: 'Club',
};

const LANGUARE = {
  "ab":"Abkhazian",
  "aa":"Afar",
  "af":"Afrikaans",
  "ak":"Akan",
  "sq":"Albanian",
  "am":"Amharic",
  "ar":"Arabic",
  "an":"Aragonese",
  "hy":"Armenian",
  "as":"Assamese",
  "av":"Avaric",
  "ae":"Avestan",
  "ay":"Aymara",
  "az":"Azerbaijani",
  "bm":"Bambara",
  "ba":"Bashkir",
  "eu":"Basque",
  "be":"Belarusian",
  "bn":"Bengali",
  "bh":"Bihari languages",
  "bi":"Bislama",
  "nb":"Bokmål, Norwegian",
  "bs":"Bosnian",
  "br":"Breton",
  "bg":"Bulgarian",
  "my":"Burmese",
  "ca":"Catalan",
  "km":"Central Khmer",
  "ch":"Chamorro",
  "ce":"Chechen",
  "ny":"Chichewa",
  "zh":"Chinese",
  "cu":"Church Slavic",
  "cv":"Chuvash",
  "kw":"Cornish",
  "co":"Corsican",
  "cr":"Cree",
  "hr":"Croatian",
  "cs":"Czech",
  "da":"Danish",
  "nl":"Dutch",
  "dz":"Dzongkha",
  "en":"English",
  "eo":"Esperanto",
  "et":"Estonian",
  "ee":"Ewe",
  "fo":"Faroese",
  "fj":"Fijian",
  "fi":"Finnish",
  "fr":"French",
  "ff":"Fulah",
  "gd":"Gaelic",
  "gl":"Galician",
  "lg":"Ganda",
  "ka":"Georgian",
  "de":"German",
  "el":"Greek, Modern",
  "gn":"Guarani",
  "gu":"Gujarati",
  "ht":"Haitian Creole",
  "ha":"Hausa",
  "he":"Hebrew",
  "hz":"Herero",
  "hi":"Hindi",
  "ho":"Hiri Motu",
  "hu":"Hungarian",
  "is":"Icelandic",
  "io":"Ido",
  "ig":"Igbo",
  "id":"Indonesian",
  "ia":"Interlingua",
  "ie":"Interlingue",
  "iu":"Inuktitut",
  "ik":"Inupiaq",
  "ga":"Irish",
  "it":"Italian",
  "ja":"Japanese",
  "jv":"Javanese",
  "kl":"Kalaallisut",
  "kn":"Kannada",
  "kr":"Kanuri",
  "ks":"Kashmiri",
  "kk":"Kazakh",
  "ki":"Kikuyu",
  "rw":"Kinyarwanda",
  "ky":"Kirghiz",
  "kv":"Komi",
  "kg":"Kongo",
  "ko":"Korean",
  "kj":"Kuanyama",
  "ku":"Kurdish",
  "lo":"Lao",
  "la":"Latin",
  "lv":"Latvian",
  "li":"Limburgan",
  "ln":"Lingala",
  "lt":"Lithuanian",
  "lu":"Luba-Katanga",
  "lb":"Luxembourgish",
  "mk":"Macedonian",
  "mg":"Malagasy",
  "ms":"Malay",
  "ml":"Malayalam",
  "dv":"Maldivian",
  "mt":"Maltese",
  "gv":"Manx",
  "mi":"Maori",
  "mr":"Marathi",
  "mh":"Marshallese",
  "mn":"Mongolian",
  "na":"Nauru",
  "nv":"Navajo",
  "nd":"Ndebele, North",
  "nr":"Ndebele, South",
  "ng":"Ndonga",
  "ne":"Nepali",
  "se":"Northern Sami",
  "no":"Norwegian",
  "nn":"Nynorsk, Norwegian",
  "oc":"Occitan",
  "oj":"Ojibwa",
  "or":"Oriya",
  "om":"Oromo",
  "os":"Ossetian",
  "pi":"Pali",
  "pa":"Panjabi",
  "fa":"Persian",
  "pl":"Polish",
  "pt":"Portuguese",
  "ps":"Pushto",
  "qu":"Quechua",
  "ro":"Romanian",
  "rm":"Romansh",
  "rn":"Rundi",
  "ru":"Russian",
  "sm":"Samoan",
  "sg":"Sango",
  "sa":"Sanskrit",
  "sc":"Sardinian",
  "sr":"Serbian",
  "sn":"Shona",
  "ii":"Sichuan Yi",
  "sd":"Sindhi",
  "si":"Sinhala",
  "sk":"Slovak",
  "sl":"Slovenian",
  "so":"Somali",
  "st":"Sotho, Southern",
  "es":"Spanish",
  "su":"Sundanese",
  "sw":"Swahili",
  "ss":"Swati",
  "sv":"Swedish",
  "tl":"Tagalog",
  "ty":"Tahitian",
  "tg":"Tajik",
  "ta":"Tamil",
  "tt":"Tatar",
  "te":"Telugu",
  "th":"Thai",
  "bo":"Tibetan",
  "ti":"Tigrinya",
  "to":"Tonga",
  "ts":"Tsonga",
  "tn":"Tswana",
  "tr":"Turkish",
  "tk":"Turkmen",
  "tw":"Twi",
  "ug":"Uighur",
  "uk":"Ukrainian",
  "ur":"Urdu",
  "uz":"Uzbek",
  "ve":"Venda",
  "vi":"Vietnamese",
  "vo":"Volapük",
  "wa":"Walloon",
  "cy":"Welsh",
  "fy":"Western Frisian",
  "wo":"Wolof",
  "xh":"Xhosa",
  "yi":"Yiddish",
  "yo":"Yoruba",
  "za":"Zhuang",
  "zu":"Zulu"
};

const ORG_URL_BASE = 'https://robertsspaceindustries.com/en/orgs/'; // Постоянная часть адреса страницы организации
const FALLBACK_COUNT = 99;  // численность для организаций, отсутствующих в дампе
const MIN_YEAR = 2021; // нижняя граница года в данных
const MAX_YEAR = new Date().getFullYear();// верхняя граница года в данных

// ═══════════════════════════════════════════════════════════════
// Функции расчета дат
// ═══════════════════════════════════════════════════════════════

// расчет вчераншей даты
function getYesterday(dateStr) {
  const year = +dateStr.slice(0, 4);
  const month = +dateStr.slice(5, 7);
  const day = +dateStr.slice(8, 10);

  const lengthOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 4 === 0) lengthOfMonth[2] = 29;

  if (month === 1 && day === 1) {
    return `${year - 1}-12-31`;
  }
  if (day === 1) {
    const prevMonth = month - 1;
    return `${year}-${String(prevMonth).padStart(2, '0')}-${lengthOfMonth[prevMonth]}`;
  }
  return `${year}-${String(month).padStart(2, '0')}-${String(day - 1).padStart(2, '0')}`;
}

// расчет даты прошлого понедельника
function getLastMonday(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const jsDay = d.getDay(); // 0=вс, 1=пн, ..., 6=сб
  const customDay = jsDay === 0 ? 6 : jsDay === 1 ? 7 : jsDay - 1;
  d.setDate(d.getDate() - customDay);
  return d.toISOString().slice(0, 10);
}

// расчет даты начала месяца
function getStartOfMonth(dateStr) {
  if (dateStr.endsWith('-01')) {
    let year = +dateStr.slice(0, 4);
    let month = +dateStr.slice(5, 7);
    if (month === 1) { year -= 1; month = 12; } else { month -= 1; }
    const monthStr = month < 10 ? '0' + month : month;
    return `${year}-${monthStr}-01`;
  }
  return dateStr.slice(0, 8) + '01';
}

// расчет даты начала квартала
function getStartOfQuarter(dateStr) {
  let year = +dateStr.slice(0, 4);
  const month = +dateStr.slice(5, 7);
  const monthDayStr = dateStr.slice(5, 10);

  if (monthDayStr === '01-01' || monthDayStr === '04-01' ||
      monthDayStr === '07-01' || monthDayStr === '10-01') {
    if (month === 1) return `${year - 1}-10-01`;
    const prevQuarterMonth = month - 3;
    const monthStr = prevQuarterMonth < 10 ? '0' + prevQuarterMonth : prevQuarterMonth;
    return `${year}-${monthStr}-01`;
  }

  const startMonth = Math.floor((month - 1) / 3) * 3 + 1;
  const monthStr = startMonth < 10 ? '0' + startMonth : startMonth;
  return `${year}-${monthStr}-01`;
}

// расчет даты начала года
function getStartOfYear(dateStr) {
  let year = +dateStr.slice(0, 4);
  const monthDayStr = dateStr.slice(5, 10);
  if (monthDayStr === '01-01') year -= 1;
  return `${year}-01-01`;
}

// расчет всех опорных дат
function computeReferenceDates(dateStr) {
  return {
    today:        dateStr,
    yesterday:    getYesterday(dateStr),
    monday:       getLastMonday(dateStr),
    monthStart:   getStartOfMonth(dateStr),
    quarterStart: getStartOfQuarter(dateStr),
    yearStart:    getStartOfYear(dateStr),
  };
}

// возврат всех годов упомянутых в опорных датах
function yearsFor(refDates) {
  return new Set(Object.values(refDates).map(d => +d.slice(0, 4)));
}

// ═══════════════════════════════════════════════════════════════
// Загрузка данных
// ═══════════════════════════════════════════════════════════════

const rawCache = new Map();  // кеш для хранения данных по годам year (number) -> Promise<rawData>

// Загрузка данных на год year и сохранения кеше
function loadYear(year) {
  if (rawCache.has(year)) return rawCache.get(year); // проверяем наличие в кеше данных указанного года, если есть вовращаем
  const promise = fetch(`raw/raw_${year}.json`) // если заранее загруженных данных не было, то 
    .then(r => { // проводи загрузку
      if (!r.ok) throw new Error(`raw_${year}.json: HTTP ${r.status}`); // если загрузка прошла без ошибок
      return r.json(); // то возвращаем загруженные данные
    })
    .catch(err => { // если не удалось загрузить данные
      console.warn(`Не удалось загрузить raw_${year}.json:`, err.message); // выдаем сообщение об ошибке
      rawCache.delete(year); // очищаем кэш с ошибочными данными
      return {}; // возвращаем пустое значение
    });
  rawCache.set(year, promise); // записывае созраненное значение в кэш
  return promise; // и возвращаем результаты загрузки
}

// Загрузка данных всех затребованных лет
async function loadYears(years) { 
  const entries = await Promise.all(
    [...years].map(async y => [y, await loadYear(y)])
  );
  return Object.fromEntries(entries);  // { year: rawData }
}

// ═══════════════════════════════════════════════════════════════
// Индексирование тегов в данных
// ═══════════════════════════════════════════════════════════════

/**
 * Собирает все теги, встречающиеся в rawData на даты ≤ dateStr,
 * с датой первого появления и последним известным значением.
 * @returns {Map<string, {firstSeen: string, lastValue: {name,count,archetype}}>}
 */
function collectTagIndex(rawData, dateStr) {
  const index = new Map();
  const dateKeys = Object.keys(rawData); // получаем список дат

  for (const dateKey of dateKeys) { // перебираем все даты от первой
    if (dateKey > dateStr) break; // если дата больше указанной, то останавливаемся
    const dayData = rawData[dateKey]; // получаем значение 
    for (const tag in dayData) { // перебираем все ключи-теги из данной даты
      if (!index.has(tag)) { // если тег еще не индексирован, 
        index.set(tag, { firstSeen: dateKey, lastValue: null }); // то индексируем его с пометкой первой датой обнаружения
      }
      index.get(tag).lastValue = dayData[tag]; // записываме данные по тегу
    }
  }
  return index; // возвращаем результат - индексированные теги
}

// ═══════════════════════════════════════════════════════════════
// Snapshots
// ═══════════════════════════════════════════════════════════════

/**
 * Строит снимки на все опорные даты за один проход.
 * @returns {Object<string, Snapshot>} где Snapshot = {date, orgs: Map<tag,{name,count,archetype,rank}>, sorted, maxRank}
 * tagIndex - словарь индексированных тегов с началными датами обнаружения
 * refDates - список опорных дат
 * rawByYear - сырые данные по годам
 */
function buildAllSnapshots(tagIndex, refDates, rawByYear) {
  // 1. Инициализация: для каждой опорной даты — все теги с фиктивными значениями
  const snapshots = {}; // словарь для заполнения срезов
  for (const [name, refDate] of Object.entries(refDates)) { // 
    const orgs = new Map();
    for (const [tag, info] of tagIndex) {
      if (info.firstSeen > refDate) {
        // организация ещё не появилась на этот момент
        orgs.set(tag, {
          name: info.lastValue.name,
          count: FALLBACK_COUNT,
          archetype: info.lastValue.archetype,
          lang: info.lastValue.lang
        });
      }
    }
    snapshots[name] = { date: refDate, orgs, sorted: null, maxRank: null };
  }

  // 2. Опорные даты, отсортированные по возрастанию (для прохода по датам)
  const refList = Object.entries(refDates)
    .map(([name, date]) => ({ name, date }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // 3. Проход по годам и датам, раскладывая данные во все опорные снимки
  for (const yearStr in rawByYear) {
    const year = +yearStr;
    const rawData = rawByYear[yearStr];
    const dateKeys = Object.keys(rawData);

    for (const dateKey of dateKeys) {
      // в какие опорные снимки попадает эта дата?
      for (const ref of refList) {
        if (ref.date < dateKey) continue;
        if (+ref.date.slice(0, 4) !== year) continue;  // дата из другого года
        const snap = snapshots[ref.name];
        const dayData = rawData[dateKey];
        for (const tag in dayData) {
          if (!tagIndex.has(tag)) continue;
          snap.orgs.set(tag, dayData[tag]);
        }
      }
    }
  }

  // 4. Ранжируем каждый снимок
  for (const name in snapshots) {
    assignRanks(snapshots[name]);
  }
  return snapshots;
}

/**
 * Присваивает rank по убыванию count (competition rank «1,2,2,4»).
 * Мутирует snapshot.orgs (добавляет .rank) и заполняет snapshot.sorted, snapshot.maxRank.
 */
function assignRanks(snapshot) {
  const arr = [...snapshot.orgs.entries()]
    .map(([tag, org]) => ({ tag, name: org.name, count: org.count, archetype: org.archetype, lang: org.lang }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  let rank = 0;
  let prevCount = null;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].count !== prevCount) {
      rank = i + 1;
      prevCount = arr[i].count;
    }
    arr[i].rank = rank;
  }

  for (const { tag, rank } of arr) {
    snapshot.orgs.get(tag).rank = rank;
  }
  snapshot.sorted = arr;
  snapshot.maxRank = arr.length > 0 ? arr[arr.length - 1].rank : 0;
}

// ═══════════════════════════════════════════════════════════════
// Deltas
// ═══════════════════════════════════════════════════════════════

/**
 * @returns {Map<tag, {day,week,month,quarter,year}>} — для каждого тега дельты count и rank
 */
function computeDeltas(snapshots) {
  const cur = snapshots.today;
  const bases = {
    day:     snapshots.yesterday,
    week:    snapshots.monday,
    month:   snapshots.monthStart,
    quarter: snapshots.quarterStart,
    year:    snapshots.yearStart,
  };

  const result = new Map();
  for (const [tag, curOrg] of cur.orgs) {
    const d = {};
    for (const [name, baseSnap] of Object.entries(bases)) {
      const baseOrg = baseSnap.orgs.get(tag);
      d[name] = {
        count: curOrg.count - baseOrg.count,
        rank:  curOrg.rank  - baseOrg.rank,
      };
    }
    result.set(tag, d);
  }
  return result;
}

// ═══════════════════════════════════════════════════════════════
// Форматирование
// ═══════════════════════════════════════════════════════════════

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatCountDelta(n) {
  if (n === 0) return '0';
  if (n > 0) return `+${n}`;
  return `${n}`;  // уже с минусом
}

function formatRankDelta(n) {
  // n < 0 → rank уменьшился → организация поднялась (▲)
  // n > 0 → rank увеличился → организация просела (▼)
  if (n === 0) return '0';
  if (n < 0) return `<span class="trend-up">▲</span>${-n}`;
  return `<span class="trend-down">▼</span>${n}`;
}

// ═══════════════════════════════════════════════════════════════
// Отрисовка
// ═══════════════════════════════════════════════════════════════

function buildRow(org, d) {
  const tag = org.tag;
  const archetype = ARCHETYPES[org.archetype] ?? '—';
  const lang = LANGUARE[org.lang] ?? 'English';
  const href = ORG_URL_BASE + encodeURIComponent(tag);

  return `<tr>
    <td>${org.rank}</td>
    <td>${escapeHtml(org.name)}</td>
    <td>${org.count}</td>
    <td>${formatCountDelta(d.day.count)}</td><td>${formatRankDelta(d.day.rank)}</td>
    <td>${formatCountDelta(d.week.count)}</td><td>${formatRankDelta(d.week.rank)}</td>
    <td>${formatCountDelta(d.month.count)}</td><td>${formatRankDelta(d.month.rank)}</td>
    <td>${formatCountDelta(d.quarter.count)}</td><td>${formatRankDelta(d.quarter.rank)}</td>
    <td>${formatCountDelta(d.year.count)}</td><td>${formatRankDelta(d.year.rank)}</td>
    <td>${archetype}</td>
    <td><a href="${href}" target="_blank" rel="noopener">${escapeHtml(tag)}</a></td>
  </tr>`;
}

function render(snapshot, deltas, minCount) {
  const tbody = document.getElementById('data-body');
  const rows = snapshot.sorted
    .filter(org => org.count >= minCount)
    .map(org => buildRow(org, deltas.get(org.tag)));

  tbody.innerHTML = rows.join('');
}

function setStatus(msg, isError = false) {
  const el = document.getElementById('status');
  if (!el) return;
  el.textContent = msg;
  el.style.color = isError ? '#c0392b' : '';
}

// ═══════════════════════════════════════════════════════════════
// UI wiring
// ═══════════════════════════════════════════════════════════════

let isUpdating = false;
const appliedFilters = { date: null, minCount: null };

async function update() {
  if (isUpdating) return;
  isUpdating = true;

  const btn = document.getElementById('btn-update');
  const dateInput = document.getElementById('filter-date');
  const rangeInput = document.getElementById('filter-min-count');

  const dateStr = dateInput.value;
  const minCount = +rangeInput.value;

  if (!dateStr) {
    setStatus('Выберите дату', true);
    isUpdating = false;
    return;
  }

  const year = +dateStr.slice(0, 4);
  if (year < MIN_YEAR || year > MAX_YEAR) {
    setStatus(`Год вне поддерживаемого диапазона (${MIN_YEAR}–${MAX_YEAR})`, true);
    document.getElementById('data-body').innerHTML = '';
    isUpdating = false;
    syncUpdateButton();
    return;
  }

  btn.disabled = true;
  setStatus('Загрузка…');

  try {
    // A. Опорные даты
    const refDates = computeReferenceDates(dateStr);

    // B. Годы и загрузка
    const years = yearsFor(refDates);
    const rawByYear = await loadYears(years);

    // Проверка, что для текущего года данные есть
    const currentYearRaw = rawByYear[year];
    if (!currentYearRaw || Object.keys(currentYearRaw).length === 0) {
      setStatus(`Нет данных за ${year} год`, true);
      document.getElementById('data-body').innerHTML = '';
      return;
    }

    // C. Индекс тегов
    const tagIndex = collectTagIndex(currentYearRaw, dateStr);
    if (tagIndex.size === 0) {
      setStatus(`Нет данных на ${dateStr}`, true);
      document.getElementById('data-body').innerHTML = '';
      return;
    }

    // D. Снимки
    const snapshots = buildAllSnapshots(tagIndex, refDates, rawByYear);

    // E. Дельты
    const deltas = computeDeltas(snapshots);

    // F. Рендер
    render(snapshots.today, deltas, minCount);

    appliedFilters.date = dateStr;
    appliedFilters.minCount = minCount;

//    setStatus(`Дата: ${dateStr} · опорные: вчера ${refDates.yesterday}, пн ${refDates.monday}, ` +
//              `мес ${refDates.monthStart}, кв ${refDates.quarterStart}, год ${refDates.yearStart} · ` +
//              `организаций в дампе: ${tagIndex.size}`);

  } catch (err) {
    console.error(err);
    setStatus(`Ошибка: ${err.message}`, true);
    document.getElementById('data-body').innerHTML = '';
  } finally {
    isUpdating = false;
    syncUpdateButton();
  }
}

function syncUpdateButton() {
  const btn = document.getElementById('btn-update');
  if (!btn) return;
  const dateInput = document.getElementById('filter-date');
  const rangeInput = document.getElementById('filter-min-count');
  const dirty =
    dateInput.value !== appliedFilters.date ||
    +rangeInput.value !== appliedFilters.minCount;
  btn.disabled = !dirty || isUpdating;
}

function onFiltersChanged() {
  // 1) синхронизировать <output> с ползунком
  const rangeInput = document.getElementById('filter-min-count');
  const rangeOutput = document.getElementById('filter-min-count-value');
  if (rangeInput && rangeOutput) rangeOutput.value = rangeInput.value;

  // 2) пересчитать состояние кнопки (dirty-state)
  syncUpdateButton();
}

function onUpdateClick() {
  update();
}

function init() {
  const dateInput = document.getElementById('filter-date');

  // Дата по умолчанию — сегодня
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }

  // Синхронизировать <output> с ползунком при первой загрузке
  onFiltersChanged();

  // Первичная загрузка таблицы
  update();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.onFiltersChanged = onFiltersChanged;
window.onUpdateClick    = onUpdateClick;