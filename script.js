const init = (addBlur, removeAdditionalBlur, removeAllBlur) => {
  const addBlurButton = document.getElementById("add-blur-button");
  const removeAdditionalBlurButton = document.getElementById(
    "remove-additional-blur-button"
  );
  const removeAllBlurButton = document.getElementById("remove-all-blur-button");

  addBlurButton.onclick = addBlur;
  removeAdditionalBlurButton.onclick = removeAdditionalBlur;
  removeAllBlurButton.onclick = removeAllBlur;
};

const initBlur = () => {
  const content = document.getElementById("content");
  const wordArray = Array.from(content.children).reduce((acc, e) => {
    const words = e.textContent
      .replace(/[,.]/g, "")
      .trim()
      .split(" ")
      .filter((word) => word !== "");

    return acc.concat(words);
  }, []);

  const wordMap = new Map();
  const initBlurWordSet = new Set();

  for (const word of wordArray) {
    if (wordMap.has(word)) {
      wordMap.set(word, wordMap.get(word) + 1);
    } else {
      wordMap.set(word, 1);
    }
  }

  for (const word of wordArray) {
    if (word.length >= 5 && wordMap.get(word) >= 6) {
      initBlurWordSet.add(word);
    }
  }

  initBlurWordSet.forEach((word) => blur(word));
};

const addBlur = () => {
  console.log("addBlur");
};

const removeAdditionalBlur = () => {
  console.log("removeAdditionalBlur");
};

const removeAllBlur = () => {
  const content = document.getElementById("content");

  if (!content) {
    console.log("id가 content인 요소가 존재하지 않습니다.");
    return;
  }

  const q = [];
  q.push({ el: content, depth: 0 });

  startCountdown();

  while (q.length > 0) {
    const { el, depth } = q.shift();

    const classList = el.classList;

    if (classList.contains("blurred")) {
      classList.remove("blurred");

      setTimeout(() => classList.add("blurred"), 3000);
    }

    Array.from(el.children).forEach((child) => {
      q.push({ el: child, depth: depth + 1 });
    });
  }
};

const startCountdown = () => {
  const countdown = document.getElementById("remove-all-blur-button");

  let count = 3;
  countdown.innerText = count;

  const interval = setInterval(() => {
    count -= 1;
    countdown.innerText = count;

    if (count === 0) {
      clearInterval(interval);
      countdown.innerText = "원본 보기";
    }
  }, 1000);
};

const blur = (word) => {
  const content = document.getElementById("content");

  Array.from(content.children).forEach((e) => {
    const originalText = e.textContent;
    const updatedText = originalText.replaceAll(
      word,
      `<span class="blurred">${word}</span>`
    );

    e.innerHTML = updatedText;
  });
};

init(addBlur, removeAdditionalBlur, removeAllBlur);
initBlur();
