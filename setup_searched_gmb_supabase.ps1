# Run this script to create the searched_gmb table in your Supabase project
# Make sure you have the Supabase CLI installed and configured

# Set your Supabase project reference (you can find this in your Supabase dashboard)
# Replace 'your-project-ref' with your actual project reference
$PROJECT_REF = "your-project-ref"

# Run the SQL script
Write-Host "Creating searched_gmb table in your Supabase project..."
Get-Content .\setup_searched_gmb_table.sql | supabase db query --project-ref $PROJECT_REF

Write-Host "Setup complete! The searched_gmb table has been created."
Write-Host "You can now use the new dashboard section at /dashboard/searched-gmb to view the data."
