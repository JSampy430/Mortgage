'use client';

import { useState } from 'react';

interface AmortizationRow {
  year: number;
  openingBalance: number;
  emi: number;
  interestPaid: number;
  principalPaid: number;
  closingBalance: number;
}

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [amortizationTable, setAmortizationTable] = useState<AmortizationRow[]>([]);

  const calculateMortgage = () => {
    const price = parseFloat(propertyPrice);
    const down = parseFloat(downPayment);
    const interest = parseFloat(interestRate) / 100 / 12;
    const term = parseInt(loanTerm) * 12;

    if (isNaN(price) || isNaN(down) || isNaN(interest) || isNaN(term)) {
      alert('Please enter valid numbers in all fields.');
      return;
    }

    const loanAmount = price - down;

    if (loanAmount <= 0) {
      alert('Down payment must be less than the property price.');
      return;
    }

    let monthly = 0;
    if (interest === 0) {
      monthly = loanAmount / term;
    } else {
      const numerator = loanAmount * interest * Math.pow(1 + interest, term);
      const denominator = Math.pow(1 + interest, term) - 1;
      monthly = numerator / denominator;
    }

    setMonthlyPayment(monthly);
    generateAmortizationTable(loanAmount, monthly, interest, term);
  };

  const generateAmortizationTable = (
    loanAmount: number,
    emi: number,
    monthlyRate: number,
    totalMonths: number
  ) => {
    let balance = loanAmount;
    const table: AmortizationRow[] = [];

    for (let year = 1; year <= totalMonths / 12; year++) {
      let interestPaid = 0;
      let principalPaid = 0;
      const openingBalance = balance;

      for (let month = 1; month <= 12; month++) {
        const interestPart = balance * monthlyRate;
        const principalPart = emi - interestPart;
        interestPaid += interestPart;
        principalPaid += principalPart;
        balance -= principalPart;
      }

      table.push({
        year,
        openingBalance,
        emi: emi * 12,
        interestPaid,
        principalPaid,
        closingBalance: balance,
      });
    }

    setAmortizationTable(table);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-start px-4 py-12 text-black">
      <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center">Mortgage Calculator</h2>

        <div className="space-y-4">
          <input
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            placeholder="Property Price (AED)"
          />

          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            placeholder="Down Payment (AED)"
          />

          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            placeholder="Interest Rate % (e.g. 3.5)"
          />

          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            placeholder="Loan Term (years)"
          />
        </div>

        <button
          onClick={calculateMortgage}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Calculate Monthly Payment
        </button>

        {monthlyPayment !== null && (
          <div className="text-center mt-4">
            <p className="text-xl font-semibold text-gray-800">
              Monthly Payment: AED {monthlyPayment.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {amortizationTable.length > 0 && (
        <div className="max-w-4xl w-full mt-10 bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">Amortization Table</h3>
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-3 py-2">Year</th>
                <th className="px-3 py-2">Opening Balance</th>
                <th className="px-3 py-2">Annual Payment</th>
                <th className="px-3 py-2">Principal Paid</th>
                <th className="px-3 py-2">Interest Paid</th>
                <th className="px-3 py-2">Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationTable.map((row) => (
                <tr key={row.year} className="border-t">
                  <td className="px-3 py-2">{row.year}</td>
                  <td className="px-3 py-2">AED {row.openingBalance.toFixed(2)}</td>
                  <td className="px-3 py-2">AED {row.emi.toFixed(2)}</td>
                  <td className="px-3 py-2">AED {row.principalPaid.toFixed(2)}</td>
                  <td className="px-3 py-2">AED {row.interestPaid.toFixed(2)}</td>
                  <td className="px-3 py-2">AED {row.closingBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
