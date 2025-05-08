export async function fetchApi(
  endpoint: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: BodyInit | null;
  } = {},
  token?: string,
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const { method = 'GET', body = null, headers: customHeaders = {} } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    method,
    headers,
  };
  
  if (body !== undefined) {
    config.body = body;
  }
  
  const response = await fetch(`${baseUrl}${endpoint}`, config);
  
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.statusText}`);
  }
  
  return response.json();
}