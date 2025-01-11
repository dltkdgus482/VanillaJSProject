const init = (removeAdditionalBlur, removeAllBlur) => {
  const removeAdditionalBlurButton = document.getElementById(
    "remove-additional-blur-button"
  );
  const removeAllBlurButton = document.getElementById("remove-all-blur-button");

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

const removeAdditionalBlur = () => {
  console.log("removeAdditionalBlur");
};

const removeAllBlur = () => {
  console.log("removeAllBlur");
};

const blur = (word) => {
  const content = document.getElementById("content");

  Array.from(content.children).forEach((element) => {
    const originalText = element.textContent;
    const updatedText = originalText.replaceAll(
      word,
      `<span class="blurred">${word}</span>`
    );

    element.innerHTML = updatedText;
  });
};

init(removeAdditionalBlur, removeAllBlur);
initBlur();
