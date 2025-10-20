import { useEffect, useState } from "react"
import { languages } from "./assets/languages"
import clsx from "clsx"
import { words } from "./assets/words"
import ReactConfetti from "react-confetti"

function App() {
  const [word, setWord] = useState<string>("")
  const [guessed, setGuessed] = useState<string>("")

  const incorrectGuessCount = guessed.split("").filter((char) => !isCorrectGuess(char)).length
  const lastGuessWasBad = !word.includes(guessed.charAt(guessed.length - 1))
  const playerLost = incorrectGuessCount >= languages.length - 1
  const playerWon = areAllLettersGuessed()
  const isGameOver = playerLost || playerWon

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  useEffect(() => {
    const startingWord = selectRandomWord()

    setWord(startingWord)
  }, [])

  function handleClick(letter: string) {
    setGuessed((prev) => prev + letter)

    // const isGameOver = areAllLettersGuessed() || (getIncorrectGuessCount() >= languages.length - 1);
  }

  function areAllLettersGuessed() {
    // we compare every character in our word with guessed letters to see if all the letters have been guessed, 
    // if so it shows all the letters have been guessed
    return word.split("").every((char) => guessed.includes(char))
  }

  function isCorrectGuess(guessLetter: string) {
    // we take a letter from guessed and we check if it is in the word
    // a guess is correct when a word includes this letter
    return word.includes(guessLetter)
  }

  function isGuessed(wordLetter: string) {
    // if wordLetter is in guessed
    // Should give us T/F
    // return isCorrectGuess(letter)
    return guessed.includes(wordLetter)
  }

  function getFarewellText(language: string) {
    const options = [
      `Farewell, ${language}`,
      `Adios, ${language}`,
      `R.I.P., ${language}`,
      `We'll miss you, ${language}`,
      `Oh no, not ${language}!`,
      `${language} bites the dust`,
      `Gone but not forgotten, ${language}`,
      `The end of ${language} as we know it`,
      `Off into the sunset, ${language}`,
      `${language}, it's been real`,
      `${language}, your watch has ended`,
      `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);

    return options[randomIndex];
  }

  function startNewGame() {
    setGuessed("")
    setWord(selectRandomWord())
  }

  function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);

    return words[randomIndex].toUpperCase();
  }

  return (
    <main className="flex flex-col items-center">
      {playerWon && <ReactConfetti recycle={false} numberOfPieces={1000} />}
      <header className="text-center">
        <h1 className="text-[1.25rem] text-[#f9f4da] font-medium">Assembly: Endgame</h1>
        <p className="text-[0.875rem] text-[#8E8E8E] max-w-[350px]">Guess the word within 10 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section aria-live="polite" role="status" className="my-[30px] w-full flex justify-center min-h-[60px]">
        {isGameOver && (
          playerWon ? (
            <div className="bg-[#10A95B] flex flex-col items-center text-[#F9F4DA] rounded size-full min-h-[60px] max-w-[350px]">
              <h2 className="text-[1.25rem] m-[5px]">You win!</h2>
              <p className="m-[5px]">Well done! 🎉</p>
            </div>
          ) : (
            <div className="bg-[#BA2A2A] flex flex-col items-center text-[#F9F4DA] rounded w-full min-h-[60px] max-w-[350px]">
              <h2 className="text-[1.25rem] m-[5px]">Game over!</h2>
              <p className="m-[5px]">You lose! Better start learning Assembly 😭</p>
            </div>
          )
        )}

        {!isGameOver && lastGuessWasBad && (
          <div className="bg-[#7A5EA7] flex flex-col items-center text-[#F9F4DA] rounded border border-dashed border-[#323232] size-full min-h-[60px] justify-center max-w-[350px]">
            <p className="italic font-normal">{getFarewellText(languages[incorrectGuessCount - 1].name)}</p>
          </div>
        )}

      </section>
      <section className="max-w-[350px] flex flex-wrap justify-center gap-1 mb-9">
        {languages
          .map((language, idx) => {
            const isLost = idx < incorrectGuessCount

            return (
              <span
                key={language.name}
                className={clsx("px-2 py-0.5 rounded", isLost && "relative lost-language")}
                style={{ color: language.color, backgroundColor: language.backgroundColor }}
              >
                {language.name}
              </span>
            )
          })}
      </section>
      <section className="flex gap-[2px] justify-center">
        {word.toUpperCase().split("").map((char, idx) => (
          <span
            key={idx}
            className={clsx(
              "size-[40px] bg-[#323232] flex justify-center items-center text-[1.125rem] border-b-[1px] border-[#f9f4da]",
              isGuessed(char) ? "text-[#f9f4da]" : "text-[#BA2A2A]"
            )}>
            {(isGuessed(char) || isGameOver) && char}
          </span>
        ))}
      </section>
      <section className="flex justify-center max-w-[450px] flex-wrap gap-2 mt-[36px]">
        {alphabet.split("").map((letter) => (
          <button
            key={letter}
            disabled={isGuessed(letter) || isGameOver}
            aria-disabled={isGuessed(letter) || isGameOver}
            aria-label={`Letter ${letter}`}
            onClick={() => handleClick(letter)}
            className={clsx(
              "size-[35px] border-[#D7D7D7] border rounded-[3px] cursor-pointer flex justify-center items-center text-black disabled:cursor-not-allowed disabled:opacity-50",
              !isGuessed(letter) && "bg-[#FCBA29]",
              isGuessed(letter) && (
                isCorrectGuess(letter) ? "bg-[#10A958]" : "bg-[#EC5D49]"
              )
            )}
          >
            {letter}
          </button>
        ))}
      </section>
      {isGameOver && (
        <button className="bg-[#11B5E5] border-[#D7D7D7] border rounded h-10 w-[225px] px-[12px] py-[6px] block my-9 cursor-pointer text-black" onClick={startNewGame}>
          New Game
        </button>
      )}
    </main>
  )
}

export default App
