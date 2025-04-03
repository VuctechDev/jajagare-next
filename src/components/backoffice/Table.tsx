// import { getDeliveryDisplayDate } from "@/lib/date";

// interface Props {
//   headerItems: string[];
//   bodyItemKeys: string[];
//   data: any[];
// }

// const Table: React.FC<Props> = ({ headerItems, bodyItemKeys, data }) => {
//   return (
//     <div className="w-full p-4 space-y-1">
//       <div className="flex font-semibold text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
//         {headerItems.map((item) => (
//           <div key={item} className={`w-1/${headerItems.length}`}>
//             {item}
//           </div>
//         ))}
//       </div>
//       {data.map((item) => (
//         <div
//           key={item.id}
//           className="flex items-center text-sm text-gray-800 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md transition"
//         >
//           <div className="w-1/6">{item.name}</div>
//           <div className="w-1/6">{item.phone}</div>
//           <div className="w-1/6">{item.email || "—"}</div>
//           <div className="w-1/6">{item.orderCount}</div>
//           <div className="w-1/6">{item.quantitySum}</div>
//           <div className="w-1/6">
//             {getDeliveryDisplayDate(new Date(item.lastOrder))}
//           </div>
//           <div className="w-1/6 h-[40px] flex items-center">
//             {/* <a
//               href={`viber://chat?number=${
//                 item.phone?.startsWith("+")
//                   ? item.phone
//                   : "+387" + item.phone?.slice(1)
//               }`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Viber />
//             </a> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // <Table
// //   headerItems={[
// //     "Ime",
// //     "Telefon",
// //     "Email",
// //     "Broj narudžbi",
// //     "Ukupno komada",
// //     "Poslednja Narudzba",
// //     "",
// //   ]}
// //   bodyItemKeys={["name", "phone", "email", "orderCount", "quantitySum"]}
// //   data={data.data}
// // />

// export default Table;
