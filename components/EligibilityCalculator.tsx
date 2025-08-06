'use client';

import { useState, useEffect } from 'react';




export default function EligibilityStepOne() {
  const [step, setStep] = useState(1);
const [hasInitializedStep3, setHasInitializedStep3] = useState(false);

 // Inside your component
const [formData, setFormData] = useState<FormData>(getInitialFormData());
const [eligibilityAmount, setEligibilityAmount] = useState<number | null>(null);



function getInitialFormData(): FormData {
  const base: FormData = {
    applicantType: '',
    considerJointIncome: '',
    numberOfApplicants: '',
    nationality: '',
    employmentType: '',
    resident: '',
    email: '',
    phone: '',
    dob1: '',
    dob2: '',
    businessLength1: '',
    moaShare1: '',
    revenue2024_1: '',
    profit2024_1: '',
    profit2023_1: '',
    profit2022_1: '',
    managementPay1: '',
    rentalIncome1: '',
    businessLength2: '',
    moaShare2: '',
    revenue2024_2: '',
    profit2024_2: '',
    profit2023_2: '',
    profit2022_2: '',
    managementPay2: '',
    rentalIncome2: '',
  };

  // Add liability fields for up to 4 applicants
  for (let i = 1; i <= 4; i++) {
    base[`homeLoan${i}`] = '';
    base[`autoLoan${i}`] = '';
    base[`personalLoan${i}`] = '';
    base[`overdraft${i}`] = '';
    base[`creditLimit${i}`] = '';
  }

  return base;
}





  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleFinalSubmit = async () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{7,15}$/;

  if (!emailPattern.test(formData.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!phonePattern.test(formData.phone)) {
    alert("Please enter a valid phone number (digits only).");
    return;
  }

  // Remove empty fields
  const filteredData: Record<string, string> = {};
  for (const key in formData) {
    if (formData[key]) {
      filteredData[key] = formData[key];
    }
  }

  // Human-friendly labels
  const fieldLabels: { [key: string]: string } = {
    applicantType: "Applicant Type",
    considerJointIncome: "Joint Income Considered",
    numberOfApplicants: "Number of Applicants",
    nationality: "Nationality",
    employmentType: "Employment Type",
    resident: "Resident Status",
    dob1: "Date of Birth (Applicant 1)",
    dob2: "Date of Birth (Applicant 2)",
    businessLength1: "Business Length (Applicant 1)",
    businessLength2: "Business Length (Applicant 2)",
    moaShare1: "MOA Share (Applicant 1)",
    moaShare2: "MOA Share (Applicant 2)",
    revenue2024_1: "2024 Revenue (Applicant 1)",
    revenue2024_2: "2024 Revenue (Applicant 2)",
    profit2024_1: "2024 Profit (Applicant 1)",
    profit2024_2: "2024 Profit (Applicant 2)",
    profit2023_1: "2023 Profit (Applicant 1)",
    profit2023_2: "2023 Profit (Applicant 2)",
    profit2022_1: "2022 Profit (Applicant 1)",
    profit2022_2: "2022 Profit (Applicant 2)",
    managementPay1: "Management Pay (Applicant 1)",
    managementPay2: "Management Pay (Applicant 2)",
    rentalIncome1: "Rental Income (Applicant 1)",
    rentalIncome2: "Rental Income (Applicant 2)",
    email: "Email",
    phone: "Phone Number",
  };

  // Format message for Formspree
  let formattedMessage = "--- Mortgage Application Submission ---\n\n";
  for (const key in filteredData) {
    const label = fieldLabels[key] || key;
    formattedMessage += `${label}: ${filteredData[key]}\n`;
  }

  try {
    const response = await fetch("https://formspree.io/f/xovlkkda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: formattedMessage }),
    });

    if (response.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("Failed to submit. Please try again.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("An error occurred. Please try again.");
  }
};




const handleNextStep = () => {
  let requiredFields: string[] = [];
  let invalidFields: string[] = [];
  const fieldLabels: Record<string, string> = {}; // For better alert messages

  if (step === 1) {
    requiredFields = [
      'applicantType',
      'nationality',
      'employmentType',
      'resident',
    ];

    fieldLabels['applicantType'] = 'Applicant Type';
    fieldLabels['nationality'] = 'Nationality';
    fieldLabels['employmentType'] = 'Employment Type';
    fieldLabels['resident'] = 'UAE Resident';

    if (formData.applicantType === 'Joint') {
      requiredFields.push('considerJointIncome');
      fieldLabels['considerJointIncome'] = 'Consider Joint Income';

      if (formData.considerJointIncome === 'Yes') {
        requiredFields.push('numberOfApplicants');
        fieldLabels['numberOfApplicants'] = 'Number of Applicants';
      }
    }
  }

  else if (step === 2) {
    for (let i = 1; i <= applicantCount; i++) {
      const fields = [
        `dob${i}`,
        `businessLength${i}`,
        `moaShare${i}`,
        `revenue2024_${i}`,
        `profit2024_${i}`,
        `profit2023_${i}`,
        `profit2022_${i}`,
        `managementPay${i}`,
        `rentalIncome${i}`
      ];

      requiredFields.push(...fields);

      fields.forEach((field) => {
        fieldLabels[field] = field.replace(/\d+$/, ` (Applicant ${i})`)
          .replace('dob', 'Date of Birth')
          .replace('businessLength', 'Business Length')
          .replace('moaShare', 'MOA Share %')
          .replace('revenue2024_', 'Revenue 2024')
          .replace('profit2024_', 'Profit 2024')
          .replace('profit2023_', 'Profit 2023')
          .replace('profit2022_', 'Profit 2022')
          .replace('managementPay', 'Management Pay')
          .replace('rentalIncome', 'Rental Income');

        const value = parseFloat(formData[field] || '');

        if (
          ['moaShare' + i].includes(field) &&
          (isNaN(value) || value < 0 || value > 100)
        ) {
          invalidFields.push(field);
        } else if (!['dob' + i].includes(field) && (isNaN(value) || value < 0)) {
          invalidFields.push(field);
        }
      });
    }
  }

  else if (step === 4) {
    requiredFields = ['email', 'phone'];
    fieldLabels['email'] = 'Email';
    fieldLabels['phone'] = 'Phone Number';
  }

  const missing = requiredFields.filter((field) => !formData[field as keyof FormData]);

  if (missing.length > 0) {
    const names = missing.map((f) => fieldLabels[f] || f);
    alert(`Please fill in all required fields:\n- ${names.join('\n- ')}`);
    return;
  }

  if (invalidFields.length > 0) {
    const names = invalidFields.map((f) => fieldLabels[f] || f);
    alert(`Please enter valid values for:\n- ${names.join('\n- ')}`);
    return;
  }

  setStep((prev) => prev + 1);
};


const applicantCount =
    formData.applicantType === 'Joint' && formData.considerJointIncome === 'Yes'
      ? parseInt(formData.numberOfApplicants || '2')
      : 1;


useEffect(() => {
  const newData: Partial<FormData> = {};

  for (let i = 1; i <= applicantCount; i++) {
    const fields = [
      `homeLoan${i}`,
      `autoLoan${i}`,
      `personalLoan${i}`,
      `overdraft${i}`,
      `creditLimit${i}`,
    ];

    for (const field of fields) {
      if (formData[field] === undefined) {
        newData[field] = '';
      }
    }
  }



}, [formData]);

useEffect(() => {
  const income = parseInt(formData.income || '0');
  const loanTerm = parseInt(formData.loanTerm || '0');

  if (income > 0 && loanTerm > 0) {
    const baseEligibility = income * 20;
    const adjustedEligibility = baseEligibility * (loanTerm / 25);
    setEligibilityAmount(Math.round(adjustedEligibility));
  } else {
    setEligibilityAmount(null);
  }
}, [formData.income, formData.loanTerm]);


useEffect(() => {
  if (step === 3 && !hasInitializedStep3) {
    const clearedFields: Record<string, string> = {};
    for (let i = 1; i <= 4; i++) {
      clearedFields[`homeLoan${i}`] = '';
      clearedFields[`autoLoan${i}`] = '';
      clearedFields[`personalLoan${i}`] = '';
      clearedFields[`overdraft${i}`] = '';
      clearedFields[`creditLimit${i}`] = '';
    }
    setFormData((prev) => ({ ...prev, ...clearedFields }));
    setHasInitializedStep3(true);
  }
}, [step, hasInitializedStep3]);

useEffect(() => {
  if (step !== 3) {
    setHasInitializedStep3(false);
  }
}, [step]);


  const nationalityOptions = formData.applicantType === 'Single'
    ? ['UAE National', 'Other/Expat']
    : ['UAE National', 'GCC National', 'Other/Expat'];

  const employmentOptions = formData.nationality === 'Other/Expat'
    ? ['Salaried', 'Self-employed']
    : ['Salaried', 'Self-employed', 'Government'];

  const selectClasses =
    'w-full border border-gray-300 rounded-xl px-5 py-3 bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

  const inputClasses =
    'w-full border border-gray-300 rounded-xl px-5 py-3 bg-white text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

 

type FormData = {
  [key: string]: string | undefined;
  applicantType: string;
  considerJointIncome: string;
  numberOfApplicants: string;
  nationality: string;
  employmentType: string;
  resident: string;
  income: string;
  email: string;
  phone: string;
  dob1: string;
  dob2: string;
  businessLength1: string;
  moaShare1: string;
  revenue2024_1: string;
  profit2024_1: string;
  profit2023_1: string;
  profit2022_1: string;
  managementPay1: string;
  rentalIncome1: string;
  businessLength2: string;
  moaShare2: string;
  revenue2024_2: string;
  profit2024_2: string;
  profit2023_2: string;
  profit2022_2: string;
  managementPay2: string;
  rentalIncome2: string;
} & {
  [key: string]: string; // 👈 Allow dynamic keys like homeLoan1, autoLoan2, etc.
};


  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">Eligibility Calculator</h2>

          <div className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-800 mb-2 text-lg">Applicant Type</label>
              <select
                name="applicantType"
                value={formData.applicantType}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Joint">Joint</option>
              </select>
            </div>

            {formData.applicantType === 'Joint' && (
              <>
                <div>
                  <label className="block font-semibold text-gray-800 mb-2 text-lg">Consider income from joint applicant</label>
                  <select
                    name="considerJointIncome"
                    value={formData.considerJointIncome}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {formData.considerJointIncome === 'Yes' && (
                  <div>
                    <label className="block font-semibold text-gray-800 mb-2 text-lg">Applicants number</label>
                    <select
                      name="numberOfApplicants"
                      value={formData.numberOfApplicants}
                      onChange={handleChange}
                      className={selectClasses}
                    >
                      <option value="">Select</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block font-semibold text-gray-800 mb-2 text-lg">Nationality</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="">Select</option>
                {nationalityOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-800 mb-2 text-lg">Salaried / Self-employed?</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="">Select</option>
                {employmentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-800 mb-2 text-lg">Resident of UAE?</label>
              <select
                name="resident"
                value={formData.resident}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <button
              onClick={handleNextStep}
              className="bg-red-600 text-white w-full py-4 mt-8 rounded-xl text-xl hover:bg-red-700 transition font-semibold shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">
        <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Joint Applicant Details</h2>
          <div className="grid grid-cols-2 gap-10">
            {Array.from({ length: applicantCount }, (_, i) => i + 1).map((i) => (
              <div key={i}>
                <h3 className="text-xl font-semibold mb-4">Joint Applicant {i}</h3>
                <div className="space-y-4">
                 <label className="block font-semibold text-gray-800 mb-1">
  Date of Birth
</label>
<input
  type="date"
  name={`dob${i}`}
  value={formData[`dob${i}`] ?? ''}
  onChange={handleChange}
  className={inputClasses}
/>


                  <input
                  type="number"
                  name={`businessLength${i}`}
                  value={formData[`businessLength${i}`] ?? ''}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Length of Business"
                />

                  <input
                  type="number"
                 name={`moaShare${i}`}
                  value={formData[`moaShare${i}`] ?? ''}
                 onChange={handleChange}
                 className={inputClasses}
                placeholder="Profit Share as Per MOA"
                 />

                  <input
  type="number"
  name={`revenue2024_${i}`}
  value={formData[`revenue2024_${i}`] ?? ''}
  onChange={handleChange}
  className={inputClasses}
  placeholder="Revenue 2024"
/>
                  <input
  type="number"
  name={`profit2024_${i}`}
  value={formData[`profit2024_${i}`] ?? ''}
  onChange={handleChange}
  className={inputClasses}
  placeholder="Net Profit 2024"
/>

                  <input
  type="number"
  name={`profit2023_${i}`}
  value={formData[`profit2023_${i}`] ?? ''}
  onChange={handleChange}
  className={inputClasses}
  placeholder="Net Profit 2023"
/>

                 <input
  type="number"
  name={`profit2022_${i}`}
  value={formData[`profit2022_${i}`] ?? ''}
  onChange={handleChange}
  className={inputClasses}
  placeholder="Net Profit 2022"
/>

                  <input
  type="number"
  name={`managementPay${i}`}
  value={formData[`managementPay${i}`] ?? ''}
  onChange={handleChange}
  className={inputClasses}
  placeholder="Annual Management Remuneration"
/>

                  <input
  type="number"
  name={`rentalIncome${i}`}
  value={formData[`rentalIncome${i}`] ?? ''}
  onChange={handleChange}
  className={inputClasses}
  placeholder="Annual Rental Income"
/>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-300 text-black px-6 py-3 rounded-xl text-lg hover:bg-gray-400 transition font-semibold"
            >
              Back
            </button>

            <button
  onClick={handleNextStep}
  className="bg-red-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-red-600 transition font-semibold"
>
  Next
</button>

          </div>
        </div>
      </div>
    );
  }

if (step === 3) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Liability Details</h2>
        <div className="grid grid-cols-2 gap-10">
          {Array.from({ length: applicantCount }, (_, i) => i + 1).map((i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold mb-4">Joint Applicant {i}</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  name={`homeLoan${i}`}
                  value={formData[`homeLoan${i}`] ?? ''}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Home Loan(s) Monthly Installment"
                />
                <input
                  type="number"
                  name={`autoLoan${i}`}
                  value={formData[`autoLoan${i}`] ?? ''}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Auto Loan(s) Monthly Installment"
                />
                <input
                  type="number"
                  name={`personalLoan${i}`}
                  value={formData[`personalLoan${i}`] ?? ''}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Personal Loan(s) Monthly Installment"
                />
                <input
                  type="number"
                  name={`overdraft${i}`}
                  value={formData[`overdraft${i}`] ?? ''}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Overdraft Limit"
                />
                <input
                  type="number"
                  name={`creditLimit${i}`}
                  value={formData[`creditLimit${i}`] ?? ''}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Credit Card Limit(s) Total Limit Of All Active Credit"
                />
              </div>
            </div>
          ))}

          {/* ✅ Total Income Field aligned in grid */}
          <div className="col-span-2">
            <label className="block font-semibold text-gray-800 mb-2 text-lg">
              Total Monthly Income (AED)
            </label>
            <input
              type="number"
              name="income"
              value={formData.income || ''}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. 25,000"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between">
          <button
            onClick={() => setStep(2)}
            className="bg-gray-300 text-black px-6 py-3 rounded-xl text-lg hover:bg-gray-400 transition font-semibold"
          >
            Back
          </button>
          <button
            onClick={() => setStep(4)}
            className="bg-red-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-red-600 transition font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

if (step === 4) {
  const income = parseInt(formData.income || '0');
  const loanTerm = parseInt(formData.loanTerm || '0');
  const baseEligibility = income * 20;
  const adjustedEligibility = baseEligibility * (loanTerm / 25);
  const eligibilityAmount = isNaN(adjustedEligibility) ? 0 : Math.round(adjustedEligibility);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Final Step</h2>
        <p className="text-lg text-gray-700 mb-8">
          Enter your contact details to complete your submission.
        </p>

        <div className="space-y-6">
          {/* Result Message */}
          {eligibilityAmount > 0 && (
            <div className="text-center text-lg font-semibold text-green-700 bg-green-100 p-4 rounded-xl shadow-sm">
              🎉 You're eligible for a mortgage of <br />
              <span className="text-2xl text-green-900 font-bold">
                AED {eligibilityAmount.toLocaleString()} over {formData.loanTerm} years
              </span>
            </div>
          )}

          {/* Dropdown for Loan Term */}
          <select
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Loan Term (Years)</option>
            {Array.from({ length: 16 }, (_, i) => 10 + i).map((year) => (
              <option key={year} value={year}>
                {year} Years
              </option>
            ))}
          </select>

          {/* Email Field */}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            type="email"
            placeholder="Email ID"
          />

          {/* Phone Field */}
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            type="tel"
            placeholder="Mobile Number"
          />

          {/* Submit Button */}
          <button
            onClick={handleFinalSubmit}
            className="bg-red-600 text-white w-full py-4 mt-4 rounded-xl text-xl hover:bg-red-700 transition font-semibold shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

  if (step === 5) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">🎉 Thank You!</h2>
          <p className="text-lg text-gray-700 mb-8">We’ve received your eligibility submission. A Mortgage Market RM will be in touch shortly.</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition font-semibold">Start Over</button>
        </div>
      </div>
    );
  }
}