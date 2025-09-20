import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '@/lib/database'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = Number(params.id)
    if (!userId) return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })

    const conn = await getConnection()

    const [users]: any = await conn.execute(
      'SELECT id, name, mobile, email, profile_completed, created_at, updated_at FROM users WHERE id = ? LIMIT 1',
      [userId]
    )

    if (!users || users.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const user = users[0]

    const [profiles]: any = await conn.execute(
      'SELECT age, gender, location, farming_experience, land_size, crop_types, created_at, updated_at FROM user_profiles WHERE user_id = ? LIMIT 1',
      [userId]
    )

    const profile = profiles && profiles[0] ? profiles[0] : null

    return NextResponse.json({ ok: true, user, profile })
  } catch (e: any) {
    console.error('Error fetching user:', e)
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 })
  }
}
