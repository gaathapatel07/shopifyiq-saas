import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import type { RetailRow } from '../data/types'

export default function useRetailData() {
  const [data, setData] = useState<RetailRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Papa.parse('/online_retail.csv', {
      download: true,
      header: true,
      complete: (results: Papa.ParseResult<any>) => {
        const cleaned: RetailRow[] = (results.data as any[])
          .slice(0, 5000)
          .filter(item => item.InvoiceNo && item.Description && item.Quantity && item.UnitPrice)
          .map(item => ({
            InvoiceNo: item.InvoiceNo,
            StockCode: item.StockCode,
            Description: item.Description,
            Quantity: Number(item.Quantity),
            InvoiceDate: item.InvoiceDate,
            UnitPrice: Number(item.UnitPrice),
            CustomerID: Number(item.CustomerID || 0),
            Country: item.Country,
          }))
        setData(cleaned)
        setLoading(false)
      },
      error: () => setLoading(false),
    })
  }, [])

  return { data, setData, loading }
}
