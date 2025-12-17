import OwnerForm from "./components/OwnerForm"


function App() {

  return (
    <>
    <header className="bg-green-800 py-8 max-h-72">
      <h1 className=" uppercase text-center font-black text-4xl text-white">Control de Expensas </h1>
    </header>

     <div className="max-w-3x1 max-auto bg-white shadow-lg rounded-lg mt-10 p-10">
      <OwnerForm />
    </div>
    </>
  )
}

export default App
