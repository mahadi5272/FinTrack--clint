// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

// const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4'];

// const ExpenseChart = ({ transactions }) => {
//   // ১. ক্যাটাগরি ভিত্তিক ডাটা প্রসেসিং (Pie Chart)
//   const categoryData = transactions
//     .filter(t => t.type === 'expense')
//     .reduce((acc, curr) => {
//       const existing = acc.find(item => item.name === curr.category);
//       if (existing) existing.value += parseFloat(curr.amount);
//       else acc.push({ name: curr.category, value: parseFloat(curr.amount) });
//       return acc;
//     }, []);

//   // ২. ব্যালেন্স ট্রেন্ড ডাটা প্রসেসিং (Line Chart - Section 13)
//   const trendData = [...transactions].reverse().map(t => ({
//     date: t.date.split('-').slice(1).join('/'), // MM/DD format
//     amount: parseFloat(t.amount),
//     type: t.type
//   }));

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Category Spending (Pie Chart) */}
//       <div className="bg-white p-6 rounded-[32px] border border-slate-100 h-[400px]">
//         <h4 className="text-lg font-bold text-slate-700 mb-4">Spending Breakdown</h4>
//         <ResponsiveContainer width="100%" height="90%">
//           <PieChart>
//             <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
//               {categoryData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend verticalAlign="bottom" height={36}/>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Balance Trend (Line Chart) */}
//       <div className="bg-white p-6 rounded-[32px] border border-slate-100 h-[400px]">
//         <h4 className="text-lg font-bold text-slate-700 mb-4">Transaction Trend</h4>
//         <ResponsiveContainer width="100%" height="90%">
//           <LineChart data={trendData}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="date" tick={{fontSize: 10}} />
//             <YAxis tick={{fontSize: 10}} />
//             <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
//             <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ExpenseChart;