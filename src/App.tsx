import React, { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState<string[]>([
    "Alan",
    "Sean",
    "Joanne",
    "Theresa",
    "Deirdre",
    "Joan",
    "Julian",
    "Andrea",
    "Michelle",
    "Jason",
    "Olivia",
    "Thomas",
    "John",
    "Dan",
    "Elizabeth",
    "Hannah",
    "Una",
    "Karen",
    "Neil",
    "Colin",
    "Amy",
    "Dominic",
    "Alexander",
    "Fiona",
    "Stewart",
    "Faith",
    "Lillian",
    "Jack",
  ]);
  const [matchList, setMatchList] = useState<string[][] | null>(null);
  const shuffleArray = (list: string[]) => {
    // Fisher–Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
  };
  const groupTwoElements = (list: string[]): string[][] => {
    return list.reduce(
      (
        accumulator: string[][],
        currentValue,
        currentIndex,
        array: string[]
      ) => {
        if (currentIndex % 2 === 0) {
          accumulator.push(array.slice(currentIndex, currentIndex + 2));
        }
        return accumulator;
      },
      []
    );
  };
  const splitList = (list: string[]): string[] => {
    const newList: string[] = list
      .flatMap((str) => str.split("&"))
      .map((i) => i.trim());
    return newList;
  };
  const generateMatch = (list: string[]) => {
    let newList = list.slice();
    let isValidFixedDoubleMode = newList[0].includes("&");
    // TODO: figure out a way to allow mixing & team and indiviuals
    for (let i = 1; i < newList.length; ++i) {
      if (isValidFixedDoubleMode !== newList[i].includes("&")) {
        alert(
          "Use & symbol to put two people in a team, all teams should contain two people."
        );
        return;
      }
    }
    shuffleArray(newList);
    newList = splitList(newList);
    const newMatchList = matchList === null ? [] : matchList;
    newMatchList.push(["---"]);
    setMatchList(
      newMatchList.concat(
        groupTwoElements(groupTwoElements(newList).map((i) => i.join(" & ")))
      )
    );
  };

  const buildMatchList = () => {
    if (matchList === null) return;
    return matchList.map((m, i) => {
      if (m.length === 1) {
        return <hr style={{ width: "400px" }} />;
      }
      return (
        <div key={i} className="match">
          <span className="name left">{m[0]}</span>
          <span className="vs"> VS </span>
          <span className="name right">{m[1]}</span>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <textarea
        value={list}
        onChange={(e) =>
          setList(e.target.value.split(",").map((i) => i.trim()))
        }
        style={{ height: "150px", width: "300px", margin: "5px" }}
      />
      <div>
        <button onClick={() => generateMatch(list)}>Generate</button>
        <button onClick={() => setMatchList(null)}>Clear</button>
      </div>
      {buildMatchList()}
    </div>
  );
}

export default App;
