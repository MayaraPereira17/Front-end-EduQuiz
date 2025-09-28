import logo from "../public/edulogo.svg"
import waves from "./assets/waves.png"
import meninos from "./assets/meninos-da-caixa.png"
import raio from "./assets/raio.png"
import { Carrousel } from "./components/carrousel"

function App() {
  return (
    <>
    <header className="bg-white py-2.5">
      <div className="flex justify-between px-14">
        <div className="flex gap-3.5 items-center"> 
          <img src={logo} alt="logo eduquizz" />
          <h1 className="text-black font-bold text-5xl">EduQuizz</h1>
        </div>
       
        <nav className="flex items-center gap-3.5"> 
         <a href="">Sobre</a>
         <a href="">Projeto</a> 
         <a href="">Entrar</a> 
         <a href="">Contato</a>
        </nav> 
       </div>
    </header>

    <main>
      <div  className="w-full h-[763px] md:h-[600px] sm:h-[400px] bg-cover bg-center
      " style={{ backgroundImage: `url(${meninos})` }}>
        <div className="relative mb-6 bottom-1">
        {/* Imagem */}
         <img src={waves} className="w-full" alt="imagem ondulada" />

        {/* Texto por cima da imagem */}
         <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
           <h1 className="text-white text-7xl font-medium">MENINOS DA CAIXA</h1>
           <span className="text-white font-medium">Quando a bola rola, nasce o atleta; quando o aprendizado floresce, cresce o cidadão</span>
         </div>
        </div>
      </div>
      <div className="bg-[#EF6C00] h-9" />


     {/* Sobre os meninos da caixa */}
      <div className="grid grid-cols-2 gap-14 ml-16 mt-11">
        <div className="mt-16 flex flex-col gap-11">
          <h4 className="text-[#EF6C00] font-bold text-5xl">Sobre os Meninos da Caixa</h4>
          <p className="text-lg font-normal">O Projeto Meninos da Caixa Cangaíba nasceu para transformar vidas por meio do esporte e da educação. Mais que uma escolinha de futebol, é um espaço de acolhimento e inspiração, onde cada treino também é uma chance de aprender. Diante das dificuldades em Matemática, unimos esporte e estudo para desenvolver raciocínio, disciplina e autoconfiança, mostrando que o futebol pode ser uma poderosa ferramenta de inclusão e formação cidadão.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end mr-8">
           <img src={raio} alt="imagem raio" className=" "/>
          </div>
          <Carrousel />
        </div>
      </div>

    </main>
    </>
  )
}

export default App
