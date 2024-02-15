import React, { useEffect, useState } from "react";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);
  return (
    <div className="mt-5">
      <p className="text-lg font-bold dark:text-gray-200">Messages</p>
      {memos.map((memo, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
          <p className="font-semibold dark:text-white">Name: {memo.name}</p>
          <p className="dark:text-gray-400">Message: {memo.message}</p>
          <p className="dark:text-gray-400">
            Timestamp: {String(memo.timestamp)}
          </p>
          <p className="dark:text-gray-400">From: {memo.from}</p>
        </div>
      ))}
    </div>
  );
};

export default Memos;
