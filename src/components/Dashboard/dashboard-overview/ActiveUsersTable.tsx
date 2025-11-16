import { CircleCheck } from "lucide-react";

export default function ActiveUsersTable() {
  const rows = [
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: false,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: true,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: false,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: false,
    },
    {
      sl: "0001",
      name: "Tanvir",
      email: "almostan.xyz@gmail.com",
      student: true,
      teacher: true,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <h3 className="text-[16px] text-gray-800 mb-3">Active users</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#a39d8d] text-white">
            <th className="py-3 px-4 text-left rounded-tl-lg">Sl. No.</th>
            <th className="py-3 px-4 text-left">User Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Student</th>
            <th className="py-3 px-4 text-left rounded-tr-lg">Teacher</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="bg-white border-b border-gray-300">
              <td className="py-3 px-4">{row.sl}</td>
              <td className="py-3 px-4">{row.name}</td>
              <td className="py-3 px-4">{row.email}</td>
              <td className="py-3 px-4">
                {row.student ? (
                  <CircleCheck />
                ) : (
                  <CircleCheck className="opacity-50" />
                )}
              </td>
              <td className="py-3 px-4">
                {row.teacher ? (
                  <CircleCheck />
                ) : (
                  <CircleCheck className="opacity-50" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
