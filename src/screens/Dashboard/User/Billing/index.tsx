'use client'

import { useUser } from '@clerk/nextjs'
import React from 'react'
import { LoadingSpinner } from '@/components/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/shared/utils/components'
import { useGetTransactionsQuery } from '@/state/api'

export const BillingScreen = () => {
  const [paymentType, setPaymentType] = React.useState('all')
  const { user, isLoaded } = useUser()
  const { data: transactions, isLoading } = useGetTransactionsQuery(user?.id || '', { skip: !user || !isLoaded })

  const filteredData =
    transactions?.filter((transaction) => {
      const matchesTypes = paymentType === 'all' || transaction.paymentProvider === paymentType
      return matchesTypes
    }) || []

  if (!isLoaded) return <LoadingSpinner />
  if (!user) return <div>Please sign in to view your billing information</div>

  return (
    <div className='billing'>
      <div className='billing__container'>
        <h2 className='billing__title'>Payment History</h2>
        <div className='billing__filters'>
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger className='billing__select'>
              <SelectValue placeholder='Payment Type' />
            </SelectTrigger>

            <SelectContent className='billing__select-content'>
              <SelectItem className='billing__select-item' value='all'>
                All Types
              </SelectItem>
              <SelectItem className='billing__select-item' value='stripe'>
                Stripe
              </SelectItem>
              <SelectItem className='billing__select-item' value='paypal'>
                Paypal
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='billing__grid'>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Table className='billing__table'>
              <TableHeader className='billing__table-header'>
                <TableRow className='billing__table-header-row'>
                  <TableHead className='billing__table-cell'>Date</TableHead>
                  <TableHead className='billing__table-cell'>Amount</TableHead>
                  <TableHead className='billing__table-cell'>Payment Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='billing__table-body'>
                {filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <TableRow className='billing__table-row' key={transaction.transactionId}>
                      <TableCell className='billing__table-cell'>{new Date(transaction.dateTime).toLocaleDateString()}</TableCell>
                      <TableCell className='billing__table-cell billing__amount'>{formatPrice(transaction.amount)}</TableCell>
                      <TableCell className='billing__table-cell'>{transaction.paymentProvider}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className='billing__table-row'>
                    <TableCell className='billing__table-cell text-center' colSpan={3}>
                      No transactions to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}
