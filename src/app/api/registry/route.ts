import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const registryPath = path.join(process.cwd(), 'public/registry/registry.json')
    
    // Check if registry exists
    if (!fs.existsSync(registryPath)) {
      return NextResponse.json(
        { error: 'Registry not found. Please run "npm run build:registry" first.' },
        { status: 404 }
      )
    }
    
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
    
    return NextResponse.json(registry, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error loading registry:', error)
    return NextResponse.json(
      { error: 'Failed to load registry' },
      { status: 500 }
    )
  }
}
