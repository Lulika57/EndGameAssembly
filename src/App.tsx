import { useMemo, useState } from "react"
import { languages } from "./assets/languages"
import clsx from "clsx"

function App() {
  const [word, setWord] = useState<string>("React")
  const [guessed, setGuessed] = useState<string>("")
  const [guessesLeft, setGuessesLeft] = useState<number>(languages.length)
  const [gameActive, setGameActive] = useState<boolean>(true)
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  

  function handleClick (letter: string) {
    setGuessed((prev) => prev + letter)
    // is game won
    const allLettersGuessed = word.split("").every((char) => guessed.includes(char))
    if (isCorrectGuess(letter))

    // we are missing something here
  }

function isCorrectGuess (letter: string) {
  word.includes(letter)
}

  return (
    <main>
      <header className="text-center">
        <h1 className="text-[1.25rem] text-[#f9f4da] font-medium">Assembly: Endgame</h1>
        <p className="text-[0.875rem] text-[#8E8E8E] max-w-[350px]">Guess the word within 10 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className="bg-[#10A95B] flex flex-col items-center text-[#F9F4DA] rounded my-[30px]">
        <h2 className="text-[1.25rem] m-[5px]">You win!</h2>
        <p className="m-[5px]">Well done! 🎉</p>
      </section>
      <section className="max-w-[350px] flex flex-wrap justify-center gap-1 mb-9">
        {languages.map((language) => (
          <span
            className="px-2 py-0.5 rounded"
            style={{ color: language.color, backgroundColor: language.backgroundColor }}
          >
            {language.name}
          </span>
        ))}
      </section>
      <section className="flex gap-[2px] justify-center">
        {word.toUpperCase().split("").map((char, idx) => (
          <span key={idx} className="size-[40px] w-[40px] bg-[#323232] flex justify-center items-center text-[1.125rem] border-b-[1px] border-[#f9f4da]">{char}</span>
        ))}
      </section>
      <section>
        {alphabet.split("").map((letter) => (
          <button className={clsx("")} onClick={() => handleClick(letter)}>{letter}</button>
        )

        )}
      </section>
    </main>
  )
}

export default App
