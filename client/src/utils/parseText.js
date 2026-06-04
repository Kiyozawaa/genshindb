export function parseDescription(data) {
  const parsed = data
    .replace(/\\n|\n/g, '<br/>') //Newline
    .replace(/\/u([0-9a-zA-Z]{4)}/g, (_, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    }) //Special codes like /u230d
    .replace(/<color=(#[0-9a-fA-F]{6,8})>/g, (_, color) => {
      return `<span style='color:${color}'>`
    }) //Color matching
    .replace(/<\/color>/gi, '</span>')
    .replace(/\{LINK#(S[0-9]{5,}|N[0-9]{8,}|P[0-9]{7,})\}/g, '') //Unfinished
    .replace(/\{\/LINK\}/g, '')
    //Some characters like Lisa use the layout below in their kit
    .replace(/\{LAYOUT_MOBILE#Tap\}\{LAYOUT_PC#Press\}\{LAYOUT_PS#Press\}/g, 'Press')
    .replace(/#\{LAYOUT_MOBILE#Tapping\}\{LAYOUT_PC#Press\}\{LAYOUT_PS#Press\}/g, 'Press')
    .replace(/^#/, '')
    .replace(/{NICKNAME}/g, 'Traveler'); //Defualt Player Name
  return parsed;
}

export function parseTalent(promote) {
  if (!promote) return {};
  let merge = {};
  const regex = /(?<hitname>^[^|]+)\|\{param(?<p1>[0-9]{1,2}):(?<f1>[a-zA-Z0-9]{1,3})\}(?<suf1>[\w\s]+)?((?<sep>\+|\/)\{param(?<p2>[0-9]{1,2}):(?<f2>[a-zA-Z0-9]{1,3})\}(?<suf2>[\w\s]+)?)?/;
  for (const desc of promote.desc) {
    if (!desc) continue;
    const match = desc.match(regex)
    if (match) {
      const { hitname, p1, f1, suf1, sep, p2, f2, suf2 } = match.groups;
      const parsedhitname = parseDescription(hitname);
      const v1 = promote.params[p1-1];
      const v2 = p2 ? promote.params[p2-1] : null;
      const hit1 = formatParam(v1, f1);
      const hit2 = v2 ? formatParam(v2, f2) : '';
      const suffix = suf2 || suf1 || '';
      const result =  hit1 + (sep || '') + hit2 + suffix;
      merge[parsedhitname] = result;
    }
  }
  return merge;
}


function formatParam(value, format) {
  if (!value) return;
  switch (format) {
    case 'F1P':
      return `${(value * 100).toFixed(1)}%`;
    case 'F1':
      return `${value.toFixed(1)}`;
    case 'F2P':
      return `${(value * 100).toFixed(2)}%`
    case 'P':
      return `${(value * 100).toFixed(0)}%`;
    case 'I':
      return Math.round(value).toString();
    default:
      return value.toString();
  }
}