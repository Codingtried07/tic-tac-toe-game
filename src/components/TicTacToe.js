"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

const TicTacToe = ({ user, onGameEnd }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [difficulty, setDifficulty] = useState('medium');
    const [gameMode, setGameMode] = useState('ai');
    const [winningLine, setWinningLine] = useState(null);
    const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinningLine(lines[i]);
                return squares[a];
            }
        }
        return null;
    };

    const getAIMove = (currentBoard) => {
        if (difficulty === 'easy') {
            const emptySquares = currentBoard
                .map((square, index) => square === null ? index : null)
                .filter(square => square !== null);
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }
        return getBestMove(currentBoard);
    };

    const getBestMove = (currentBoard) => {
        let bestScore = -Infinity;
        let bestMove = null;

        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === null) {
                currentBoard[i] = 'O';
                let score = minimax(currentBoard, 0, false);
                currentBoard[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    };

    const minimax = (currentBoard, depth, isMaximizing) => {
        const winner = calculateWinner(currentBoard);
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (currentBoard.every(square => square !== null)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < currentBoard.length; i++) {
                if (currentBoard[i] === null) {
                    currentBoard[i] = 'O';
                    let score = minimax(currentBoard, depth + 1, false);
                    currentBoard[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < currentBoard.length; i++) {
                if (currentBoard[i] === null) {
                    currentBoard[i] = 'X';
                    let score = minimax(currentBoard, depth + 1, true);
                    currentBoard[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    useEffect(() => {
        if (gameMode === 'ai' && !isXNext && !winner && board.some(square => square === null)) {
            const timeoutId = setTimeout(() => {
                const aiMove = getAIMove([...board]);
                handleClick(aiMove);
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [isXNext, winner, board, gameMode]);

    const handleClick = (i) => {
        if (winner || board[i]) return;

        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            updateScore(gameWinner);
        } else if (newBoard.every(square => square !== null)) {
            updateScore('draw');
        }
    };

    const updateScore = (result) => {
        if (result === 'X') {
            setScore(prev => ({ ...prev, wins: prev.wins + 1 }));
        } else if (result === 'O') {
            setScore(prev => ({ ...prev, losses: prev.losses + 1 }));
        } else if (result === 'draw') {
            setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setWinningLine(null);
    };

    const getStatus = () => {
        if (winner) {
            return `Winner: ${winner === 'X' ? 'You' : 'AI'}!`;
        } else if (board.every(square => square !== null)) {
            return "Game Draw!";
        } else {
            return `Next player: ${isXNext ? 'X' : 'O'}`;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 p-8"
        >
            <Card className="w-full max-w-md mx-auto shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="space-y-2"
                    >
                        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
                            Tic Tac Toe {gameMode === 'multiplayer' ? 'Multiplayer' : 'AI'}
                        </CardTitle>
                        <p className="text-center text-gray-600 dark:text-gray-400">
                            Welcome, {user}!
                        </p>
                        <motion.div
                            className="flex justify-center gap-4 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-indigo-500 dark:text-indigo-400">Wins: {score.wins}</span>
                            <span className="text-purple-500 dark:text-purple-400">Losses: {score.losses}</span>
                            <span className="text-pink-500 dark:text-pink-400">Draws: {score.draws}</span>
                        </motion.div>
                    </motion.div>

                    <div className="flex justify-between items-center gap-4">
                        <Select value={gameMode} onValueChange={setGameMode}>
                            <SelectTrigger className="w-32 bg-white dark:bg-gray-700">
                                <SelectValue placeholder="Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ai">vs AI</SelectItem>
                                <SelectItem value="multiplayer">Multiplayer</SelectItem>
                            </SelectContent>
                        </Select>

                        {gameMode === 'ai' && (
                            <Select value={difficulty} onValueChange={setDifficulty}>
                                <SelectTrigger className="w-32 bg-white dark:bg-gray-700">
                                    <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        )}

                        <Button
                            onClick={resetGame}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 dark:from-indigo-600 dark:to-purple-600 text-white shadow-lg"
                        >
                            Reset
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <motion.div
                        className="text-xl mb-6 text-center font-semibold text-gray-700 dark:text-gray-300"
                        animate={{ scale: winner ? 1.1 : 1 }}
                    >
                        {getStatus()}
                    </motion.div>

                    <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                        <AnimatePresence>
                            {board.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: value ? 360 : 0
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Button
                                        variant="outline"
                                        className={`h-20 text-3xl font-bold
                      ${value === 'X' ? 'text-indigo-500 dark:text-indigo-400' : value === 'O' ? 'text-purple-500 dark:text-purple-400' : ''}
                      ${!value && 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                      ${winner && 'hover:bg-white dark:hover:bg-gray-800'}
                      ${winningLine?.includes(index) ? 'bg-green-100 dark:bg-green-900' : ''}
                      shadow-sm hover:shadow-md dark:bg-gray-700 dark:border-gray-600`}
                                        onClick={() => handleClick(index)}
                                    >
                                        {value}
                                    </Button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default TicTacToe;