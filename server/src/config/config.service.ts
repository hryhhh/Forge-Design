import { Injectable } from '@nestjs/common'

@Injectable()
export class ConfigService {
  get(key: string, defaultValue = ''): string {
    return process.env[key] ?? defaultValue
  }

  getNumber(key: string, defaultValue = 0): number {
    const value = process.env[key]
    if (value === undefined) return defaultValue
    return parseInt(value, 10) || defaultValue
  }
}
