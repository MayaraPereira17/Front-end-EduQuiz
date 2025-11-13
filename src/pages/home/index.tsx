import logoImg from "/edulogo.svg?url";
import wavesImg from "../../assets/waves.png";
import meninosImg from "../../assets/meninos-da-caixa.png";
import raioImg from "../../assets/raio.png";
import meninoMexendoNoPcImg from "../../assets/menino-mexendo-no-pc.png";
import ondasLaranjaImg from "../../assets/ondas-laranja.png";
import formasGeometricas from "../../assets/formas-geometricas.png";
import logoWhite from "../../assets/logo-white.png";
import facebookLogoImg from "../../assets/facebook-logo.png";
import instagramLogoImg from "../../assets/instagram-logo.png";

import { Carrousel } from "../../components/carrousel";
import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white py-2.5">
        <div className="flex justify-between items-center px-4 sm:px-8 md:px-14">
          <div className="flex gap-2 sm:gap-3.5 items-center">
            <img src={logoImg} alt="logo eduquizz" className="w-8 h-8 sm:w-12 sm:h-12" />
            <h1 className="text-black font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">EduQuizz</h1>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-3.5">
            <a href="" className="hover:text-[#3182BD] transition-colors">Sobre</a>
            <a href="" className="hover:text-[#3182BD] transition-colors">Projeto</a>
            <Link to="/login" className="hover:text-[#3182BD] transition-colors">Entrar</Link>
            <a href="" className="hover:text-[#3182BD] transition-colors">Contato</a>
          </nav>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-3">
            <a href="" className="hover:text-[#3182BD] transition-colors">Sobre</a>
            <a href="" className="hover:text-[#3182BD] transition-colors">Projeto</a>
            <Link to="/login" className="hover:text-[#3182BD] transition-colors">Entrar</Link>
            <a href="" className="hover:text-[#3182BD] transition-colors">Contato</a>
          </nav>
        )}
      </header>

      <main className="bg-white">
        <div
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[763px] bg-cover bg-center"
          style={{ backgroundImage: `url(${meninosImg})` }}
        >
          <div className="relative mb-6 bottom-1">
            {/* Imagem */}
            <img src={wavesImg} className="w-full" alt="imagem ondulada" />

            {/* Texto por cima da imagem */}
            <div className="absolute inset-0 flex flex-col items-center justify-start sm:justify-center gap-2 sm:gap-3.5 px-4 pt-10 sm:pt-0">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-medium text-center">
                MENINOS DA CAIXA
              </h1>
              <span className="text-white font-medium text-sm sm:text-base md:text-lg text-center max-w-2xl px-4">
                Quando a bola rola, nasce o atleta; quando o aprendizado
                floresce, cresce o cidadão
              </span>
            </div>
          </div>
        </div>
        <div className="bg-[#FFA726] h-6 sm:h-9" />

        {/* Sobre os meninos da caixa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 px-4 sm:px-8 md:px-12 lg:ml-16 mt-8 sm:mt-11 mb-8 sm:mb-16">
          <div className="mt-8 md:mt-16 flex flex-col gap-6 md:gap-11">
            <h4 className="text-[#EF6C00] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Sobre os Meninos da Caixa
            </h4>
            <p className="text-base sm:text-lg font-normal">
              O Projeto Meninos da Caixa Cangaíba nasceu para transformar vidas
              por meio do esporte e da educação. Mais que uma escolinha de
              futebol, é um espaço de acolhimento e inspiração, onde cada treino
              também é uma chance de aprender. Diante das dificuldades em
              Matemática, unimos esporte e estudo para desenvolver raciocínio,
              disciplina e autoconfiança, mostrando que o futebol pode ser uma
              poderosa ferramenta de inclusão e formação cidadão.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-center md:justify-end md:mr-8">
              <img src={raioImg} alt="imagem raio" className="w-32 sm:w-40 md:w-auto" />
            </div>
            <Carrousel />
          </div>
        </div>

        <div className="bg-[#E9F4FF] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 pb-8 md:pb-14 shadow-[0_4px_10px_0px_rgba(0,0,0,0.25)]">
          <div className="pt-4 px-4 sm:px-8 md:px-0 md:ml-16 order-2 md:order-1">
            <img
              src={meninoMexendoNoPcImg}
              alt="menino mexendo no pc"
              className="w-full"
            />
          </div>
          <div className="mt-8 md:mt-16 px-4 sm:px-8 md:px-0 order-1 md:order-2">
            <h4 className="text-[#EF6C00] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 md:mb-10">
              Projeto EduQuiz
            </h4>
            <div className="flex-col flex gap-4 md:gap-6 md:mr-24">
              <p className="text-base sm:text-lg font-normal">
                Nosso propósito vai além das notas: queremos inspirar os alunos
                a acreditarem em si mesmos e a enxergarem que a educação pode
                abrir caminhos tão grandes quanto seus sonhos. Mais do que
                ensinar, o EduQuiz busca cuidar e incentivar, mostrando que
                ninguém precisa trilhar esse caminho sozinho.
              </p>
              <p className="text-base sm:text-lg font-normal">
                O EduQuiz é uma iniciativa que nasceu para acolher, apoiar e
                transformar vidas por meio da educação. Inspirado pela realidade
                dos Meninos da Caixa, criamos uma ferramenta simples e acessível
                que usa jogos e desafios para tornar o aprendizado de Matemática
                mais leve e motivador.
              </p>
            </div>
            <div className="flex justify-center md:justify-end mt-4 md:mt-0">
              <img src={ondasLaranjaImg} alt="Ondas laranja" className="w-32 sm:w-40 md:w-auto" />
            </div>
          </div>
        </div>

        <div
          className="w-full min-h-[400px] sm:h-[500px] md:h-[600px] lg:h-[51rem] bg-cover bg-center py-8 sm:py-12 md:py-16"
          style={{ backgroundImage: `url(${formasGeometricas})` }}
        >
          <div className="flex flex-col justify-center flex-1 items-center h-full px-4">
            <div className="shadow-[0_4px_20px_-2px_rgba(0,0,0,0.25)] flex flex-col pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-12 md:pb-16 px-6 sm:px-12 md:px-20 rounded-2xl sm:rounded-4xl w-full max-w-md">
              <h4 className="text-base font-medium mb-3 text-center">
                Entrar na Plataforma
              </h4>
              <p className="text-sm mb-8 sm:mb-14 text-center">
                Faça login para começar sua jornada educacional
              </p>

              <form className="flex flex-col">
                <label className="font-medium mb-1.5">Email</label>
                <input
                  className="bg-[#E6E6E6] pl-3 py-2.5 rounded-xl"
                  type="email"
                  required
                  placeholder="seu@email.com"
                ></input>

                <label className="font-medium mt-4 mb-1.5">Senha</label>
                <input
                  className="bg-[#E6E6E6] pl-4 py-2.5 rounded-xl"
                  type="password"
                  required
                  placeholder="***********"
                ></input>

                <button
                  type="submit"
                  className="font-bold mt-6 sm:mt-9 mb-6 sm:mb-12 bg-[#3182BD] text-white rounded-4xl py-2.5 px-8 sm:px-16 md:px-24 w-full sm:w-auto mx-auto"
                >
                  Entrar
                </button>
              </form>

            </div>
          </div>
        </div>
        <footer className="bg-[#FFA726] py-8 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-8 md:px-16 lg:px-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-white">
            <div className="flex items-center gap-3">
              <img src={logoWhite} alt="logo branca" className="w-8 h-8 sm:w-10 sm:h-10" />
              <h4 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">EduQuiz</h4>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">Contato</span>
              <span className="font-medium text-sm sm:text-base">Telefone: (11) 9 9999-8888</span>
              <span className="font-medium text-sm sm:text-base">
                E-mail: meninosdacaixa@gmail.com
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">Sobre</span>
              <span className="font-medium text-sm sm:text-base">Projeto EduQuiz</span>
              <span className="font-medium text-sm sm:text-base">Meninos da Caixa</span>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                Nos acompanhe nas redes
              </span>
              <div className="flex gap-4">
                <img src={facebookLogoImg} alt="logo facebook" className="w-6 h-6 sm:w-8 sm:h-8" />
                <img src={instagramLogoImg} alt="logo instagram" className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
