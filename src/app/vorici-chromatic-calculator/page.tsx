import { Metadata } from 'next'
import VoriciChromaticCalculator from '../components/Calculators/VoriciChromaticCalculator'

export const metadata: Metadata = {
  title: 'Vorici Calculator | Optimize Your PoE Chromatic Orb Usage',
  description: 'Use our Vorici Calculator to maximize efficiency in Path of Exile. Compare chromatic orb costs, success rates, and Vorici crafting methods. Optimize your socket coloring strategy with this essential PoE tool.',
}

export default function VoriciCalculatorPage() {
  return <VoriciChromaticCalculator />
}