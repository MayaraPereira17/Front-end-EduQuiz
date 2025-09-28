import logoImg from "../public/edulogo.svg"
import wavesImg from "./assets/waves.png"
import meninosImg from "./assets/meninos-da-caixa.png"
import raioImg from "./assets/raio.png"
import { Carrousel } from "./components/carrousel"
import meninoMexendoNoPcImg from "./assets/menino-mexendo-no-pc.png"
import ondasLaranjaImg from "./assets/ondas-laranja.png"

function App() {
  return (
    <>
    <header className="bg-white py-2.5">
      <div className="flex justify-between px-14">
        <div className="flex gap-3.5 items-center"> 
          <img src={logoImg} alt="logo eduquizz" />
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
      " style={{ backgroundImage: `url(${meninosImg})` }}>
        <div className="relative mb-6 bottom-1">
        {/* Imagem */}
         <img src={wavesImg} className="w-full" alt="imagem ondulada" />

        {/* Texto por cima da imagem */}
         <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
           <h1 className="text-white text-7xl font-medium">MENINOS DA CAIXA</h1>
           <span className="text-white font-medium">Quando a bola rola, nasce o atleta; quando o aprendizado floresce, cresce o cidadão</span>
         </div>
        </div>
      </div>
      <div className="bg-[#FFA726] h-9" />


     {/* Sobre os meninos da caixa */}
      <div className="grid grid-cols-2 gap-14 ml-16 mt-11 mb-16">
        <div className="mt-16 flex flex-col gap-11">
          <h4 className="text-[#EF6C00] font-bold text-5xl">Sobre os Meninos da Caixa</h4>
          <p className="text-lg font-normal">O Projeto Meninos da Caixa Cangaíba nasceu para transformar vidas por meio do esporte e da educação. Mais que uma escolinha de futebol, é um espaço de acolhimento e inspiração, onde cada treino também é uma chance de aprender. Diante das dificuldades em Matemática, unimos esporte e estudo para desenvolver raciocínio, disciplina e autoconfiança, mostrando que o futebol pode ser uma poderosa ferramenta de inclusão e formação cidadão.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end mr-8">
           <img src={raioImg} alt="imagem raio" className=" "/>
          </div>
          <Carrousel />
        </div>
      </div>

      <div className="bg-[#E9F4FF] grid grid-cols-2 gap-14 pb-14">
        <div className="pt-4 ml-16">
         <img src={meninoMexendoNoPcImg} alt="menino mexendo no pc" />
        </div>
        <div className="mt-16">
         <h4 className="text-[#EF6C00] font-bold text-5xl mb-10">Projeto EduQuiz</h4>
         <div className="flex-col flex gap-6 mr-24">
         <p className="text-lg font-normal">Nosso propósito vai além das notas: queremos inspirar os alunos a acreditarem em si mesmos e a enxergarem que a educação pode abrir caminhos tão grandes quanto seus sonhos. Mais do que ensinar, o EduQuiz busca cuidar e incentivar, mostrando que ninguém precisa trilhar esse caminho sozinho.</p>
         <p className="text-lg font-normal">O EduQuiz é uma iniciativa que nasceu para acolher, apoiar e transformar vidas por meio da educação. Inspirado pela realidade dos Meninos da Caixa, criamos uma ferramenta simples e acessível que usa jogos e desafios para tornar o aprendizado de Matemática mais leve e motivador.</p>
        </div>
         <div className="flex justify-end">
          <img src={ondasLaranjaImg} alt="Ondas laranja" />  
         </div>
        </div>
      </div>

    </main>
    </>
  )
}

export default App
