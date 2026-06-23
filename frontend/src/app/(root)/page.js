'use client'
import { BsCoin } from "react-icons/bs";
import { RiCoinsLine } from "react-icons/ri";
import { IoCardSharp } from "react-icons/io5";
import Link from "next/link";
import HeaderName from "@/components/HeaderName";
import { useMainContext } from "@/context/MainContext";

const HomePage=()=>{
  const {user} = useMainContext()
  const dashboard_data = [
    {
      title:"Amount",
      "Icon":<BsCoin  className="text-3xl text-yellow-600"/>,
      "value": `PKR ${user?.amount ?? 0}`,
      link:'/amount'
    },
     {
      title:"FD Amount",
      "Icon":<RiCoinsLine  className="text-3xl text-red-600"/>,
      "value":` PKR ${5}`,
      link:'/fd-amount'
    },
     {
      title:"ATM Cards",
      "Icon":<IoCardSharp  className="text-3xl text-black-600"/>,
      "value":` ${2}`,
      link:"/atm-cards"
    },

  ]
return <>
<div className="p-10 flex flex-col gap-y-4">
 <HeaderName/>
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3">

{
dashboard_data.map((cur, i) => (
  <DashboardCard data={cur} key={i} />
))}

  </div>
</div>

</>
}

export  default HomePage

const DashboardCard = ({ data }) => {
  const Icon = data.Icon;

  return (
    <Link href={data.link} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5 hover:shadow-lg transition-all">

      <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
        {data.Icon} 
      </div>

      <div className="text-right">
        <p className="text-sm text-slate-500 font-medium">
          {data.title}
        </p>

        <h3 className="text-3xl font-bold text-slate-800 ">
          {data.value}
        </h3>
      </div>

    </Link>
  );
};
