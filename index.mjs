export default function assess(answer, guess) {
  if (typeof answer !== "string") {
    throw new TypeError("Answer must be a string.");
  }

  // build a zipped array from answer to ensure the right array size
  let zippedLetters = Array.from(answer, (_, i) => [answer[i], guess[i]]);

  let availableLetterPool = zippedLetters.reduce(
    (accumulator, [answerLetter, guessLetter]) =>
      answerLetter === guessLetter
        ? accumulator
        : {
            ...accumulator,
            [answerLetter]: accumulator[answerLetter] + 1 || 1,
          },
    {}
  );

  let result = zippedLetters.map(([answerLetter, guessLetter]) => {
    if (guessLetter === answerLetter) {
      return [guessLetter, "correct"];
    }
    if (
      guessLetter !== answerLetter &&
      answer.includes(guessLetter) &&
      availableLetterPool[guessLetter]
    ) {
      availableLetterPool[guessLetter] = availableLetterPool[guessLetter] - 1;
      return [guessLetter, "present"];
    }
    return [guessLetter, "absent"];
  });

  return result;
}
