export function isRequired(value: unknown, message = '该字段为必填') {
  const ok = !(value === undefined || value === null || String(value).trim() === '')
  return ok ? true : message
}

export function isEmail(value: string, message = '邮箱格式不正确') {
  const ok = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value)
  return ok ? true : message
}

export function isPhone(value: string, message = '手机号格式不正确') {
  const ok = /^(1[3-9])\d{9}$/.test(value)
  return ok ? true : message
}
