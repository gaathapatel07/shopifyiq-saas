import type { RetailRow, KPIData } from '../data/types'

export function calculateKPIs(data: RetailRow[]): KPIData {

  const totalRevenue = data.reduce((sum, item) => {

    const quantity = Number(item.Quantity) || 0
    const price = Number(item.UnitPrice) || 0

    return sum + quantity * price

  }, 0)

  const totalOrders = new Set(
    data
      .filter((item) => item.InvoiceNo)
      .map((item) => item.InvoiceNo)
  ).size

  const totalCustomers = new Set(
    data
      .filter((item) => item.CustomerID)
      .map((item) => item.CustomerID)
  ).size

  const conversionRate = 4.8

  console.log(totalRevenue)
  console.log(totalOrders)
  console.log(totalCustomers)

  return {
    totalRevenue,
    totalOrders,
    totalCustomers,
    conversionRate,
  }
}

export function getMonthlyRevenue(data: RetailRow[]) {

  const monthlyMap: Record<string, number> = {}

  data.forEach((item) => {

    const date = new Date(item.InvoiceDate)

    const month = date.toLocaleString('default', {
      month: 'short',
    })

    const revenue =
      Number(item.Quantity) * Number(item.UnitPrice)

    if (!monthlyMap[month]) {
      monthlyMap[month] = 0
    }

    monthlyMap[month] += revenue
  })

  return Object.entries(monthlyMap).map(
    ([month, revenue]) => ({
      month,
      revenue: Number(revenue.toFixed(2)),
    })
  )
}
export function getTopProducts(data: RetailRow[]) {

  const productMap: Record<
    string,
    {
      quantity: number
      revenue: number
    }
  > = {}

  data.forEach((item) => {

    const productName = item.Description

    const revenue =
      Number(item.Quantity) *
      Number(item.UnitPrice)

    if (!productMap[productName]) {

      productMap[productName] = {
        quantity: 0,
        revenue: 0,
      }
    }

    productMap[productName].quantity +=
      Number(item.Quantity)

    productMap[productName].revenue += revenue
  })

  return Object.entries(productMap)

    .map(([name, values]) => ({
      name,
      quantity: values.quantity,
      revenue: Math.floor(values.revenue),
    }))

    .sort((a, b) => b.revenue - a.revenue)

    .slice(0, 5)
}
export function getCountryAnalytics(
  data: RetailRow[]
) {

  const countryMap: Record<
    string,
    {
      revenue: number
      orders: number
    }
  > = {}

  data.forEach((item) => {

    const country = item.Country

    const revenue =
      Number(item.Quantity) *
      Number(item.UnitPrice)

    if (!countryMap[country]) {

      countryMap[country] = {
        revenue: 0,
        orders: 0,
      }
    }

    countryMap[country].revenue += revenue

    countryMap[country].orders += 1
  })

  return Object.entries(countryMap)

    .map(([country, values]) => ({
      country,
      revenue: Math.floor(values.revenue),
      orders: values.orders,
    }))

    .sort((a, b) => b.revenue - a.revenue)

    .slice(0, 5)
}