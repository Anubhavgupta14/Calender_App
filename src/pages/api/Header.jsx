const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export default function Headers(method, body) {
  const token = getCookie('token');

  console.log(token)

  this.method = method;
  this.headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  // Add Authorization header if token exists
  if (token) {
    this.headers["Authorization"] = `Bearer ${token}`;
  }

  // Add body if provided
  if (body) {
    this.body = JSON.stringify(body);
  }
}
