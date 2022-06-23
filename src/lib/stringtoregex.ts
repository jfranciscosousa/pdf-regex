export default function stringtoregex(string: string) {
  const matches = string.match(/(\/?)(.+)\1([a-z]*)/i);

  return new RegExp(matches[2], matches[3]);
}
