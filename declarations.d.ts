declare module '*.png' {
  const value: IntrinsicAttributes;
  export default value;
}
declare module '@env' {
  export const SUPABASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
}
