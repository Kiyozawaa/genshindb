export function parseDescription(data) {
  const parsed = data
    .replace(/\\n|\n/g, '<br/>') //Newline
    .replace(/\/u([0-9a-zA-Z]{4)}/g, (_, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    }) //Special codes like /u230d
    .replace(/<color=(#[0-9a-fA-F]{6,8})>/g, (match, color) => {
      return `<span style='color:${color}'>`
    }) //Color matching
    .replace(/<\/color>/gi, '</span>')
    .replace(/\{LINK#(S[0-9]{5,}|N[0-9]{8,}|P[0-9]{7,})\}/g, '') //Unfinished
    .replace(/\{\/LINK\}/g, '');
  return parsed;
}

export function talentPromote(data) {
  for (const [i, d] of Object.entries(data)) {
    for (const s of Object.entries(d)) {

    }
  }
}