import { NextRequest, NextResponse } from 'next/server'
import { OPENROUTER } from '@/lib/config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, model } = body

    const res = await fetch(`${OPENROUTER.apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER.apiKey}`,
      },
      body: JSON.stringify({
        model: model || OPENROUTER.defaultModel,
        messages,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text || res.statusText }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
