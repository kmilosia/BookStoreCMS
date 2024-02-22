import React, { useEffect, useState } from 'react'
import { getMonthlyRaport } from '../../api/cmsAPI'
import { PieChart } from '@mui/x-charts';
import GrowthContainer from './GrowthContainer';

function MonthlyReport() {
    const currentdate = new Date()
    const currentmonth = currentdate.getMonth() + 1
    const currentyear = currentdate.getFullYear()
    const [data, setData] = useState(null)
    const [previosData, setPreviousData] = useState(null)
    const [growth, setGrowth] = useState({
        grossExpensesGrowth: 0,
        grossRevenueGrowth: 0,
        soldQuantityGrowth: 0,
        totalIncomeGrowth: 0,
    })
    const [categoriesData, setCategoriesData] = useState([])
    const [booksData, setBooksData] = useState([])
    const [month, setMonth] = useState(Number(currentmonth))
    const [year, setYear] = useState(Number(currentyear))
    useEffect(() => {
        getMonthlyRaport(month, year, setData)
        if(month === 1){
            getMonthlyRaport(12, year - 1, setPreviousData)
        }else{
            getMonthlyRaport(month - 1, year, setPreviousData)
        }
    },[month,year])
    useEffect(() => {
        if(data && previosData){
            setGrowth({...growth,
                 grossExpensesGrowth: calculateGrowth(previosData.grossExpenses, data.grossExpenses),
                 grossRevenueGrowth: calculateGrowth(previosData.grossRevenue, data.grossRevenue),
                 soldQuantityGrowth: calculateGrowth(previosData.soldQuantity, data.soldQuantity),
                 totalIncomeGrowth: calculateGrowth(previosData.totalIncome, data.totalIncome),
            })
        }
        if (data && data.bookItems) {
            const newdata = [...data.bookItems.slice(0,7).map((item,index) => ({id:index, value: item.percentOfTotalSoldPrice, label:item.bookTitle + " (" + item.formTitle + ")"}))]
            setBooksData(newdata)
        }
        if (data && data.categories) {
            const newdata = [...data.categories.slice(0,7).map((item,index) => ({id:index, value:item.percentOfTotalAppearances, label:item.categoryName}))]
            setCategoriesData(newdata)
        }
    },[data, previosData])
    const handleMonthChange = (e) => {
        setMonth(e.target.value)
    }
    const handleYearChange = (e) => {
        setYear(e.target.value)
    }
    const calculateGrowth = (prevMonth, newMonth) => {
        if (prevMonth === 0) {
            if (newMonth === 0) {
                return 0
            } else {
                return 0
            }
        } else {
            const value = (newMonth - prevMonth) / (Math.abs(prevMonth)) * 100
            return value.toFixed(2)
        }
    }  
    const monthOptions = [
        {value: 1, label: 'Styczeń'},
        {value: 2, label: 'Luty'},
        {value: 3, label: 'Marzec'},
        {value: 4, label: 'Kwiecień'},
        {value: 5, label: 'Maj'},
        {value: 6, label: 'Czerwiec'},
        {value: 7, label: 'Lipiec'},
        {value: 8, label: 'Sierpień'},
        {value: 9, label: 'Wrzesień'},
        {value: 10, label: 'Październik'},
        {value: 11, label: 'Listopad'},
        {value:12, label: 'Grudzień'},
    ]
   
  return (
    (data && previosData) &&
    <div className='flex flex-col'>
    <h3 className='home-element-header'>Raport miesięczny</h3>
    <div className='flex items-center my-1'>
        <select name="month" onChange={handleMonthChange} value={month} className='cms-select'>
        {monthOptions.map((item, index) => {
            const isDisabled = (year === currentyear && item.value > currentmonth);
            return (
                <option key={index} value={item.value} disabled={isDisabled}>{item.label}</option>
            )
        })}
        </select>
        <select name="year" onChange={handleYearChange} value={year} className='cms-select'>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
        </select>
    </div>
    <div className='grid grid-cols-4 gap-3 my-2'>
        <GrowthContainer currency={true} title="Wydatki brutto" value={data.grossExpenses} growth={growth.grossExpensesGrowth} />
        <GrowthContainer currency={true} title="Przychód brutto" value={data.grossRevenue} growth={growth.grossRevenueGrowth} />
        <GrowthContainer currency={true} title="Przychód całkowity" value={data.totalIncome} growth={growth.totalIncomeGrowth} />
        <GrowthContainer currency={false} title="Sprzedana ilość" value={data.soldQuantity} growth={growth.soldQuantityGrowth} />         
    </div>
    <div className='grid grid-cols-1 gap-3 my-2'>
    {categoriesData.length > 0 &&
    <div className='chart-container'>
        <h4 className='chart-title'>Procent sprzedanych kategorii książek na dany miesiąc</h4>    
        <PieChart
        slotProps={{legend: {markGap: 10,direction: 'column', position: {vertical: 'middle', horizontal: 'left'}, labelStyle: {fill: '#aaa'}}}}
        series={[{data: categoriesData, innerRadius: 30, outerRadius: 100, paddingAngle: 5, cornerRadius: 5, cx: '50%', cy:'50%'}]}
        height={300}
        />
    </div>
    }
    {booksData.length > 0 &&
    <div className='chart-container'>
        <h4 className='chart-title'>Procent sprzedanych tytułów książek na dany miesiąc</h4>    
        <PieChart
        slotProps={{legend: {markGap: 10, itemGap: 10,direction: 'column', position: {vertical: 'middle', horizontal: 'left'}, labelStyle: {fill: '#aaa'}}}}
        series={[{data: booksData, innerRadius: 30, outerRadius: 100, paddingAngle: 5, cornerRadius: 5, cx: '80%', cy:'50%'}]}
        height={300}
        />
    </div>
    }
    </div>
    </div>
  )
}

export default MonthlyReport
