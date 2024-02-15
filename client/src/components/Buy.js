import React from "react";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);

    const amount = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    console.log("transaction is done");
  };
  return (
    <div className="mt-5">
      <form
        onSubmit={buyChai}
        className="flex flex-col gap-2 justify-center items-center"
      >
        <label
          htmlFor="name"
          className="dark:text-gray-200 font-semibold text-start w-full max-w-xs"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="input input-bordered input-primary p-2 w-full max-w-xs dark:bg-gray-700 dark:text-white rounded-md"
        />
        <label
          htmlFor="message"
          className="dark:text-gray-200 font-semibold text-start w-full max-w-xs mt-3"
        >
          Message
        </label>
        <textarea
          type="text"
          id="message"
          placeholder="Enter your message"
          className="input input-bordered input-primary w-full p-2 max-w-xs dark:bg-gray-700 dark:text-white rounded-md"
        />
        <button
          type="submit"
          className="btn btn-primary dark:bg-blue-500 dark:hover:bg-blue-700 rounded-md p-2 max-w-xs mt-4"
        >
          Send Ether
        </button>
      </form>
    </div>
  );
};

export default Buy;
