'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { ScoreResult } from '@/lib/survey'
import { useLanguage } from '@/lib/i18n'

interface Props {
  scores: ScoreResult[]
  compareScores?: ScoreResult[]
  compareLabel?: string
}

const DIMENSION_COLORS: Record<string, string> = {
  IDENTITY: '#FFD21F',
  COMMUNITY: '#ef4444',
  SOCIALITY: '#14b8a6',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTick(props: any, scores: ScoreResult[]) {
  const { x, y, cx, cy, payload } = props as {
    x: number; y: number; cx: number; cy: number; payload: { value: string }
  }

  if (!payload?.value) return null

  const score = scores.find((s) => s.valueName === payload.value)
  const color = score ? DIMENSION_COLORS[score.dimension] : '#6b7280'

  const dx = x - cx
  const dy = y - cy
  const PADDING = 14
  const nx = x + (dx === 0 ? 0 : dx > 0 ? PADDING : -PADDING)
  const ny = y + (dy === 0 ? 0 : dy > 0 ? PADDING : -PADDING)
  const anchor = dx > 2 ? 'start' : dx < -2 ? 'end' : 'middle'

  const parts = payload.value.split(' & ')

  return (
    <g>
      <text x={nx} y={ny} textAnchor={anchor} fill={color} fontSize={11} fontWeight={700}>
        <tspan x={nx} dy="0">{parts[0]}</tspan>
        {parts[1] && <tspan x={nx} dy="14">{`& ${parts[1]}`}</tspan>}
      </text>
    </g>
  )
}

export default function WerteRadarChart({ scores, compareScores, compareLabel }: Props) {
  const { lang, t } = useLanguage()
  const resolvedCompareLabel = compareLabel ?? t.ergebnis.peerCompareLabel[lang]
  const compareByKey = new Map((compareScores ?? []).map((s) => [s.valueKey, s]))

  const data = scores.map((s) => {
    const compare = compareByKey.get(s.valueKey)
    return {
      subject: s.valueName,
      value: s.score,
      compareValue: compare && compare.answeredCount > 0 ? compare.score : undefined,
      fullMark: 5,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={data} margin={{ top: 30, right: 40, bottom: 30, left: 40 }}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="subject"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tick={(props: any) => CustomTick(props, scores)}
        />
        <Radar
          name={lang === 'de' ? 'Du' : 'You'}
          dataKey="value"
          stroke="#FFD21F"
          fill="#FFD21F"
          fillOpacity={0.35}
          dot={{ r: 4, fill: '#e6bc00', strokeWidth: 0 }}
        />
        {compareScores && (
          <Radar
            name={resolvedCompareLabel}
            dataKey="compareValue"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.2}
            dot={{ r: 4, fill: '#4f46e5', strokeWidth: 0 }}
          />
        )}
        <Tooltip
          formatter={(value, name) => [typeof value === 'number' ? `${value.toFixed(1)} / 5` : value, name]}
          contentStyle={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
