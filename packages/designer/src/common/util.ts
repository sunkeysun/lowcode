/**
 * 通用工具包
 */
import { nanoid } from 'nanoid';

export function uniqId() {
  return nanoid()
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase()  + str.slice(1).toLocaleLowerCase()
}
