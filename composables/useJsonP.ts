export const useJsonP = async (path: String) => {
  return await useFetch(() => `http://localhost:8848/${path}`)
}