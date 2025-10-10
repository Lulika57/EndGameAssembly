function App() {
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
    </main>
  )
}

export default App
