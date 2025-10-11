import React, { useState } from "react";

export default function RoomBill({ user, expenses, billType = "Room" }) {
  const [gstMode, setGstMode] = useState(false);
  const [showGstModal, setShowGstModal] = useState(false);
  const [gstDetails, setGstDetails] = useState({
    gstin: "",
    address: "",
    taxRate: 5,
    serviceCharge: 3,
  });
  const [gstFormSaved, setGstFormSaved] = useState(false);

  // Calculate totals
  console.log(expenses)
  const subtotal = expenses.reduce((sum, e) => sum + e.amount, 0);
  const gst = gstMode ? subtotal * (gstDetails.taxRate / 100) : 0;
  const serviceCharge = gstMode ? subtotal * (gstDetails.serviceCharge / 100) : 0;
  const grandTotal = subtotal + gst + serviceCharge;
  const today = new Date();
  const billNo = Math.floor(100000 + Math.random() * 900000);

  // Modal for GST details
  const handleGstChange = (e) => {
    const { name, value } = e.target;
    setGstDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle GST Mode activation
  const handleGstModeClick = () => {
    if (!gstFormSaved) {
      setShowGstModal(true);
    } else {
      setGstMode(true);
    }
  };

  // Handle GST Modal Save
  const handleGstModalSave = () => {
    setShowGstModal(false);
    setGstMode(true);
    setGstFormSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border-2 border-gray-300 dark:border-gray-700 relative overflow-hidden my-8 px-2 sm:px-6">
      {/* Paper cut effect */}
      <div className="absolute top-0 left-0 w-full h-6 bg-black dark:bg-gray-800 flex justify-between z-10">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="w-2 h-6 bg-white dark:bg-gray-900 rounded-b-full" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-black dark:bg-gray-800 flex justify-between z-10">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="w-2 h-6 bg-white dark:bg-gray-900 rounded-t-full" />
        ))}
      </div>
      {/* GST Modal */}
      {showGstModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md mx-2">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">GST Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">GSTIN</label>
                <input type="text" name="gstin" value={gstDetails.gstin} onChange={handleGstChange} className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input type="text" name="address" value={gstDetails.address} onChange={handleGstChange} className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">GST Rate (%)</label>
                <input type="number" name="taxRate" value={gstDetails.taxRate} onChange={handleGstChange} className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:text-white" min="0" max="100" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Service Charge (%)</label>
                <input type="number" name="serviceCharge" value={gstDetails.serviceCharge} onChange={handleGstChange} className="w-full px-3 py-2 border rounded dark:bg-gray-900 dark:text-white" min="0" max="100" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white" onClick={() => setShowGstModal(false)}>Cancel</button>
                <button type="button" className="px-4 py-2 bg-pink-600 dark:bg-pink-400 rounded text-white dark:text-black font-bold" onClick={handleGstModalSave}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-12 pt-20 pb-20 flex flex-col items-center relative z-20">
        {/* Bill Branding */}
        <div className="w-full text-center mb-4">
          <h1 className="text-5xl font-extrabold text-pink-600 dark:text-pink-400 tracking-wide mb-1">{billType.toUpperCase()} EXPENSE BILL</h1>
          <p className="text-base text-gray-700 dark:text-gray-300">{gstMode && gstDetails.address ? gstDetails.address : "123 Main Street, India"}</p>
          {gstMode && gstDetails.gstin && (
            <p className="text-base text-gray-700 dark:text-gray-300">GSTIN: {gstDetails.gstin}</p>
          )}
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between mb-2 gap-2">
          <span className="text-lg text-gray-700 dark:text-gray-300">Bill No: <span className="font-semibold">{billNo}</span></span>
          <span className="text-lg text-gray-700 dark:text-gray-300">Date: <span className="font-semibold">{today.toLocaleDateString()}</span></span>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between mb-6 gap-2">
          <span className="text-lg text-gray-700 dark:text-gray-300">User: <span className="font-semibold">{user.name}</span></span>
          <span className="text-lg text-gray-700 dark:text-gray-300">Room: <span className="font-semibold">{user.roomName || 'N/A'}</span></span>
        </div>
        <div className="w-full flex justify-end mb-4">
          <div className="relative inline-block mr-2">
            <button
              className={`px-4 py-2 rounded font-bold text-white dark:text-black flex items-center gap-2 ${gstMode ? "bg-gray-400 dark:bg-gray-700" : "bg-pink-600 dark:bg-pink-400"}`}
              onClick={handleGstModeClick}
              disabled={gstMode}
            >
              GST Mode
            </button>
            {gstFormSaved && (
              <span
                className="absolute top-1 right-1 cursor-pointer bg-white dark:bg-gray-900 rounded-full p-1 border border-gray-300 dark:border-gray-700 shadow"
                title="Edit GST Details"
                onClick={e => { e.stopPropagation(); setShowGstModal(true); }}
                style={{ zIndex: 2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.536-6.536a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L5.232 11.232a2 2 0 112.828-2.828L13 13z" /></svg>
              </span>
            )}
          </div>
          <button
            className={`px-4 py-2 rounded font-bold text-white dark:text-black ${!gstMode ? "bg-gray-400 dark:bg-gray-700" : "bg-pink-600 dark:bg-pink-400"}`}
            onClick={() => setGstMode(false)}
            disabled={!gstMode}
          >
            Normal Mode
          </button>
        </div>
        <table className="w-full mb-6 text-left text-lg overflow-x-auto">
          <thead>
            <tr className="border-b border-gray-400 dark:border-gray-700">
              <th className="py-3 text-gray-800 dark:text-gray-100">Expense Item</th>
              <th className="py-3 text-gray-800 dark:text-gray-100">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-2 text-gray-700 dark:text-gray-300">{e.description}</td>
                <td className="py-2 text-gray-700 dark:text-gray-300">₹{e.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center border-t-2 border-gray-500 dark:border-gray-600 pt-4 mt-2 gap-2">
          <span className="font-bold text-xl text-black dark:text-white">Subtotal</span>
          <span className="font-bold text-xl text-black dark:text-white">₹{subtotal.toFixed(2)}</span>
        </div>
        {gstMode && (
          <>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-2 gap-2">
              <span className="text-lg text-gray-700 dark:text-gray-300">GST ({gstDetails.taxRate}%)</span>
              <span className="text-lg text-gray-700 dark:text-gray-300">₹{gst.toFixed(2)}</span>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-2 gap-2">
              <span className="text-lg text-gray-700 dark:text-gray-300">Service Charge ({gstDetails.serviceCharge}%)</span>
              <span className="text-lg text-gray-700 dark:text-gray-300">₹{serviceCharge.toFixed(2)}</span>
            </div>
          </>
        )}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center border-t-2 border-gray-500 dark:border-gray-600 pt-4 mt-2 gap-2">
          <span className="font-bold text-2xl text-black dark:text-white">Grand Total</span>
          <span className="font-bold text-2xl text-black dark:text-white">₹{grandTotal.toFixed(2)}</span>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-6 gap-2">
          <span className="text-lg text-gray-700 dark:text-gray-300">Payment Mode:</span>
          <span className="text-lg font-semibold text-green-600 dark:text-green-400">Cash</span>
        </div>
        <div className="w-full text-center mt-8">
          <span className="text-xl font-bold text-pink-600 dark:text-pink-400">Thank you!</span>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2">For feedback or queries, contact us at support@expense-bill.com</p>
        </div>
      </div>
    </div>
  );
}
