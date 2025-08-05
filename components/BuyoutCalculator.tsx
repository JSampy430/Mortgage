'use client';

import { useState, useEffect } from 'react';

export default function BuyoutCalculator() {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [tenorMonths, setTenorMonths] = useState(144);
  const [tenorYears, setTenorYears] = useState(12);
  const [result, setResult] = useState<number | null>(null);

  // Keep tenorYears and tenorMonths in sync
  useEffect(() => {
    setTenorYears(Math.floor(tenorMonths / 12));
  }, [tenorMonths]);

  useEffect(() => {
    setTenorMonths(tenorYears * 12);
  }, [tenorYears]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = tenorMonths;
    const fee = 0.01; // ✅ Fixed 1% settlement fee

    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const penalty = P * fee;
    const buyout = P + penalty;

    setResult(buyout);
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <span className="text-2xl">🏦</span> Buyout Calculator
      </h2>

      <form onSubmit={handleCalculate} className="space-y-6">

        <div>
          <label className="block font-medium text-gray-700 mb-1">Current Loan Outstanding</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Current Mortgage Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Remaining Tenor (months)</label>
            <input
              type="number"
              value={tenorMonths}
              onChange={(e) => setTenorMonths(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Remaining Tenor (years)</label>
            <input
              type="number"
              value={tenorYears}
              onChange={(e) => setTenorYears(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-bold rounded-md transition"
        >
          Compare Mortgage
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 text-xl font-medium text-gray-800">
          Estimated Buyout Amount (incl. 1% fee): <br />
          <span className="text-red-600 font-bold">AED {result.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      )}
    </div>
  );
}
