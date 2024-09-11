import { Metadata } from 'next'
import BoardFootCalculator from '../components/Calculators/BoardFootCalculator'

export const metadata: Metadata = {
  title: 'Board Foot Calculator | House of Calculators',
  description: 'Calculate lumber volume and cost with our free Board Foot Calculator. Easily determine board feet for any wood project or purchase.',
}

export default function BoardFootCalculatorPage() {
  return <BoardFootCalculator />
}