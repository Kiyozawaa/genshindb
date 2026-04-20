export function parseDescription(data) {
  const parsed = data
    .replace(/\\n|\n/g, '<br/>')
    .replace(/u[0-9]{3}[a-z]/g, '')
    .replace(/<color=(#[0-9a-fA-F]{6,8})>/g, ` <span style='color:yellow'>`)
    .replace(/<\/color>/gi, '</span>');
  return parsed;
}