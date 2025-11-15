import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './game.css';

const MAX_ROUNDS = 4;

// Configuração de Personagens
const characters = {
  jogador1: { emoji: '👤', color: '#2196f3' },
  jogadora1: { emoji: '👩', color: '#e91e63' },
  robo: { emoji: '🤖', color: '#9e9e9e' },
  superstar: { emoji: '⭐', color: '#ffd700' }
};

// Configuração de Dificuldades
const difficulties = {
  easy: {
    operations: ['+', '-'],
    minNumber: 1,
    maxNumber: 20,
    name: 'Fácil'
  },
  medium: {
    operations: ['+', '-', '*'],
    minNumber: 1,
    maxNumber: 50,
    name: 'Médio'
  },
  hard: {
    operations: ['+', '-', '*', '/'],
    minNumber: 10,
    maxNumber: 100,
    name: 'Difícil'
  }
};

interface Question {
  num1: number;
  num2: number;
  operation: string;
  answer: number;
  question: string;
  answers: number[];
}

type Screen = 'character-selection' | 'game' | 'end';

export function FootballGame() {
  const navigate = useNavigate();
  
  // Estado da tela
  const [currentScreen, setCurrentScreen] = useState<Screen>('character-selection');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  // Estado do jogo
  const [goals, setGoals] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [canShoot, setCanShoot] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(10);
  const [goalkeeperPosition, setGoalkeeperPosition] = useState(50);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'correct' | 'wrong' | 'save' | null }>({ message: '', type: null });
  const [showGoalAnimation, setShowGoalAnimation] = useState(false);
  const [ballState, setBallState] = useState<'idle' | 'moving' | 'goal' | 'blocked'>('idle');
  const [goalkeeperDefending, setGoalkeeperDefending] = useState<'left' | 'center' | 'right' | null>(null);
  const [playerKicking, setPlayerKicking] = useState(false);
  const [selectedGoalTarget, setSelectedGoalTarget] = useState<{ position: string; x: number } | null>(null);
  
  // Refs
  const ballRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const goalkeeperRef = useRef<HTMLDivElement>(null);

  // Ajustar cor para gradiente
  const adjustColor = useCallback((color: string, amount: number): string => {
    const usePound = color[0] === '#';
    const col = usePound ? color.slice(1) : color;
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = (num >> 8 & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    b = b > 255 ? 255 : b < 0 ? 0 : b;
    return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }, []);

  // Gerar respostas incorretas
  const generateWrongAnswers = useCallback((correctAnswer: number): number[] => {
    const wrongAnswers = new Set<number>();
    while (wrongAnswers.size < 3) {
      let wrongAnswer;
      if (Math.random() > 0.5) {
        wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) + 1;
      } else {
        wrongAnswer = Math.max(1, correctAnswer - Math.floor(Math.random() * 10) - 1);
      }
      if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
        wrongAnswers.add(wrongAnswer);
      }
    }
    return Array.from(wrongAnswers);
  }, []);

  // Gerar pergunta
  const generateQuestion = useCallback(() => {
    const diff = difficulties[difficulty];
    const operation = diff.operations[Math.floor(Math.random() * diff.operations.length)];
    
    let num1: number, num2: number, answer: number;
    
    if (operation === '/') {
      num2 = Math.floor(Math.random() * 10) + 2;
      answer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * answer;
    } else {
      num1 = Math.floor(Math.random() * (diff.maxNumber - diff.minNumber + 1)) + diff.minNumber;
      num2 = Math.floor(Math.random() * (diff.maxNumber - diff.minNumber + 1)) + diff.minNumber;
      
      switch (operation) {
        case '+':
          answer = num1 + num2;
          break;
        case '-':
          if (num1 < num2) [num1, num2] = [num2, num1];
          answer = num1 - num2;
          break;
        case '*':
          num1 = Math.floor(Math.random() * 12) + 1;
          num2 = Math.floor(Math.random() * 12) + 1;
          answer = num1 * num2;
          break;
        default:
          answer = num1 + num2;
      }
    }
    
    const wrongAnswers = generateWrongAnswers(answer);
    const allAnswers = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      num1,
      num2,
      operation,
      answer,
      question: `${num1} ${operation} ${num2} = ?`,
      answers: allAnswers
    });
    setSelectedAnswerIndex(null);
    setCanShoot(false);
    setBallState('idle');
    setGoalkeeperDefending(null);
    setPlayerKicking(false);
  }, [difficulty, generateWrongAnswers]);

  // Tocar som
  const playSound = useCallback((soundType: 'correct' | 'wrong' | 'goal' | 'blocked' | 'kick') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      let frequency: number, duration: number, waveType: OscillatorType;
      
      switch (soundType) {
        case 'correct':
          frequency = 600;
          duration = 150;
          waveType = 'sine';
          break;
        case 'wrong':
          frequency = 300;
          duration = 200;
          waveType = 'square';
          break;
        case 'goal':
          frequency = 800;
          duration = 300;
          waveType = 'sine';
          break;
        case 'blocked':
          frequency = 200;
          duration = 150;
          waveType = 'triangle';
          break;
        case 'kick':
          frequency = 400;
          duration = 100;
          waveType = 'sine';
          break;
        default:
          return;
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = waveType;
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      // Ignorar erros de áudio
    }
  }, []);

  // Resetar posições
  const resetPositions = useCallback(() => {
    setCanShoot(false);
    setIsAnimating(false);
    setBallState('idle');
    setGoalkeeperDefending(null);
    setPlayerKicking(false);
    setSelectedGoalTarget(null);
    setGoalkeeperPosition(50);
    if (ballRef.current) {
      ballRef.current.style.left = `${playerPosition + 5}%`;
      ballRef.current.style.bottom = '240px';
      ballRef.current.style.transform = '';
    }
  }, [playerPosition]);

  // Iniciar jogo
  const startGame = useCallback(() => {
    if (!selectedCharacter) return;
    setCurrentScreen('game');
    setCurrentRound(1);
    setGoals(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    resetPositions();
    generateQuestion();
  }, [selectedCharacter, resetPositions, generateQuestion]);

  // Manipular resposta
  const handleAnswer = useCallback((answerIndex: number) => {
    if (isAnimating || !currentQuestion) return;
    
    setIsAnimating(true);
    setSelectedAnswerIndex(answerIndex);
    const selectedAnswer = currentQuestion.answers[answerIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    setTotalQuestions(prev => prev + 1);
    
    if (isCorrect) {
      playSound('correct');
      setCorrectAnswers(prev => prev + 1);
      setFeedback({ message: '✅ Correto!', type: 'correct' });
      
      setTimeout(() => {
        setFeedback({ message: '', type: null });
        setIsAnimating(false);
        setCanShoot(true);
      }, 1200);
    } else {
      playSound('wrong');
      setFeedback({ message: '❌ Errado!', type: 'wrong' });
      
      setTimeout(() => {
        setFeedback({ message: '', type: null });
        const defendDirection = ['left', 'center', 'right'][Math.floor(Math.random() * 3)] as 'left' | 'center' | 'right';
        setGoalkeeperDefending(defendDirection);
        playSound('blocked');
        
        setTimeout(() => {
          setGoalkeeperDefending(null);
          setIsAnimating(false);
          nextQuestion();
        }, 2000);
      }, 1000);
    }
  }, [isAnimating, currentQuestion, playSound]);

  // Finalizar jogo
  const endGame = useCallback(() => {
    setCurrentScreen('end');
    playSound('goal');
  }, [playSound]);

  // Próxima pergunta
  const nextQuestion = useCallback(() => {
    setCurrentRound(prev => {
      const nextRound = prev + 1;
      if (nextRound > MAX_ROUNDS) {
        endGame();
        return prev;
      }
      resetPositions();
      setTimeout(() => {
        generateQuestion();
      }, 100);
      return nextRound;
    });
  }, [resetPositions, generateQuestion, endGame]);

  // Executar chute
  const executeShoot = useCallback((targetX: number, targetPosition: string) => {
    if (!canShoot || isAnimating) return;
    
    setIsAnimating(true);
    setCanShoot(false);
    setPlayerKicking(true);
    playSound('kick');
    
    // Calcular posição alvo (o gol está centralizado em 50% da tela)
    // targetX é a porcentagem dentro do gol (35%, 50%, 65%)
    // O gol tem 300px de largura e está centralizado
    const goalWidth = 300;
    const screenWidth = window.innerWidth;
    const goalCenterPercent = 50;
    const goalWidthPercent = (goalWidth / screenWidth) * 100;
    const goalLeftPercent = goalCenterPercent - (goalWidthPercent / 2);
    const targetPercent = goalLeftPercent + (targetX / 100) * goalWidthPercent;
    
    // Definir CSS custom property para a animação (usar valores absolutos)
    if (ballRef.current) {
      const startX = ((playerPosition + 5) / 100) * screenWidth;
      const endX = (targetPercent / 100) * screenWidth;
      ballRef.current.style.setProperty('--ball-start-x', `${startX}px`);
      ballRef.current.style.setProperty('--ball-target-x', `${endX}px`);
    }
    
    // Animar bola
    setBallState('moving');
    
    // Mover goleiro com delay (aumentar imprecisão para tornar mais fácil fazer gol)
    setTimeout(() => {
      const precision = 25; // Aumentar imprecisão (era 20)
      const impreciseTarget = targetX + (Math.random() - 0.5) * precision;
      setGoalkeeperPosition(impreciseTarget);
      
      // Verificar se é gol ou defesa
      setTimeout(() => {
        const distance = Math.abs(targetX - impreciseTarget);
        // Aumentar chances de gol - quanto mais longe o goleiro estiver do alvo, maior chance de gol
        // distance < 5: 40% defesa, 60% gol
        // distance < 15: 20% defesa, 80% gol  
        // distance >= 15: 5% defesa, 95% gol
        const saveChance = distance < 5 ? 0.4 : (distance < 15 ? 0.2 : 0.05);
        const isSave = Math.random() < saveChance;
        
        if (isSave) {
          setBallState('blocked');
          setGoalkeeperDefending(targetPosition as 'left' | 'center' | 'right');
          playSound('blocked');
          setFeedback({ message: '🥅 DEFENDEU! 🥅', type: 'save' });
          
          setTimeout(() => {
            setFeedback({ message: '', type: null });
            setGoalkeeperDefending(null);
            setIsAnimating(false);
            setPlayerKicking(false);
            // Resetar posição da bola
            if (ballRef.current) {
              ballRef.current.style.left = `${playerPosition + 5}%`;
              ballRef.current.style.bottom = '240px';
            }
            nextQuestion();
          }, 2000);
        } else {
          setBallState('goal');
          playSound('goal');
          setShowGoalAnimation(true);
          setGoals(prev => prev + 1);
          
          setTimeout(() => {
            setShowGoalAnimation(false);
            setBallState('idle');
            setGoalkeeperDefending(null);
            setIsAnimating(false);
            setPlayerKicking(false);
            // Resetar posição da bola
            if (ballRef.current) {
              ballRef.current.style.left = `${playerPosition + 5}%`;
              ballRef.current.style.bottom = '240px';
            }
            nextQuestion();
          }, 2500);
        }
      }, 1200);
    }, 300);
  }, [canShoot, isAnimating, playSound, nextQuestion, playerPosition]);

  // Movimento do jogador
  useEffect(() => {
    if (currentScreen !== 'game' || isAnimating) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setPlayerPosition(prev => Math.max(5, prev - 3));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setPlayerPosition(prev => Math.min(40, prev + 3));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen, isAnimating]);

  // Atualizar posição da bola quando jogador se move
  useEffect(() => {
    if (ballRef.current && ballState === 'idle') {
      ballRef.current.style.left = `${playerPosition + 5}%`;
    }
  }, [playerPosition, ballState]);

  // Selecionar personagem
  const handleCharacterSelect = useCallback((character: string) => {
    setSelectedCharacter(character);
    setTimeout(() => {
      startGame();
    }, 500);
  }, [startGame]);

  // Reiniciar jogo
  const handleRestart = useCallback(() => {
    setCurrentRound(1);
    setGoals(0);
    setCorrectAnswers(0);
    setTotalQuestions(0);
    resetPositions();
    generateQuestion();
  }, [resetPositions, generateQuestion]);

  // Trocar personagem
  const handleChangeCharacter = useCallback(() => {
    setCurrentScreen('character-selection');
    setSelectedCharacter(null);
    resetPositions();
  }, [resetPositions]);

  // Calcular pontuação final
  const finalScore = goals * 10 + correctAnswers * 5;

  // Obter estilo do personagem
  const characterStyle = selectedCharacter && characters[selectedCharacter as keyof typeof characters]
    ? {
        background: `linear-gradient(135deg, ${characters[selectedCharacter as keyof typeof characters].color} 0%, ${adjustColor(characters[selectedCharacter as keyof typeof characters].color, -20)} 100%)`,
        fontSize: '2.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    : {};

  return (
    <div 
      className="football-game-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      {/* Tela de Seleção de Personagem */}
      {currentScreen === 'character-selection' && (
        <div className="screen">
          <div className="container">
            <h1>⚽ Jogo de Futebol Educativo</h1>
            <h2>Escolha seu jogador!</h2>
            <div className="characters-grid">
              {Object.entries(characters).map(([key, char]) => (
                <div
                  key={key}
                  className={`character-card ${selectedCharacter === key ? 'selected' : ''}`}
                  onClick={() => handleCharacterSelect(key)}
                >
                  <div className={`character-avatar ${key}`}></div>
                  <h3>{char.emoji} {key === 'jogador1' ? 'Jogador 1' : key === 'jogadora1' ? 'Jogadora 1' : key === 'robo' ? 'Robô' : 'Superstar'}</h3>
                </div>
              ))}
            </div>
            <div className="difficulty-selector">
              <h3>Escolha a Dificuldade:</h3>
              <div className="difficulty-buttons">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    className={`difficulty-btn ${difficulty === diff ? 'active' : ''}`}
                    onClick={() => setDifficulty(diff)}
                  >
                    {difficulties[diff].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tela do Jogo */}
      {currentScreen === 'game' && (
        <div className="screen">
          <div className="field-background">
            {/* Gol */}
            <div className={`goal ${canShoot ? 'can-shoot' : ''}`}>
              <div className="goal-net"></div>
              <div className="goal-targets">
                {[
                  { position: 'left', x: 35, label: 'Esquerda', emoji: '⬅️' },
                  { position: 'center', x: 50, label: 'Meio', emoji: '⬆️' },
                  { position: 'right', x: 65, label: 'Direita', emoji: '➡️' }
                ].map((target) => (
                  <div
                    key={target.position}
                    className={`goal-target ${selectedGoalTarget?.position === target.position ? 'selected' : ''}`}
                    onClick={() => {
                      if (canShoot && !isAnimating) {
                        setSelectedGoalTarget({ position: target.position, x: target.x });
                        executeShoot(target.x, target.position);
                      }
                    }}
                    style={{ left: `${target.x}%` }}
                  >
                    <div className="target-marker">{target.emoji}</div>
                    <span className="target-label">{target.label}</span>
                  </div>
                ))}
              </div>
              <div 
                className={`goalkeeper ${goalkeeperDefending ? `defending-${goalkeeperDefending}` : ''}`}
                ref={goalkeeperRef}
                style={{ 
                  left: `${goalkeeperPosition}%`,
                  transform: `translateX(-50%)`
                }}
              >
                <div className="goalkeeper-body"></div>
              </div>
            </div>

            {/* Jogador */}
            <div 
              className={`player ${playerKicking ? 'kicking' : ''}`}
              ref={playerRef}
              style={{ left: `${playerPosition}%` }}
            >
              <div className="player-body" style={characterStyle}>
                {selectedCharacter && characters[selectedCharacter as keyof typeof characters]?.emoji}
              </div>
            </div>

            {/* Bola */}
            <div 
              ref={ballRef}
              className={`ball ${ballState}`}
              style={{
                left: ballState === 'idle' || ballState === 'blocked' ? `${playerPosition + 5}%` : undefined,
                bottom: ballState === 'idle' ? '240px' : undefined
              }}
            ></div>

            {/* Área de Pergunta */}
            <div className="question-area">
              <div className="question-box">
                <h3>Pergunta:</h3>
                <p>{currentQuestion?.question || ''}</p>
                <div className="answers">
                  {currentQuestion?.answers.map((answer, index) => (
                    <button
                      key={index}
                      className={`answer-btn ${
                        selectedAnswerIndex === index
                          ? currentQuestion.answer === answer
                            ? 'correct'
                            : 'wrong'
                          : selectedAnswerIndex !== null && currentQuestion.answer === answer
                          ? 'correct'
                          : ''
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnimating || selectedAnswerIndex !== null}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Placar */}
            <div className="scoreboard">
              <div className="score-item">
                <span className="score-label">Gols:</span>
                <span className="score-value">{goals}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Acertos:</span>
                <span className="score-value">{correctAnswers}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Perguntas:</span>
                <span className="score-value">{totalQuestions}/{MAX_ROUNDS}</span>
              </div>
            </div>

            {/* Botões de Controle */}
            <div className="game-controls">
              <button className="control-btn" onClick={handleRestart}>🔄 Reiniciar</button>
              <button className="control-btn" onClick={handleChangeCharacter}>👤 Trocar Jogador</button>
              <button className="control-btn" onClick={() => navigate('/dashboard?tab=quiz')}>🏠 Voltar ao Menu</button>
            </div>

            {/* Mensagem de Feedback */}
            {feedback.message && (
              <div className={`feedback-message show ${feedback.type || ''}`}>
                {feedback.message}
              </div>
            )}

            {/* Animação de Gol */}
            {showGoalAnimation && (
              <div className="goal-animation show">⚽ GOOOOL! ⚽</div>
            )}
            
            {/* Instruções de Controle */}
            <div className="control-instructions">
              <p className="desktop-only">Use ← → ou A/D para mover o jogador</p>
              <p>Acertando a pergunta, clique no gol para chutar!</p>
            </div>
          </div>
        </div>
      )}

      {/* Tela de Fim de Jogo */}
      {currentScreen === 'end' && (
        <div className="screen">
          <div className="end-game-wrapper">
            <div className="end-game-container">
              <div className="end-header">
                <div className="trophy-icon">🏆</div>
                <h1>Parabéns!</h1>
                <p className="subtitle">Jogo Finalizado</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">⚽</div>
                  <div className="stat-content">
                    <span className="stat-label">Gols</span>
                    <span className="stat-value">{goals}</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <span className="stat-label">Acertos</span>
                    <span className="stat-value">{correctAnswers}</span>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">❓</div>
                  <div className="stat-content">
                    <span className="stat-label">Perguntas</span>
                    <span className="stat-value">{totalQuestions}</span>
                  </div>
                </div>
              </div>
              
              <div className="score-card">
                <div className="score-header">
                  <span className="score-label">Pontuação Final</span>
                </div>
                <div className="score-value-large">{finalScore}</div>
                <div className="score-stars">⭐⭐⭐</div>
              </div>
              
              <div className="end-game-message" style={{ 
                textAlign: 'center', 
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                fontSize: '1.2em',
                color: '#fff',
                fontWeight: 'bold'
              }}>
                <p>🎮 Faça outro quiz para jogar novamente! 🎮</p>
              </div>
              
              <div className="end-game-buttons">
                <button className="end-btn primary" onClick={() => navigate('/dashboard?tab=quiz')}>
                  <span className="btn-icon">📝</span>
                  <span className="btn-text">Voltar aos Quizzes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
