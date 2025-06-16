# Portal Selection Update

## Overview
This update adds a dropdown interface for portal selection in the removal form, allowing users to select a portal for each profile. An optional Google Maps link field appears when "Mapy Google" is selected.

## Changes Made
1. Updated `RemovalForm.tsx` to use a dropdown with radio buttons for single portal selection
2. Added a conditional field for Google Maps link when "Mapy Google" is selected
3. Updated the `Removal` interface to include the new `mapsLink` optional field
4. Modified the API route to handle the new data structure
5. Created a SQL migration to add the `maps_link` column to the database
6. Added price display in the summary view for each profile
7. Made NIP field required for portals other than "Mapy Google"

## How to Apply
1. Run the migration script to add the new column to your database:
   ```powershell
   .\apply_maps_link_migration.ps1
   ```

## UI Changes
- Added a dropdown that shows the selected portal or placeholder text
- When clicked, a dropdown section expands and closes automatically after selection
- "Mapy Google" selection shows an additional optional field for the Maps link
- Other portal selections make the NIP field required
- Added price display for each profile in the summary view
- "Przejdź dalej" button is disabled until a portal is selected

## Technical Details
- The `url` field is still an array but only uses the first element
- The API now handles both string and string[] for the URL field
- The maps_link field is optional in the database
- Prices are calculated based on the selected portal
