export function getInitialLetter(fullName: string): string {
  const parts = fullName.trim().split(" ");
  
  if (parts.length === 0) return "";
  
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts[parts.length - 1] : "";
  
  const initials =
    (firstName[0] ?? "").toUpperCase() +
    (lastName[0] ?? "").toUpperCase();

  return initials;
}
