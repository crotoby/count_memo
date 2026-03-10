const STORAGE_KEY = "count-memo-v1";

const memoInput = document.getElementById("memo-input");
const charCount = document.getElementById("char-count");
const charCountNoBreaks = document.getElementById("char-count-no-breaks");
const saveStatus = document.getElementById("save-status");
const clearButton = document.getElementById("clear-button");

function updateCounts(text) {
  charCount.textContent = text.length.toLocaleString("ja-JP");
  charCountNoBreaks.textContent = text.replace(/\r?\n/g, "").length.toLocaleString("ja-JP");
}

function setStatus(message) {
  saveStatus.textContent = message;
}

function saveMemo(text) {
  try {
    localStorage.setItem(STORAGE_KEY, text);
    setStatus("このブラウザに自動保存しました");
  } catch {
    setStatus("保存に失敗しました。ブラウザの設定を確認してください");
  }
}

function loadMemo() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    setStatus("保存済みメモを読み込めませんでした");
    return "";
  }
}

function reflectMemo(text) {
  memoInput.value = text;
  updateCounts(text);
}

memoInput.addEventListener("input", () => {
  const text = memoInput.value;
  updateCounts(text);
  saveMemo(text);
});

clearButton.addEventListener("click", () => {
  const confirmed = window.confirm("メモを空にします。よければ OK を押してください。");
  if (!confirmed) return;

  reflectMemo("");
  saveMemo("");
});

const initialMemo = loadMemo();
reflectMemo(initialMemo);
setStatus(initialMemo ? "保存済みメモを読み込みました" : "まだメモは空です");
