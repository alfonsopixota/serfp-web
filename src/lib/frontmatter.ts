export function escapeFrontmatter(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function buildFrontmatter(fields: Record<string, string>): string {
  const lines = ["---"];
  for (const [key, value] of Object.entries(fields)) {
    lines.push(`${key}: "${escapeFrontmatter(value ?? "")}"`);
  }
  lines.push("---\n");
  return lines.join("\n");
}
