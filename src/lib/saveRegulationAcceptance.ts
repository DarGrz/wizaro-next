// Funkcja zapisująca informację o zatwierdzeniu regulaminu przez użytkownika
// Parametr version to wersja regulaminu, którą użytkownik zatwierdził
// Informacja jest zapisywana w localStorage oraz w bazie danych w tabeli companies

export async function saveRegulationAcceptance(version: string, companyId?: number): Promise<void> {
  // Zapisz informację o zatwierdzeniu w localStorage
  localStorage.setItem('regulamin_accepted', 'true');
  localStorage.setItem('regulamin_version', version);
  localStorage.setItem('regulamin_accepted_date', new Date().toISOString());
  
  // Jeśli mamy identyfikator firmy, zapisz informację w bazie danych
  if (companyId) {
    try {
      // Bezpośredni zapis do bazy danych przez API
      const response = await fetch('/api/companies/update-regulation-acceptance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: Number(companyId),
          version,
          acceptedAt: new Date().toISOString(),
        }),
      });
      
      const result = await response.json();
      console.log('Wynik zapisu akceptacji:', result);
      
      if (!response.ok) {
        console.error('Błąd HTTP:', response.status, response.statusText);
        throw new Error(`Błąd podczas zapisywania akceptacji regulaminu: ${response.status}`);
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania akceptacji regulaminu:', error);
    }
  }
}