export default function idGenerator() {
  return Math.random().toString(32).slice(2);
}
