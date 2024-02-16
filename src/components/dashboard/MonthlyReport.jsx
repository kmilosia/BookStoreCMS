import React, { useEffect, useState } from 'react'
import { getMonthlyRaport } from '../../api/cmsAPI'
import GrowthSpan from './GrowthSpan';
import { PieChart } from '@mui/x-charts';

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

    const [bookUnitsData, setBookUnitsData]= useState([])
    const [booksPriceData, setBooksPriceData]= useState([])
    const [booksTitlesData, setBooksTitlesData]= useState([])

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
        console.log(data);
        if(data && previosData){
            setGrowth({...growth,
                 grossExpensesGrowth: calculateGrowth(previosData.grossExpenses, data.grossExpenses),
                 grossRevenueGrowth: calculateGrowth(previosData.grossRevenue, data.grossRevenue),
                 soldQuantityGrowth: calculateGrowth(previosData.soldQuantity, data.soldQuantity),
                 totalIncomeGrowth: calculateGrowth(previosData.totalIncome, data.totalIncome),
            })
        }
        if (data && data.bookItems) {
            const titles = [...data.bookItems.map(item => item.bookTitle + " (" + item.formTitle + ")")]
            const prices = [...data.bookItems.map(item => item.soldPrice)]
            const units = [...data.bookItems.map(item => item.soldUnits)]
            setBooksTitlesData(titles)
            setBooksPriceData(prices)
            setBookUnitsData(units)
        }
        if (data && data.categories) {
            const newdata = [...data.categories.map((item,index) => ({id:index, value:item.percentOfTotalAppearances, label:item.categoryName}))]
            setCategoriesData(newdata)
        }
    },[data, previosData])
    useEffect(() => {
        console.log(bookUnitsData);
    },[bookUnitsData])
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
            const value = (newMonth - prevMonth) / prevMonth * 100
            return value.toFixed(2)
        }
    }
   
  return (
    (data && previosData) &&
    <div className='flex flex-col'>
    <h3 className='home-element-header'>Raport miesięczny</h3>
    <div className='flex items-center my-1'>
        <select name="month" onChange={handleMonthChange} value={month} className='dark:border-dracula-600 w-[200px] mr-2 border-2 text-black dark:text-white rounded-md dark:bg-dracula-700 p-2'>
            <option value={1}>Styczeń</option>
            <option value={2}>Luty</option>
            <option value={3}>Marzec</option>
            <option value={4}>Kwiecień</option>
            <option value={5}>Maj</option>
            <option value={6}>Czerwiec</option>
            <option value={7}>Lipiec</option>
            <option value={8}>Sierpień</option>
            <option value={9}>Wrzesień</option>
            <option value={10}>Październik</option>
            <option value={11}>Listopad</option>
            <option value={12}>Grudzień</option>              
        </select>
        <select name="year" onChange={handleYearChange} value={year} className='dark:border-dracula-600 w-[200px] mr-2 border-2 text-black dark:text-white rounded-md dark:bg-dracula-700 p-2'>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
        </select>
    </div>
    <div className='grid grid-cols-4 gap-3 my-2'>
            <div className='growth-div'>
                <h4 className='growth-title'>Wydatki brutto</h4>
                <div className='flex items-end'>
                    <p className='growth-total'>{data.grossExpenses} PLN</p>
                    <GrowthSpan growth={growth.grossExpensesGrowth} />
                </div>
            </div>
            <div className='growth-div'>
                <h4 className='growth-title'>Przychód brutto</h4>
                <div className='flex items-end'>
                    <p className='growth-total'>{data.grossRevenue} PLN</p>
                    <GrowthSpan growth={growth.grossRevenueGrowth} />
                </div>
            </div>
            <div className='growth-div'>
                <h4 className='growth-title'>Przychód całkowity</h4>
                <div className='flex items-end'>
                    <p className='growth-total'>{data.totalIncome} PLN</p>
                    <GrowthSpan growth={growth.totalIncomeGrowth} />
                </div>
            </div>
            <div className='growth-div'>
                <h4 className='growth-title'>Sprzedana ilość</h4>
                <div className='flex items-end'>
                    <p className='growth-total'>{data.soldQuantity}</p>
                    <GrowthSpan growth={growth.soldQuantityGrowth} />
                </div>
            </div>         
    </div>
    {categoriesData.length > 0 &&
    <PieChart
    slotProps={{legend: {labelStyle: {fill: '#aaa'}}}}
    series={[{data: categoriesData, innerRadius: 30, outerRadius: 100, paddingAngle: 5, cornerRadius: 5, cx: 150, cy:150}]}
    width={500}
    height={300}
    />
    }
    </div>
  )
}

export default MonthlyReport
