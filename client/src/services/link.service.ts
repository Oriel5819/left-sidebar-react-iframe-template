import axios from "axios";

export default async function showLinkResult(url: string): Promise<any[]> {
  const { data } = await axios.get(`http://localhost:5000/${url}`);
  return data;
}
