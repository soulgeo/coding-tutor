const API_URL = "/api/v2/execute";

export const executePythonCode = async (code: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      language: "python",
      version: "3.12.0",
      files: [{ content: code }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Execution failed: ${response.statusText}`);
  }

  const data = await response.json();
  const out = { stdout: data.run.stdout, stderr: data.run.stderr }
  return out;
};
