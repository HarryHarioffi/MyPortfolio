"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { play } from "@/content/play";
import { DIFFICULTIES, NAME_MAX, cleanName, type Difficulty, type Entry, type Game } from "@/lib/leaderboard";
import { useLocal, writeLocal } from "@/lib/local-store";
import { SHARED, loadBoard, postScore } from "@/lib/scores";
import { EaseMatchGame } from "./EaseMatchGame";
import { GameIcon } from "./GameIcon";
import { HowToPlay } from "./HowToPlay";
import { PenToolGame } from "./PenToolGame";
import { ResultCard } from "./ResultCard";
import { Scoreboard, type BoardState } from "./Scoreboard";
import { Splash } from "./Splash";
import { Tabs } from "./Tabs";
import { TrackingGame } from "./TrackingGame";
import type { Place } from "./Trophy";
import type { Finish, GameProps, Outcome } from "./types";

const NAME_KEY = "hh:play:name";

const GAME_VIEWS: Record<Game, (props: GameProps) => ReactElement> = {
  "ease-match": EaseMatchGame,
  "pen-tool": PenToolGame,
  tracking: TrackingGame,
};

const boardKey = (g: Game, d: Difficulty) => `${g}:${d}`;
const IDLE: Outcome = { kind: "idle" };

/**
 * The whole page, built like a design tool's window: a bar of game tabs and the difficulty along
 * the top, the game on a dotted canvas, and the scoreboard in a panel on the right. Change the
 * game or the difficulty and the board changes with it. A finished run posts itself when a name
 * is set, and a top-three place gets a quick splash.
 */
export function PlayArena() {
  // Built here, not at the top of the file: nothing imported has to exist yet while this module loads.
  const gameTabs = play.games.map((g) => ({ id: g.slug, label: g.name, icon: <GameIcon game={g.slug} /> }));
  const levels = DIFFICULTIES.map((d) => ({ id: d, label: d[0].toUpperCase() + d.slice(1) }));
  const [game, setGame] = useState<Game>(play.games[0].slug);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [run, setRun] = useState(0);
  const [finish, setFinish] = useState<Finish | null>(null);
  const [outcome, setOutcome] = useState<Outcome>(IDLE);
  const [splash, setSplash] = useState<{ place: Place; score: number } | null>(null);
  const [boards, setBoards] = useState<Record<string, Entry[]>>({});
  const [failed, setFailed] = useState<Record<string, true>>({});
  const name = useLocal(NAME_KEY);
  // Bumped whenever the run it belongs to is over, so a slow reply can't land on the next game.
  const ticket = useRef(0);

  const key = boardKey(game, difficulty);
  const info = play.games.find((g) => g.slug === game) ?? play.games[0];
  const View = GAME_VIEWS[game];

  useEffect(() => {
    let alive = true;
    loadBoard(game, difficulty)
      .then((entries) => alive && setBoards((b) => ({ ...b, [key]: entries })))
      .catch(() => alive && setFailed((f) => ({ ...f, [key]: true })));
    return () => {
      alive = false;
    };
  }, [game, difficulty, key]);

  const reset = () => {
    ticket.current++;
    setFinish(null);
    setOutcome(IDLE);
    setSplash(null);
  };

  const pickGame = (next: Game) => {
    if (next === game) return;
    reset();
    setGame(next);
  };
  const pickDifficulty = (next: Difficulty) => {
    if (next === difficulty) return;
    reset();
    setDifficulty(next);
  };
  const again = () => {
    reset();
    setRun((r) => r + 1);
  };

  const post = async (f: Finish, who: string) => {
    const mine = ++ticket.current;
    const at = { game, difficulty, key };
    setOutcome({ kind: "posting" });
    try {
      const res = await postScore(at.game, at.difficulty, { name: who, payload: f.payload, ms: f.ms });
      if (mine !== ticket.current) return;
      setBoards((b) => ({ ...b, [at.key]: res.entries }));
      const i = res.entries.findIndex((e) => e.name.toLowerCase() === who.toLowerCase());
      const row = res.entries[i];
      // "Improved" means this run is the one on the board now (it equals or beat the old best).
      const improved = !!row && row.score === res.score;
      setOutcome({ kind: "posted", rank: i === -1 ? null : i + 1, best: row?.score ?? res.score, improved });
      if (SHARED && improved && i >= 0 && i < 3) setSplash({ place: (i + 1) as Place, score: res.score });
    } catch (err) {
      if (mine !== ticket.current) return;
      setOutcome({ kind: "failed", message: err instanceof Error ? err.message : "Could not post that." });
    }
  };

  const onFinish = (f: Finish) => {
    setFinish(f);
    const who = cleanName(name);
    if (who) void post(f, who);
    else setOutcome({ kind: "needs-name" });
  };

  const entries = boards[key];
  const state: BoardState = entries ? "ready" : failed[key] ? "failed" : "loading";

  return (
    <div className="mt-6 md:mt-8">
      <div className="border border-line bg-paper shadow-[0_1px_2px_rgb(42_48_53/0.06),0_16px_40px_rgb(42_48_53/0.06)]">
        {/* The title bar: games on the left, difficulty and help on the right. */}
        <div className="flex flex-wrap items-stretch justify-between border-b border-line bg-canvas">
          <Tabs items={gameTabs} value={game} onChange={pickGame} label="Game" variant="strip" />
          <div className="flex items-center gap-2 px-3 py-2 max-md:w-full max-md:justify-between max-md:border-t max-md:border-line">
            <Tabs
              items={levels}
              value={difficulty}
              onChange={pickDifficulty}
              label="Difficulty"
              variant="segment"
            />
            <HowToPlay key={game} title={`How to play ${info.name}`} steps={info.howTo} />
          </div>
        </div>

        <div className="grid min-[1100px]:grid-cols-[minmax(0,1fr)_340px]">
          <div role="tabpanel" aria-label={info.name} className="dot-grid relative min-w-0 overflow-hidden">
            <View key={`${key}:${run}`} difficulty={difficulty} run={run} done={finish !== null} onFinish={onFinish} />
            {finish && (
              <ResultCard
                finish={finish}
                outcome={outcome}
                difficulty={difficulty}
                shared={SHARED}
                canPost={!!cleanName(name)}
                onPost={() => {
                  const who = cleanName(name);
                  if (who) void post(finish, who);
                }}
                onAgain={again}
              />
            )}
            {splash && (
              <Splash
                place={splash.place}
                score={splash.score}
                where={`${info.name} · ${difficulty[0].toUpperCase()}${difficulty.slice(1)}`}
                onDone={() => setSplash(null)}
              />
            )}
          </div>
          <div className="border-t border-line min-[1100px]:border-l min-[1100px]:border-t-0">
            <Scoreboard
              gameName={info.name}
              difficulty={difficulty}
              entries={entries ?? []}
              state={state}
              shared={SHARED}
              name={name}
              onName={(v) => writeLocal(NAME_KEY, v.slice(0, NAME_MAX))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
